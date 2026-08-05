import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, SafeAreaView, KeyboardAvoidingView, Platform, Switch } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import PatrikaRibbonLogo from '../../src/components/PatrikaRibbonLogo';
import { Colors } from '../../src/constants/theme';

export default function LoginScreen() {
  const router = useRouter();
  const [tab, setTab] = useState<'mobile' | 'email'>('mobile');
  const [mobile, setMobile] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isParent, setIsParent] = useState(false);

  const handleSubmit = () => {
    router.push({
      pathname: '/(auth)/otp',
      params: { contact: tab === 'mobile' ? mobile : email },
    });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#200D08" />
        </TouchableOpacity>
        <View style={styles.headerBrandRow}>
          <PatrikaRibbonLogo size={28} />
          <Text style={styles.headerTitle}>Patrika Matrimony</Text>
        </View>
        <View style={{ width: 40 }} />
      </View>

      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container}>
        <View style={styles.topIntro}>
          <Text style={styles.welcomeTitle}>Welcome Back</Text>
          <Text style={styles.welcomeSub}>Log in to continue your royal partner search</Text>
        </View>

        <View style={styles.tabsContainer}>
          <TouchableOpacity style={[styles.tab, tab === 'mobile' && styles.activeTab]} onPress={() => setTab('mobile')}>
            <Text style={[styles.tabText, tab === 'mobile' && styles.activeTabText]}>Mobile OTP</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.tab, tab === 'email' && styles.activeTab]} onPress={() => setTab('email')}>
            <Text style={[styles.tabText, tab === 'email' && styles.activeTabText]}>Email & Password</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.formContainer}>
          {tab === 'mobile' ? (
            <View style={styles.mobileForm}>
              <View style={styles.inputGroup}>
                <View style={styles.countryCode}>
                  <Text style={styles.countryCodeText}>+91</Text>
                </View>
                <TextInput
                  style={styles.mobileInput}
                  placeholder="Enter 10-digit mobile number"
                  keyboardType="phone-pad"
                  maxLength={10}
                  value={mobile}
                  onChangeText={setMobile}
                  placeholderTextColor="#8C7B6B"
                />
              </View>

              <View style={styles.parentToggleContainer}>
                <Text style={styles.parentToggleText}>I am a Parent/Relative creating profile for family</Text>
                <Switch
                  value={isParent}
                  onValueChange={setIsParent}
                  trackColor={{ false: '#E2D7C7', true: '#6B0000' }}
                  thumbColor="#FFFDF9"
                />
              </View>

              <TouchableOpacity style={styles.primaryButton} onPress={handleSubmit} activeOpacity={0.88}>
                <Text style={styles.primaryButtonText}>Get OTP</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={styles.emailForm}>
              <TextInput
                style={styles.input}
                placeholder="Email Address"
                keyboardType="email-address"
                autoCapitalize="none"
                value={email}
                onChangeText={setEmail}
                placeholderTextColor="#8C7B6B"
              />
              <View style={styles.passwordContainer}>
                <TextInput
                  style={styles.passwordInput}
                  placeholder="Password"
                  secureTextEntry={!showPassword}
                  value={password}
                  onChangeText={setPassword}
                  placeholderTextColor="#8C7B6B"
                />
                <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.eyeIcon}>
                  <Ionicons name={showPassword ? "eye-off-outline" : "eye-outline"} size={22} color="#665544" />
                </TouchableOpacity>
              </View>
              <TouchableOpacity style={styles.forgotPassword}>
                <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.primaryButton} onPress={handleSubmit} activeOpacity={0.88}>
                <Text style={styles.primaryButtonText}>Login</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FAF6F0', // Warm Parchment Background
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#FFFDF9',
    borderBottomWidth: 1,
    borderBottomColor: '#E2D7C7',
  },
  backButton: {
    padding: 6,
  },
  headerBrandRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#6B0000', // Royal Crimson
  },
  container: {
    flex: 1,
    padding: 24,
  },
  topIntro: {
    marginBottom: 24,
  },
  welcomeTitle: {
    fontSize: 26,
    fontWeight: '800',
    color: '#200D08', // Royal Dark Maroon
  },
  welcomeSub: {
    fontSize: 14,
    color: '#665544',
    marginTop: 4,
  },
  tabsContainer: {
    flexDirection: 'row',
    backgroundColor: '#F5EFE6',
    borderRadius: 24,
    padding: 4,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#E2D7C7',
  },
  tab: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 20,
  },
  activeTab: {
    backgroundColor: '#6B0000', // Royal Crimson
  },
  tabText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#665544',
  },
  activeTabText: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
  formContainer: {
    backgroundColor: '#FAF6F0',
  },
  mobileForm: {},
  inputGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E2D7C7',
    borderRadius: 14,
    marginBottom: 20,
    backgroundColor: '#F4EEE5', // Soft Warm Cream Input
  },
  countryCode: {
    paddingHorizontal: 16,
    borderRightWidth: 1,
    borderRightColor: '#E2D7C7',
  },
  countryCodeText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#200D08',
  },
  mobileInput: {
    flex: 1,
    padding: 16,
    fontSize: 16,
    color: '#200D08',
  },
  parentToggleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 28,
  },
  parentToggleText: {
    flex: 1,
    fontSize: 14,
    color: '#665544',
    marginRight: 12,
  },
  primaryButton: {
    backgroundColor: '#6B0000', // Royal Crimson Primary CTA
    paddingVertical: 16,
    borderRadius: 28,
    alignItems: 'center',
    shadowColor: '#6B0000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 4,
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
  emailForm: {},
  input: {
    borderWidth: 1,
    borderColor: '#E2D7C7',
    borderRadius: 14,
    padding: 16,
    marginBottom: 16,
    fontSize: 16,
    color: '#200D08',
    backgroundColor: '#F4EEE5',
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E2D7C7',
    borderRadius: 14,
    backgroundColor: '#F4EEE5',
    marginBottom: 12,
  },
  passwordInput: {
    flex: 1,
    padding: 16,
    fontSize: 16,
    color: '#200D08',
  },
  eyeIcon: {
    padding: 16,
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    marginBottom: 24,
  },
  forgotPasswordText: {
    color: '#6B0000',
    fontSize: 14,
    fontWeight: '700',
  },
});
