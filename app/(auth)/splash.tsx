import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Animated,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useApp } from '../../src/context/AppContext';

const { width: SW } = Dimensions.get('window');

// ─── Design Tokens (from CSS :root) ──────────────────────
const C = {
  mintBg: '#eaf8f7',
  mintLight: '#dff3f1',
  mint: '#bfe8e4',
  teal: '#159d95',
  darkTeal: '#073b38',
  deepTeal: '#063b37',
  gold: '#c79b45',
  goldLight: '#e4c477',
  white: '#ffffff',
  text: '#123b39',
  muted: '#58706f',
};

// ─── Feature data ─────────────────────────────────────────
const FEATURES = [
  { icon: 'shield-checkmark' as const, title: 'Verified', sub: 'Profiles', desc: '100% trusted &\nauthentic' },
  { icon: 'search' as const, title: 'Smart', sub: 'Matches', desc: 'AI powered\ncompatibility' },
  { icon: 'lock-closed' as const, title: 'Privacy', sub: 'First', desc: 'Your data is safe\n& secure' },
  { icon: 'heart' as const, title: 'Serious', sub: 'Connections', desc: 'For meaningful\nrelationships' },
];

const STATS = [
  { icon: 'people-outline' as const, value: '2L+', label: 'Happy Members' },
  { icon: 'shield-checkmark-outline' as const, value: '100%', label: 'Verified Profiles' },
  { icon: 'heart-outline' as const, value: '50K+', label: 'Successful Matches' },
  { icon: 'trophy-outline' as const, value: '20+', label: 'Years of Trust' },
];

// ─── Sub-components ───────────────────────────────────────

/** Translates .logo-arch + .logo-inner + .ring-logo */
function LogoArch() {
  return (
    <View style={s.logoDecoration}>
      {/* .ring .ring-one / .ring-two / .ring-three */}
      <View style={[s.ring, { width: 250, height: 250, borderRadius: 125 }]} />
      <View style={[s.ring, { width: 210, height: 210, borderRadius: 105 }]} />
      <View style={[s.ring, { width: 170, height: 170, borderRadius: 85 }]} />

      {/* .logo-arch */}
      <LinearGradient
        colors={['#0b504b', '#063733']}
        start={{ x: 0.15, y: 0.15 }}
        end={{ x: 0.85, y: 0.85 }}
        style={s.logoArch}
      >
        {/* .logo-inner */}
        <View style={s.logoInner}>
          {/* .ring-logo */}
          <View style={s.ringLogo}>
            {/* Lotus / crown at top */}
            <Text style={s.lotus}>♕</Text>
            {/* .ring-left */}
            <View style={[s.ringBand, s.ringBandLeft]} />
            {/* .ring-right */}
            <View style={[s.ringBand, s.ringBandRight]} />
          </View>
        </View>
      </LinearGradient>
    </View>
  );
}

/** Translates .palace (left/right) */
function Palace({ side }: { side: 'left' | 'right' }) {
  const isLeft = side === 'left';
  return (
    <View style={[s.palace, isLeft ? s.palaceLeft : s.palaceRight]}>
      {/* .dome */}
      <View style={s.dome} />
      {/* .palace-body */}
      <View style={s.palaceBody}>
        <View style={s.palaceArch} />
        <View style={s.palaceArch} />
        <View style={s.palaceArch} />
      </View>
    </View>
  );
}

/** Translates .couple (groom + bride) */
function Couple() {
  return (
    <View style={s.couple}>
      {/* .groom */}
      <View style={s.groom}>
        <View style={s.groomHead} />
        {/* Turban */}
        <View style={s.groomTurban} />
        <View style={s.groomBody} />
        <View style={[s.groomLeg, { left: 11 }]} />
        <View style={[s.groomLeg, { right: 10 }]} />
      </View>

      {/* .bride */}
      <View style={s.bride}>
        <View style={s.brideHead} />
        <View style={s.brideVeil} />
        {/* bride-body trapezoid approximation */}
        <View style={s.brideBodyTop} />
        <View style={s.brideBodyBottom} />
        <View style={s.brideLeg} />
      </View>
    </View>
  );
}

/** Translates .wedding-section */
function WeddingSection() {
  return (
    <View style={s.weddingSection}>
      {/* .hill-one */}
      <LinearGradient
        colors={['#8ed2cc', '#5cbab2']}
        style={[s.hill, s.hillOne]}
      />
      {/* .hill-two */}
      <LinearGradient
        colors={['#a4ddd8', '#70c6bf']}
        style={[s.hill, s.hillTwo]}
      />

      {/* Palaces */}
      <Palace side="left" />
      <Palace side="right" />

      {/* Couple */}
      <Couple />

      {/* .flower-left / .flower-right */}
      <Text style={[s.flower, s.flowerLeft]}>✿</Text>
      <Text style={[s.flower, s.flowerRight]}>✿</Text>
    </View>
  );
}

// ─── MAIN SCREEN ──────────────────────────────────────────
export default function SplashScreen() {
  const router = useRouter();
  const { state, dispatch } = useApp();
  const lang = state.language || 'en';

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(18)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, { toValue: 1, duration: 550, useNativeDriver: true }),
      Animated.timing(slideAnim, { toValue: 0, duration: 550, useNativeDriver: true }),
    ]).start();
  }, []);

  const toggleLang = () =>
    dispatch({ type: 'SET_LANGUAGE', payload: lang === 'en' ? 'hi' : 'en' });

  return (
    <View style={s.page}>
      {/* ── Background: radial blobs (translates CSS background) */}
      <View style={[s.bgCircle, s.circleOne]} />
      <View style={[s.bgCircle, s.circleTwo]} />
      <View style={[s.bgCircle, s.circleThree]} />

      {/* Floating leaves */}
      <Text style={[s.floatingLeaf, s.leafOne]}>⌁</Text>
      <Text style={[s.floatingLeaf, s.leafTwo]}>⌁</Text>

      {/* Sparkle stars */}
      <Text style={[s.floatingStar, s.starOne]}>✦</Text>
      <Text style={[s.floatingStar, s.starTwo]}>✦</Text>

      <SafeAreaView style={{ flex: 1 }}>

        {/* ── .language-selector ── */}
        <TouchableOpacity style={s.langSelector} onPress={toggleLang} activeOpacity={0.85}>
          <Ionicons name="globe-outline" size={16} color={C.darkTeal} strokeWidth={2.2} />
          <Text style={s.langText}>{lang === 'en' ? 'English' : 'हिंदी'}</Text>
          <Ionicons name="chevron-down" size={15} color={C.darkTeal} />
        </TouchableOpacity>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={s.scroll}
          bounces={false}
        >
          <Animated.View style={{ opacity: fadeAnim, transform: [{ translateY: slideAnim }], alignItems: 'center', width: '100%' }}>

            {/* ══════════════════════════════════════════
                .hero — logo + title + verified badge
            ══════════════════════════════════════════ */}
            <View style={s.hero}>
              <LogoArch />

              {/* .welcome-label */}
              <Text style={s.welcomeLabel}>W E L C O M E &nbsp; T O</Text>

              {/* h1 */}
              <Text style={s.h1}>{'Patrika\nMatrimony'}</Text>

              {/* .title-divider */}
              <View style={s.titleDivider}>
                <View style={s.dividerLineLeft} />
                <Ionicons name="heart" size={17} color={C.teal} />
                <View style={s.dividerLineRight} />
              </View>

              {/* .tagline */}
              <Text style={s.tagline}>Trusted matches from Rajasthan Patrika</Text>

              {/* .verified-badge */}
              <View style={s.verifiedBadge}>
                <Ionicons name="shield-checkmark" size={19} color={C.teal} />
                <Text style={s.verifiedText}>100% Verified Profiles</Text>
              </View>
            </View>

            {/* ══════════════════════════════════════════
                .features-card
            ══════════════════════════════════════════ */}
            <View style={s.featuresCard}>
              {FEATURES.map((f, idx) => (
                <View
                  key={f.title}
                  style={[s.feature, idx < 3 && s.featureBorder]}
                >
                  <View style={s.featureIcon}>
                    <Ionicons name={f.icon} size={23} color="#fff" />
                  </View>
                  <Text style={s.featureH3}>{`${f.title}\n${f.sub}`}</Text>
                  <View style={s.featureLine} />
                  <Text style={s.featureP}>{f.desc}</Text>
                </View>
              ))}
            </View>

            {/* ══════════════════════════════════════════
                .stats-card
            ══════════════════════════════════════════ */}
            <LinearGradient
              colors={['rgba(220,246,243,0.85)', 'rgba(238,250,248,0.75)']}
              start={{ x: 0, y: 0 }}
              end={{ x: 0, y: 1 }}
              style={s.statsCard}
            >
              {STATS.map((st, idx) => (
                <View
                  key={st.label}
                  style={[s.stat, idx < 3 && s.statBorder]}
                >
                  <Ionicons name={st.icon} size={22} color={C.teal} />
                  <Text style={s.statValue}>{st.value}</Text>
                  <Text style={s.statLabel}>{st.label}</Text>
                </View>
              ))}
            </LinearGradient>

            {/* ══════════════════════════════════════════
                .wedding-section
            ══════════════════════════════════════════ */}
            <WeddingSection />

          </Animated.View>
        </ScrollView>

        {/* ══════════════════════════════════════════
            .bottom-section (overlaps wedding with gradient)
        ══════════════════════════════════════════ */}
        <Animated.View style={[s.bottomSection, { opacity: fadeAnim }]}>
          {/* Fade-in gradient overlay from transparent → mint */}
          <LinearGradient
            colors={['rgba(255,255,255,0)', 'rgba(238,250,248,0.97)']}
            style={StyleSheet.absoluteFill}
            pointerEvents="none"
          />

          {/* .start-button */}
          <TouchableOpacity
            activeOpacity={0.88}
            onPress={() => router.push('/(auth)/onboarding/step1')}
            style={s.startBtnWrap}
          >
            <LinearGradient
              colors={['#084943', '#063530']}
              start={{ x: 0.15, y: 0.15 }}
              end={{ x: 0.85, y: 0.85 }}
              style={s.startButton}
            >
              <Text style={s.startText}>Let's Start</Text>
              <Ionicons name="arrow-forward" size={26} color="#fff" />
            </LinearGradient>
          </TouchableOpacity>

          {/* .login-text */}
          <View style={s.loginRow}>
            <Text style={s.loginLabel}>Already have an account? </Text>
            <TouchableOpacity onPress={() => router.push('/(auth)/login')} activeOpacity={0.7}>
              <Text style={s.loginLink}>Login</Text>
            </TouchableOpacity>
          </View>

          {/* .trust-footer */}
          <View style={s.trustFooter}>
            <View style={s.trustItem}>
              <Ionicons name="lock-closed-outline" size={15} color={C.teal} />
              <Text style={s.trustText}>Secure & Private</Text>
            </View>
            <View style={s.trustItem}>
              <Ionicons name="people-outline" size={15} color={C.teal} />
              <Text style={s.trustText}>Trusted by Millions</Text>
            </View>
            <View style={s.trustItem}>
              <Ionicons name="heart" size={15} color={C.teal} />
              <Text style={s.trustText}>Made with ♥ in India</Text>
            </View>
          </View>
        </Animated.View>

      </SafeAreaView>
    </View>
  );
}

// ─── Styles (faithful CSS→RN translation) ─────────────────
const s = StyleSheet.create({

  /* .patrika-page */
  page: {
    flex: 1,
    backgroundColor: '#dff4f2',
    position: 'relative',
    overflow: 'hidden',
  },

  /* background circles (radial-gradient blobs) */
  bgCircle: {
    position: 'absolute',
    borderRadius: 999,
  },
  /* circle-one: left:-105px, top:-105px, 350px, rgba(156,225,219,0.42) */
  circleOne: {
    width: 350, height: 350,
    left: -105, top: -105,
    backgroundColor: 'rgba(156,225,219,0.42)',
  },
  /* circle-two: right:-140px, top:310px, 270px */
  circleTwo: {
    width: 270, height: 270,
    right: -140, top: 310,
    backgroundColor: 'rgba(220,237,235,0.65)',
  },
  /* circle-three: left:-130px, bottom:260px, 210px */
  circleThree: {
    width: 210, height: 210,
    left: -130, bottom: 260,
    backgroundColor: 'rgba(191,232,228,0.35)',
  },

  /* .floating-leaf */
  floatingLeaf: {
    position: 'absolute',
    color: 'rgba(21,157,149,0.30)',
    fontSize: 60,
  },
  leafOne: { left: 18, top: 315 },
  leafTwo: { right: -4, top: 190 },

  /* .floating-star */
  floatingStar: {
    position: 'absolute',
    color: 'rgba(21,157,149,0.45)',
    fontSize: 24,
  },
  starOne: { right: 30, top: 350 },
  starTwo: { left: 35, top: 515 },

  /* .language-selector */
  langSelector: {
    position: 'absolute',
    zIndex: 20,
    top: 14,
    right: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    paddingHorizontal: 13,
    paddingVertical: 9,
    backgroundColor: 'rgba(255,255,255,0.88)',
    borderRadius: 22,
    shadowColor: '#144e4b',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.06,
    shadowRadius: 20,
    elevation: 3,
  },
  langText: {
    fontSize: 12,
    fontWeight: '600',
    color: C.darkTeal,
    marginHorizontal: 2,
  },

  /* scroll */
  scroll: {
    paddingTop: 0,
    alignItems: 'center',
  },

  /* ── .hero ── */
  hero: {
    position: 'relative',
    zIndex: 5,
    width: '100%',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 58,
    paddingBottom: 20,
  },

  /* .logo-decoration */
  logoDecoration: {
    width: 250,
    height: 270,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  /* .ring */
  ring: {
    position: 'absolute',
    borderWidth: 1,
    borderColor: 'rgba(21,157,149,0.18)',
    backgroundColor: 'transparent',
  },
  /* .logo-arch: 150×190, border-radius 75 75 28 28 */
  logoArch: {
    width: 150,
    height: 190,
    borderTopLeftRadius: 75,
    borderTopRightRadius: 75,
    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28,
    borderWidth: 1.5,
    borderColor: C.gold,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#043834',
    shadowOffset: { width: 0, height: 18 },
    shadowOpacity: 0.20,
    shadowRadius: 35,
    elevation: 8,
    zIndex: 5,
  },
  /* .logo-inner: 106px circle, white */
  logoInner: {
    width: 106,
    height: 106,
    borderRadius: 53,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.12,
    shadowRadius: 18,
    elevation: 5,
  },
  /* .ring-logo: 68px circle with gold border */
  ringLogo: {
    width: 68,
    height: 68,
    borderRadius: 34,
    borderWidth: 2,
    borderColor: C.gold,
    alignItems: 'center',
    justifyContent: 'center',
  },
  /* .lotus */
  lotus: {
    position: 'absolute',
    top: 3,
    left: '50%',
    marginLeft: -9,
    color: C.gold,
    fontSize: 18,
    lineHeight: 22,
    zIndex: 2,
  },
  /* .ring-left / .ring-right bands */
  ringBand: {
    position: 'absolute',
    width: 30,
    height: 38,
    top: 17,
    borderWidth: 2,
    borderColor: C.gold,
    borderRadius: 15,
    backgroundColor: 'transparent',
  },
  ringBandLeft: { left: 8 },
  ringBandRight: { right: 8 },

  /* .welcome-label */
  welcomeLabel: {
    marginTop: -8,
    color: C.teal,
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 7,
    textAlign: 'center',
  },
  /* h1 */
  h1: {
    marginTop: 7,
    color: C.darkTeal,
    fontFamily: 'serif',
    fontSize: 50,
    lineHeight: 50,
    fontWeight: '700',
    textAlign: 'center',
    letterSpacing: -1.8,
  },
  /* .title-divider */
  titleDivider: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: 210,
    marginTop: 18,
    gap: 9,
  },
  dividerLineLeft: {
    flex: 1,
    height: 1,
    backgroundColor: 'rgba(21,157,149,0.45)',
  },
  dividerLineRight: {
    flex: 1,
    height: 1,
    backgroundColor: 'rgba(21,157,149,0.45)',
  },
  /* .tagline */
  tagline: {
    marginTop: 10,
    marginBottom: 14,
    color: C.muted,
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'center',
  },
  /* .verified-badge */
  verifiedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingHorizontal: 20,
    paddingVertical: 9,
    borderWidth: 1,
    borderColor: 'rgba(21,157,149,0.20)',
    borderRadius: 30,
    backgroundColor: 'rgba(210,242,239,0.72)',
  },
  verifiedText: {
    color: C.darkTeal,
    fontSize: 13,
    fontWeight: '700',
  },

  /* ── .features-card ── */
  featuresCard: {
    width: SW - 30,
    marginTop: 10,
    marginBottom: 0,
    paddingVertical: 25,
    paddingHorizontal: 12,
    flexDirection: 'row',
    backgroundColor: 'rgba(255,255,255,0.93)',
    borderRadius: 25,
    shadowColor: '#124d49',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.08,
    shadowRadius: 35,
    elevation: 5,
  },
  feature: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 8,
  },
  featureBorder: {
    borderRightWidth: 1,
    borderRightColor: 'rgba(15,92,87,0.10)',
  },
  featureIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: C.darkTeal,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#053b37',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.14,
    shadowRadius: 15,
    elevation: 4,
  },
  featureH3: {
    marginTop: 12,
    color: C.darkTeal,
    fontSize: 11.5,
    lineHeight: 16,
    fontWeight: '800',
    textAlign: 'center',
  },
  featureLine: {
    width: 28,
    height: 3,
    marginVertical: 9,
    borderRadius: 10,
    backgroundColor: C.teal,
  },
  featureP: {
    color: '#657d7b',
    fontSize: 9,
    lineHeight: 13,
    textAlign: 'center',
  },

  /* ── .stats-card ── */
  statsCard: {
    width: SW - 30,
    marginTop: 18,
    paddingVertical: 17,
    paddingHorizontal: 8,
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: 'rgba(21,157,149,0.16)',
    borderRadius: 22,
  },
  stat: {
    flex: 1,
    alignItems: 'center',
  },
  statBorder: {
    borderRightWidth: 1,
    borderRightColor: 'rgba(21,157,149,0.14)',
  },
  statValue: {
    marginTop: 5,
    marginBottom: 5,
    color: C.darkTeal,
    fontFamily: 'serif',
    fontSize: 27,
    lineHeight: 30,
    fontWeight: '700',
  },
  statLabel: {
    color: C.darkTeal,
    fontSize: 9,
    fontWeight: '500',
    textAlign: 'center',
  },

  /* ── .wedding-section ── */
  weddingSection: {
    position: 'relative',
    width: SW,
    height: 260,
    marginTop: 5,
    overflow: 'hidden',
  },

  /* .hill */
  hill: {
    position: 'absolute',
    bottom: 0,
    width: SW * 0.7,
    height: 90,
    borderTopLeftRadius: 999,
    borderTopRightRadius: 999,
  },
  hillOne: {
    left: -SW * 0.20,
    transform: [{ rotate: '-5deg' }],
  },
  hillTwo: {
    right: -SW * 0.20,
    transform: [{ rotate: '5deg' }],
  },

  /* .palace */
  palace: {
    position: 'absolute',
    bottom: 65,
    width: 120,
    height: 120,
    opacity: 0.34,
  },
  palaceLeft: { left: -10 },
  palaceRight: { right: -10 },

  /* .dome */
  dome: {
    position: 'absolute',
    left: 35,
    top: 5,
    width: 50,
    height: 45,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    backgroundColor: '#8acac4',
  },

  /* .palace-body */
  palaceBody: {
    position: 'absolute',
    bottom: 0,
    left: 10,
    width: 100,
    height: 90,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    backgroundColor: '#8acac4',
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-evenly',
  },

  /* .palace-body span */
  palaceArch: {
    width: 18,
    height: 55,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    backgroundColor: '#e8f8f6',
  },

  /* .couple */
  couple: {
    position: 'absolute',
    zIndex: 5,
    left: '50%',
    marginLeft: -65,   // translateX(-50%) of width:130
    bottom: 42,
    width: 130,
    height: 160,
  },

  /* .groom */
  groom: {
    position: 'absolute',
    left: 10,
    bottom: 0,
    width: 55,
    height: 145,
  },
  groomHead: {
    position: 'absolute',
    left: 17,
    top: 14,
    width: 25,
    height: 28,
    borderRadius: 14,
    backgroundColor: C.darkTeal,
  },
  groomTurban: {
    position: 'absolute',
    left: 13,
    top: 5,
    width: 33,
    height: 16,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    backgroundColor: C.darkTeal,
  },
  groomBody: {
    position: 'absolute',
    left: 10,
    top: 38,
    width: 38,
    height: 80,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    backgroundColor: C.darkTeal,
  },
  groomLeg: {
    position: 'absolute',
    bottom: 0,
    width: 14,
    height: 48,
    backgroundColor: C.darkTeal,
  },

  /* .bride */
  bride: {
    position: 'absolute',
    right: 5,
    bottom: 0,
    width: 70,
    height: 150,
  },
  brideHead: {
    position: 'absolute',
    top: 14,
    left: 25,
    width: 25,
    height: 27,
    borderRadius: 14,
    backgroundColor: '#07504b',
  },
  brideVeil: {
    position: 'absolute',
    top: 12,
    left: 6,
    width: 60,
    height: 90,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    backgroundColor: 'rgba(4,72,67,0.50)',
  },
  /* Bride body — approximates clip-path trapezoid */
  brideBodyTop: {
    position: 'absolute',
    left: 20,
    top: 38,
    width: 36,
    height: 45,
    backgroundColor: C.darkTeal,
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
  },
  brideBodyBottom: {
    position: 'absolute',
    left: 10,
    top: 80,
    width: 56,
    height: 58,
    backgroundColor: C.darkTeal,
    borderTopLeftRadius: 2,
    borderTopRightRadius: 2,
  },
  brideLeg: {
    position: 'absolute',
    left: 32,
    bottom: 0,
    width: 10,
    height: 30,
    backgroundColor: C.darkTeal,
  },

  /* .flower */
  flower: {
    position: 'absolute',
    zIndex: 7,
    color: '#fff',
    fontSize: 50,
    textShadowColor: 'rgba(21,157,149,0.15)',
    textShadowOffset: { width: 0, height: 3 },
    textShadowRadius: 10,
  },
  flowerLeft: { left: 5, bottom: 12 },
  flowerRight: { right: 5, bottom: 12 },

  /* ── .bottom-section ── */
  bottomSection: {
    position: 'relative',
    marginTop: -20,
    paddingHorizontal: 16,
    paddingBottom: 22,
    zIndex: 20,
  },

  /* .start-button */
  startBtnWrap: {
    width: '100%',
    borderRadius: 40,
    borderWidth: 2,
    borderColor: C.goldLight,
    shadowColor: '#043935',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.20,
    shadowRadius: 25,
    elevation: 8,
    overflow: 'hidden',
  },
  startButton: {
    height: 64,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 16,
  },
  startText: {
    color: '#fff',
    fontSize: 21,
    fontWeight: '700',
  },

  /* .login-text */
  loginRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 15,
    marginBottom: 18,
  },
  loginLabel: {
    color: '#647c7a',
    fontSize: 14,
  },
  loginLink: {
    color: C.teal,
    fontSize: 14,
    fontWeight: '800',
  },

  /* .trust-footer */
  trustFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 13,
    borderTopWidth: 1,
    borderTopColor: 'rgba(21,157,149,0.15)',
  },
  trustItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 5,
  },
  trustText: {
    color: '#587471',
    fontSize: 9,
    fontWeight: '500',
  },
});
