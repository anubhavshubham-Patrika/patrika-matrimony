import React, { useState, useRef, useEffect } from 'react';
import { 
  View, Text, StyleSheet, TextInput, TouchableOpacity, SafeAreaView, KeyboardAvoidingView, Platform 
} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useApp } from '../../src/context/AppContext';

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
    <SafeAreaView style={styles.safeArea}>
      {/* Top Header Navigation (Inspiration Screenshots 1 & 3) */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.headerBtn}>
          <Ionicons name="arrow-back" size={24} color="#2C1A1D" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Verification</Text>
        <TouchableOpacity onPress={() => router.replace('/(auth)/login')} style={styles.headerBtn}>
          <Ionicons name="close" size={24} color="#2C1A1D" />
        </TouchableOpacity>
      </View>

      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
      >
        {/* Central Verification Icon Circle Badge (Inspiration Screenshots 1 & 3) */}
        <View style={styles.badgeWrapper}>
          <View style={styles.outerGlowCircle}>
            <View style={styles.innerRedBadge}>
              <MaterialCommunityIcons name="card-account-details-outline" size={36} color="#FFFFFF" />
            </View>
          </View>
        </View>

        {/* Title & Subtitle */}
        <View style={styles.textContainer}>
          <Text style={styles.mainTitle}>Verification Code</Text>
          <Text style={styles.subTitle}>You have to fill the 6-digit OTP for account verification sent to</Text>
          
          <View style={styles.contactBadge}>
            <Text style={styles.contactText}>{contact}</Text>
          </View>
        </View>

        {/* 6 Digit OTP Input Boxes (Inspiration Screenshots 1 & 3) */}
        <View style={styles.otpRow}>
          {otp.map((digit, index) => (
            <TextInput
              key={index}
              ref={(ref) => { inputs.current[index] = ref; }}
              style={[
                styles.otpBox,
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
            <TouchableOpacity style={styles.resendPillBtn} onPress={() => setTimer(30)}>
              <Text style={styles.resendPillText}>Send Code Again</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Primary Action Button */}
        <TouchableOpacity style={styles.submitBtn} onPress={handleVerify} activeOpacity={0.88}>
          <Text style={styles.submitBtnText}>Submit & Continue →</Text>
        </TouchableOpacity>
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
  headerBtn: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#2C1A1D',
    fontFamily: 'serif',
  },
  container: {
    flex: 1,
    paddingHorizontal: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  /* Central Badge Circle */
  badgeWrapper: {
    alignItems: 'center',
    marginBottom: 20,
  },
  outerGlowCircle: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: '#FFF0F1',
    borderWidth: 1,
    borderColor: '#FCD4D7',
    alignItems: 'center',
    justifyContent: 'center',
  },
  innerRedBadge: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#E31E25',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#E31E25',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  textContainer: {
    alignItems: 'center',
    marginBottom: 28,
    paddingHorizontal: 10,
  },
  mainTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: '#2C1A1D',
    fontFamily: 'serif',
    marginBottom: 6,
  },
  subTitle: {
    fontSize: 14,
    color: '#5A4A4D',
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 10,
  },
  contactBadge: {
    backgroundColor: '#FFF0F1',
    borderWidth: 1,
    borderColor: '#FCD4D7',
    borderRadius: 16,
    paddingHorizontal: 14,
    paddingVertical: 5,
  },
  contactText: {
    fontSize: 14,
    fontWeight: '800',
    color: '#E31E25',
  },
  otpRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
    marginBottom: 28,
  },
  otpBox: {
    width: 46,
    height: 54,
    borderWidth: 1.5,
    borderColor: '#EFE6DD',
    borderRadius: 14,
    textAlign: 'center',
    fontSize: 22,
    fontWeight: '800',
    color: '#2C1A1D',
    backgroundColor: '#FFFFFF',
  },
  otpBoxFilled: {
    borderColor: '#E31E25',
    backgroundColor: '#FFF0F1',
  },
  otpBoxActive: {
    borderColor: '#E31E25',
    borderWidth: 2,
  },
  resendContainer: {
    alignItems: 'center',
    marginBottom: 32,
  },
  timerText: {
    fontSize: 13,
    color: '#5A4A4D',
  },
  timerBold: {
    fontWeight: '800',
    color: '#E31E25',
  },
  resendPillBtn: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#EFE6DD',
    borderRadius: 20,
    paddingHorizontal: 18,
    paddingVertical: 8,
  },
  resendPillText: {
    fontSize: 13,
    fontWeight: '800',
    color: '#E31E25',
  },
  submitBtn: {
    width: '100%',
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
  submitBtnText: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '800',
  },
});
