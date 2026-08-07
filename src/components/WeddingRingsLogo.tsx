import React from 'react';
import { View, StyleSheet } from 'react-native';
import Svg, { Circle, Path, Ellipse, G, Defs, RadialGradient, Stop } from 'react-native-svg';

interface WeddingRingsLogoProps {
  size?: number;
}

export default function WeddingRingsLogo({ size = 72 }: WeddingRingsLogoProps) {
  const s = size;
  return (
    <Svg width={s} height={s} viewBox="0 0 100 100">
      <Defs>
        <RadialGradient id="goldGrad" cx="50%" cy="50%" r="50%">
          <Stop offset="0%" stopColor="#F5D06A" />
          <Stop offset="50%" stopColor="#D4AF37" />
          <Stop offset="100%" stopColor="#A07C1A" />
        </RadialGradient>
        <RadialGradient id="goldGrad2" cx="50%" cy="50%" r="50%">
          <Stop offset="0%" stopColor="#F7DC7E" />
          <Stop offset="50%" stopColor="#C9962A" />
          <Stop offset="100%" stopColor="#A07C1A" />
        </RadialGradient>
      </Defs>
      {/* Crown/Lotus on top */}
      <Path
        d="M50 20 L44 30 L36 24 L40 35 L60 35 L64 24 L56 30 Z"
        fill="url(#goldGrad)"
        opacity={0.95}
      />
      <Circle cx="44" cy="23" r="3" fill="#D4AF37" />
      <Circle cx="56" cy="23" r="3" fill="#D4AF37" />
      <Circle cx="50" cy="20" r="3.5" fill="#F5D06A" />

      {/* Left ring */}
      <Circle cx="38" cy="62" r="22" fill="none" stroke="url(#goldGrad)" strokeWidth="9" />
      <Circle cx="38" cy="62" r="22" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="4" />

      {/* Right ring overlapping */}
      <Circle cx="62" cy="62" r="22" fill="none" stroke="url(#goldGrad2)" strokeWidth="9" />
      <Circle cx="62" cy="62" r="22" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="3" />

      {/* Overlap cover for depth */}
      <Path
        d="M50 44 Q58 52 50 62 Q42 52 50 44"
        fill="#0A4A3C"
        opacity={0.9}
      />
      <Path
        d="M50 44 Q56 52 50 60 Q44 52 50 44"
        fill="none"
        stroke="url(#goldGrad)"
        strokeWidth="2.5"
      />
    </Svg>
  );
}
