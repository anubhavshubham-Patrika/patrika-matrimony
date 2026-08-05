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
  const translateYAnim = useRef(new Animated.Value(20)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(translateYAnim, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      }),
    ]).start();
  }, [fadeAnim, translateYAnim]);

  return (
    <SafeAreaView style={styles.container}>
      {/* Top Header with Language Toggle */}
      <View style={styles.topHeader}>
        <View style={{ flex: 1 }} />
        <LanguageToggle />
      </View>

      {/* Main Content Area */}
      <Animated.View 
        style={[
          styles.mainContent, 
          { 
            opacity: fadeAnim, 
            transform: [{ translateY: translateYAnim }] 
          }
        ]}
      >
        {/* Patrika Official Logo */}
        <View style={styles.logoContainer}>
          <PatrikaRibbonLogo size={140} />
        </View>

        {/* Headlines */}
        <Text style={styles.welcomeTitle}>{t.welcomeTo || 'Welcome to'}</Text>
        <Text style={styles.brandTitle}>Patrika Matrimony</Text>
        <Text style={styles.subtitle}>
          {t.trustedMatchesSub || 'Trusted matches from Rajasthan Patrika • Preserving Heritage & Uniting Souls'}
        </Text>
      </Animated.View>

      {/* Bottom CTA Area */}
      <View style={styles.bottomArea}>
        {/* Let's Start Primary CTA Button */}
        <TouchableOpacity
          style={styles.letsStartBtn}
          onPress={() => router.push('/(auth)/onboarding/step1')}
          activeOpacity={0.88}
        >
          <Text style={styles.letsStartText}>Let's Start →</Text>
        </TouchableOpacity>

        {/* Already have an account? Login */}
        <TouchableOpacity
          style={styles.loginLinkContainer}
          onPress={() => router.push('/(auth)/login')}
          activeOpacity={0.7}
        >
          <Text style={styles.loginLinkText}>
            {t.alreadyHaveAccount || 'Already have an account?'}{' '}
            <Text style={styles.loginBoldText}>{t.login || 'Login'}</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9F6F0',
    justifyContent: 'space-between',
  },
  topHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 16,
  },
  mainContent: {
    paddingHorizontal: 28,
    marginTop: -40,
  },
  logoContainer: {
    marginBottom: 24,
    alignItems: 'flex-start',
  },
  welcomeTitle: {
    fontSize: 32,
    fontWeight: '800',
    color: '#2C1A1D',
    fontFamily: 'serif',
    letterSpacing: -0.5,
    marginBottom: 4,
  },
  brandTitle: {
    fontSize: 38,
    fontWeight: '800',
    color: '#E91E63',
    fontFamily: 'serif',
    letterSpacing: -0.5,
    marginBottom: 14,
  },
  subtitle: {
    fontSize: 15,
    color: '#5A4A4D',
    fontWeight: '500',
    lineHeight: 22,
  },
  bottomArea: {
    paddingHorizontal: 28,
    paddingBottom: 36,
  },
  letsStartBtn: {
    backgroundColor: '#E91E63',
    borderRadius: 28,
    paddingVertical: 18,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#E91E63',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 5,
    marginBottom: 20,
  },
  letsStartText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '800',
  },
  loginLinkContainer: {
    alignItems: 'center',
    paddingVertical: 6,
  },
  loginLinkText: {
    color: '#5A4A4D',
    fontSize: 14,
    fontWeight: '500',
  },
  loginBoldText: {
    color: '#E91E63',
    fontWeight: '800',
  },
});
