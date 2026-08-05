import React from 'react';
import { View, Image, ViewStyle, ImageStyle } from 'react-native';

interface PatrikaRibbonLogoProps {
  size?: number;
  style?: ViewStyle;
}

export default function PatrikaRibbonLogo({ size = 100, style }: PatrikaRibbonLogoProps) {
  const width = size;
  const height = size * 0.9;

  return (
    <View style={[{ width, height, alignItems: 'center', justifyContent: 'center' }, style]}>
      <Image
        source={require('../../assets/patrika-logo.png')}
        style={{ width, height, resizeMode: 'contain' }}
      />
    </View>
  );
}
