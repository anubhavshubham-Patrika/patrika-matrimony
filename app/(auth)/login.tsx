import React, { useState } from 'react';
import { 
  View, Text, StyleSheet, TextInput, TouchableOpacity, SafeAreaView, 
  KeyboardAvoidingView, Platform, ScrollView 
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useApp } from '../../src/context/AppContext';
import PatrikaRibbonLogo from '../../src/components/PatrikaRibbonLogo';
import AnimatedGlassBackground from '../../src/components/AnimatedGlassBackground';

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
    <AnimatedGlassBackground>
      <SafeAreaView style={styles.safeArea}>
        {/* Top Header Bar */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <Ionicons name="arrow-back" size={22} color="#FFFFFF" />
          </TouchableOpacity>

          <View style={styles.headerBrandRow}>
            <PatrikaRibbonLogo size={28} />
            <Text style={styles.headerTitle}>Patrika Matrimony</Text>
          </View>

          <TouchableOpacity style={styles.langPillBtn} onPress={toggleLanguage} activeOpacity={0.8}>
            <Ionicons name="globe-outline" size={14} color="#FF4D6D" style={{ marginRight: 3 }} />
            <Text style={styles.langPillText}>{lang === 'en' ? 'EN' : 'HI'}</Text>
          </TouchableOpacity>
        </View>

        <KeyboardAvoidingView 
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
          style={styles.flexOne}
        >
          <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
            {/* Glassmorphic Container Card (Matching Reference Screenshot) */}
            <View style={styles.glassCardContainer}>
              {/* Glowing Vector Icon Emblem Badge (Inspiration Reference Screenshot) */}
              <View style={styles.topVectorEmblemWrapper}>
                <View style={styles.glowingVectorCircle}>
                  <MaterialCommunityIcons name="heart-flash" size={36} color="#FFFFFF" />
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
                  <MaterialCommunityIcons name="email-outline" size={20} color="#FF85A1" style={styles.inputIcon} />
                  <TextInput
                    style={styles.inputField}
                    placeholder="Enter your email or phone"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    value={identifier}
                    onChangeText={setIdentifier}
                    placeholderTextColor="#8C7383"
                  />
                </View>

                {/* Field 2: Password */}
                <Text style={styles.inputLabel}>Password</Text>
                <View style={styles.glassInputWrapper}>
                  <MaterialCommunityIcons name="lock-outline" size={20} color="#FF85A1" style={styles.inputIcon} />
                  <TextInput
                    style={styles.inputField}
                    placeholder="Enter password"
                    secureTextEntry={!showPassword}
                    value={password}
                    onChangeText={setPassword}
                    placeholderTextColor="#8C7383"
                  />
                  <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.eyeIconBtn}>
                    <Ionicons name={showPassword ? "eye-off-outline" : "eye-outline"} size={20} color="#FF85A1" />
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

                {/* Primary Action Button (Matching Reference Screenshot) */}
                <TouchableOpacity style={styles.primaryButton} onPress={handleLoginSubmit} activeOpacity={0.88}>
                  <Text style={styles.primaryButtonText}>Log In</Text>
                </TouchableOpacity>

                {/* Divider OR */}
                <View style={styles.dividerRow}>
                  <View style={styles.dividerLine} />
                  <Text style={styles.dividerText}>or</Text>
                  <View style={styles.dividerLine} />
                </View>

                {/* Glass Social Buttons Row (Inspiration Reference Screenshot) */}
                <View style={styles.socialRow}>
                  <TouchableOpacity style={styles.socialGlassBtn} activeOpacity={0.85}>
                    <Ionicons name="logo-google" size={18} color="#EA4335" style={{ marginRight: 6 }} />
                    <Text style={styles.socialBtnText}>Google</Text>
                  </TouchableOpacity>

                  <TouchableOpacity style={styles.socialGlassBtn} activeOpacity={0.85}>
                    <Ionicons name="logo-apple" size={18} color="#FFFFFF" style={{ marginRight: 6 }} />
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
    </AnimatedGlassBackground>
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
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  headerBrandRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#FFFFFF',
    fontFamily: 'serif',
  },
  langPillBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 16,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  langPillText: {
    fontSize: 12,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },
  /* Glassmorphic Container Card (Matching Screenshot) */
  glassCardContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderWidth: 1.5,
    borderColor: 'rgba(255, 255, 255, 0.16)',
    borderRadius: 28,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 6,
  },
  topVectorEmblemWrapper: {
    alignItems: 'center',
    marginBottom: 16,
  },
  glowingVectorCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#E31E25',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#E31E25',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.6,
    shadowRadius: 14,
    elevation: 6,
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  topIntro: {
    alignItems: 'center',
    marginBottom: 24,
  },
  welcomeTitle: {
    fontSize: 26,
    fontWeight: '800',
    color: '#FFFFFF',
    fontFamily: 'serif',
    textAlign: 'center',
  },
  welcomeSub: {
    fontSize: 13,
    color: '#BDA6B2',
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
    color: '#FFFFFF',
    marginBottom: 8,
  },
  glassInputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.07)',
    borderWidth: 1.5,
    borderColor: 'rgba(255, 255, 255, 0.14)',
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
    color: '#FFFFFF',
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
    borderColor: '#BDA6B2',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
    backgroundColor: 'transparent',
  },
  customCheckboxChecked: {
    backgroundColor: '#E31E25',
    borderColor: '#E31E25',
  },
  rememberText: {
    fontSize: 13,
    color: '#BDA6B2',
    fontWeight: '500',
  },
  forgotPasswordText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#FF4D6D',
    textDecorationLine: 'underline',
  },
  primaryButton: {
    backgroundColor: '#E31E25',
    paddingVertical: 16,
    borderRadius: 24,
    alignItems: 'center',
    shadowColor: '#E31E25',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.5,
    shadowRadius: 14,
    elevation: 6,
    borderWidth: 1.5,
    borderColor: 'rgba(255, 255, 255, 0.25)',
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
    backgroundColor: 'rgba(255, 255, 255, 0.12)',
  },
  dividerText: {
    fontSize: 12,
    color: '#8C7383',
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
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.16)',
    borderRadius: 20,
    paddingVertical: 12,
  },
  socialBtnText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  createAccountRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  createAccountText: {
    fontSize: 13,
    color: '#BDA6B2',
  },
  createAccountBold: {
    fontSize: 13,
    fontWeight: '800',
    color: '#FF4D6D',
    textDecorationLine: 'underline',
  },
});
