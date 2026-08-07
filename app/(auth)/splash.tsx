import React, { useEffect, useRef } from 'react';
import { 
  View, Text, StyleSheet, TouchableOpacity, Animated, SafeAreaView, ScrollView 
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useApp } from '../../src/context/AppContext';
import { Translations } from '../../src/constants/translations';
import PatrikaRibbonLogo from '../../src/components/PatrikaRibbonLogo';
import AnimatedGlassBackground from '../../src/components/AnimatedGlassBackground';

export default function SplashScreen() {
  const router = useRouter();
  const { state, dispatch } = useApp();
  const lang = state.language || 'en';
  const t = Translations[lang];

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const translateYAnim = useRef(new Animated.Value(20)).current;
  const scaleAnim = useRef(new Animated.Value(0.94)).current;

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
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 8,
        tension: 40,
        useNativeDriver: true,
      }),
    ]).start();
  }, [fadeAnim, translateYAnim, scaleAnim]);

  const toggleLanguage = () => {
    dispatch({ type: 'SET_LANGUAGE', payload: lang === 'en' ? 'hi' : 'en' });
  };

  return (
    <AnimatedGlassBackground>
      <SafeAreaView style={styles.safeArea}>
        {/* Top Header Bar with Glass Language Selector */}
        <View style={styles.topHeaderBar}>
          <View style={{ flex: 1 }} />
          <TouchableOpacity 
            style={styles.langGlassBtn} 
            onPress={toggleLanguage}
            activeOpacity={0.8}
          >
            <Ionicons name="globe-outline" size={16} color="#FF4D6D" style={{ marginRight: 5 }} />
            <Text style={styles.langGlassText}>{lang === 'en' ? 'English' : 'हिंदी'}</Text>
            <Ionicons name="chevron-down" size={14} color="#FF4D6D" style={{ marginLeft: 3 }} />
          </TouchableOpacity>
        </View>

        <ScrollView 
          contentContainerStyle={styles.scrollContent} 
          showsVerticalScrollIndicator={false}
          bounces={false}
        >
          <Animated.View 
            style={[
              styles.glassCardWrapper,
              {
                opacity: fadeAnim,
                transform: [{ translateY: translateYAnim }, { scale: scaleAnim }],
              }
            ]}
          >
            {/* Concentric Glowing Ring Circles with Center Logo */}
            <View style={styles.concentricRingsContainer}>
              <View style={styles.ringOuter3}>
                <View style={styles.ringOuter2}>
                  <View style={styles.ringOuter1}>
                    <View style={styles.centerLogoCircle}>
                      <PatrikaRibbonLogo size={76} rounded />
                    </View>
                  </View>
                </View>
              </View>
            </View>

            {/* Subtitle WELCOME TO */}
            <Text style={styles.welcomeText}>W E L C O M E   T O</Text>

            {/* Headline Title */}
            <Text style={styles.brandTitleLine1}>Patrika</Text>
            <Text style={styles.brandTitleLine2}>Matrimony</Text>

            {/* Tagline */}
            <Text style={styles.taglineText}>
              {t.trustedMatchesSub || 'Trusted matches, rooted in Rajasthan'}
            </Text>

            {/* 100% Verified Profiles Glass Pill */}
            <View style={styles.verifiedGlassPill}>
              <Ionicons name="shield-checkmark-outline" size={16} color="#FF4D6D" style={{ marginRight: 6 }} />
              <Text style={styles.verifiedPillText}>100% Verified Profiles</Text>
            </View>
          </Animated.View>
        </ScrollView>

        {/* Bottom CTA Bar */}
        <Animated.View style={[styles.bottomBar, { opacity: fadeAnim }]}>
          <TouchableOpacity
            style={styles.letsStartBtn}
            onPress={() => router.push('/(auth)/onboarding/step1')}
            activeOpacity={0.88}
          >
            <Text style={styles.letsStartText}>Let's Start →</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.loginContainer}
            onPress={() => router.push('/(auth)/login')}
            activeOpacity={0.7}
          >
            <Text style={styles.loginText}>
              Already have an account? <Text style={styles.loginBoldText}>Login</Text>
            </Text>
          </TouchableOpacity>
        </Animated.View>
      </SafeAreaView>
    </AnimatedGlassBackground>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  topHeaderBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 6,
    zIndex: 10,
  },
  langGlassBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderWidth: 1.5,
    borderColor: 'rgba(255, 255, 255, 0.18)',
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 7,
  },
  langGlassText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  scrollContent: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 20,
  },
  /* Glassmorphic Container Card (Matching Reference Screenshot) */
  glassCardWrapper: {
    alignItems: 'center',
    width: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderWidth: 1.5,
    borderColor: 'rgba(255, 255, 255, 0.16)',
    borderRadius: 28,
    paddingVertical: 32,
    paddingHorizontal: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.35,
    shadowRadius: 20,
    elevation: 8,
  },
  concentricRingsContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
  },
  ringOuter3: {
    width: 240,
    height: 240,
    borderRadius: 120,
    borderWidth: 1,
    borderColor: 'rgba(255, 77, 109, 0.25)',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 77, 109, 0.06)',
  },
  ringOuter2: {
    width: 190,
    height: 190,
    borderRadius: 95,
    borderWidth: 1,
    borderColor: 'rgba(227, 30, 37, 0.35)',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(227, 30, 37, 0.08)',
  },
  ringOuter1: {
    width: 140,
    height: 140,
    borderRadius: 70,
    borderWidth: 1,
    borderColor: 'rgba(255, 77, 109, 0.45)',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 77, 109, 0.1)',
  },
  centerLogoCircle: {
    width: 106,
    height: 106,
    borderRadius: 53,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#FF4D6D',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 16,
    elevation: 8,
  },

  welcomeText: {
    fontSize: 12,
    fontWeight: '800',
    color: '#FF85A1',
    letterSpacing: 4,
    marginTop: 22,
    marginBottom: 8,
    textAlign: 'center',
  },
  brandTitleLine1: {
    fontSize: 42,
    fontWeight: '800',
    color: '#FFFFFF',
    fontFamily: 'serif',
    textAlign: 'center',
    lineHeight: 46,
  },
  brandTitleLine2: {
    fontSize: 42,
    fontWeight: '800',
    color: '#E31E25',
    fontFamily: 'serif',
    textAlign: 'center',
    lineHeight: 46,
    marginBottom: 14,
  },
  taglineText: {
    fontSize: 15,
    fontWeight: '500',
    color: '#BDA6B2',
    textAlign: 'center',
    marginBottom: 20,
  },
  verifiedGlassPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 77, 109, 0.15)',
    borderWidth: 1,
    borderColor: 'rgba(255, 77, 109, 0.35)',
    borderRadius: 24,
    paddingHorizontal: 18,
    paddingVertical: 9,
  },
  verifiedPillText: {
    fontSize: 13,
    fontWeight: '800',
    color: '#FFFFFF',
  },

  bottomBar: {
    width: '100%',
    paddingHorizontal: 24,
    paddingBottom: 28,
    paddingTop: 10,
  },
  letsStartBtn: {
    backgroundColor: '#E31E25',
    borderRadius: 28,
    paddingVertical: 18,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#E31E25',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.45,
    shadowRadius: 14,
    elevation: 8,
    borderWidth: 1.5,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    marginBottom: 16,
  },
  letsStartText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '800',
  },
  loginContainer: {
    alignItems: 'center',
    paddingVertical: 4,
  },
  loginText: {
    fontSize: 14,
    color: '#BDA6B2',
    fontWeight: '500',
  },
  loginBoldText: {
    color: '#FF4D6D',
    fontWeight: '800',
  },
});
