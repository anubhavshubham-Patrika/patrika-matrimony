import React, { useState, useRef, useEffect } from 'react';
import { 
  View, Text, StyleSheet, TextInput, TouchableOpacity, SafeAreaView, KeyboardAvoidingView, Platform 
} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useApp } from '../../src/context/AppContext';
import AnimatedGlassBackground from '../../src/components/AnimatedGlassBackground';

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
    <AnimatedGlassBackground>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.headerBtn}>
            <Ionicons name="arrow-back" size={22} color="#FFFFFF" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Verification</Text>
          <TouchableOpacity onPress={() => router.replace('/(auth)/login')} style={styles.headerBtn}>
            <Ionicons name="close" size={22} color="#FFFFFF" />
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
                <View style={styles.innerRedBadge}>
                  <MaterialCommunityIcons name="shield-lock-outline" size={36} color="#FFFFFF" />
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
    </AnimatedGlassBackground>
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
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#FFFFFF',
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
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderWidth: 1.5,
    borderColor: 'rgba(255, 255, 255, 0.16)',
    borderRadius: 28,
    padding: 24,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.35,
    shadowRadius: 20,
    elevation: 6,
  },
  badgeWrapper: {
    alignItems: 'center',
    marginBottom: 16,
  },
  outerGlowCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255, 77, 109, 0.15)',
    borderWidth: 1,
    borderColor: 'rgba(255, 77, 109, 0.3)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  innerRedBadge: {
    width: 58,
    height: 58,
    borderRadius: 29,
    backgroundColor: '#E31E25',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#E31E25',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.6,
    shadowRadius: 12,
    elevation: 6,
  },
  textContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  mainTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: '#FFFFFF',
    fontFamily: 'serif',
    marginBottom: 6,
  },
  subTitle: {
    fontSize: 13,
    color: '#BDA6B2',
    textAlign: 'center',
    lineHeight: 18,
    marginBottom: 10,
  },
  contactGlassBadge: {
    backgroundColor: 'rgba(255, 77, 109, 0.15)',
    borderWidth: 1,
    borderColor: 'rgba(255, 77, 109, 0.35)',
    borderRadius: 16,
    paddingHorizontal: 14,
    paddingVertical: 5,
  },
  contactText: {
    fontSize: 14,
    fontWeight: '800',
    color: '#FF4D6D',
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
    borderColor: 'rgba(255, 255, 255, 0.16)',
    borderRadius: 14,
    textAlign: 'center',
    fontSize: 22,
    fontWeight: '800',
    color: '#FFFFFF',
    backgroundColor: 'rgba(255, 255, 255, 0.06)',
  },
  otpBoxFilled: {
    borderColor: '#E31E25',
    backgroundColor: 'rgba(227, 30, 37, 0.2)',
  },
  otpBoxActive: {
    borderColor: '#FF4D6D',
    borderWidth: 2,
  },
  resendContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  timerText: {
    fontSize: 13,
    color: '#BDA6B2',
  },
  timerBold: {
    fontWeight: '800',
    color: '#FF4D6D',
  },
  resendGlassBtn: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 20,
    paddingHorizontal: 18,
    paddingVertical: 8,
  },
  resendGlassText: {
    fontSize: 13,
    fontWeight: '800',
    color: '#FF4D6D',
  },
  submitBtn: {
    width: '100%',
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
  },
  submitBtnText: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '800',
  },
});
