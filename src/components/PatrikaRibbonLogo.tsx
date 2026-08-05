import React from 'react';
import { View, ViewStyle } from 'react-native';
import Svg, { Path, Defs, LinearGradient, Stop } from 'react-native-svg';

interface PatrikaRibbonLogoProps {
  size?: number;
  color?: string;
  style?: ViewStyle;
}

export default function PatrikaRibbonLogo({ size = 80, color = '#6B0000', style }: PatrikaRibbonLogoProps) {
  const width = size;
  const height = size * 0.95;

  return (
    <View style={[{ width, height, alignItems: 'center', justifyContent: 'center', backgroundColor: 'transparent' }, style]}>
      <Svg width={width} height={height} viewBox="0 0 100 95" fill="none">
        <Defs>
          <LinearGradient id="royalRibbonGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <Stop offset="0%" stopColor="#8E0000" />
            <Stop offset="50%" stopColor={color} />
            <Stop offset="100%" stopColor="#4A0000" />
          </LinearGradient>
          <LinearGradient id="royalFoldGrad" x1="0%" y1="100%" x2="100%" y2="0%">
            <Stop offset="0%" stopColor="#4A0000" />
            <Stop offset="100%" stopColor={color} />
          </LinearGradient>
        </Defs>
        
        {/* Main Ribbon Loop Forming 'P' */}
        <Path
          d="M 28 82 C 16 68 14 42 28 26 C 42 10 74 8 86 28 C 96 46 86 70 66 76 C 48 82 34 72 32 58 C 30 46 40 34 54 34 C 66 34 72 42 70 50 C 68 58 58 64 48 62 C 40 60 36 52 38 46"
          stroke="url(#royalRibbonGrad)"
          strokeWidth="15"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Fold Shadow Accent */}
        <Path
          d="M 26 78 C 20 66 20 48 30 34 C 40 20 62 16 76 26"
          stroke="url(#royalFoldGrad)"
          strokeWidth="11"
          strokeLinecap="round"
          opacity={0.9}
        />
      </Svg>
    </View>
  );
}
