import React from 'react';
import { View, ViewStyle } from 'react-native';
import Svg, { Path, Defs, LinearGradient as SvgGradient, Stop } from 'react-native-svg';

interface PatrikaRibbonLogoProps {
  size?: number;
  style?: ViewStyle;
}

export default function PatrikaRibbonLogo({ size = 100, style }: PatrikaRibbonLogoProps) {
  const width = size;
  const height = size * 1.05;

  return (
    <View style={[{ width, height, alignItems: 'center', justifyContent: 'center' }, style]}>
      <Svg width={width} height={height} viewBox="0 0 120 126" fill="none">
        <Defs>
          {/* Main Top Ribbon Loop Gradient */}
          <SvgGradient id="patrikaRedTop" x1="0%" y1="0%" x2="100%" y2="100%">
            <Stop offset="0%" stopColor="#FF2E4D" />
            <Stop offset="40%" stopColor="#E31837" />
            <Stop offset="100%" stopColor="#C0102A" />
          </SvgGradient>

          {/* Underfold Shadow Ribbon Gradient */}
          <SvgGradient id="patrikaRedFold" x1="0%" y1="0%" x2="100%" y2="100%">
            <Stop offset="0%" stopColor="#D31330" />
            <Stop offset="70%" stopColor="#9E0A1E" />
            <Stop offset="100%" stopColor="#750412" />
          </SvgGradient>
        </Defs>

        {/* Bottom Fold / Under Layer */}
        <Path
          d="M 28 65 C 20 78, 15 95, 20 110 C 26 122, 45 125, 52 112 C 58 100, 48 85, 42 78 Z"
          fill="url(#patrikaRedFold)"
        />

        {/* Main Ribbon Loop Forming the 'P' */}
        <Path
          d="M 22 86 C 14 62, 28 32, 54 22 C 84 10, 114 26, 115 55 C 116 78, 92 98, 64 96 C 44 94, 30 84, 22 86 Z"
          fill="url(#patrikaRedTop)"
        />

        {/* Smooth Inner Ribbon Fold Highlight */}
        <Path
          d="M 52 24 C 76 15, 102 28, 104 52 C 105 70, 86 86, 62 84 C 47 83, 34 76, 28 72 C 34 50, 42 34, 52 24 Z"
          fill="#FF3352"
          opacity={0.35}
        />
      </Svg>
    </View>
  );
}
