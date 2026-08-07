import React, { useState, useRef, useEffect } from 'react';
import { 
  View, Text, StyleSheet, TextInput, TouchableOpacity, SafeAreaView, KeyboardAvoidingView, Platform 
} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useApp } from '../../src/context/AppContext';
import MintGlassBackground from '../../src/components/MintGlassBackground';

export default function OtpScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const { dispatch } = useApp();
  const contact = params.contact || '+91-9876543210';

  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [timer, setTimer] = useState(30);
  const inputs = useRef<Array<TextInput | null>>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleChange = (text: string, index: number) => {
    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);

    if (text && index < 5) {
      inputs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (e: any, index: number) => {
    if (e.nativeEvent.key === 'Backspace' && !otp[index] && index > 0) {
      inputs.current[index - 1]?.focus();
    }
  };

  const handleVerify = () => {
    dispatch({
      type: 'LOGIN',
      payload: {
        userId: 'U001',
        name: 'Arjun Singh',
        mobile: contact.toString(),
        email: 'arjun@example.com',
        profileId: 'P001',
      },
    });

    router.replace('/(tabs)/home');
  };

  return (
    <MintGlassBackground>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.headerBtn}>
            <Ionicons name="arrow-back" size={22} color="#0F2E2B" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Verification</Text>
          <TouchableOpacity onPress={() => router.replace('/(auth)/login')} style={styles.headerBtn}>
            <Ionicons name="close" size={22} color="#0F2E2B" />
          </TouchableOpacity>
        </View>

        <KeyboardAvoidingView 
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.container}
        >
          {/* Glass Card Container */}
          <View style={styles.glassCard}>
            {/* Glowing Shield Emblem */}
            <View style={styles.badgeWrapper}>
              <View style={styles.outerGlowCircle}>
                <View style={styles.innerBadge}>
                  <MaterialCommunityIcons name="shield-lock-outline" size={32} color="#FFFFFF" />
                </View>
              </View>
            </View>

            {/* Title & Subtitle */}
            <View style={styles.textContainer}>
              <Text style={styles.mainTitle}>Verification Code</Text>
              <Text style={styles.subTitle}>Enter the 6-digit OTP code sent to verify your account</Text>
              
              <View style={styles.contactGlassBadge}>
                <Text style={styles.contactText}>{contact}</Text>
              </View>
            </View>

            {/* 6 Digit Glass Input Boxes */}
            <View style={styles.otpRow}>
              {otp.map((digit, index) => (
                <TextInput
                  key={index}
                  ref={(ref) => { inputs.current[index] = ref; }}
                  style={[
                    styles.otpGlassBox,
                    digit ? styles.otpBoxFilled : null,
                    index === otp.findIndex((val) => val === '') ? styles.otpBoxActive : null,
                  ]}
                  keyboardType="number-pad"
                  maxLength={1}
                  value={digit}
                  onChangeText={(text) => handleChange(text, index)}
                  onKeyPress={(e) => handleKeyPress(e, index)}
                />
              ))}
            </View>

            {/* Resend Code Section */}
            <View style={styles.resendContainer}>
              {timer > 0 ? (
                <Text style={styles.timerText}>Didn't receive code? Resend in <Text style={styles.timerBold}>{timer}s</Text></Text>
              ) : (
                <TouchableOpacity style={styles.resendGlassBtn} onPress={() => setTimer(30)}>
                  <Text style={styles.resendGlassText}>Send Code Again</Text>
                </TouchableOpacity>
              )}
            </View>

            {/* Primary Action Button */}
            <TouchableOpacity style={styles.submitBtn} onPress={handleVerify} activeOpacity={0.88}>
              <Text style={styles.submitBtnText}>Submit & Continue →</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </MintGlassBackground>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  headerBtn: {
    padding: 6,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.85)',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#0F2E2B',
    fontFamily: 'serif',
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  glassCard: {
    width: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.85)',
    borderWidth: 1.5,
    borderColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 28,
    padding: 24,
    alignItems: 'center',
    shadowColor: '#0F2E2B',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.08,
    shadowRadius: 16,
    elevation: 4,
  },
  badgeWrapper: {
    alignItems: 'center',
    marginBottom: 16,
  },
  outerGlowCircle: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: 'rgba(13, 148, 136, 0.12)',
    borderWidth: 1,
    borderColor: 'rgba(13, 148, 136, 0.25)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  innerBadge: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: '#0F2E2B',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  mainTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: '#0F2E2B',
    fontFamily: 'serif',
    marginBottom: 6,
  },
  subTitle: {
    fontSize: 13,
    color: '#4A6B66',
    textAlign: 'center',
    lineHeight: 18,
    marginBottom: 10,
  },
  contactGlassBadge: {
    backgroundColor: 'rgba(13, 148, 136, 0.12)',
    borderRadius: 16,
    paddingHorizontal: 14,
    paddingVertical: 5,
  },
  contactText: {
    fontSize: 14,
    fontWeight: '800',
    color: '#0D9488',
  },
  otpRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
    marginBottom: 24,
  },
  otpGlassBox: {
    width: 44,
    height: 52,
    borderWidth: 1.5,
    borderColor: 'rgba(15, 46, 43, 0.14)',
    borderRadius: 14,
    textAlign: 'center',
    fontSize: 22,
    fontWeight: '800',
    color: '#0F2E2B',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
  },
  otpBoxFilled: {
    borderColor: '#0D9488',
    backgroundColor: 'rgba(13, 148, 136, 0.12)',
  },
  otpBoxActive: {
    borderColor: '#0F2E2B',
    borderWidth: 2,
  },
  resendContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  timerText: {
    fontSize: 13,
    color: '#4A6B66',
  },
  timerBold: {
    fontWeight: '800',
    color: '#0D9488',
  },
  resendGlassBtn: {
    backgroundColor: 'rgba(255, 255, 255, 0.85)',
    borderWidth: 1,
    borderColor: 'rgba(15, 46, 43, 0.15)',
    borderRadius: 20,
    paddingHorizontal: 18,
    paddingVertical: 8,
  },
  resendGlassText: {
    fontSize: 13,
    fontWeight: '800',
    color: '#0D9488',
  },
  submitBtn: {
    width: '100%',
    backgroundColor: '#0F2E2B',
    paddingVertical: 16,
    borderRadius: 24,
    alignItems: 'center',
    shadowColor: '#0F2E2B',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 14,
    elevation: 6,
  },
  submitBtnText: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '800',
  },
});
