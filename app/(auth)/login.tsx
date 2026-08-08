import React, { useState } from 'react';
import { 
  View, Text, StyleSheet, TextInput, TouchableOpacity, SafeAreaView, 
  KeyboardAvoidingView, Platform, ScrollView 
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Typography, Spacing, BorderRadius, Shadow } from '../../src/constants/theme';
import PatrikaRibbonLogo from '../../src/components/PatrikaRibbonLogo';
import PremiumButton from '../../src/components/ui/PremiumButton';

export default function LoginScreen() {
  const router = useRouter();
  const [phoneNumber, setPhoneNumber] = useState('');

  const handleLoginSubmit = () => {
    router.push({
      pathname: '/(auth)/otp',
      params: { contact: phoneNumber || '9876543210' },
    });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
        style={styles.flexOne}
      >
        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
              <Ionicons name="arrow-back" size={24} color={Colors.text} />
            </TouchableOpacity>
          </View>

          {/* Logo & Intro */}
          <View style={styles.introContainer}>
            <PatrikaRibbonLogo size={48} />
            <Text style={styles.welcomeTitle}>Welcome back.</Text>
            <Text style={styles.welcomeSub}>
              Your next meaningful connection could be closer than you think.
            </Text>
          </View>

          {/* Form */}
          <View style={styles.formContainer}>
            <View style={styles.inputWrapper}>
              <Text style={styles.inputPrefix}>+91</Text>
              <TextInput
                style={styles.inputField}
                placeholder="Enter mobile number"
                keyboardType="phone-pad"
                value={phoneNumber}
                onChangeText={setPhoneNumber}
                placeholderTextColor={Colors.textMuted}
                maxLength={10}
              />
            </View>

            <PremiumButton 
              title="Continue" 
              variant="premium"
              onPress={handleLoginSubmit} 
              icon="arrow-forward"
              iconPosition="right"
              style={{ marginTop: Spacing.xl }}
            />

            {/* Divider OR */}
            <View style={styles.dividerRow}>
              <View style={styles.dividerLine} />
              <Text style={styles.dividerText}>OR CONTINUE WITH</Text>
              <View style={styles.dividerLine} />
            </View>

            {/* Social Buttons */}
            <View style={styles.socialRow}>
              <TouchableOpacity style={styles.socialBtn} activeOpacity={0.8}>
                <Ionicons name="logo-google" size={20} color="#EA4335" />
                <Text style={styles.socialBtnText}>Google</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.socialBtn} activeOpacity={0.8}>
                <Ionicons name="logo-apple" size={20} color={Colors.text} />
                <Text style={styles.socialBtnText}>Apple</Text>
              </TouchableOpacity>
            </View>
          </View>

        </ScrollView>
        
        {/* Bottom Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>New here? </Text>
          <TouchableOpacity onPress={() => router.push('/(auth)/onboarding/step1')}>
            <Text style={styles.footerLink}>Create account</Text>
          </TouchableOpacity>
        </View>

      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  flexOne: {
    flex: 1,
  },
  scrollContent: {
    padding: Spacing['2xl'],
    flexGrow: 1,
  },
  header: {
    marginBottom: Spacing['2xl'],
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
    ...Shadow.sm,
  },
  introContainer: {
    alignItems: 'flex-start',
    marginBottom: Spacing['4xl'],
  },
  welcomeTitle: {
    fontFamily: Typography.fontFamily.serif,
    fontSize: Typography.sizes['3xl'],
    color: Colors.text,
    marginTop: Spacing.xl,
    marginBottom: Spacing.sm,
  },
  welcomeSub: {
    fontFamily: Typography.fontFamily.sans,
    fontSize: Typography.sizes.base,
    color: Colors.textSecondary,
    lineHeight: 24,
  },
  formContainer: {
    width: '100%',
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.xl,
    height: 64,
    paddingHorizontal: Spacing.xl,
    borderWidth: 1,
    borderColor: Colors.border,
    ...Shadow.sm,
  },
  inputPrefix: {
    fontFamily: Typography.fontFamily.sansMedium,
    fontSize: Typography.sizes.lg,
    color: Colors.text,
    marginRight: Spacing.sm,
  },
  inputField: {
    flex: 1,
    fontFamily: Typography.fontFamily.sans,
    fontSize: Typography.sizes.lg,
    color: Colors.text,
    height: '100%',
  },
  dividerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: Spacing['3xl'],
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: Colors.border,
  },
  dividerText: {
    fontFamily: Typography.fontFamily.sansMedium,
    fontSize: Typography.sizes.xs,
    color: Colors.textMuted,
    marginHorizontal: Spacing.lg,
    letterSpacing: 1,
  },
  socialRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: Spacing.base,
  },
  socialBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.surface,
    height: 56,
    borderRadius: BorderRadius.xl,
    borderWidth: 1,
    borderColor: Colors.border,
    gap: Spacing.sm,
    ...Shadow.sm,
  },
  socialBtnText: {
    fontFamily: Typography.fontFamily.sansMedium,
    fontSize: Typography.sizes.md,
    color: Colors.text,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: Spacing['2xl'],
    paddingBottom: Platform.OS === 'ios' ? Spacing['3xl'] : Spacing['2xl'],
  },
  footerText: {
    fontFamily: Typography.fontFamily.sans,
    fontSize: Typography.sizes.md,
    color: Colors.textSecondary,
  },
  footerLink: {
    fontFamily: Typography.fontFamily.sansBold,
    fontSize: Typography.sizes.md,
    color: Colors.primary,
  },
});
