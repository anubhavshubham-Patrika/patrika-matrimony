import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, Animated } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useApp } from '../../src/context/AppContext';
import { Colors, Typography, Spacing, BorderRadius, Shadow } from '../../src/constants/theme';
import PremiumButton from '../../src/components/ui/PremiumButton';

export default function OtpScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const { dispatch } = useApp();
  const contact = params.contact || '+91 XXXXX XXXXX';

  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [timer, setTimer] = useState(28);
  const inputs = useRef<Array<TextInput | null>>([]);
  const scaleAnims = useRef(otp.map(() => new Animated.Value(1))).current;

  useEffect(() => {
    // Auto focus first input
    setTimeout(() => {
      inputs.current[0]?.focus();
    }, 500);

    const interval = setInterval(() => {
      setTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const animateInput = (index: number) => {
    Animated.sequence([
      Animated.timing(scaleAnims[index], {
        toValue: 1.1,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnims[index], {
        toValue: 1,
        duration: 150,
        useNativeDriver: true,
      })
    ]).start();
  };

  const handleChange = (text: string, index: number) => {
    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);

    if (text) {
      animateInput(index);
      if (index < 5) {
        inputs.current[index + 1]?.focus();
      }
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

    // Go to "Profile Ready" or Home depending on onboarding status
    // For now we assume they go to Home
    router.replace('/(tabs)/home');
  };

  const formattedTimer = `00:${timer.toString().padStart(2, '0')}`;

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={Colors.text} />
        </TouchableOpacity>
      </View>

      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
      >
        <View style={styles.content}>
          <Text style={styles.mainTitle}>Verify your number</Text>
          <Text style={styles.subTitle}>
            We've sent a 6-digit code to {contact}
          </Text>

          {/* OTP Inputs */}
          <View style={styles.otpRow}>
            {otp.map((digit, index) => (
              <Animated.View key={index} style={{ transform: [{ scale: scaleAnims[index] }] }}>
                <TextInput
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
              </Animated.View>
            ))}
          </View>

          {/* Resend Section */}
          <View style={styles.resendContainer}>
            {timer > 0 ? (
              <Text style={styles.resendText}>
                Resend in <Text style={styles.timerBold}>{formattedTimer}</Text>
              </Text>
            ) : (
              <Text style={styles.resendText}>
                Didn't receive it?{' '}
                <Text style={styles.resendLink} onPress={() => setTimer(28)}>
                  Resend OTP
                </Text>
              </Text>
            )}
          </View>
        </View>

        <View style={styles.footer}>
          <PremiumButton 
            title="Verify & Continue" 
            variant="primary"
            onPress={handleVerify}
            icon="arrow-forward"
            iconPosition="right"
          />
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
  header: {
    paddingHorizontal: Spacing['2xl'],
    paddingTop: Spacing.xl,
    paddingBottom: Spacing.md,
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
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: Spacing['2xl'],
    paddingTop: Spacing['3xl'],
  },
  mainTitle: {
    fontFamily: Typography.fontFamily.serif,
    fontSize: Typography.sizes['3xl'],
    color: Colors.text,
    marginBottom: Spacing.sm,
  },
  subTitle: {
    fontFamily: Typography.fontFamily.sans,
    fontSize: Typography.sizes.base,
    color: Colors.textSecondary,
    lineHeight: 24,
    marginBottom: Spacing['3xl'],
  },
  otpRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: Spacing['3xl'],
  },
  otpBox: {
    width: 50,
    height: 60,
    borderRadius: BorderRadius.lg,
    backgroundColor: Colors.surface,
    borderWidth: 1.5,
    borderColor: Colors.border,
    textAlign: 'center',
    fontSize: Typography.sizes['2xl'],
    fontFamily: Typography.fontFamily.sansBold,
    color: Colors.text,
    ...Shadow.sm,
  },
  otpBoxFilled: {
    borderColor: Colors.primaryLight,
    backgroundColor: Colors.surface,
  },
  otpBoxActive: {
    borderColor: Colors.gold,
    backgroundColor: Colors.surface,
  },
  resendContainer: {
    alignItems: 'center',
    marginTop: Spacing.md,
  },
  resendText: {
    fontFamily: Typography.fontFamily.sans,
    fontSize: Typography.sizes.md,
    color: Colors.textSecondary,
  },
  timerBold: {
    fontFamily: Typography.fontFamily.sansBold,
    color: Colors.text,
  },
  resendLink: {
    fontFamily: Typography.fontFamily.sansBold,
    color: Colors.primary,
  },
  footer: {
    padding: Spacing['2xl'],
    paddingBottom: Platform.OS === 'ios' ? Spacing['3xl'] : Spacing['2xl'],
  },
});
