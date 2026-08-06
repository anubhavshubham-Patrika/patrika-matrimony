import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, SafeAreaView, KeyboardAvoidingView, Platform, Switch } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import PatrikaRibbonLogo from '../../src/components/PatrikaRibbonLogo';

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
          <Ionicons name="arrow-back" size={24} color="#2C1A1D" />
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
          <Text style={styles.welcomeSub}>Log in to continue your partner search</Text>
        </View>

        {/* Tab Switcher */}
        <View style={styles.tabsContainer}>
          <TouchableOpacity 
            style={[styles.tab, tab === 'mobile' && styles.activeTab]} 
            onPress={() => setTab('mobile')}
            activeOpacity={0.85}
          >
            <Text style={[styles.tabText, tab === 'mobile' && styles.activeTabText]}>Mobile OTP</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.tab, tab === 'email' && styles.activeTab]} 
            onPress={() => setTab('email')}
            activeOpacity={0.85}
          >
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
                  placeholderTextColor="#8C7A7C"
                />
              </View>

              <View style={styles.parentToggleContainer}>
                <Text style={styles.parentToggleText}>I am a Parent/Relative creating profile for family</Text>
                <Switch
                  value={isParent}
                  onValueChange={setIsParent}
                  trackColor={{ false: '#EFE6DD', true: '#E31E25' }}
                  thumbColor="#FFFFFF"
                />
              </View>

              <TouchableOpacity style={styles.primaryButton} onPress={handleSubmit} activeOpacity={0.88}>
                <Text style={styles.primaryButtonText}>Get OTP →</Text>
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
                placeholderTextColor="#8C7A7C"
              />
              <View style={styles.passwordContainer}>
                <TextInput
                  style={styles.passwordInput}
                  placeholder="Password"
                  secureTextEntry={!showPassword}
                  value={password}
                  onChangeText={setPassword}
                  placeholderTextColor="#8C7A7C"
                />
                <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.eyeIcon}>
                  <Ionicons name={showPassword ? "eye-off-outline" : "eye-outline"} size={22} color="#8C7A7C" />
                </TouchableOpacity>
              </View>
              <TouchableOpacity style={styles.forgotPassword}>
                <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.primaryButton} onPress={handleSubmit} activeOpacity={0.88}>
                <Text style={styles.primaryButtonText}>Login →</Text>
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
    backgroundColor: '#FFF9F6',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#EFE6DD',
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
    color: '#E31E25',
    fontFamily: 'serif',
  },
  container: {
    flex: 1,
    padding: 24,
  },
  topIntro: {
    marginBottom: 24,
  },
  welcomeTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: '#2C1A1D',
    fontFamily: 'serif',
  },
  welcomeSub: {
    fontSize: 14,
    color: '#5A4A4D',
    marginTop: 4,
  },
  tabsContainer: {
    flexDirection: 'row',
    backgroundColor: '#FFF0F1',
    borderRadius: 24,
    padding: 4,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#FCD4D7',
  },
  tab: {
    flex: 1,
    paddingVertical: 11,
    alignItems: 'center',
    borderRadius: 20,
  },
  activeTab: {
    backgroundColor: '#E31E25',
  },
  tabText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#5A4A4D',
  },
  activeTabText: {
    color: '#FFFFFF',
    fontWeight: '800',
  },
  formContainer: {
    backgroundColor: 'transparent',
  },
  mobileForm: {},
  inputGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#EFE6DD',
    borderRadius: 14,
    marginBottom: 20,
    backgroundColor: '#FFF0F1',
  },
  countryCode: {
    paddingHorizontal: 16,
    borderRightWidth: 1,
    borderRightColor: '#EFE6DD',
  },
  countryCodeText: {
    fontSize: 16,
    fontWeight: '800',
    color: '#2C1A1D',
  },
  mobileInput: {
    flex: 1,
    padding: 14,
    fontSize: 16,
    color: '#2C1A1D',
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
    color: '#5A4A4D',
    marginRight: 12,
  },
  primaryButton: {
    backgroundColor: '#E31E25',
    paddingVertical: 16,
    borderRadius: 28,
    alignItems: 'center',
    shadowColor: '#E31E25',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 5,
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '800',
  },
  emailForm: {},
  input: {
    borderWidth: 1,
    borderColor: '#EFE6DD',
    borderRadius: 14,
    padding: 14,
    marginBottom: 16,
    fontSize: 16,
    color: '#2C1A1D',
    backgroundColor: '#FFF0F1',
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#EFE6DD',
    borderRadius: 14,
    backgroundColor: '#FFF0F1',
    marginBottom: 12,
  },
  passwordInput: {
    flex: 1,
    padding: 14,
    fontSize: 16,
    color: '#2C1A1D',
  },
  eyeIcon: {
    padding: 14,
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    marginBottom: 24,
  },
  forgotPasswordText: {
    color: '#E31E25',
    fontSize: 14,
    fontWeight: '800',
  },
});
