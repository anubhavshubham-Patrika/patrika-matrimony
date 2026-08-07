import React, { useEffect, useRef, useState } from 'react';
import { 
  View, Text, StyleSheet, TouchableOpacity, Animated, SafeAreaView, ScrollView, Image 
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useApp } from '../../src/context/AppContext';
import { Translations } from '../../src/constants/translations';
import PatrikaRibbonLogo from '../../src/components/PatrikaRibbonLogo';
import MintGlassBackground from '../../src/components/MintGlassBackground';

const WEDDING_IMAGES = [
  {
    url: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=800&q=80',
    title: 'Royal Indian Wedding',
    sub: 'Rooted in Culture & Values',
  },
  {
    url: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80',
    title: 'Aesthetic Matrimony',
    sub: 'Trusted Rajasthan Patrika Lineage',
  },
  {
    url: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80',
    title: 'Blessed Connections',
    sub: 'Find Your Perfect Life Partner',
  },
];

const COMMUNITIES = ['👑 Rajput', '⚜️ Agarwal', '🌸 Brahmin', '💎 Marwari', '✨ Jain', '🛡️ Sindhi'];

export default function SplashScreen() {
  const router = useRouter();
  const { state, dispatch } = useApp();
  const lang = state.language || 'en';
  const t = Translations[lang];

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const translateYAnim = useRef(new Animated.Value(20)).current;
  const scaleAnim = useRef(new Animated.Value(0.94)).current;

  // Animated Image Carousel State
  const [currentImgIndex, setCurrentImgIndex] = useState(0);
  const imageFadeAnim = useRef(new Animated.Value(1)).current;
  const imageScaleAnim = useRef(new Animated.Value(1)).current;

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

  // Auto-slide Marriage Images with smooth Fade & Pulse Animation
  useEffect(() => {
    const timer = setInterval(() => {
      Animated.sequence([
        Animated.parallel([
          Animated.timing(imageFadeAnim, { toValue: 0.3, duration: 400, useNativeDriver: true }),
          Animated.timing(imageScaleAnim, { toValue: 0.95, duration: 400, useNativeDriver: true }),
        ]),
        Animated.parallel([
          Animated.timing(imageFadeAnim, { toValue: 1, duration: 600, useNativeDriver: true }),
          Animated.timing(imageScaleAnim, { toValue: 1.03, duration: 600, useNativeDriver: true }),
        ]),
      ]).start();

      setCurrentImgIndex((prev) => (prev + 1) % WEDDING_IMAGES.length);
    }, 3600);

    return () => clearInterval(timer);
  }, [imageFadeAnim, imageScaleAnim]);

  const toggleLanguage = () => {
    dispatch({ type: 'SET_LANGUAGE', payload: lang === 'en' ? 'hi' : 'en' });
  };

  const currentWedding = WEDDING_IMAGES[currentImgIndex];

  return (
    <MintGlassBackground>
      <SafeAreaView style={styles.safeArea}>
        {/* Top Header Bar with Glass Language Selector */}
        <View style={styles.topHeaderBar}>
          <View style={styles.logoBadgeRow}>
            <PatrikaRibbonLogo size={36} rounded />
            <Text style={styles.headerPatrikaText}>Rajasthan Patrika</Text>
          </View>

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
              styles.glassCardWrapper,
              {
                opacity: fadeAnim,
                transform: [{ translateY: translateYAnim }, { scale: scaleAnim }],
              }
            ]}
          >
            {/* HERO ANIMATED MARRIAGE IMAGE CAROUSEL CARD */}
            <View style={styles.heroImageGlassCard}>
              <Animated.View 
                style={[
                  styles.imageAnimatedWrapper,
                  {
                    opacity: imageFadeAnim,
                    transform: [{ scale: imageScaleAnim }],
                  }
                ]}
              >
                <Image 
                  source={{ uri: currentWedding.url }} 
                  style={styles.heroMarriageImage} 
                  resizeMode="cover"
                />
                
                {/* Floating Tag */}
                <View style={styles.imageOverlayTag}>
                  <Text style={styles.overlayTagText}>{currentWedding.title}</Text>
                </View>

                <View style={styles.imageBottomTextBg}>
                  <Text style={styles.imageBottomSubText}>{currentWedding.sub}</Text>
                </View>
              </Animated.View>

              {/* Carousel Pagination Dots */}
              <View style={styles.dotsRow}>
                {WEDDING_IMAGES.map((_, idx) => (
                  <View 
                    key={idx} 
                    style={[styles.dotPill, currentImgIndex === idx && styles.dotPillActive]} 
                  />
                ))}
              </View>
            </View>

            {/* Subtitle WELCOME TO */}
            <Text style={styles.welcomeText}>W E L C O M E   T O</Text>

            {/* Headline Title */}
            <Text style={styles.brandTitleLine1}>Patrika Matrimony</Text>

            {/* Tagline */}
            <Text style={styles.taglineText}>
              {t.trustedMatchesSub || 'Trusted matrimonial matches, rooted in Rajasthan'}
            </Text>

            {/* Communities Chips Scroll */}
            <View style={styles.communityRow}>
              <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 8 }}>
                {COMMUNITIES.map((c) => (
                  <View key={c} style={styles.communityChip}>
                    <Text style={styles.communityChipText}>{c}</Text>
                  </View>
                ))}
              </ScrollView>
            </View>

            {/* 100% Verified Profiles Glass Pill */}
            <View style={styles.verifiedGlassPill}>
              <Ionicons name="shield-checkmark-outline" size={16} color="#0D9488" style={{ marginRight: 6 }} />
              <Text style={styles.verifiedPillText}>100% Verified Profiles & Newspaper Ads</Text>
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
            <Text style={styles.letsStartText}>Create Profile & Find Matches ✨</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.loginContainer}
            onPress={() => router.push('/(auth)/login')}
            activeOpacity={0.7}
          >
            <Text style={styles.loginText}>
              Already have an account? <Text style={styles.loginBoldText}>Login Here</Text>
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
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 6,
    zIndex: 10,
  },
  logoBadgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerPatrikaText: {
    fontSize: 14,
    fontWeight: '800',
    color: '#0F2E2B',
    marginLeft: 8,
    fontFamily: 'serif',
  },
  langGlassBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.85)',
    borderWidth: 1.5,
    borderColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 7,
  },
  langGlassText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#0F2E2B',
  },
  scrollContent: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 20,
  },

  /* Glassmorphic Container Card */
  glassCardWrapper: {
    alignItems: 'center',
    width: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.85)',
    borderWidth: 1.5,
    borderColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 28,
    paddingVertical: 20,
    paddingHorizontal: 16,
    shadowColor: '#0F2E2B',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.1,
    shadowRadius: 16,
    elevation: 4,
  },

  /* Hero Animated Image Card */
  heroImageGlassCard: {
    width: '100%',
    height: 220,
    borderRadius: 22,
    overflow: 'hidden',
    backgroundColor: '#0F2E2B',
    position: 'relative',
    marginBottom: 16,
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.9)',
    shadowColor: '#0F2E2B',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 5,
  },
  imageAnimatedWrapper: {
    width: '100%',
    height: '100%',
    position: 'relative',
  },
  heroMarriageImage: {
    width: '100%',
    height: '100%',
  },
  imageOverlayTag: {
    position: 'absolute',
    top: 12,
    left: 12,
    backgroundColor: 'rgba(15, 46, 43, 0.85)',
    borderRadius: 14,
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  overlayTagText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '800',
  },
  imageBottomTextBg: {
    position: 'absolute',
    bottom: 12,
    left: 12,
    right: 12,
    backgroundColor: 'rgba(0, 0, 0, 0.55)',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  imageBottomSubText: {
    color: '#D2F1EC',
    fontSize: 12,
    fontWeight: '700',
    textAlign: 'center',
  },
  dotsRow: {
    position: 'absolute',
    bottom: 8,
    alignSelf: 'center',
    flexDirection: 'row',
    gap: 6,
  },
  dotPill: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
  },
  dotPillActive: {
    width: 18,
    backgroundColor: '#0D9488',
  },

  welcomeText: {
    fontSize: 11,
    fontWeight: '800',
    color: '#0D9488',
    letterSpacing: 4,
    marginBottom: 4,
    textAlign: 'center',
  },
  brandTitleLine1: {
    fontSize: 32,
    fontWeight: '800',
    color: '#0F2E2B',
    fontFamily: 'serif',
    textAlign: 'center',
    marginBottom: 6,
  },
  taglineText: {
    fontSize: 13,
    fontWeight: '500',
    color: '#4A6B66',
    textAlign: 'center',
    marginBottom: 14,
  },

  communityRow: {
    width: '100%',
    marginBottom: 14,
  },
  communityChip: {
    backgroundColor: 'rgba(13, 148, 136, 0.12)',
    borderRadius: 14,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderWidth: 1,
    borderColor: 'rgba(13, 148, 136, 0.2)',
  },
  communityChipText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#0F2E2B',
  },

  verifiedGlassPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(13, 148, 136, 0.12)',
    borderWidth: 1,
    borderColor: 'rgba(13, 148, 136, 0.25)',
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 8,
  },
  verifiedPillText: {
    fontSize: 12,
    fontWeight: '800',
    color: '#0F2E2B',
  },

  bottomBar: {
    width: '100%',
    paddingHorizontal: 20,
    paddingBottom: 20,
    paddingTop: 8,
  },
  letsStartBtn: {
    backgroundColor: '#0F2E2B',
    borderRadius: 26,
    paddingVertical: 16,
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
    fontSize: 16,
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
