import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, SafeAreaView, TextInput } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useApp } from '../../../src/context/AppContext';
import { Translations } from '../../../src/constants/translations';
import PatrikaRibbonLogo from '../../../src/components/PatrikaRibbonLogo';

export default function Step11() {
  const router = useRouter();
  const { state, dispatch } = useApp();
  const lang = state.language || 'en';
  const t = Translations[lang];

  const [fullName, setFullName] = useState(state.onboardingData?.name || 'Arjun Singh');
  const [emailAddress, setEmailAddress] = useState('arjun.singh@example.com');
  const [password, setPassword] = useState('pass1234');
  const [showPassword, setShowPassword] = useState(false);

  const handleNext = () => {
    dispatch({
      type: 'UPDATE_ONBOARDING',
      payload: { name: fullName },
    });
    router.push('/(auth)/onboarding/step12');
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={24} color="#200D08" />
        </TouchableOpacity>
        <View style={styles.headerTitleRow}>
          <PatrikaRibbonLogo size={26} />
          <Text style={styles.headerBrand}>Patrika Matrimony</Text>
        </View>
        <Text style={styles.stepIndicator}>11/13</Text>
      </View>

      {/* Progress Bar */}
      <View style={styles.progressTrack}>
        <View style={[styles.progressBar, { width: `${(11 / 13) * 100}%` }]} />
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>{t.step11Title}</Text>
        <Text style={styles.subtitle}>Enter candidate name & account details</Text>

        {/* Full Name */}
        <View style={styles.fieldGroup}>
          <Text style={styles.fieldLabel}>{t.fullName}</Text>
          <TextInput
            style={styles.input}
            placeholder="e.g. Arjun Singh Rathore"
            value={fullName}
            onChangeText={setFullName}
            placeholderTextColor="#8C7B6B"
          />
        </View>

        {/* Email Address */}
        <View style={styles.fieldGroup}>
          <Text style={styles.fieldLabel}>{t.emailAddress}</Text>
          <TextInput
            style={styles.input}
            placeholder="e.g. arjun@example.com"
            value={emailAddress}
            onChangeText={setEmailAddress}
            keyboardType="email-address"
            autoCapitalize="none"
            placeholderTextColor="#8C7B6B"
          />
        </View>

        {/* Password */}
        <View style={styles.fieldGroup}>
          <Text style={styles.fieldLabel}>{t.password}</Text>
          <View style={styles.passwordBox}>
            <TextInput
              style={styles.passwordInput}
              placeholder="Create account password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
              placeholderTextColor="#8C7B6B"
            />
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
              <Ionicons name={showPassword ? 'eye-off-outline' : 'eye-outline'} size={20} color="#8C7B6B" />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      {/* Footer CTA */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.nextBtn} onPress={handleNext} activeOpacity={0.88}>
          <Text style={styles.nextBtnText}>{t.continue}</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAF6F0',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 12,
    backgroundColor: '#FFFDF9',
    borderBottomWidth: 1,
    borderBottomColor: '#E2D7C7',
  },
  backBtn: {
    padding: 4,
  },
  headerTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  headerBrand: {
    fontSize: 18,
    fontWeight: '800',
    color: '#6B0000',
  },
  stepIndicator: {
    fontSize: 14,
    fontWeight: '700',
    color: '#8C7B6B',
  },
  progressTrack: {
    height: 4,
    backgroundColor: '#E8DFD3',
    width: '100%',
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#6B0000',
  },
  content: {
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 40,
  },
  title: {
    fontSize: 26,
    fontWeight: '800',
    color: '#200D08',
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 14,
    color: '#665544',
    marginTop: 6,
    marginBottom: 24,
  },
  fieldGroup: {
    marginBottom: 22,
  },
  fieldLabel: {
    fontSize: 15,
    fontWeight: '700',
    color: '#200D08',
    marginBottom: 10,
  },
  input: {
    backgroundColor: '#FFFDF9',
    borderWidth: 1,
    borderColor: '#E2D7C7',
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    color: '#200D08',
  },
  passwordBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFDF9',
    borderWidth: 1,
    borderColor: '#E2D7C7',
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  passwordInput: {
    flex: 1,
    fontSize: 16,
    color: '#200D08',
  },
  footer: {
    paddingHorizontal: 24,
    paddingVertical: 20,
    backgroundColor: '#FFFDF9',
    borderTopWidth: 1,
    borderColor: '#E2D7C7',
  },
  nextBtn: {
    backgroundColor: '#6B0000',
    paddingVertical: 16,
    borderRadius: 28,
    alignItems: 'center',
    shadowColor: '#6B0000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 4,
  },
  nextBtnText: {
    color: '#FFFDF9',
    fontSize: 17,
    fontWeight: '700',
  },
});
