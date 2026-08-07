import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

interface AnimatedGlassBackgroundProps {
  children: React.ReactNode;
}

export default function AnimatedGlassBackground({ children }: AnimatedGlassBackgroundProps) {
  // Animated values for floating bokeh light orbs
  const orb1Y = useRef(new Animated.Value(0)).current;
  const orb1Scale = useRef(new Animated.Value(1)).current;

  const orb2Y = useRef(new Animated.Value(0)).current;
  const orb2Scale = useRef(new Animated.Value(1)).current;

  const orb3Y = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Continuous floating and pulsing loop for Orb 1 (Top Crimson Glow)
    const anim1 = Animated.loop(
      Animated.parallel([
        Animated.sequence([
          Animated.timing(orb1Y, {
            toValue: -30,
            duration: 4000,
            useNativeDriver: true,
          }),
          Animated.timing(orb1Y, {
            toValue: 20,
            duration: 4500,
            useNativeDriver: true,
          }),
        ]),
        Animated.sequence([
          Animated.timing(orb1Scale, {
            toValue: 1.25,
            duration: 3500,
            useNativeDriver: true,
          }),
          Animated.timing(orb1Scale, {
            toValue: 0.9,
            duration: 4000,
            useNativeDriver: true,
          }),
        ]),
      ])
    );

    // Continuous floating loop for Orb 2 (Right Rose Glow)
    const anim2 = Animated.loop(
      Animated.parallel([
        Animated.sequence([
          Animated.timing(orb2Y, {
            toValue: 40,
            duration: 5000,
            useNativeDriver: true,
          }),
          Animated.timing(orb2Y, {
            toValue: -25,
            duration: 4000,
            useNativeDriver: true,
          }),
        ]),
        Animated.sequence([
          Animated.timing(orb2Scale, {
            toValue: 1.15,
            duration: 4200,
            useNativeDriver: true,
          }),
          Animated.timing(orb2Scale, {
            toValue: 0.95,
            duration: 3800,
            useNativeDriver: true,
          }),
        ]),
      ])
    );

    // Continuous loop for Orb 3 (Bottom Ambient Glow)
    const anim3 = Animated.loop(
      Animated.sequence([
        Animated.timing(orb3Y, {
          toValue: -35,
          duration: 6000,
          useNativeDriver: true,
        }),
        Animated.timing(orb3Y, {
          toValue: 15,
          duration: 5000,
          useNativeDriver: true,
        }),
      ])
    );

    anim1.start();
    anim2.start();
    anim3.start();

    return () => {
      anim1.stop();
      anim2.stop();
      anim3.stop();
    };
  }, [orb1Y, orb1Scale, orb2Y, orb2Scale, orb3Y]);

  return (
    <View style={styles.container}>
      {/* Base Dark Glass Gradient Background */}
      <View style={styles.darkBaseBg} />

      {/* Floating Animated Bokeh Orbs (Matching Reference Screenshot) */}
      <Animated.View
        style={[
          styles.bokehOrb,
          styles.orb1,
          {
            transform: [{ translateY: orb1Y }, { scale: orb1Scale }],
          },
        ]}
      />

      <Animated.View
        style={[
          styles.bokehOrb,
          styles.orb2,
          {
            transform: [{ translateY: orb2Y }, { scale: orb2Scale }],
          },
        ]}
      />

      <Animated.View
        style={[
          styles.bokehOrb,
          styles.orb3,
          {
            transform: [{ translateY: orb3Y }],
          },
        ]}
      />

      {/* Content Children */}
      <View style={styles.contentLayer}>{children}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#12070E',
    position: 'relative',
    overflow: 'hidden',
  },
  darkBaseBg: {
    ...StyleSheet.absoluteFill,
    backgroundColor: '#160913',
  },

  /* Bokeh Light Orbs */
  bokehOrb: {
    position: 'absolute',
    borderRadius: 999,
  },
  orb1: {
    top: -60,
    left: -40,
    width: width * 0.85,
    height: width * 0.85,
    backgroundColor: 'rgba(227, 30, 37, 0.28)', // Patrika Red Glow
    shadowColor: '#E31E25',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.9,
    shadowRadius: 80,
    elevation: 20,
  },
  orb2: {
    top: height * 0.35,
    right: -80,
    width: width * 0.9,
    height: width * 0.9,
    backgroundColor: 'rgba(255, 77, 109, 0.22)', // Rose Pink Glow
    shadowColor: '#FF4D6D',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 90,
    elevation: 20,
  },
  orb3: {
    bottom: -100,
    left: width * 0.1,
    width: width * 0.95,
    height: width * 0.95,
    backgroundColor: 'rgba(212, 175, 55, 0.16)', // Gold Glow
    shadowColor: '#D4AF37',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.7,
    shadowRadius: 100,
    elevation: 20,
  },

  contentLayer: {
    flex: 1,
    zIndex: 10,
  },
});
