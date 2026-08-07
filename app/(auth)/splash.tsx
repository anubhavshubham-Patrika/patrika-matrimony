import React, { useEffect, useRef } from 'react';
import { 
  View, Text, StyleSheet, TouchableOpacity, Animated, SafeAreaView, ScrollView, Image 
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useApp } from '../../src/context/AppContext';
import { Translations } from '../../src/constants/translations';
import PatrikaRibbonLogo from '../../src/components/PatrikaRibbonLogo';
import MintGlassBackground from '../../src/components/MintGlassBackground';

export default function SplashScreen() {
  const router = useRouter();
  const { state, dispatch } = useApp();
  const lang = state.language || 'en';
  const t = Translations[lang];

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const translateYAnim = useRef(new Animated.Value(20)).current;
  const scaleAnim = useRef(new Animated.Value(0.95)).current;

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
    <MintGlassBackground>
      <SafeAreaView style={styles.safeArea}>
        {/* Top Header Bar with Glass Language Selector */}
        <View style={styles.topHeaderBar}>
          <View style={{ flex: 1 }} />
          <TouchableOpacity 
            style={styles.langGlassBtn} 
            onPress={toggleLanguage}
            activeOpacity={0.8}
          >
            <Ionicons name="globe-outline" size={16} color="#0D9488" style={{ marginRight: 5 }} />
            <Text style={styles.langGlassText}>{lang === 'en' ? 'English' : 'हिंदी'}</Text>
            <Ionicons name="chevron-down" size={14} color="#0D9488" style={{ marginLeft: 3 }} />
          </TouchableOpacity>
        </View>

        <ScrollView 
          contentContainerStyle={styles.scrollContent} 
          showsVerticalScrollIndicator={false}
          bounces={false}
        >
          <Animated.View 
            style={[
              styles.mainContainer,
              {
                opacity: fadeAnim,
                transform: [{ translateY: translateYAnim }, { scale: scaleAnim }],
              }
            ]}
          >
            {/* 1. TOP ARCHITECTURAL ARCH DOME & LOGO EMBLEM */}
            <View style={styles.archOuterWrapper}>
              <View style={styles.archDomeFrame}>
                <View style={styles.archInnerCircle}>
                  <PatrikaRibbonLogo size={68} rounded />
                </View>
              </View>
            </View>

            {/* 2. HERO TYPOGRAPHY & TITLE */}
            <Text style={styles.welcomeText}>W E L C O M E   T O</Text>
            <Text style={styles.brandTitleLine1}>Patrika</Text>
            <Text style={styles.brandTitleLine2}>Matrimony</Text>
            <Text style={styles.taglineText}>
              {t.trustedMatchesSub || 'Trusted matches from Rajasthan Patrika'}
            </Text>

            {/* 100% Verified Profiles Glass Pill */}
            <View style={styles.verifiedGlassPill}>
              <Ionicons name="shield-checkmark" size={15} color="#0D9488" style={{ marginRight: 6 }} />
              <Text style={styles.verifiedPillText}>100% Verified Profiles</Text>
            </View>

            {/* 3. 4-COLUMN FEATURE CARDS CONTAINER */}
            <View style={styles.featureGridGlassCard}>
              {/* Feature 1: Verified Profiles */}
              <View style={styles.featureCol}>
                <View style={styles.featureIconBadge}>
                  <Ionicons name="shield-checkmark" size={18} color="#FFFFFF" />
                </View>
                <Text style={styles.featureColTitle}>Verified Profiles</Text>
                <Text style={styles.featureColSub}>100% trusted & authentic</Text>
              </View>

              {/* Feature 2: Smart Matches */}
              <View style={styles.featureCol}>
                <View style={styles.featureIconBadge}>
                  <Ionicons name="search" size={18} color="#FFFFFF" />
                </View>
                <Text style={styles.featureColTitle}>Smart Matches</Text>
                <Text style={styles.featureColSub}>AI-powered compatibility</Text>
              </View>

              {/* Feature 3: Privacy First */}
              <View style={styles.featureCol}>
                <View style={styles.featureIconBadge}>
                  <Ionicons name="lock-closed" size={18} color="#FFFFFF" />
                </View>
                <Text style={styles.featureColTitle}>Privacy First</Text>
                <Text style={styles.featureColSub}>Your data is safe & secure</Text>
              </View>

              {/* Feature 4: Serious Connections */}
              <View style={styles.featureCol}>
                <View style={styles.featureIconBadge}>
                  <Ionicons name="heart" size={18} color="#FFFFFF" />
                </View>
                <Text style={styles.featureColTitle}>Serious Connections</Text>
                <Text style={styles.featureColSub}>For meaningful relationships</Text>
              </View>
            </View>

            {/* 4. ARCHITECTURAL PALACE SILHOUETTE & WEDDING BANNER */}
            <View style={styles.palaceBannerContainer}>
              <Image 
                source={{ uri: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=800&q=80' }}
                style={styles.palaceBannerImage}
                resizeMode="cover"
              />
              <View style={styles.palaceBannerOverlay}>
                <View style={styles.palaceOverlayPill}>
                  <MaterialCommunityIcons name="flower-tulip-outline" size={14} color="#0D9488" style={{ marginRight: 4 }} />
                  <Text style={styles.palaceOverlayText}>Rajasthan Patrika Royal Heritage</Text>
                </View>
              </View>
            </View>

          </Animated.View>
        </ScrollView>

        {/* 5. BOTTOM ACTION FOOTER */}
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
    </MintGlassBackground>
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
    paddingTop: 8,
    paddingBottom: 4,
    zIndex: 10,
  },
  langGlassBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.85)',
    borderWidth: 1.5,
    borderColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 6,
  },
  langGlassText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#0F2E2B',
  },
  scrollContent: {
    flexGrow: 1,
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 6,
    paddingBottom: 16,
  },
  mainContainer: {
    width: '100%',
    alignItems: 'center',
  },

  /* Arch Dome Frame */
  archOuterWrapper: {
    alignItems: 'center',
    marginVertical: 10,
  },
  archDomeFrame: {
    width: 120,
    height: 140,
    borderTopLeftRadius: 60,
    borderTopRightRadius: 60,
    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28,
    backgroundColor: '#0F2E2B',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: 'rgba(212, 175, 55, 0.6)',
    shadowColor: '#0F2E2B',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 14,
    elevation: 6,
  },
  archInnerCircle: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },

  /* Titles */
  welcomeText: {
    fontSize: 11,
    fontWeight: '800',
    color: '#0D9488',
    letterSpacing: 4,
    marginTop: 10,
    marginBottom: 4,
    textAlign: 'center',
  },
  brandTitleLine1: {
    fontSize: 34,
    fontWeight: '800',
    color: '#0F2E2B',
    fontFamily: 'serif',
    textAlign: 'center',
    lineHeight: 38,
  },
  brandTitleLine2: {
    fontSize: 34,
    fontWeight: '800',
    color: '#0F2E2B',
    fontFamily: 'serif',
    textAlign: 'center',
    lineHeight: 38,
    marginBottom: 6,
  },
  taglineText: {
    fontSize: 13,
    fontWeight: '500',
    color: '#4A6B66',
    textAlign: 'center',
    marginBottom: 12,
  },

  verifiedGlassPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(13, 148, 136, 0.12)',
    borderWidth: 1,
    borderColor: 'rgba(13, 148, 136, 0.25)',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 7,
    marginBottom: 16,
  },
  verifiedPillText: {
    fontSize: 12,
    fontWeight: '800',
    color: '#0F2E2B',
  },

  /* 4-Column Feature Grid */
  featureGridGlassCard: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(255, 255, 255, 0.85)',
    borderWidth: 1.5,
    borderColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 24,
    paddingVertical: 16,
    paddingHorizontal: 10,
    marginBottom: 16,
    shadowColor: '#0F2E2B',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 3,
  },
  featureCol: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 2,
  },
  featureIconBadge: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#0F2E2B',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
    shadowColor: '#0F2E2B',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 3,
  },
  featureColTitle: {
    fontSize: 11,
    fontWeight: '800',
    color: '#0F2E2B',
    textAlign: 'center',
    marginBottom: 3,
  },
  featureColSub: {
    fontSize: 9,
    color: '#4A6B66',
    textAlign: 'center',
    lineHeight: 12,
  },

  /* Palace Banner */
  palaceBannerContainer: {
    width: '100%',
    height: 120,
    borderRadius: 22,
    overflow: 'hidden',
    position: 'relative',
    borderWidth: 1.5,
    borderColor: 'rgba(255, 255, 255, 0.95)',
    marginBottom: 10,
  },
  palaceBannerImage: {
    width: '100%',
    height: '100%',
  },
  palaceBannerOverlay: {
    ...StyleSheet.absoluteFill,
    backgroundColor: 'rgba(15, 46, 43, 0.45)',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  palaceOverlayPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 5,
  },
  palaceOverlayText: {
    fontSize: 11,
    fontWeight: '800',
    color: '#0F2E2B',
  },

  /* Footer */
  bottomBar: {
    width: '100%',
    paddingHorizontal: 20,
    paddingBottom: 20,
    paddingTop: 6,
  },
  letsStartBtn: {
    backgroundColor: '#0F2E2B',
    borderRadius: 28,
    paddingVertical: 17,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#0F2E2B',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 14,
    elevation: 6,
    marginBottom: 12,
  },
  letsStartText: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '800',
  },
  loginContainer: {
    alignItems: 'center',
    paddingVertical: 4,
  },
  loginText: {
    fontSize: 13,
    color: '#4A6B66',
    fontWeight: '500',
  },
  loginBoldText: {
    color: '#0D9488',
    fontWeight: '800',
  },
});
