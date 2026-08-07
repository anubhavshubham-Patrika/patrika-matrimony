import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

interface MintGlassBackgroundProps {
  children: React.ReactNode;
}

export default function MintGlassBackground({ children }: MintGlassBackgroundProps) {
  const orb1Y = useRef(new Animated.Value(0)).current;
  const orb2Y = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const anim1 = Animated.loop(
      Animated.sequence([
        Animated.timing(orb1Y, {
          toValue: -25,
          duration: 4000,
          useNativeDriver: true,
        }),
        Animated.timing(orb1Y, {
          toValue: 15,
          duration: 4500,
          useNativeDriver: true,
        }),
      ])
    );

    const anim2 = Animated.loop(
      Animated.sequence([
        Animated.timing(orb2Y, {
          toValue: 30,
          duration: 5000,
          useNativeDriver: true,
        }),
        Animated.timing(orb2Y, {
          toValue: -20,
          duration: 4000,
          useNativeDriver: true,
        }),
      ])
    );

    anim1.start();
    anim2.start();

    return () => {
      anim1.stop();
      anim2.stop();
    };
  }, [orb1Y, orb2Y]);

  return (
    <View style={styles.container}>
      {/* Base Light Mint Soft Gradient */}
      <View style={styles.baseBg} />

      {/* Floating Soft Bokeh Orbs (Mint & Soft Coral Glow inspired by reference screenshot) */}
      <Animated.View
        style={[
          styles.bokehOrb,
          styles.orbMint,
          { transform: [{ translateY: orb1Y }] },
        ]}
      />

      <Animated.View
        style={[
          styles.bokehOrb,
          styles.orbTeal,
          { transform: [{ translateY: orb2Y }] },
        ]}
      />

      {/* Content Layer */}
      <View style={styles.contentLayer}>{children}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBF7F5',
    position: 'relative',
    overflow: 'hidden',
  },
  baseBg: {
    ...StyleSheet.absoluteFill,
    backgroundColor: '#E8F5F3',
  },
  bokehOrb: {
    position: 'absolute',
    borderRadius: 999,
  },
  orbMint: {
    top: -50,
    left: -30,
    width: width * 0.9,
    height: width * 0.9,
    backgroundColor: 'rgba(168, 230, 222, 0.45)', // Soft Mint
  },
  orbTeal: {
    top: height * 0.4,
    right: -60,
    width: width * 0.85,
    height: width * 0.85,
    backgroundColor: 'rgba(254, 215, 226, 0.35)', // Soft Rose Coral Tint
  },
  contentLayer: {
    flex: 1,
    zIndex: 10,
  },
});
