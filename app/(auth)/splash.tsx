import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated, Dimensions, Easing, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { Typography, Spacing } from '../../src/constants/theme';
import PatrikaRibbonLogo from '../../src/components/PatrikaRibbonLogo';

const { width, height } = Dimensions.get('window');

const PColors = {
  bgPrimary: '#F3F7FF',
  bgSecondary: '#E8F0FF',
  lavender: '#E9E8FA',
  navy: '#0A2148',
  navySec: '#193B70',
  mutedBlue: '#61769A',
  gold: '#C8A45D',
  white: '#FFFDFC',
  teal: '#198F8A'
};

export default function SplashScreen() {
  const router = useRouter();

  // Animations
  const bgGlowAnim = useRef(new Animated.Value(0)).current;
  const outerRingAnim = useRef(new Animated.Value(0)).current;
  const logoScaleAnim = useRef(new Animated.Value(0.96)).current;
  const logoOpacityAnim = useRef(new Animated.Value(0)).current;
  const contentOpacityAnim = useRef(new Animated.Value(0)).current;
  const contentTranslateY = useRef(new Animated.Value(20)).current;
  const btnScaleAnim = useRef(new Animated.Value(1)).current;
  
  useEffect(() => {
    Animated.sequence([
      // 1. Background glow gently appears
      Animated.timing(bgGlowAnim, {
        toValue: 1,
        duration: 800,
        easing: Easing.out(Easing.ease),
        useNativeDriver: Platform.OS !== 'web',
      }),
      // 2. Logo sequence (Ring fades in, scale up, logo fades in)
      Animated.parallel([
        Animated.timing(outerRingAnim, {
          toValue: 1,
          duration: 600,
          easing: Easing.out(Easing.ease),
          useNativeDriver: Platform.OS !== 'web',
        }),
        Animated.timing(logoScaleAnim, {
          toValue: 1,
          duration: 700,
          easing: Easing.out(Easing.back(1.2)),
          useNativeDriver: Platform.OS !== 'web',
        }),
        Animated.timing(logoOpacityAnim, {
          toValue: 1,
          duration: 700,
          easing: Easing.out(Easing.ease),
          useNativeDriver: Platform.OS !== 'web',
        })
      ]),
      // 3. Content fades in
      Animated.parallel([
        Animated.timing(contentOpacityAnim, {
          toValue: 1,
          duration: 600,
          useNativeDriver: Platform.OS !== 'web',
        }),
        Animated.timing(contentTranslateY, {
          toValue: 0,
          duration: 600,
          easing: Easing.out(Easing.circle),
          useNativeDriver: Platform.OS !== 'web',
        })
      ])
    ]).start();
  }, []);

  const handleBtnPressIn = () => {
    Animated.timing(btnScaleAnim, {
      toValue: 0.97,
      duration: 100,
      useNativeDriver: true,
    }).start();
  };

  const handleBtnPressOut = () => {
    Animated.timing(btnScaleAnim, {
      toValue: 1,
      duration: 150,
      useNativeDriver: true,
    }).start();
  };

  return (
    <View style={styles.container}>
      {/* Background Depth & Gradients */}
      <LinearGradient 
        colors={['#F8FAFF', '#EAF1FF', '#F2F0FA']} 
        style={StyleSheet.absoluteFill}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      />
      
      {/* Subtle Oversized Abstract Forms */}
      <Animated.View style={[styles.bgShapesContainer, { opacity: bgGlowAnim }]}>
        <View style={styles.bgCircle1} />
        <View style={styles.bgCircle2} />
        <View style={styles.bgArc} />
      </Animated.View>

      <SafeAreaView style={styles.safeArea}>

        {/* Center Content */}
        <View style={styles.centerContent}>
          {/* Logo Container */}
          <Animated.View 
            style={[
              styles.logoWrapper, 
              { 
                transform: [{ scale: logoScaleAnim }],
              }
            ]}
          >
            {/* Outer Ring */}
            <Animated.View style={[styles.logoOuterRing, { opacity: outerRingAnim }]} />
            {/* Second Ring */}
            <Animated.View style={[styles.logoSecondRing, { opacity: outerRingAnim }]} />
            {/* Inner Surface */}
            <View style={styles.logoInnerSurface}>
              <Animated.View style={{ opacity: logoOpacityAnim }}>
                <PatrikaRibbonLogo size={72} />
              </Animated.View>
            </View>
          </Animated.View>

          <Animated.View 
            style={[
              styles.textContent, 
              { 
                opacity: contentOpacityAnim,
                transform: [{ translateY: contentTranslateY }]
              }
            ]}
          >
            {/* Brand Name */}
            <Text style={styles.brandTitle}>PATRIKA</Text>
            <Text style={styles.brandSubtitle}>MATRIMONY</Text>

            {/* Elegant Divider */}
            <View style={styles.dividerContainer}>
              <View style={styles.dividerLine} />
              <View style={styles.dividerDiamond} />
              <View style={styles.dividerLine} />
            </View>

            {/* Tagline */}
            <Text style={styles.tagline}>Where meaningful connections begin.</Text>
            <View style={styles.emotionalCueContainer}>
              <View style={styles.cueDot} />
              <View style={styles.cueLine} />
              <View style={styles.cueDot} />
            </View>
          </Animated.View>
        </View>

        {/* Bottom Actions */}
        <Animated.View 
          style={[
            styles.bottomContent,
            { 
              opacity: contentOpacityAnim,
              transform: [{ translateY: contentTranslateY }]
            }
          ]}
        >
          <Animated.View style={{ transform: [{ scale: btnScaleAnim }], width: '100%', alignItems: 'center' }}>
            <TouchableOpacity 
              style={styles.primaryBtn}
              activeOpacity={0.9}
              onPressIn={handleBtnPressIn}
              onPressOut={handleBtnPressOut}
              onPress={() => router.push('/(auth)/onboarding/step1')}
            >
              <Text style={styles.primaryBtnText}>Begin Your Journey</Text>
              <Text style={styles.primaryBtnArrow}>→</Text>
            </TouchableOpacity>
          </Animated.View>

          <View style={styles.signInContainer}>
            <Text style={styles.signInText}>Already a member? </Text>
            <TouchableOpacity onPress={() => router.push('/(auth)/login')}>
              <Text style={styles.signInLink}>Sign In</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.trustText}>Secure • Private • Trusted</Text>
        </Animated.View>

      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: PColors.bgPrimary,
  },
  bgShapesContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bgCircle1: {
    position: 'absolute',
    top: -height * 0.1,
    right: -width * 0.2,
    width: width * 0.8,
    height: width * 0.8,
    borderRadius: width * 0.4,
    backgroundColor: 'rgba(233, 232, 250, 0.4)', // Soft lavender
  },
  bgCircle2: {
    position: 'absolute',
    bottom: height * 0.1,
    left: -width * 0.3,
    width: width * 0.9,
    height: width * 0.9,
    borderRadius: width * 0.45,
    backgroundColor: 'rgba(232, 240, 255, 0.4)',
  },
  bgArc: {
    position: 'absolute',
    top: height * 0.3,
    width: width * 1.5,
    height: width * 1.5,
    borderRadius: width * 0.75,
    borderWidth: 1,
    borderColor: 'rgba(200, 164, 93, 0.05)',
    borderStyle: 'dashed',
  },
  safeArea: {
    flex: 1,
    justifyContent: 'space-between',
  },
  centerContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: Spacing['2xl'],
  },
  logoWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 170,
    height: 170,
    marginBottom: Spacing['3xl'],
  },
  logoOuterRing: {
    position: 'absolute',
    width: 170,
    height: 170,
    borderRadius: 85,
    borderWidth: 0.5,
    borderColor: PColors.gold,
    opacity: 0.8,
  },
  logoSecondRing: {
    position: 'absolute',
    width: 150,
    height: 150,
    borderRadius: 75,
    borderWidth: 1,
    borderColor: 'rgba(97, 118, 154, 0.15)', // translucent blue
  },
  logoInnerSurface: {
    width: 124,
    height: 124,
    borderRadius: 62,
    backgroundColor: PColors.white,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: PColors.navy,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.06,
    shadowRadius: 16,
    elevation: 4,
  },
  textContent: {
    alignItems: 'center',
    width: '100%',
  },
  brandTitle: {
    fontFamily: Typography.fontFamily.serif,
    fontSize: 28,
    color: PColors.navy,
    letterSpacing: 6,
    textAlign: 'center',
    marginBottom: 6,
  },
  brandSubtitle: {
    fontFamily: Typography.fontFamily.serif,
    fontSize: 30,
    color: PColors.navy,
    letterSpacing: 4,
    textAlign: 'center',
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 32,
    width: 140,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: 'rgba(200, 164, 93, 0.4)',
  },
  dividerDiamond: {
    width: 7,
    height: 7,
    backgroundColor: PColors.gold,
    transform: [{ rotate: '45deg' }],
    marginHorizontal: 16,
  },
  tagline: {
    fontFamily: Typography.fontFamily.sansMedium,
    fontSize: 18,
    color: PColors.mutedBlue,
    letterSpacing: 0.5,
    textAlign: 'center',
    marginBottom: Spacing.lg,
  },
  emotionalCueContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: Spacing.sm,
    width: 40,
  },
  cueDot: {
    width: 3,
    height: 3,
    borderRadius: 1.5,
    backgroundColor: PColors.gold,
  },
  cueLine: {
    flex: 1,
    height: 1,
    backgroundColor: 'rgba(200, 164, 93, 0.4)',
    marginHorizontal: 4,
  },
  bottomContent: {
    paddingHorizontal: Spacing['2xl'],
    paddingBottom: Platform.OS === 'ios' ? 40 : 24,
    alignItems: 'center',
  },
  primaryBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: PColors.navy,
    width: width - (Spacing['2xl'] * 2),
    height: 56,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: 'rgba(200, 164, 93, 0.3)', // subtle gold border
    shadowColor: PColors.navy,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.16,
    shadowRadius: 25,
    elevation: 8,
    marginBottom: Spacing.xl,
  },
  primaryBtnText: {
    fontFamily: Typography.fontFamily.sansMedium,
    fontSize: 16,
    color: PColors.white,
    letterSpacing: 0.5,
  },
  primaryBtnArrow: {
    fontFamily: Typography.fontFamily.sansMedium,
    fontSize: 18,
    color: PColors.white,
    marginLeft: 12,
  },
  signInContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing['2xl'],
  },
  signInText: {
    fontFamily: Typography.fontFamily.sans,
    fontSize: 15,
    color: PColors.mutedBlue,
  },
  signInLink: {
    fontFamily: Typography.fontFamily.sansMedium,
    fontSize: 15,
    color: PColors.teal,
  },
  trustText: {
    fontFamily: Typography.fontFamily.sansMedium,
    fontSize: 11,
    color: 'rgba(97, 118, 154, 0.6)',
    letterSpacing: 1.5,
    textTransform: 'uppercase',
  }
});
