import React, { useState } from 'react';
import PremiumButton from '../../../src/components/ui/PremiumButton';
import PremiumCard from '../../../src/components/ui/PremiumCard';
import { Typography } from '../../../src/constants/theme';
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

  const isOtpLogin = !!state.currentUser?.mobile;

  const [fullName, setFullName] = useState(state.onboardingData?.name || state.currentUser?.name || 'Arjun Singh');
  const [mobile, setMobile] = useState(state.currentUser?.mobile || '+91-9876543210');
  const [email, setEmail] = useState(state.currentUser?.email || 'arjun@example.com');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

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
            <Ionicons name="chevron-back" size={22} color="#183B82" />
          </TouchableOpacity>
          <View style={styles.stepPillBadge}>
            <Text style={styles.stepPillText}>11 / 13</Text>
          </View>
        </View>

        <ScrollView contentContainerStyle={styles.contentScroll} showsVerticalScrollIndicator={false}>
          <PremiumCard variant="glass" style={styles.glassCardContainer}>
            <View style={styles.badgeWrapper}>
              <View style={styles.glowingVectorCircle}>
                <MaterialCommunityIcons name="card-account-details-outline" size={30} color="#FFFFFF" />
              </View>
            </View>

            <View style={styles.headerTitleBox}>
              <Text style={styles.questionTitle}>Account Registration</Text>
              <Text style={styles.questionSubtitle}>Verify contact & candidate full name</Text>
            </View>

            {/* Candidate Full Name */}
            <Text style={styles.sectionHeaderLabel}>Candidate Full Name</Text>
            <View style={styles.glassInputWrapper}>
              <Ionicons name="person-outline" size={20} color="#4169D8" style={{ marginRight: 10 }} />
              <TextInput
                style={styles.inputField}
                placeholder="Enter candidate full name"
                value={fullName}
                onChangeText={setFullName}
                placeholderTextColor="#8C9E9B"
              />
            </View>

            {/* Phone Number */}
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 14, marginBottom: 8 }}>
              <Text style={[styles.sectionHeaderLabel, { marginTop: 0, marginBottom: 0 }]}>Phone Number</Text>
              {isOtpLogin && (
                <View style={styles.verifiedOtpPill}>
                  <Ionicons name="checkmark-circle" size={12} color="#4169D8" style={{ marginRight: 3 }} />
                  <Text style={styles.verifiedOtpText}>Verified via Mobile OTP</Text>
                </View>
              )}
            </View>
            <View style={[styles.glassInputWrapper, isOtpLogin && styles.disabledGlassInput]}>
              <MaterialCommunityIcons name="phone-outline" size={20} color="#4169D8" style={{ marginRight: 10 }} />
              <TextInput
                style={styles.inputField}
                placeholder="Enter 10-digit mobile number"
                keyboardType="phone-pad"
                editable={!isOtpLogin}
                value={mobile}
                onChangeText={setMobile}
                placeholderTextColor="#8C9E9B"
              />
            </View>

            {/* Email Address */}
            <Text style={styles.sectionHeaderLabel}>Contact Email Address</Text>
            <View style={styles.glassInputWrapper}>
              <MaterialCommunityIcons name="email-outline" size={20} color="#4169D8" style={{ marginRight: 10 }} />
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

            {/* Account Password (Optional if OTP Login) */}
            <Text style={styles.sectionHeaderLabel}>Account Password {!isOtpLogin ? '(Required)' : '(Optional)'}</Text>
            <View style={styles.glassInputWrapper}>
              <MaterialCommunityIcons name="lock-outline" size={20} color="#4169D8" style={{ marginRight: 10 }} />
              <TextInput
                style={styles.inputField}
                placeholder={isOtpLogin ? "Mobile OTP Login active (Password optional)" : "Create password (min 6 characters)"}
                secureTextEntry={!showPassword}
                value={password}
                onChangeText={setPassword}
                placeholderTextColor="#8C9E9B"
              />
              <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={{ padding: 4 }}>
                <Ionicons name={showPassword ? "eye-off-outline" : "eye-outline"} size={20} color="#4169D8" />
              </TouchableOpacity>
            </View>

            {/* Privacy Guarantee Pill */}
            <View style={styles.privacyGuaranteePill}>
              <Ionicons name="shield-checkmark" size={16} color="#4169D8" style={{ marginRight: 6 }} />
              <Text style={styles.privacyGuaranteeText}>Privacy Guaranteed 🔒 Your contact details are kept secure.</Text>
            </View>
          </PremiumCard>
          <View style={{ height: 20 }} />
        </ScrollView>

        <View style={styles.footerContainer}>
          <PremiumButton title="Save & Continue →" onPress={handleNext} variant="primary" />
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
    color: '#183B82',
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
    shadowColor: '#183B82',
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
    backgroundColor: '#183B82',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#183B82',
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
    color: '#183B82',
    fontFamily: Typography.fontFamily.serif,
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
    color: '#183B82',
    marginTop: 14,
    marginBottom: 8,
  },

  verifiedOtpPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(65, 105, 216, 0.12)',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  verifiedOtpText: {
    fontSize: 11,
    fontWeight: '800',
    color: '#4169D8',
  },

  glassInputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderWidth: 1.5,
    borderColor: 'rgba(24, 59, 130, 0.12)',
    borderRadius: 18,
    paddingHorizontal: 16,
    marginBottom: 10,
  },
  disabledGlassInput: {
    backgroundColor: 'rgba(15, 46, 43, 0.04)',
    borderColor: 'rgba(24, 59, 130, 0.08)',
  },
  inputField: {
    flex: 1,
    paddingVertical: 14,
    fontSize: 15,
    color: '#183B82',
  },

  privacyGuaranteePill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(65, 105, 216, 0.12)',
    borderRadius: 16,
    paddingHorizontal: 14,
    paddingVertical: 10,
    marginTop: 12,
  },
  privacyGuaranteeText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#183B82',
    flex: 1,
  },

  footerContainer: {
    paddingHorizontal: 20,
    paddingVertical: 14,
    backgroundColor: 'rgba(243, 247, 255, 0.92)',
    borderTopWidth: 1,
    borderColor: 'rgba(24, 59, 130, 0.1)',
  },
  continueBtn: {
    backgroundColor: '#183B82',
    paddingVertical: 16,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#183B82',
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
