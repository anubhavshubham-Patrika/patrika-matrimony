import React, { useEffect, useRef } from 'react';
import { 
  View, Text, StyleSheet, TouchableOpacity, Animated, SafeAreaView, ScrollView 
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useApp } from '../../src/context/AppContext';
import { Translations } from '../../src/constants/translations';
import PatrikaRibbonLogo from '../../src/components/PatrikaRibbonLogo';

export default function SplashScreen() {
  const router = useRouter();
  const { state } = useApp();
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

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView 
        contentContainerStyle={styles.scrollContent} 
        showsVerticalScrollIndicator={false}
        bounces={false}
      >
        <Animated.View 
          style={[
            styles.mainWrapper,
            {
              opacity: fadeAnim,
              transform: [{ translateY: translateYAnim }, { scale: scaleAnim }],
            }
          ]}
        >
          {/* Concentric Ring Circles with Center Logo */}
          <View style={styles.concentricRingsContainer}>
            {/* Outer Ring 3 */}
            <View style={styles.ringOuter3}>
              {/* Ring 2 */}
              <View style={styles.ringOuter2}>
                {/* Ring 1 */}
                <View style={styles.ringOuter1}>
                  {/* Center White Circle Logo Badge */}
                  <View style={styles.centerLogoCircle}>
                    <PatrikaRibbonLogo size={74} rounded />
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

          {/* 100% Verified Profiles Pill */}
          <View style={styles.verifiedPill}>
            <Ionicons name="shield-checkmark-outline" size={16} color="#E31E25" style={{ marginRight: 6 }} />
            <Text style={styles.verifiedPillText}>100% Verified Profiles</Text>
          </View>
        </Animated.View>
      </ScrollView>

      {/* Bottom CTA Bar */}
      <Animated.View style={[styles.bottomBar, { opacity: fadeAnim }]}>
        {/* Primary CTA Button */}
        <TouchableOpacity
          style={styles.letsStartBtn}
          onPress={() => router.push('/(auth)/onboarding/step1')}
          activeOpacity={0.88}
        >
          <Text style={styles.letsStartText}>Let's Start →</Text>
        </TouchableOpacity>

        {/* Already have an account? Login */}
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
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF9F6',
  },
  scrollContent: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
    paddingTop: 30,
    paddingBottom: 20,
  },
  mainWrapper: {
    alignItems: 'center',
    width: '100%',
  },
  /* Concentric Rings Visual */
  concentricRingsContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
  },
  ringOuter3: {
    width: 270,
    height: 270,
    borderRadius: 135,
    borderWidth: 1,
    borderColor: '#FCD4D7',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(253, 212, 215, 0.25)',
  },
  ringOuter2: {
    width: 216,
    height: 216,
    borderRadius: 108,
    borderWidth: 1,
    borderColor: '#FBAAB0',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(251, 170, 176, 0.25)',
  },
  ringOuter1: {
    width: 162,
    height: 162,
    borderRadius: 81,
    borderWidth: 1,
    borderColor: '#F87F87',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(248, 127, 135, 0.25)',
  },
  centerLogoCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#E31E25',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 6,
  },

  welcomeText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#6A4D54',
    letterSpacing: 4,
    marginTop: 24,
    marginBottom: 8,
    textAlign: 'center',
  },
  brandTitleLine1: {
    fontSize: 44,
    fontWeight: '800',
    color: '#E31E25',
    fontFamily: 'serif',
    textAlign: 'center',
    lineHeight: 50,
  },
  brandTitleLine2: {
    fontSize: 44,
    fontWeight: '800',
    color: '#E31E25',
    fontFamily: 'serif',
    textAlign: 'center',
    lineHeight: 50,
    marginBottom: 16,
  },
  taglineText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#6A565C',
    textAlign: 'center',
    marginBottom: 20,
  },
  verifiedPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF0F1',
    borderWidth: 1,
    borderColor: '#FCD4D7',
    borderRadius: 24,
    paddingHorizontal: 18,
    paddingVertical: 9,
  },
  verifiedPillText: {
    fontSize: 14,
    fontWeight: '800',
    color: '#E31E25',
  },

  /* Bottom Action Bar */
  bottomBar: {
    width: '100%',
    paddingHorizontal: 28,
    paddingBottom: 32,
    paddingTop: 10,
    backgroundColor: 'transparent',
  },
  letsStartBtn: {
    backgroundColor: '#E31E25',
    borderRadius: 30,
    paddingVertical: 18,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#E31E25',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.35,
    shadowRadius: 12,
    elevation: 6,
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
    color: '#5C4A50',
    fontWeight: '500',
  },
  loginBoldText: {
    color: '#E31E25',
    fontWeight: '800',
  },
});
