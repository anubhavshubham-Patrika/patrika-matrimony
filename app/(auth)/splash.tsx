import React, { useEffect, useRef } from 'react';
import { 
  View, Text, StyleSheet, TouchableOpacity, Animated, SafeAreaView, Image, ScrollView 
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
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
  const translateYAnim = useRef(new Animated.Value(24)).current;
  const scaleAnim = useRef(new Animated.Value(0.95)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 900,
        useNativeDriver: true,
      }),
      Animated.timing(translateYAnim, {
        toValue: 0,
        duration: 900,
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
      {/* Top Navigation Bar with Language Toggle */}
      <View style={styles.topHeader}>
        <View style={styles.patrikaBadgeRow}>
          <Ionicons name="newspaper-outline" size={16} color="#E91E63" />
          <Text style={styles.patrikaBadgeText}>Rajasthan Patrika Initiative</Text>
        </View>
        <LanguageToggle />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Hero Arch Card Container */}
        <Animated.View 
          style={[
            styles.heroContainer, 
            { 
              opacity: fadeAnim, 
              transform: [{ translateY: translateYAnim }, { scale: scaleAnim }] 
            }
          ]}
        >
          {/* Arched Hero Image */}
          <View style={styles.heroImageWrapper}>
            <Image
              source={{ uri: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=800&auto=format&fit=crop&q=80' }}
              style={styles.heroImage}
              resizeMode="cover"
            />
            {/* Soft Gradient Overlay */}
            <View style={styles.heroOverlayGradient} />
            
            {/* Top-Right Verified Seal Badge */}
            <View style={styles.verifiedSealBadge}>
              <Ionicons name="shield-checkmark" size={14} color="#1E8449" />
              <Text style={styles.verifiedSealText}>100% Verified Profiles</Text>
            </View>
          </View>

          {/* Floating Logo Badge over Hero Image */}
          <View style={styles.floatingLogoContainer}>
            <PatrikaRibbonLogo size={90} rounded />
          </View>
        </Animated.View>

        {/* Headlines Section */}
        <Animated.View 
          style={[
            styles.textSection,
            { opacity: fadeAnim, transform: [{ translateY: translateYAnim }] }
          ]}
        >
          <Text style={styles.welcomeTitle}>{t.welcomeTo || 'Welcome to'}</Text>
          <Text style={styles.brandTitle}>Patrika Matrimony</Text>
          <Text style={styles.subtitle}>
            {t.trustedMatchesSub || 'Trusted matches from Rajasthan Patrika • Preserving Heritage & Uniting Souls'}
          </Text>

          {/* Trust Metrics Pill Row */}
          <View style={styles.trustPillRow}>
            <View style={styles.trustPill}>
              <MaterialCommunityIcons name="newspaper-variant" size={14} color="#E91E63" />
              <Text style={styles.trustPillText}>Patrika Ads Linked</Text>
            </View>
            <View style={styles.trustPill}>
              <Ionicons name="heart" size={14} color="#E91E63" />
              <Text style={styles.trustPillText}>10k+ Matched Couples</Text>
            </View>
            <View style={styles.trustPill}>
              <Ionicons name="star" size={14} color="#D4AF37" />
              <Text style={styles.trustPillText}>Rajasthani Communities</Text>
            </View>
          </View>
        </Animated.View>
      </ScrollView>

      {/* Bottom Floating Action Card */}
      <View style={styles.bottomCard}>
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
    backgroundColor: '#FFF4F6',
  },
  topHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#EFE6DD',
  },
  patrikaBadgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF0F3',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 14,
    gap: 6,
    borderWidth: 1,
    borderColor: '#F8D7DA',
  },
  patrikaBadgeText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#E91E63',
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 20,
    alignItems: 'center',
  },
  heroContainer: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 24,
  },
  heroImageWrapper: {
    width: '100%',
    height: 260,
    borderRadius: 24,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#EFE6DD',
    position: 'relative',
    shadowColor: '#2C1A1D',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.12,
    shadowRadius: 12,
    elevation: 6,
  },
  heroImage: {
    width: '100%',
    height: '100%',
  },
  heroOverlayGradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(44, 26, 29, 0.15)',
  },
  verifiedSealBadge: {
    position: 'absolute',
    top: 14,
    right: 14,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    gap: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 3,
  },
  verifiedSealText: {
    fontSize: 11,
    fontWeight: '800',
    color: '#1E8449',
  },
  floatingLogoContainer: {
    marginTop: -45,
    zIndex: 20,
    borderWidth: 4,
    borderColor: '#FFFFFF',
    borderRadius: 49,
    shadowColor: '#E91E63',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 6,
  },
  textSection: {
    alignItems: 'center',
    width: '100%',
  },
  welcomeTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: '#2C1A1D',
    fontFamily: 'serif',
    textAlign: 'center',
    marginBottom: 2,
  },
  brandTitle: {
    fontSize: 34,
    fontWeight: '800',
    color: '#E91E63',
    fontFamily: 'serif',
    textAlign: 'center',
    letterSpacing: -0.5,
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 14,
    color: '#5A4A4D',
    fontWeight: '500',
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 18,
    paddingHorizontal: 12,
  },
  trustPillRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 8,
  },
  trustPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#EFE6DD',
    gap: 6,
  },
  trustPillText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#2C1A1D',
  },
  bottomCard: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 28,
    borderTopWidth: 1,
    borderTopColor: '#EFE6DD',
    shadowColor: '#2C1A1D',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 6,
  },
  letsStartBtn: {
    backgroundColor: '#E91E63',
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#E91E63',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 4,
    marginBottom: 14,
  },
  letsStartText: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '800',
  },
  loginLinkContainer: {
    alignItems: 'center',
    paddingVertical: 4,
  },
  loginLinkText: {
    color: '#5A4A4D',
    fontSize: 14,
    fontWeight: '600',
  },
  loginBoldText: {
    color: '#E91E63',
    fontWeight: '800',
  },
});
