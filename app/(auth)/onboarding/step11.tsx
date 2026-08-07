import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, SafeAreaView, TextInput } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useApp } from '../../../src/context/AppContext';
import { Translations } from '../../../src/constants/translations';
import MintGlassBackground from '../../../src/components/MintGlassBackground';

export default function Step11() {
  const router = useRouter();
  const { state, dispatch } = useApp();
  const lang = state.language || 'en';
  const t = Translations[lang];

  const [fullName, setFullName] = useState(state.onboardingData?.name || 'Arjun Singh');
  const [mobile, setMobile] = useState(state.currentUser?.mobile || '+91-9876543210');
  const [email, setEmail] = useState(state.currentUser?.email || 'arjun@example.com');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleNext = () => {
    dispatch({
      type: 'UPDATE_ONBOARDING',
      payload: {
        name: fullName,
      },
    });
    router.push('/(auth)/onboarding/step12');
  };

  return (
    <MintGlassBackground>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.topHeader}>
          <TouchableOpacity onPress={() => router.back()} style={styles.blurBackBtn} activeOpacity={0.8}>
            <Ionicons name="chevron-back" size={22} color="#0F2E2B" />
          </TouchableOpacity>
          <View style={styles.stepPillBadge}>
            <Text style={styles.stepPillText}>Step 11 of 13</Text>
          </View>
        </View>

        <ScrollView contentContainerStyle={styles.contentScroll} showsVerticalScrollIndicator={false}>
          <View style={styles.glassCardContainer}>
            <View style={styles.badgeWrapper}>
              <View style={styles.glowingVectorCircle}>
                <MaterialCommunityIcons name="card-account-details-outline" size={30} color="#FFFFFF" />
              </View>
            </View>

            <View style={styles.headerTitleBox}>
              <Text style={styles.questionTitle}>{t.step11Title}</Text>
              <Text style={styles.questionSubtitle}>Enter candidate details, contact & account password</Text>
            </View>

            {/* Candidate Full Name */}
            <Text style={styles.sectionHeaderLabel}>Candidate Full Name</Text>
            <View style={styles.glassInputWrapper}>
              <Ionicons name="person-outline" size={20} color="#0D9488" style={{ marginRight: 10 }} />
              <TextInput
                style={styles.inputField}
                placeholder="Enter candidate full name"
                value={fullName}
                onChangeText={setFullName}
                placeholderTextColor="#8C9E9B"
              />
            </View>

            {/* Phone Number */}
            <Text style={styles.sectionHeaderLabel}>Phone Number</Text>
            <View style={styles.glassInputWrapper}>
              <MaterialCommunityIcons name="phone-outline" size={20} color="#0D9488" style={{ marginRight: 10 }} />
              <TextInput
                style={styles.inputField}
                placeholder="Enter 10-digit mobile number"
                keyboardType="phone-pad"
                value={mobile}
                onChangeText={setMobile}
                placeholderTextColor="#8C9E9B"
              />
            </View>

            {/* Email Address */}
            <Text style={styles.sectionHeaderLabel}>Contact Email Address</Text>
            <View style={styles.glassInputWrapper}>
              <MaterialCommunityIcons name="email-outline" size={20} color="#0D9488" style={{ marginRight: 10 }} />
              <TextInput
                style={styles.inputField}
                placeholder="Enter email address"
                keyboardType="email-address"
                autoCapitalize="none"
                value={email}
                onChangeText={setEmail}
                placeholderTextColor="#8C9E9B"
              />
            </View>

            {/* Account Password */}
            <Text style={styles.sectionHeaderLabel}>Account Password</Text>
            <View style={styles.glassInputWrapper}>
              <MaterialCommunityIcons name="lock-outline" size={20} color="#0D9488" style={{ marginRight: 10 }} />
              <TextInput
                style={styles.inputField}
                placeholder="Create password (min 6 characters)"
                secureTextEntry={!showPassword}
                value={password}
                onChangeText={setPassword}
                placeholderTextColor="#8C9E9B"
              />
              <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={{ padding: 4 }}>
                <Ionicons name={showPassword ? "eye-off-outline" : "eye-outline"} size={20} color="#0D9488" />
              </TouchableOpacity>
            </View>

            {/* Confirm Password */}
            <Text style={styles.sectionHeaderLabel}>Confirm Password</Text>
            <View style={styles.glassInputWrapper}>
              <MaterialCommunityIcons name="lock-check-outline" size={20} color="#0D9488" style={{ marginRight: 10 }} />
              <TextInput
                style={styles.inputField}
                placeholder="Re-enter password"
                secureTextEntry={!showConfirmPassword}
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                placeholderTextColor="#8C9E9B"
              />
              <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)} style={{ padding: 4 }}>
                <Ionicons name={showConfirmPassword ? "eye-off-outline" : "eye-outline"} size={20} color="#0D9488" />
              </TouchableOpacity>
            </View>
          </View>
          <View style={{ height: 20 }} />
        </ScrollView>

        <View style={styles.footerContainer}>
          <TouchableOpacity style={styles.continueBtn} onPress={handleNext} activeOpacity={0.88}>
            <Text style={styles.continueBtnText}>{t.continue} →</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </MintGlassBackground>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  topHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  blurBackBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255, 255, 255, 0.85)',
    borderWidth: 1.5,
    borderColor: 'rgba(255, 255, 255, 0.95)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepPillBadge: {
    backgroundColor: 'rgba(255, 255, 255, 0.85)',
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderWidth: 1.5,
    borderColor: 'rgba(255, 255, 255, 0.95)',
  },
  stepPillText: {
    color: '#0F2E2B',
    fontSize: 12,
    fontWeight: '700',
  },

  contentScroll: {
    paddingHorizontal: 16,
    paddingTop: 8,
  },
  glassCardContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.85)',
    borderWidth: 1.5,
    borderColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 28,
    padding: 20,
    shadowColor: '#0F2E2B',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.08,
    shadowRadius: 16,
    elevation: 4,
  },
  badgeWrapper: {
    alignItems: 'center',
    marginBottom: 12,
  },
  glowingVectorCircle: {
    width: 58,
    height: 58,
    borderRadius: 29,
    backgroundColor: '#0F2E2B',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#0F2E2B',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 12,
    elevation: 6,
  },
  headerTitleBox: {
    alignItems: 'center',
    marginBottom: 14,
  },
  questionTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: '#0F2E2B',
    fontFamily: 'serif',
    textAlign: 'center',
    marginBottom: 4,
  },
  questionSubtitle: {
    fontSize: 13,
    color: '#4A6B66',
    textAlign: 'center',
    lineHeight: 18,
  },
  sectionHeaderLabel: {
    fontSize: 13,
    fontWeight: '800',
    color: '#0F2E2B',
    marginTop: 14,
    marginBottom: 8,
  },

  glassInputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderWidth: 1.5,
    borderColor: 'rgba(15, 46, 43, 0.12)',
    borderRadius: 18,
    paddingHorizontal: 16,
    marginBottom: 10,
  },
  inputField: {
    flex: 1,
    paddingVertical: 14,
    fontSize: 15,
    color: '#0F2E2B',
  },

  footerContainer: {
    paddingHorizontal: 20,
    paddingVertical: 14,
    backgroundColor: 'rgba(235, 247, 245, 0.92)',
    borderTopWidth: 1,
    borderColor: 'rgba(15, 46, 43, 0.1)',
  },
  progressRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 10,
  },
  progressTrackBg: {
    flex: 1,
    height: 6,
    backgroundColor: 'rgba(15, 46, 43, 0.12)',
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#0D9488',
    borderRadius: 3,
  },
  progressText: {
    fontSize: 12,
    fontWeight: '800',
    color: '#0D9488',
  },
  continueBtn: {
    backgroundColor: '#0F2E2B',
    paddingVertical: 16,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#0F2E2B',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 12,
    elevation: 6,
  },
  continueBtnText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '800',
  },
});
