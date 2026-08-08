import React, { useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, Animated } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Typography, Spacing } from '../../src/constants/theme';
import PremiumButton from '../../src/components/ui/PremiumButton';

export default function PaymentSuccessScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const planName = params.planName || 'Premium';
  
  const scaleValue = new Animated.Value(0);
  const opacityValue = new Animated.Value(0);

  useEffect(() => {
    Animated.sequence([
      Animated.timing(scaleValue, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.timing(opacityValue, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      })
    ]).start();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Animated.View style={[styles.iconContainer, { transform: [{ scale: scaleValue }] }]}>
          <Ionicons name="checkmark-circle" size={100} color={Colors.gold} />
        </Animated.View>

        <Animated.View style={[styles.textContainer, { opacity: opacityValue }]}>
          <Text style={styles.title}>Welcome to Premium</Text>
          <Text style={styles.subtitle}>You're officially a Premium Member.</Text>
          <Text style={styles.planText}>{planName} Plan Activated</Text>
        </Animated.View>
      </View>

      <View style={styles.footer}>
        <PremiumButton
          title="Explore Premium Matches"
          onPress={() => router.push('/(tabs)/home')}
          variant="premium"
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primaryDark,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: Spacing.xl,
  },
  iconContainer: {
    marginBottom: Spacing.xl,
    shadowColor: Colors.gold,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 20,
    elevation: 10,
  },
  textContainer: {
    alignItems: 'center',
  },
  title: {
    fontFamily: Typography.fontFamily.serif,
    fontSize: Typography.sizes['3xl'],
    color: Colors.gold,
    textAlign: 'center',
    marginBottom: Spacing.sm,
  },
  subtitle: {
    fontFamily: Typography.fontFamily.sans,
    fontSize: Typography.sizes.lg,
    color: Colors.surface,
    textAlign: 'center',
    marginBottom: Spacing.xl,
  },
  planText: {
    fontFamily: Typography.fontFamily.sansMedium,
    fontSize: Typography.sizes.base,
    color: Colors.secondaryLight,
    textAlign: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.sm,
    borderRadius: 20,
  },
  footer: {
    padding: Spacing.xl,
    paddingBottom: Spacing['2xl'],
  }
});
