import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, SafeAreaView, KeyboardAvoidingView, Platform } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useApp } from '../../src/context/AppContext';

export default function OTPScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const { dispatch } = useApp();
  
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [timer, setTimer] = useState(30);
  const inputRefs = useRef<Array<TextInput | null>>([]);
  
  const contactInfo = params.contact || '+91-9876543210';

  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | undefined;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => { if (interval) clearInterval(interval); };
  }, [timer]);

  const handleOtpChange = (text: string, index: number) => {
    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);

    // Auto advance
    if (text !== '' && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (e: any, index: number) => {
    if (e.nativeEvent.key === 'Backspace' && otp[index] === '' && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerify = () => {
    dispatch({
      type: 'LOGIN',
      payload: {
        userId: 'U001',
        name: 'Arjun Singh',
        mobile: '+91-9876543210',
        email: 'arjun@example.com',
        profileId: 'P001'
      }
    });
    router.replace('/(tabs)/home');
  };

  const handleResend = () => {
    setTimer(30);
    // Add logic to resend OTP here
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#1A1A2E" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Verification</Text>
        <View style={{ width: 40 }} />
      </View>

      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container}>
        <View style={styles.content}>
          <Text style={styles.title}>Enter OTP</Text>
          <Text style={styles.subtitle}>OTP sent to {contactInfo}</Text>

          <View style={styles.otpContainer}>
            {otp.map((digit, index) => (
              <TextInput
                key={index}
                ref={(ref) => { inputRefs.current[index] = ref; }}
                style={styles.otpInput}
                keyboardType="number-pad"
                maxLength={1}
                value={digit}
                onChangeText={(text) => handleOtpChange(text, index)}
                onKeyPress={(e) => handleKeyPress(e, index)}
                selectTextOnFocus
              />
            ))}
          </View>

          <View style={styles.resendContainer}>
            {timer > 0 ? (
              <Text style={styles.timerText}>Resend OTP in {timer}s</Text>
            ) : (
              <TouchableOpacity onPress={handleResend}>
                <Text style={styles.resendButtonText}>Resend OTP</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>

        <TouchableOpacity 
          style={[styles.primaryButton, otp.join('').length < 6 && styles.disabledButton]} 
          onPress={handleVerify}
          disabled={otp.join('').length < 6}
        >
          <Text style={styles.primaryButtonText}>Verify</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1A1A2E',
  },
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'space-between',
  },
  content: {
    marginTop: 40,
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1A1A2E',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#666666',
    marginBottom: 40,
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 30,
  },
  otpInput: {
    width: 50,
    height: 60,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1A1A2E',
    textAlign: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  resendContainer: {
    alignItems: 'center',
  },
  timerText: {
    fontSize: 16,
    color: '#666666',
  },
  resendButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#C0392B',
  },
  primaryButton: {
    backgroundColor: '#C0392B',
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  disabledButton: {
    backgroundColor: '#E0E0E0',
    shadowOpacity: 0,
    elevation: 0,
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
