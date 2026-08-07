import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useApp } from '../../../src/context/AppContext';
import { Translations } from '../../../src/constants/translations';
import AnimatedGlassBackground from '../../../src/components/AnimatedGlassBackground';

export default function WelcomeScreen() {
  const router = useRouter();
  const { state, dispatch } = useApp();
  const lang = state.language || 'en';
  const t = Translations[lang];

  const handleStartExploring = () => {
    dispatch({
      type: 'LOGIN',
      payload: {
        userId: 'U001',
        name: state.onboardingData?.name || 'Arjun Singh',
        mobile: '+91-9876543210',
        email: 'arjun@example.com',
        profileId: 'P001',
      },
    });

    router.replace('/(tabs)/home');
  };

  return (
    <AnimatedGlassBackground>
      <SafeAreaView style={styles.safeArea}>
        <ScrollView contentContainerStyle={styles.contentScroll} showsVerticalScrollIndicator={false}>
          <View style={styles.glassCardContainer}>
            {/* Celebration Badge */}
            <View style={styles.badgeWrapper}>
              <View style={styles.outerGlowCircle}>
                <Ionicons name="checkmark-done" size={44} color="#FFFFFF" />
              </View>
            </View>

            <Text style={styles.welcomeTitle}>Welcome to Patrika Matrimony!</Text>
            <Text style={styles.welcomeSubtitle}>Your profile is ready to explore verified matches</Text>

            {/* Tips Glass Cards */}
            <View style={styles.tipsList}>
              <View style={styles.tipGlassItem}>
                <Ionicons name="shield-checkmark" size={22} color="#FF4D6D" style={{ marginRight: 12 }} />
                <View style={{ flex: 1 }}>
                  <Text style={styles.tipTitle}>100% Verified Profile</Text>
                  <Text style={styles.tipSub}>Your profile is verified and active for matching</Text>
                </View>
              </View>

              <View style={styles.tipGlassItem}>
                <MaterialCommunityIcons name="newspaper-variant-outline" size={22} color="#FF4D6D" style={{ marginRight: 12 }} />
                <View style={{ flex: 1 }}>
                  <Text style={styles.tipTitle}>Rajasthan Patrika Ad Sync</Text>
                  <Text style={styles.tipSub}>Connect your print classified ad to get 5x responses</Text>
                </View>
              </View>

              <View style={styles.tipGlassItem}>
                <MaterialCommunityIcons name="auto-fix" size={22} color="#FF4D6D" style={{ marginRight: 12 }} />
                <View style={{ flex: 1 }}>
                  <Text style={styles.tipTitle}>AI-Powered Recommendations</Text>
                  <Text style={styles.tipSub}>Daily curated matches based on your community preferences</Text>
                </View>
              </View>
            </View>

            <TouchableOpacity style={styles.exploreBtn} onPress={handleStartExploring} activeOpacity={0.88}>
              <Text style={styles.exploreBtnText}>Start Exploring Matches →</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    </AnimatedGlassBackground>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  contentScroll: {
    paddingHorizontal: 20,
    paddingVertical: 30,
    flexGrow: 1,
    justifyContent: 'center',
  },
  glassCardContainer: {
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
    marginBottom: 20,
  },
  outerGlowCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#E31E25',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#E31E25',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.6,
    shadowRadius: 16,
    elevation: 8,
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  welcomeTitle: {
    fontSize: 26,
    fontWeight: '800',
    color: '#FFFFFF',
    fontFamily: 'serif',
    textAlign: 'center',
    marginBottom: 6,
  },
  welcomeSubtitle: {
    fontSize: 14,
    color: '#BDA6B2',
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 24,
  },
  tipsList: {
    width: '100%',
    gap: 12,
    marginBottom: 28,
  },
  tipGlassItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.06)',
    borderWidth: 1.5,
    borderColor: 'rgba(255, 255, 255, 0.12)',
    borderRadius: 18,
    padding: 14,
  },
  tipTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  tipSub: {
    fontSize: 12,
    color: '#BDA6B2',
    marginTop: 2,
  },
  exploreBtn: {
    width: '100%',
    backgroundColor: '#E31E25',
    paddingVertical: 18,
    borderRadius: 26,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#E31E25',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.5,
    shadowRadius: 14,
    elevation: 6,
    borderWidth: 1.5,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  exploreBtnText: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '800',
  },
});
