import React, { useState } from 'react';
import { 
  View, Text, StyleSheet, TextInput, TouchableOpacity, SafeAreaView, 
  KeyboardAvoidingView, Platform, ScrollView 
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useApp } from '../../src/context/AppContext';
import PatrikaRibbonLogo from '../../src/components/PatrikaRibbonLogo';
import MintGlassBackground from '../../src/components/MintGlassBackground';

export default function LoginScreen() {
  const router = useRouter();
  const { state, dispatch } = useApp();
  const lang = state.language || 'en';

  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  const toggleLanguage = () => {
    dispatch({ type: 'SET_LANGUAGE', payload: lang === 'en' ? 'hi' : 'en' });
  };

  const handleLoginSubmit = () => {
    router.push({
      pathname: '/(auth)/otp',
      params: { contact: identifier || '+91-9876543210' },
    });
  };

  return (
    <MintGlassBackground>
      <SafeAreaView style={styles.safeArea}>
        {/* Top Header Bar */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <Ionicons name="arrow-back" size={22} color="#0F2E2B" />
          </TouchableOpacity>

          <View style={styles.headerBrandRow}>
            <PatrikaRibbonLogo size={28} />
            <Text style={styles.headerTitle}>Patrika Matrimony</Text>
          </View>

          <TouchableOpacity style={styles.langPillBtn} onPress={toggleLanguage} activeOpacity={0.8}>
            <Ionicons name="globe-outline" size={14} color="#0D9488" style={{ marginRight: 3 }} />
            <Text style={styles.langPillText}>{lang === 'en' ? 'EN' : 'HI'}</Text>
          </TouchableOpacity>
        </View>

        <KeyboardAvoidingView 
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
          style={styles.flexOne}
        >
          <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
            {/* Glassmorphic Container Card */}
            <View style={styles.glassCardContainer}>
              {/* Glowing Vector Icon Emblem Badge */}
              <View style={styles.topVectorEmblemWrapper}>
                <View style={styles.glowingVectorCircle}>
                  <MaterialCommunityIcons name="heart-flash" size={32} color="#FFFFFF" />
                </View>
              </View>

              {/* Welcome Headline */}
              <View style={styles.topIntro}>
                <Text style={styles.welcomeTitle}>Welcome Back</Text>
                <Text style={styles.welcomeSub}>Enter your email or mobile to log in to your account</Text>
              </View>

              {/* Login Form */}
              <View style={styles.formContainer}>
                {/* Field 1: Email or Mobile */}
                <Text style={styles.inputLabel}>Email or Phone Number</Text>
                <View style={styles.glassInputWrapper}>
                  <MaterialCommunityIcons name="email-outline" size={20} color="#0D9488" style={styles.inputIcon} />
                  <TextInput
                    style={styles.inputField}
                    placeholder="Enter your email or phone"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    value={identifier}
                    onChangeText={setIdentifier}
                    placeholderTextColor="#8C9E9B"
                  />
                </View>

                {/* Field 2: Password */}
                <Text style={styles.inputLabel}>Password</Text>
                <View style={styles.glassInputWrapper}>
                  <MaterialCommunityIcons name="lock-outline" size={20} color="#0D9488" style={styles.inputIcon} />
                  <TextInput
                    style={styles.inputField}
                    placeholder="Enter password"
                    secureTextEntry={!showPassword}
                    value={password}
                    onChangeText={setPassword}
                    placeholderTextColor="#8C9E9B"
                  />
                  <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.eyeIconBtn}>
                    <Ionicons name={showPassword ? "eye-off-outline" : "eye-outline"} size={20} color="#0D9488" />
                  </TouchableOpacity>
                </View>

                {/* Remember Me & Forgot Password Row */}
                <View style={styles.rememberRow}>
                  <TouchableOpacity 
                    style={styles.checkboxContainer} 
                    onPress={() => setRememberMe(!rememberMe)}
                    activeOpacity={0.8}
                  >
                    <View style={[styles.customCheckbox, rememberMe && styles.customCheckboxChecked]}>
                      {rememberMe && <Ionicons name="checkmark" size={14} color="#FFFFFF" />}
                    </View>
                    <Text style={styles.rememberText}>Keep me logged in</Text>
                  </TouchableOpacity>

                  <TouchableOpacity activeOpacity={0.7}>
                    <Text style={styles.forgotPasswordText}>Forget password?</Text>
                  </TouchableOpacity>
                </View>

                {/* Primary Action Button */}
                <TouchableOpacity style={styles.primaryButton} onPress={handleLoginSubmit} activeOpacity={0.88}>
                  <Text style={styles.primaryButtonText}>Log In</Text>
                </TouchableOpacity>

                {/* Divider OR */}
                <View style={styles.dividerRow}>
                  <View style={styles.dividerLine} />
                  <Text style={styles.dividerText}>or</Text>
                  <View style={styles.dividerLine} />
                </View>

                {/* Glass Social Buttons Row */}
                <View style={styles.socialRow}>
                  <TouchableOpacity style={styles.socialGlassBtn} activeOpacity={0.85}>
                    <Ionicons name="logo-google" size={18} color="#EA4335" style={{ marginRight: 6 }} />
                    <Text style={styles.socialBtnText}>Google</Text>
                  </TouchableOpacity>

                  <TouchableOpacity style={styles.socialGlassBtn} activeOpacity={0.85}>
                    <Ionicons name="logo-apple" size={18} color="#0F2E2B" style={{ marginRight: 6 }} />
                    <Text style={styles.socialBtnText}>Apple</Text>
                  </TouchableOpacity>
                </View>

                {/* Bottom Create Profile Prompt */}
                <View style={styles.createAccountRow}>
                  <Text style={styles.createAccountText}>Don't have an account? </Text>
                  <TouchableOpacity onPress={() => router.push('/(auth)/onboarding/step1')}>
                    <Text style={styles.createAccountBold}>Create a new account</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </MintGlassBackground>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  flexOne: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  backButton: {
    padding: 6,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.85)',
  },
  headerBrandRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#0F2E2B',
    fontFamily: 'serif',
  },
  langPillBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.85)',
    borderWidth: 1.5,
    borderColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 16,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  langPillText: {
    fontSize: 12,
    fontWeight: '800',
    color: '#0F2E2B',
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },
  glassCardContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.85)',
    borderWidth: 1.5,
    borderColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 28,
    padding: 24,
    shadowColor: '#0F2E2B',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.08,
    shadowRadius: 16,
    elevation: 4,
  },
  topVectorEmblemWrapper: {
    alignItems: 'center',
    marginBottom: 16,
  },
  glowingVectorCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#0F2E2B',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#0F2E2B',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 12,
    elevation: 6,
  },
  topIntro: {
    alignItems: 'center',
    marginBottom: 24,
  },
  welcomeTitle: {
    fontSize: 26,
    fontWeight: '800',
    color: '#0F2E2B',
    fontFamily: 'serif',
    textAlign: 'center',
  },
  welcomeSub: {
    fontSize: 13,
    color: '#4A6B66',
    marginTop: 6,
    textAlign: 'center',
    lineHeight: 18,
  },
  formContainer: {
    width: '100%',
  },
  inputLabel: {
    fontSize: 13,
    fontWeight: '700',
    color: '#0F2E2B',
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
    marginBottom: 18,
  },
  inputIcon: {
    marginRight: 10,
  },
  inputField: {
    flex: 1,
    paddingVertical: 14,
    fontSize: 15,
    color: '#0F2E2B',
  },
  eyeIconBtn: {
    padding: 8,
  },
  rememberRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  customCheckbox: {
    width: 18,
    height: 18,
    borderRadius: 9,
    borderWidth: 1.5,
    borderColor: '#8C9E9B',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
    backgroundColor: 'transparent',
  },
  customCheckboxChecked: {
    backgroundColor: '#0F2E2B',
    borderColor: '#0F2E2B',
  },
  rememberText: {
    fontSize: 13,
    color: '#4A6B66',
    fontWeight: '500',
  },
  forgotPasswordText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#0D9488',
    textDecorationLine: 'underline',
  },
  primaryButton: {
    backgroundColor: '#0F2E2B',
    paddingVertical: 16,
    borderRadius: 24,
    alignItems: 'center',
    shadowColor: '#0F2E2B',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 14,
    elevation: 6,
    marginBottom: 20,
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '800',
  },
  dividerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 18,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: 'rgba(15, 46, 43, 0.12)',
  },
  dividerText: {
    fontSize: 12,
    color: '#8C9E9B',
    marginHorizontal: 12,
    fontWeight: '600',
  },
  socialRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 24,
  },
  socialGlassBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderWidth: 1.5,
    borderColor: 'rgba(15, 46, 43, 0.12)',
    borderRadius: 20,
    paddingVertical: 12,
  },
  socialBtnText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#0F2E2B',
  },
  createAccountRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  createAccountText: {
    fontSize: 13,
    color: '#4A6B66',
  },
  createAccountBold: {
    fontSize: 13,
    fontWeight: '800',
    color: '#0D9488',
    textDecorationLine: 'underline',
  },
});
