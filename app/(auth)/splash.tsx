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
        {/* Patrika Ribbon Logo */}
        <View style={styles.logoContainer}>
          <PatrikaRibbonLogo size={70} />
        </View>

        {/* Headlines matching second screenshot */}
        <Text style={styles.welcomeTitle}>{t.welcomeTo || 'Welcome to'}</Text>
        <Text style={styles.brandTitle}>Patrika Matrimony</Text>
        <Text style={styles.subtitle}>
          {t.trustedMatchesSub || 'Trusted matches from Rajasthan Patrika'}
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
          <Text style={styles.letsStartText}>Let's Start</Text>
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
    backgroundColor: '#FAF6F0', // Warm Cream background (#FAF6F0) matching second screenshot
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
    fontSize: 34,
    fontWeight: '800',
    color: '#200D08',
    letterSpacing: -0.5,
    marginBottom: 4,
  },
  brandTitle: {
    fontSize: 38,
    fontWeight: '800',
    color: '#6B0000', // Royal Crimson (#6B0000)
    letterSpacing: -0.5,
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 16,
    color: '#665544',
    fontWeight: '500',
    lineHeight: 24,
  },
  bottomArea: {
    paddingHorizontal: 28,
    paddingBottom: 32,
  },
  letsStartBtn: {
    backgroundColor: '#6B0000', // Royal Crimson (#6B0000)
    borderRadius: 28,
    paddingVertical: 18,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#6B0000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 5,
    marginBottom: 20,
  },
  letsStartText: {
    color: '#FFFDF9',
    fontSize: 18,
    fontWeight: '800',
  },
  loginLinkContainer: {
    alignItems: 'center',
    paddingVertical: 6,
  },
  loginLinkText: {
    color: '#665544',
    fontSize: 14,
    fontWeight: '500',
  },
  loginBoldText: {
    color: '#6B0000',
    fontWeight: '800',
  },
});
