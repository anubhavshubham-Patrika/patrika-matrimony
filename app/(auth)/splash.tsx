import React, { useEffect, useRef } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, Animated,
  SafeAreaView, ScrollView, Dimensions,
} from 'react-native';
import Svg, {
  Path, Ellipse, Circle, G, Rect,
  Defs, RadialGradient, Stop, ClipPath,
} from 'react-native-svg';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useApp } from '../../src/context/AppContext';
import MintGlassBackground from '../../src/components/MintGlassBackground';
import PalaceScene from '../../src/components/PalaceScene';

const { width: SW } = Dimensions.get('window');

/* ─────────────────────────────────────────────
   Mughal arch + wedding rings inline SVG
───────────────────────────────────────────── */
function ArchEmblem() {
  const AW = 180;
  const AH = 220;
  // arch shape: pointed Mughal arch (wider than tall ratio for pointed top)
  // Using a path: left pillar → pointed top arc → right pillar → bottom
  const archPath = `
    M 18,${AH}
    L 18,85
    Q 18,18 ${AW / 2},12
    Q ${AW - 18},18 ${AW - 18},85
    L ${AW - 18},${AH}
    Z
  `;
  // Slightly larger gold border path
  const goldPath = `
    M 12,${AH}
    L 12,85
    Q 12,8 ${AW / 2},4
    Q ${AW - 12},8 ${AW - 12},85
    L ${AW - 12},${AH}
    Z
  `;

  return (
    <View style={styles.archEmblemWrapper}>
      {/* Outer faint concentric ring 1 */}
      <View style={styles.ringOuter1} />
      {/* Outer faint concentric ring 2 */}
      <View style={styles.ringOuter2} />

      {/* Arch SVG */}
      <Svg width={AW} height={AH} style={{ zIndex: 2 }}>
        <Defs>
          <RadialGradient id="archGold" cx="50%" cy="50%" r="50%">
            <Stop offset="0%" stopColor="#D4AF37" />
            <Stop offset="100%" stopColor="#8B6914" />
          </RadialGradient>
          <RadialGradient id="ringGold1" cx="50%" cy="40%" r="60%">
            <Stop offset="0%" stopColor="#F5D06A" />
            <Stop offset="55%" stopColor="#D4AF37" />
            <Stop offset="100%" stopColor="#A07C1A" />
          </RadialGradient>
          <RadialGradient id="ringGold2" cx="50%" cy="40%" r="60%">
            <Stop offset="0%" stopColor="#F7DC7E" />
            <Stop offset="55%" stopColor="#C9962A" />
            <Stop offset="100%" stopColor="#915E0A" />
          </RadialGradient>
        </Defs>

        {/* Gold border shadow */}
        <Path d={goldPath} fill="#C8941A" opacity={0.35} />
        {/* Gold outline */}
        <Path d={goldPath} fill="none" stroke="#D4AF37" strokeWidth={4} />
        {/* Dark teal arch body */}
        <Path d={archPath} fill="#0A4A3C" />
        {/* Subtle inner highlight at arch top */}
        <Path
          d={`M 40,${AH} L 40,92 Q 40,30 ${AW/2},25 Q ${AW-40},30 ${AW-40},92 L ${AW-40},${AH}`}
          fill="rgba(255,255,255,0.04)"
        />

        {/* ── White circle for logo ── */}
        <Circle cx={AW / 2} cy={AH * 0.48} r={55} fill="#FFFFFF" />
        <Circle cx={AW / 2} cy={AH * 0.48} r={55} fill="none" stroke="rgba(212,175,55,0.3)" strokeWidth={1.5} />

        {/* ── Crown / Lotus on top ── */}
        {/* centre gem */}
        <Ellipse cx={AW/2} cy={AH*0.48 - 38} rx={5} ry={7} fill="url(#ringGold1)" />
        {/* left gem */}
        <Ellipse cx={AW/2 - 12} cy={AH*0.48 - 34} rx={4} ry={5.5} fill="url(#ringGold1)" />
        {/* right gem */}
        <Ellipse cx={AW/2 + 12} cy={AH*0.48 - 34} rx={4} ry={5.5} fill="url(#ringGold1)" />
        {/* crown base bar */}
        <Rect x={AW/2 - 20} y={AH*0.48 - 27} width={40} height={5} rx={2} fill="url(#archGold)" />

        {/* ── Left ring ── */}
        <Circle cx={AW/2 - 10} cy={AH*0.48 + 6} r={22} fill="none" stroke="url(#ringGold1)" strokeWidth={9} />
        {/* ── Right ring ── */}
        <Circle cx={AW/2 + 10} cy={AH*0.48 + 6} r={22} fill="none" stroke="url(#ringGold2)" strokeWidth={9} />
        {/* Overlap bridge (arch background color to create depth) */}
        <Path
          d={`M ${AW/2},${AH*0.48 - 14} Q ${AW/2 + 8},${AH*0.48} ${AW/2},${AH*0.48 + 14} Q ${AW/2 - 8},${AH*0.48} ${AW/2},${AH*0.48 - 14}`}
          fill="#FFFFFF"
        />
        {/* Overlap ring highlight */}
        <Path
          d={`M ${AW/2},${AH*0.48 - 12} Q ${AW/2 + 6},${AH*0.48} ${AW/2},${AH*0.48 + 12} Q ${AW/2 - 6},${AH*0.48} ${AW/2},${AH*0.48 - 12}`}
          fill="none"
          stroke="#D4AF37"
          strokeWidth={2}
        />
      </Svg>

      {/* Sparkle dots */}
      <View style={[styles.sparkle, { top: 30, right: 10 }]} />
      <View style={[styles.sparkle, { top: 60, left: 8 }]} />
      <View style={[styles.sparkle, { bottom: 40, right: 14 }]} />
    </View>
  );
}

/* ─────────────────────────────────────────────
   Large decorative white flowers (left side)
───────────────────────────────────────────── */
function LeftFloral() {
  return (
    <View style={styles.floralLeft} pointerEvents="none">
      <Svg width={130} height={310}>
        <Defs>
          <RadialGradient id="petalGrad" cx="50%" cy="30%" r="70%">
            <Stop offset="0%" stopColor="#FFFFFF" />
            <Stop offset="100%" stopColor="#D8F0EC" />
          </RadialGradient>
          <RadialGradient id="petalGrad2" cx="50%" cy="30%" r="70%">
            <Stop offset="0%" stopColor="#FFFFFF" />
            <Stop offset="100%" stopColor="#C8EAE5" />
          </RadialGradient>
        </Defs>

        {/* ── LARGE FLOWER TOP ── */}
        {/* 6-petal arrangement */}
        {[0,60,120,180,240,300].map((angle, i) => {
          const rad = (angle * Math.PI) / 180;
          const cx = 55, cy = 80, r = 28;
          const px = cx + Math.cos(rad) * r;
          const py = cy + Math.sin(rad) * r;
          return (
            <Ellipse
              key={i}
              cx={px} cy={py}
              rx={16} ry={22}
              fill="url(#petalGrad)"
              transform={`rotate(${angle} ${px} ${py})`}
              opacity={0.92}
            />
          );
        })}
        {/* Centre */}
        <Circle cx={55} cy={80} r={14} fill="#F0FAF8" />
        <Circle cx={55} cy={80} r={8} fill="#E0F5F0" />
        {/* Stamens */}
        {[0,45,90,135,180,225,270,315].map((a,i)=>{
          const rad = a*Math.PI/180;
          return <Circle key={i} cx={55+Math.cos(rad)*5} cy={80+Math.sin(rad)*5} r={1.5} fill="#A8D8D0" />;
        })}

        {/* Stem and leaves */}
        <Path d="M 55,94 Q 40,140 35,200" stroke="#7DC4B8" strokeWidth={3.5} fill="none" strokeLinecap="round" />
        {/* Left leaf */}
        <Path d="M 48,130 Q 20,118 18,100 Q 35,108 48,130" fill="#7DC4B8" opacity={0.8} />
        {/* Right leaf */}
        <Path d="M 42,158 Q 12,145 10,126 Q 30,136 42,158" fill="#6BB5A8" opacity={0.7} />

        {/* ── SMALLER FLOWER BOTTOM ── */}
        {[0,72,144,216,288].map((angle, i) => {
          const rad = (angle * Math.PI) / 180;
          const cx2 = 38, cy2 = 240, r2 = 20;
          const px = cx2 + Math.cos(rad) * r2;
          const py = cy2 + Math.sin(rad) * r2;
          return (
            <Ellipse
              key={`b${i}`}
              cx={px} cy={py}
              rx={12} ry={17}
              fill="url(#petalGrad2)"
              transform={`rotate(${angle} ${px} ${py})`}
              opacity={0.88}
            />
          );
        })}
        <Circle cx={38} cy={240} r={10} fill="#F0FAF8" />
        <Circle cx={38} cy={240} r={6} fill="#DFF5F0" />

        {/* Bud top-left */}
        <Ellipse cx={25} cy={34} rx={10} ry={14} fill="rgba(255,255,255,0.75)" />
        <Ellipse cx={20} cy={30} rx={8} ry={12} fill="rgba(255,255,255,0.65)" />
        <Path d="M 22,44 Q 18,60 16,80" stroke="#7DC4B8" strokeWidth={2.5} fill="none" />

        {/* Small leaf top */}
        <Path d="M 80,18 Q 100,10 105,25 Q 90,22 80,18" fill="#7DC4B8" opacity={0.75} />
        <Path d="M 85,28 Q 110,22 115,40 Q 98,34 85,28" fill="#6BB5A8" opacity={0.6} />
      </Svg>
    </View>
  );
}

/* ─────────────────────────────────────────────
   Small decorative flowers top-right
───────────────────────────────────────────── */
function TopRightFloral() {
  return (
    <View style={styles.floralTopRight} pointerEvents="none">
      <Svg width={70} height={80}>
        <Defs>
          <RadialGradient id="pG3" cx="50%" cy="30%" r="70%">
            <Stop offset="0%" stopColor="#FFFFFF" />
            <Stop offset="100%" stopColor="#D8F0EC" />
          </RadialGradient>
        </Defs>
        {/* small bud */}
        {[0,72,144,216,288].map((angle,i)=>{
          const rad=(angle*Math.PI)/180;
          const px=35+Math.cos(rad)*16, py=35+Math.sin(rad)*16;
          return <Ellipse key={i} cx={px} cy={py} rx={9} ry={13} fill="url(#pG3)" transform={`rotate(${angle} ${px} ${py})`} opacity={0.85} />;
        })}
        <Circle cx={35} cy={35} r={8} fill="#F0FAF8" />
        <Circle cx={35} cy={35} r={4} fill="#E0F5F0" />
        {/* mini bud */}
        <Ellipse cx={15} cy={12} rx={6} ry={9} fill="rgba(255,255,255,0.7)" />
        <Ellipse cx={60} cy={15} rx={5} ry={7} fill="rgba(255,255,255,0.6)" />
        <Path d="M 35,44 Q 28,62 25,75" stroke="#7DC4B8" strokeWidth={2} fill="none" />
      </Svg>
    </View>
  );
}

/* ─────────────────────────────────────────────
   Main Splash Screen
───────────────────────────────────────────── */
const FEATURES = [
  { icon: 'shield-checkmark' as const, title: 'Verified\nProfiles', sub: '100% trusted &\nauthentic' },
  { icon: 'search' as const, title: 'Smart\nMatches', sub: 'AI powered\ncompatibility' },
  { icon: 'lock-closed' as const, title: 'Privacy\nFirst', sub: 'Your data is safe\n& secure' },
  { icon: 'heart' as const, title: 'Serious\nConnections', sub: 'For meaningful\nrelationships' },
];

const STATS = [
  { icon: 'people-outline' as const, value: '2L+', label: 'Happy Members' },
  { icon: 'shield-checkmark-outline' as const, value: '100%', label: 'Verified Profiles' },
  { icon: 'heart-outline' as const, value: '50K+', label: 'Successful Matches' },
  { icon: 'trophy-outline' as const, value: '20+', label: 'Years of Trust' },
];

export default function SplashScreen() {
  const router = useRouter();
  const { state, dispatch } = useApp();
  const lang = state.language || 'en';

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(20)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, { toValue: 1, duration: 600, useNativeDriver: true }),
      Animated.timing(slideAnim, { toValue: 0, duration: 600, useNativeDriver: true }),
    ]).start();
  }, []);

  const toggleLanguage = () =>
    dispatch({ type: 'SET_LANGUAGE', payload: lang === 'en' ? 'hi' : 'en' });

  return (
    <MintGlassBackground>
      <SafeAreaView style={styles.safe}>
        {/* ── Big white flowers LEFT (absolute, behind content) ── */}
        <LeftFloral />

        {/* ── Small florals top-right corner ── */}
        <TopRightFloral />

        {/* ── LANGUAGE BUTTON (top-right) ── */}
        <View style={styles.topBar}>
          <TouchableOpacity style={styles.langPill} onPress={toggleLanguage} activeOpacity={0.85}>
            <Ionicons name="globe-outline" size={15} color="#0F2E2B" />
            <Text style={styles.langText}>{lang === 'en' ? 'English' : 'हिंदी'}</Text>
            <Ionicons name="chevron-down" size={13} color="#0F2E2B" />
          </TouchableOpacity>
        </View>

        <ScrollView
          contentContainerStyle={styles.scroll}
          showsVerticalScrollIndicator={false}
          bounces={false}
        >
          <Animated.View style={{ opacity: fadeAnim, transform: [{ translateY: slideAnim }], alignItems: 'center', width: '100%' }}>

            {/* ── ARCH EMBLEM ── */}
            <ArchEmblem />

            {/* ── HEADLINE ── */}
            <Text style={styles.welcomeLabel}>W E L C O M E  T O</Text>
            <Text style={styles.brand1}>Patrika</Text>
            <Text style={styles.brand2}>Matrimony</Text>

            {/* Heart line divider */}
            <View style={styles.heartRow}>
              <View style={styles.heartLine} />
              <Ionicons name="heart" size={13} color="#0A4A3C" style={{ marginHorizontal: 8 }} />
              <View style={styles.heartLine} />
            </View>

            <Text style={styles.tagline}>Trusted matches from Rajasthan Patrika</Text>

            {/* Verified pill */}
            <View style={styles.verifiedPill}>
              <Ionicons name="shield-checkmark" size={16} color="#0A4A3C" style={{ marginRight: 7 }} />
              <Text style={styles.verifiedText}>100% Verified Profiles</Text>
            </View>

            {/* ── FEATURE CARD ── */}
            <View style={styles.featureCard}>
              {FEATURES.map((f, idx) => (
                <View key={f.title} style={[styles.featureCol, idx < 3 && styles.featureColBorder]}>
                  <View style={styles.featIconBg}>
                    <Ionicons name={f.icon} size={19} color="#FFFFFF" />
                  </View>
                  <Text style={styles.featTitle}>{f.title}</Text>
                  <Text style={styles.featSub}>{f.sub}</Text>
                </View>
              ))}
            </View>

            {/* ── STATS ROW ── */}
            <View style={styles.statsCard}>
              {STATS.map((s, idx) => (
                <View key={s.label} style={[styles.statCol, idx < 3 && styles.statColBorder]}>
                  <Ionicons name={s.icon} size={22} color="#0A4A3C" />
                  <Text style={styles.statValue}>{s.value}</Text>
                  <Text style={styles.statLabel}>{s.label}</Text>
                </View>
              ))}
            </View>

            {/* ── PALACE SCENE BANNER ── */}
            <View style={styles.palaceWrapper}>
              {/* Mint tinted bg */}
              <View style={styles.palaceBg} />
              {/* White flowers left */}
              <View style={styles.palaceFlowerLeft} pointerEvents="none">
                <Svg width={85} height={130}>
                  <Defs>
                    <RadialGradient id="pfl" cx="50%" cy="30%" r="70%">
                      <Stop offset="0%" stopColor="#FFFFFF" />
                      <Stop offset="100%" stopColor="#D8F0EC" />
                    </RadialGradient>
                  </Defs>
                  {[0,72,144,216,288].map((a,i)=>{
                    const r=(a*Math.PI)/180, cx=42, cy=50;
                    return <Ellipse key={i} cx={cx+Math.cos(r)*20} cy={cy+Math.sin(r)*20} rx={13} ry={18} fill="url(#pfl)" transform={`rotate(${a} ${cx+Math.cos(r)*20} ${cy+Math.sin(r)*20})`} opacity={0.9} />;
                  })}
                  <Circle cx={42} cy={50} r={10} fill="#F5FFFE" />
                  {[0,72,144,216,288].map((a,i)=>{
                    const r=(a*Math.PI)/180, cx=42, cy=100;
                    return <Ellipse key={`s${i}`} cx={cx+Math.cos(r)*14} cy={cy+Math.sin(r)*14} rx={9} ry={12} fill="url(#pfl)" transform={`rotate(${a} ${cx+Math.cos(r)*14} ${cy+Math.sin(r)*14})`} opacity={0.8} />;
                  })}
                  <Circle cx={42} cy={100} r={7} fill="#F5FFFE" />
                </Svg>
              </View>
              {/* White flowers right */}
              <View style={styles.palaceFlowerRight} pointerEvents="none">
                <Svg width={85} height={130}>
                  <Defs>
                    <RadialGradient id="pfr" cx="50%" cy="30%" r="70%">
                      <Stop offset="0%" stopColor="#FFFFFF" />
                      <Stop offset="100%" stopColor="#D8F0EC" />
                    </RadialGradient>
                  </Defs>
                  {[0,72,144,216,288].map((a,i)=>{
                    const r=(a*Math.PI)/180, cx=43, cy=50;
                    return <Ellipse key={i} cx={cx+Math.cos(r)*20} cy={cy+Math.sin(r)*20} rx={13} ry={18} fill="url(#pfr)" transform={`rotate(${a} ${cx+Math.cos(r)*20} ${cy+Math.sin(r)*20})`} opacity={0.9} />;
                  })}
                  <Circle cx={43} cy={50} r={10} fill="#F5FFFE" />
                  {[0,72,144,216,288].map((a,i)=>{
                    const r=(a*Math.PI)/180, cx=43, cy=100;
                    return <Ellipse key={`s${i}`} cx={cx+Math.cos(r)*14} cy={cy+Math.sin(r)*14} rx={9} ry={12} fill="url(#pfr)" transform={`rotate(${a} ${cx+Math.cos(r)*14} ${cy+Math.sin(r)*14})`} opacity={0.8} />;
                  })}
                  <Circle cx={43} cy={100} r={7} fill="#F5FFFE" />
                </Svg>
              </View>
              {/* Palace + couple SVG */}
              <PalaceScene width={SW - 36} height={190} />
            </View>

          </Animated.View>
        </ScrollView>

        {/* ── CTA + FOOTER ── */}
        <Animated.View style={[styles.footer, { opacity: fadeAnim }]}>
          {/* Big CTA */}
          <TouchableOpacity
            style={styles.ctaBtn}
            onPress={() => router.push('/(auth)/onboarding/step1')}
            activeOpacity={0.88}
          >
            <Text style={styles.ctaText}>Let's Start   →</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => router.push('/(auth)/login')} activeOpacity={0.75}>
            <Text style={styles.loginText}>
              Already have an account?{'  '}
              <Text style={styles.loginLink}>Login</Text>
            </Text>
          </TouchableOpacity>

          <View style={styles.footerRow}>
            <Ionicons name="lock-closed-outline" size={11} color="#5A8A82" />
            <Text style={styles.footerItem}>  Secure & Private</Text>
            <Text style={styles.footerDot}>  ·  </Text>
            <Ionicons name="people-outline" size={11} color="#5A8A82" />
            <Text style={styles.footerItem}>  Trusted by Millions</Text>
            <Text style={styles.footerDot}>  ·  </Text>
            <Ionicons name="heart" size={11} color="#0A4A3C" />
            <Text style={styles.footerItem}>  Made with ❤️ in India</Text>
          </View>
        </Animated.View>
      </SafeAreaView>
    </MintGlassBackground>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1 },

  /* ── Floral decorations ── */
  floralLeft: {
    position: 'absolute',
    left: -10,
    top: 0,
    zIndex: 1,
    opacity: 0.92,
  },
  floralTopRight: {
    position: 'absolute',
    right: -5,
    top: 100,
    zIndex: 1,
    opacity: 0.75,
  },

  /* ── Top bar ── */
  topBar: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingHorizontal: 16,
    paddingTop: 8,
    zIndex: 20,
  },
  langPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: 'rgba(255,255,255,0.90)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.95)',
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 8,
    shadowColor: '#0F2E2B',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
  },
  langText: { fontSize: 13, fontWeight: '700', color: '#0F2E2B' },

  /* ── Scroll ── */
  scroll: {
    paddingHorizontal: 18,
    paddingTop: 0,
    paddingBottom: 6,
    alignItems: 'center',
    zIndex: 5,
  },

  /* ── Arch emblem ── */
  archEmblemWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 4,
    marginBottom: 8,
    position: 'relative',
    width: 220,
    height: 250,
  },
  ringOuter1: {
    position: 'absolute',
    width: 210,
    height: 210,
    borderRadius: 105,
    borderWidth: 1,
    borderColor: 'rgba(10,74,60,0.12)',
    backgroundColor: 'rgba(10,74,60,0.03)',
    top: 20,
  },
  ringOuter2: {
    position: 'absolute',
    width: 168,
    height: 168,
    borderRadius: 84,
    borderWidth: 1,
    borderColor: 'rgba(10,74,60,0.16)',
    backgroundColor: 'rgba(10,74,60,0.04)',
    top: 41,
  },
  sparkle: {
    position: 'absolute',
    width: 5,
    height: 5,
    borderRadius: 3,
    backgroundColor: 'rgba(212,175,55,0.5)',
  },

  /* ── Headline ── */
  welcomeLabel: {
    fontSize: 12,
    fontWeight: '800',
    color: '#0A8A7A',
    letterSpacing: 4.5,
    textAlign: 'center',
    marginBottom: 2,
  },
  brand1: {
    fontSize: 46,
    fontWeight: '900',
    color: '#0A2218',
    textAlign: 'center',
    lineHeight: 52,
    fontFamily: 'serif',
  },
  brand2: {
    fontSize: 46,
    fontWeight: '900',
    color: '#0A2218',
    textAlign: 'center',
    lineHeight: 52,
    fontFamily: 'serif',
    marginBottom: 14,
  },
  heartRow: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '65%',
    marginBottom: 10,
  },
  heartLine: {
    flex: 1,
    height: 1,
    backgroundColor: 'rgba(10,74,60,0.2)',
  },
  tagline: {
    fontSize: 14,
    fontWeight: '500',
    color: '#4A7A72',
    textAlign: 'center',
    marginBottom: 14,
  },

  /* Verified pill */
  verifiedPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(10,74,60,0.08)',
    borderWidth: 1.5,
    borderColor: 'rgba(10,74,60,0.18)',
    borderRadius: 24,
    paddingHorizontal: 20,
    paddingVertical: 9,
    marginBottom: 20,
  },
  verifiedText: {
    fontSize: 14,
    fontWeight: '800',
    color: '#0A2218',
  },

  /* ── Feature card ── */
  featureCard: {
    width: '100%',
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    paddingVertical: 20,
    paddingHorizontal: 8,
    shadowColor: '#0A4A3C',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.10,
    shadowRadius: 16,
    elevation: 5,
    marginBottom: 14,
  },
  featureCol: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 2,
  },
  featureColBorder: {
    borderRightWidth: 1,
    borderRightColor: 'rgba(0,0,0,0.06)',
  },
  featIconBg: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: '#0A4A3C',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 9,
    shadowColor: '#0A4A3C',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 4,
  },
  featTitle: {
    fontSize: 11,
    fontWeight: '800',
    color: '#0A2218',
    textAlign: 'center',
    marginBottom: 4,
    lineHeight: 15,
  },
  featSub: {
    fontSize: 9.5,
    color: '#6A9A92',
    textAlign: 'center',
    lineHeight: 13,
  },

  /* ── Stats card ── */
  statsCard: {
    width: '100%',
    flexDirection: 'row',
    backgroundColor: 'rgba(10,74,60,0.07)',
    borderWidth: 1,
    borderColor: 'rgba(10,74,60,0.12)',
    borderRadius: 18,
    paddingVertical: 16,
    paddingHorizontal: 4,
    marginBottom: 14,
  },
  statCol: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 2,
  },
  statColBorder: {
    borderRightWidth: 1,
    borderRightColor: 'rgba(10,74,60,0.15)',
  },
  statValue: {
    fontSize: 20,
    fontWeight: '900',
    color: '#0A2218',
    marginTop: 5,
    marginBottom: 3,
  },
  statLabel: {
    fontSize: 9,
    color: '#5A8A82',
    textAlign: 'center',
    fontWeight: '600',
    lineHeight: 12,
  },

  /* ── Palace banner ── */
  palaceWrapper: {
    width: '100%',
    height: 190,
    borderRadius: 22,
    overflow: 'hidden',
    position: 'relative',
    marginBottom: 2,
  },
  palaceBg: {
    ...StyleSheet.absoluteFill,
    backgroundColor: 'rgba(10,74,60,0.07)',
    borderWidth: 1,
    borderColor: 'rgba(10,74,60,0.12)',
    borderRadius: 22,
  },
  palaceFlowerLeft: {
    position: 'absolute',
    left: -4,
    bottom: 0,
    zIndex: 5,
  },
  palaceFlowerRight: {
    position: 'absolute',
    right: -4,
    bottom: 0,
    zIndex: 5,
  },

  /* ── Footer ── */
  footer: {
    paddingHorizontal: 18,
    paddingBottom: 14,
    paddingTop: 6,
    alignItems: 'center',
    zIndex: 10,
  },
  ctaBtn: {
    width: '100%',
    backgroundColor: '#0A2E25',
    borderRadius: 32,
    paddingVertical: 18,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#0A2218',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.32,
    shadowRadius: 20,
    elevation: 10,
    marginBottom: 14,
  },
  ctaText: {
    color: '#FFFFFF',
    fontSize: 19,
    fontWeight: '900',
    letterSpacing: 0.4,
  },
  loginText: {
    fontSize: 13.5,
    color: '#5A8A82',
    fontWeight: '500',
    marginBottom: 10,
  },
  loginLink: {
    color: '#0A8A7A',
    fontWeight: '800',
  },
  footerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  footerItem: {
    fontSize: 10,
    color: '#5A8A82',
  },
  footerDot: {
    fontSize: 10,
    color: '#5A8A82',
  },
});
