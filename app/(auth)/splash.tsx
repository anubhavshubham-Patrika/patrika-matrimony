import React, { useEffect, useRef } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, Animated,
  SafeAreaView, ScrollView, Image, ImageBackground
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useApp } from '../../src/context/AppContext';
import { Translations } from '../../src/constants/translations';
import PatrikaRibbonLogo from '../../src/components/PatrikaRibbonLogo';
import MintGlassBackground from '../../src/components/MintGlassBackground';

const FEATURES = [
  { icon: 'shield-checkmark', label: 'Verified Profiles', sub: '100% trusted & authentic' },
  { icon: 'search', label: 'Smart Matches', sub: 'AI powered compatibility' },
  { icon: 'lock-closed', label: 'Privacy First', sub: 'Your data is safe & secure' },
  { icon: 'heart', label: 'Serious Connections', sub: 'For meaningful relationships' },
];

const STATS = [
  { icon: 'people-outline', value: '2L+', label: 'Happy Members' },
  { icon: 'shield-checkmark-outline', value: '100%', label: 'Verified Profiles' },
  { icon: 'heart-outline', value: '50K+', label: 'Successful Matches' },
  { icon: 'trophy-outline', value: '20+', label: 'Years of Trust' },
];

export default function SplashScreen() {
  const router = useRouter();
  const { state, dispatch } = useApp();
  const lang = state.language || 'en';
  const t = Translations[lang];

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const translateYAnim = useRef(new Animated.Value(24)).current;
  const scaleAnim = useRef(new Animated.Value(0.96)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, { toValue: 1, duration: 700, useNativeDriver: true }),
      Animated.timing(translateYAnim, { toValue: 0, duration: 700, useNativeDriver: true }),
      Animated.spring(scaleAnim, { toValue: 1, friction: 8, tension: 40, useNativeDriver: true }),
    ]).start();
  }, []);

  const toggleLanguage = () =>
    dispatch({ type: 'SET_LANGUAGE', payload: lang === 'en' ? 'hi' : 'en' });

  return (
    <MintGlassBackground>
      <SafeAreaView style={styles.safeArea}>

        {/* ── Top bar: floral left + lang right ── */}
        <View style={styles.topBar}>
          {/* Decorative floral corner blobs */}
          <View style={styles.floralTopLeft}>
            <Text style={styles.floralEmoji}>🌸</Text>
            <Text style={[styles.floralEmoji, { fontSize: 26, marginTop: -6, marginLeft: -4 }]}>🌿</Text>
          </View>

          <TouchableOpacity style={styles.langBtn} onPress={toggleLanguage} activeOpacity={0.8}>
            <Ionicons name="globe-outline" size={15} color="#0F2E2B" style={{ marginRight: 4 }} />
            <Text style={styles.langText}>{lang === 'en' ? 'English' : 'हिंदी'}</Text>
            <Ionicons name="chevron-down" size={13} color="#0F2E2B" style={{ marginLeft: 2 }} />
          </TouchableOpacity>
        </View>

        <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false} bounces={false}>
          <Animated.View style={[styles.content, { opacity: fadeAnim, transform: [{ translateY: translateYAnim }, { scale: scaleAnim }] }]}>

            {/* ── ARCH EMBLEM ── */}
            <View style={styles.archWrapper}>
              {/* Outer concentric faint ring */}
              <View style={styles.archRingOuter}>
                <View style={styles.archRingInner}>
                  {/* Arch dome frame */}
                  <View style={styles.archDome}>
                    <View style={styles.archLogoCircle}>
                      <PatrikaRibbonLogo size={62} rounded />
                    </View>
                  </View>
                </View>
              </View>
            </View>

            {/* ── HEADLINE ── */}
            <Text style={styles.welcomeLabel}>W E L C O M E   T O</Text>
            <Text style={styles.titleLine1}>Patrika</Text>
            <Text style={styles.titleLine2}>Matrimony</Text>

            {/* Heart divider */}
            <View style={styles.heartDividerRow}>
              <View style={styles.dividerLine} />
              <Ionicons name="heart" size={14} color="#0D9488" style={{ marginHorizontal: 8 }} />
              <View style={styles.dividerLine} />
            </View>

            <Text style={styles.tagline}>Trusted matches from Rajasthan Patrika</Text>

            {/* Verified pill */}
            <View style={styles.verifiedPill}>
              <Ionicons name="shield-checkmark" size={15} color="#0D9488" style={{ marginRight: 6 }} />
              <Text style={styles.verifiedPillText}>100% Verified Profiles</Text>
            </View>

            {/* ── FEATURES CARD ── */}
            <View style={styles.featureCard}>
              {FEATURES.map((f) => (
                <View key={f.label} style={styles.featureCol}>
                  <View style={styles.featureIconCircle}>
                    <Ionicons name={f.icon as any} size={18} color="#FFFFFF" />
                  </View>
                  <Text style={styles.featureTitle}>{f.label}</Text>
                  <Text style={styles.featureSub}>{f.sub}</Text>
                </View>
              ))}
            </View>

            {/* ── STATS ROW ── */}
            <View style={styles.statsCard}>
              {STATS.map((s, idx) => (
                <View key={s.label} style={[styles.statCol, idx < STATS.length - 1 && styles.statColBorder]}>
                  <Ionicons name={s.icon as any} size={20} color="#0D9488" />
                  <Text style={styles.statValue}>{s.value}</Text>
                  <Text style={styles.statLabel}>{s.label}</Text>
                </View>
              ))}
            </View>

            {/* ── PALACE SILHOUETTE BANNER ── */}
            <View style={styles.palaceContainer}>
              {/* Gradient-like mint tinted background */}
              <View style={styles.palaceBg}>
                {/* Flowers left & right */}
                <Text style={styles.flowerLeft}>🌸</Text>
                <Text style={styles.flowerRight}>🌸</Text>

                {/* Palace + Couple Illustration using a carefully styled View */}
                <View style={styles.silhouetteRow}>
                  {/* Left mini-palace */}
                  <View style={styles.palaceLeftTower}>
                    <View style={styles.towerDome} />
                    <View style={styles.towerBody} />
                  </View>

                  {/* Centre couple placeholder */}
                  <View style={styles.coupleCenter}>
                    <Text style={styles.coupleEmoji}>👫</Text>
                    <View style={styles.brideVeil} />
                  </View>

                  {/* Right mini-palace */}
                  <View style={styles.palaceRightTower}>
                    <View style={styles.towerDome} />
                    <View style={styles.towerBody} />
                  </View>
                </View>
              </View>
            </View>

          </Animated.View>
        </ScrollView>

        {/* ── FOOTER ── */}
        <Animated.View style={[styles.footer, { opacity: fadeAnim }]}>
          <TouchableOpacity
            style={styles.ctaBtn}
            onPress={() => router.push('/(auth)/onboarding/step1')}
            activeOpacity={0.88}
          >
            <Text style={styles.ctaBtnText}>Let's Start   →</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => router.push('/(auth)/login')} activeOpacity={0.7}>
            <Text style={styles.loginText}>
              Already have an account?{' '}<Text style={styles.loginLink}>Login</Text>
            </Text>
          </TouchableOpacity>

          <View style={styles.footerTagRow}>
            <Ionicons name="lock-closed-outline" size={11} color="#4A6B66" />
            <Text style={styles.footerTag}>  Secure & Private</Text>
            <Text style={styles.footerDot}>  ·  </Text>
            <Ionicons name="people-outline" size={11} color="#4A6B66" />
            <Text style={styles.footerTag}>  Trusted by Millions</Text>
            <Text style={styles.footerDot}>  ·  </Text>
            <Ionicons name="heart" size={11} color="#0D9488" />
            <Text style={styles.footerTag}>  Made with ❤️ in India</Text>
          </View>
        </Animated.View>

      </SafeAreaView>
    </MintGlassBackground>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1 },

  /* ── TOP BAR ── */
  topBar: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 6,
    paddingBottom: 2,
    zIndex: 10,
  },
  floralTopLeft: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    flexWrap: 'wrap',
    width: 56,
  },
  floralEmoji: { fontSize: 30, opacity: 0.9 },
  langBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.88)',
    borderWidth: 1.5,
    borderColor: 'rgba(255,255,255,0.95)',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
    shadowColor: '#0F2E2B',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 2,
    marginTop: 2,
  },
  langText: { fontSize: 13, fontWeight: '700', color: '#0F2E2B' },

  /* ── SCROLL ── */
  scroll: { paddingHorizontal: 18, paddingTop: 0, paddingBottom: 8, alignItems: 'center' },
  content: { width: '100%', alignItems: 'center' },

  /* ── ARCH EMBLEM ── */
  archWrapper: { alignItems: 'center', marginTop: 0, marginBottom: 16 },
  archRingOuter: {
    width: 200, height: 200, borderRadius: 100,
    borderWidth: 1, borderColor: 'rgba(13,148,136,0.15)',
    backgroundColor: 'rgba(13,148,136,0.04)',
    alignItems: 'center', justifyContent: 'center',
  },
  archRingInner: {
    width: 160, height: 160, borderRadius: 80,
    borderWidth: 1, borderColor: 'rgba(13,148,136,0.22)',
    backgroundColor: 'rgba(13,148,136,0.06)',
    alignItems: 'center', justifyContent: 'center',
  },
  archDome: {
    width: 108, height: 126,
    borderTopLeftRadius: 54, borderTopRightRadius: 54,
    borderBottomLeftRadius: 18, borderBottomRightRadius: 18,
    backgroundColor: '#0F2E2B',
    borderWidth: 2.5,
    borderColor: '#D4AF37',
    alignItems: 'center', justifyContent: 'center',
    shadowColor: '#0F2E2B',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.28,
    shadowRadius: 14,
    elevation: 8,
  },
  archLogoCircle: {
    width: 80, height: 80, borderRadius: 40,
    backgroundColor: '#FFFFFF',
    alignItems: 'center', justifyContent: 'center',
    shadowColor: '#0F2E2B',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 4,
  },

  /* ── HEADLINE ── */
  welcomeLabel: {
    fontSize: 11, fontWeight: '800', color: '#0D9488',
    letterSpacing: 4, textAlign: 'center', marginBottom: 4,
  },
  titleLine1: {
    fontSize: 40, fontWeight: '900', color: '#0F2E2B',
    fontFamily: 'serif', textAlign: 'center', lineHeight: 44,
  },
  titleLine2: {
    fontSize: 40, fontWeight: '900', color: '#0F2E2B',
    fontFamily: 'serif', textAlign: 'center', lineHeight: 44,
    marginBottom: 12,
  },
  heartDividerRow: {
    flexDirection: 'row', alignItems: 'center',
    width: '70%', marginBottom: 8,
  },
  dividerLine: {
    flex: 1, height: 1,
    backgroundColor: 'rgba(13,148,136,0.25)',
  },
  tagline: {
    fontSize: 14, fontWeight: '500', color: '#4A6B66',
    textAlign: 'center', marginBottom: 12,
  },

  /* Verified pill */
  verifiedPill: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: 'rgba(13,148,136,0.12)',
    borderWidth: 1, borderColor: 'rgba(13,148,136,0.3)',
    borderRadius: 20, paddingHorizontal: 16, paddingVertical: 7,
    marginBottom: 18,
  },
  verifiedPillText: { fontSize: 13, fontWeight: '800', color: '#0F2E2B' },

  /* ── FEATURE CARD ── */
  featureCard: {
    width: '100%', flexDirection: 'row',
    backgroundColor: 'rgba(255,255,255,0.88)',
    borderWidth: 1.5, borderColor: 'rgba(255,255,255,0.95)',
    borderRadius: 22, paddingVertical: 18, paddingHorizontal: 6,
    shadowColor: '#0F2E2B',
    shadowOffset: { width: 0, height: 6 }, shadowOpacity: 0.08,
    shadowRadius: 14, elevation: 3, marginBottom: 14,
  },
  featureCol: { flex: 1, alignItems: 'center', paddingHorizontal: 2 },
  featureIconCircle: {
    width: 40, height: 40, borderRadius: 20,
    backgroundColor: '#0F2E2B',
    alignItems: 'center', justifyContent: 'center',
    marginBottom: 8,
    shadowColor: '#0F2E2B',
    shadowOffset: { width: 0, height: 3 }, shadowOpacity: 0.18,
    shadowRadius: 6, elevation: 3,
  },
  featureTitle: { fontSize: 11, fontWeight: '800', color: '#0F2E2B', textAlign: 'center', marginBottom: 3 },
  featureSub: { fontSize: 9, color: '#4A6B66', textAlign: 'center', lineHeight: 13 },

  /* ── STATS CARD ── */
  statsCard: {
    width: '100%', flexDirection: 'row',
    backgroundColor: 'rgba(13,148,136,0.08)',
    borderWidth: 1.5, borderColor: 'rgba(13,148,136,0.18)',
    borderRadius: 20, paddingVertical: 14, paddingHorizontal: 4,
    marginBottom: 14,
  },
  statCol: { flex: 1, alignItems: 'center', paddingHorizontal: 2 },
  statColBorder: { borderRightWidth: 1, borderRightColor: 'rgba(13,148,136,0.18)' },
  statValue: { fontSize: 18, fontWeight: '900', color: '#0F2E2B', marginTop: 4, marginBottom: 2 },
  statLabel: { fontSize: 9, color: '#4A6B66', textAlign: 'center', fontWeight: '600' },

  /* ── PALACE SILHOUETTE ── */
  palaceContainer: { width: '100%', marginBottom: 4 },
  palaceBg: {
    width: '100%', height: 150,
    backgroundColor: 'rgba(13,148,136,0.09)',
    borderRadius: 24, overflow: 'hidden',
    flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'center',
    position: 'relative',
    borderWidth: 1, borderColor: 'rgba(13,148,136,0.18)',
  },
  flowerLeft: { position: 'absolute', left: 6, bottom: 6, fontSize: 34, opacity: 0.85 },
  flowerRight: { position: 'absolute', right: 6, bottom: 6, fontSize: 34, opacity: 0.85 },
  silhouetteRow: {
    flexDirection: 'row', alignItems: 'flex-end',
    justifyContent: 'center', paddingBottom: 10, gap: 12,
  },
  palaceLeftTower: { alignItems: 'center', opacity: 0.55 },
  palaceRightTower: { alignItems: 'center', opacity: 0.55 },
  towerDome: {
    width: 28, height: 28, borderRadius: 14,
    backgroundColor: '#0F2E2B', marginBottom: 2,
  },
  towerBody: {
    width: 22, height: 60,
    backgroundColor: '#0F2E2B',
    borderTopLeftRadius: 4, borderTopRightRadius: 4,
  },
  coupleCenter: { alignItems: 'center', marginBottom: 6 },
  coupleEmoji: { fontSize: 58 },
  brideVeil: {
    width: 2, height: 32,
    backgroundColor: 'rgba(13,148,136,0.2)',
    marginTop: -8,
  },

  /* ── FOOTER ── */
  footer: {
    width: '100%', paddingHorizontal: 20,
    paddingBottom: 16, paddingTop: 6,
    alignItems: 'center',
  },
  ctaBtn: {
    width: '100%', backgroundColor: '#0F2E2B',
    borderRadius: 30, paddingVertical: 17,
    alignItems: 'center', justifyContent: 'center',
    shadowColor: '#0F2E2B',
    shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.28,
    shadowRadius: 16, elevation: 7, marginBottom: 12,
  },
  ctaBtnText: { color: '#FFFFFF', fontSize: 18, fontWeight: '900', letterSpacing: 0.5 },
  loginText: { fontSize: 13, color: '#4A6B66', fontWeight: '500', marginBottom: 10 },
  loginLink: { color: '#0D9488', fontWeight: '800' },
  footerTagRow: { flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'center' },
  footerTag: { fontSize: 10, color: '#4A6B66' },
  footerDot: { fontSize: 10, color: '#4A6B66' },
});
