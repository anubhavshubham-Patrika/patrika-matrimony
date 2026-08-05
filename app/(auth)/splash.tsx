import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated, SafeAreaView } from 'react-native';
import { useRouter } from 'expo-router';
import { useApp } from '../../src/context/AppContext';
import { Translations } from '../../src/constants/translations';
import PatrikaRibbonLogo from '../../src/components/PatrikaRibbonLogo';
import LanguageToggle from '../../src/components/LanguageToggle';

export default function SplashScreen() {
  const router = useRouter();
  const { state } = useApp();
  const lang = state.language || 'en';
  const t = Translations[lang];

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.9)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 7,
        useNativeDriver: true,
      }),
    ]).start();
  }, [fadeAnim, scaleAnim]);

  return (
    <SafeAreaView style={styles.container}>
      {/* Top Bar with Language Selector */}
      <View style={styles.topHeader}>
        <View style={{ flex: 1 }} />
        <LanguageToggle />
      </View>

      {/* Main Content Area */}
      <View style={styles.centerContent}>
        <Animated.View style={[styles.logoWrapper, { opacity: fadeAnim, transform: [{ scale: scaleAnim }] }]}>
          <PatrikaRibbonLogo size={110} style={{ marginBottom: 40 }} />

          <Text style={styles.welcomeText}>{t.welcomeTo}</Text>
          <Text style={styles.brandTitle}>{t.brandName}</Text>

          <Text style={styles.taglineText}>{t.tagline}</Text>
        </Animated.View>
      </View>

      {/* Bottom Action Area */}
      <View style={styles.bottomSection}>
        <TouchableOpacity
          style={styles.primaryPillButton}
          onPress={() => router.push('/(auth)/onboarding/step1')}
          activeOpacity={0.88}
        >
          <Text style={styles.primaryPillText}>{t.letsStart}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.secondaryLink}
          onPress={() => router.push('/(auth)/login')}
          activeOpacity={0.7}
        >
          <Text style={styles.secondaryLinkText}>
            {t.alreadyHaveAccount}{' '}
            <Text style={styles.secondaryBold}>{t.login}</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  topHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 12,
  },
  centerContent: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 28,
  },
  logoWrapper: {
    alignItems: 'flex-start',
  },
  welcomeText: {
    fontSize: 34,
    fontWeight: '800',
    color: '#111111',
    letterSpacing: -0.5,
  },
  brandTitle: {
    fontSize: 36,
    fontWeight: '900',
    color: '#E31837', // Vibrant Patrika Ribbon Red
    marginTop: 2,
    letterSpacing: -0.5,
  },
  taglineText: {
    fontSize: 15,
    fontWeight: '500',
    color: '#666666',
    marginTop: 18,
    lineHeight: 22,
  },
  bottomSection: {
    paddingHorizontal: 24,
    paddingBottom: 36,
  },
  primaryPillButton: {
    backgroundColor: '#E31837', // Vibrant Patrika Pill Red
    paddingVertical: 16,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#E31837',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 4,
  },
  primaryPillText: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '700',
  },
  secondaryLink: {
    alignItems: 'center',
    marginTop: 18,
    paddingVertical: 8,
  },
  secondaryLinkText: {
    fontSize: 14,
    color: '#666666',
  },
  secondaryBold: {
    color: '#E31837',
    fontWeight: '700',
  },
});
