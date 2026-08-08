import React from 'react';
import PremiumButton from '../../../src/components/ui/PremiumButton';
import PremiumCard from '../../../src/components/ui/PremiumCard';
import { Typography } from '../../../src/constants/theme';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useApp } from '../../../src/context/AppContext';
import MintGlassBackground from '../../../src/components/MintGlassBackground';

export default function WelcomeScreen() {
  const router = useRouter();
  const { dispatch } = useApp();

  const handleStartExploring = () => {
    dispatch({
      type: 'LOGIN',
      payload: {
        userId: 'U001',
        name: 'Arjun Singh',
        mobile: '+91-9876543210',
        email: 'arjun@example.com',
        profileId: 'P001',
      },
    });

    router.replace('/(tabs)/home');
  };

  return (
    <MintGlassBackground>
      <SafeAreaView style={styles.safeArea}>
        <ScrollView contentContainerStyle={styles.contentScroll} showsVerticalScrollIndicator={false}>
          <PremiumCard variant="glass" style={styles.glassCardContainer}>
            {/* Success Shield Badge */}
            <View style={styles.badgeWrapper}>
              <View style={styles.glowingVectorCircle}>
                <Ionicons name="checkmark-done" size={36} color="#FFFFFF" />
              </View>
            </View>

            {/* Title & Subtitle */}
            <Text style={styles.welcomeTitle}>Welcome to Patrika Matrimony!</Text>
            <Text style={styles.welcomeSubtitle}>
              Your profile has been created successfully. We are matching you with genuine, verified profiles across Rajasthan.
            </Text>

            {/* Feature Cards List */}
            <View style={styles.featuresList}>
              <View style={styles.featureRow}>
                <View style={styles.featureIconCircle}>
                  <Ionicons name="shield-checkmark" size={18} color="#4169D8" />
                </View>
                <View style={styles.featureTextCol}>
                  <Text style={styles.featureTitle}>100% Govt ID & Selfie Verified</Text>
                  <Text style={styles.featureSub}>Safe & trustworthy matrimonial environment</Text>
                </View>
              </View>

              <View style={styles.featureRow}>
                <View style={styles.featureIconCircle}>
                  <MaterialCommunityIcons name="newspaper-variant-outline" size={18} color="#4169D8" />
                </View>
                <View style={styles.featureTextCol}>
                  <Text style={styles.featureTitle}>Rajasthan Patrika Print Ad Integration</Text>
                  <Text style={styles.featureSub}>Link your offline newspaper classified ad</Text>
                </View>
              </View>

              <View style={styles.featureRow}>
                <View style={styles.featureIconCircle}>
                  <MaterialCommunityIcons name="star-face" size={18} color="#4169D8" />
                </View>
                <View style={styles.featureTextCol}>
                  <Text style={styles.featureTitle}>Horoscope & Guna Compatibility</Text>
                  <Text style={styles.featureSub}>Instant nakshatra match matching</Text>
                </View>
              </View>
            </View>

            {/* Primary Action CTA */}
            <PremiumButton title="Start Exploring Matches →" onPress={handleStartExploring} variant="primary" />
          </PremiumCard>
        </ScrollView>
      </SafeAreaView>
    </MintGlassBackground>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  contentScroll: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingVertical: 30,
    justifyContent: 'center',
  },
  glassCardContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.85)',
    borderWidth: 1.5,
    borderColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 28,
    padding: 24,
    alignItems: 'center',
    shadowColor: '#183B82',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.08,
    shadowRadius: 16,
    elevation: 4,
  },
  badgeWrapper: {
    alignItems: 'center',
    marginBottom: 16,
  },
  glowingVectorCircle: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: '#183B82',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#183B82',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 12,
    elevation: 6,
  },
  welcomeTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: '#183B82',
    fontFamily: Typography.fontFamily.serif,
    textAlign: 'center',
    marginBottom: 8,
  },
  welcomeSubtitle: {
    fontSize: 13,
    color: '#4A6B66',
    textAlign: 'center',
    lineHeight: 19,
    marginBottom: 24,
  },

  featuresList: {
    width: '100%',
    gap: 12,
    marginBottom: 26,
  },
  featureRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 18,
    padding: 12,
    borderWidth: 1.5,
    borderColor: 'rgba(24, 59, 130, 0.12)',
  },
  featureIconCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(65, 105, 216, 0.12)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  featureTextCol: {
    flex: 1,
  },
  featureTitle: {
    fontSize: 13,
    fontWeight: '800',
    color: '#183B82',
  },
  featureSub: {
    fontSize: 11,
    color: '#4A6B66',
    marginTop: 2,
  },

  primaryBtn: {
    width: '100%',
    backgroundColor: '#183B82',
    paddingVertical: 16,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#183B82',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 14,
    elevation: 6,
  },
  primaryBtnText: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '800',
  },
});
