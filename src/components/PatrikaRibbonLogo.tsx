import React from 'react';
import { View, Image, ViewStyle, StyleSheet } from 'react-native';

interface PatrikaRibbonLogoProps {
  size?: number;
  color?: string;
  style?: ViewStyle;
}

export default function PatrikaRibbonLogo({ size = 80, style }: PatrikaRibbonLogoProps) {
  const width = size;
  const height = size;

  return (
    <View style={[styles.container, { width, height }, style]}>
      <Image
        source={require('../../assets/patrika-logo.png')}
        style={[styles.image, { width, height }]}
        resizeMode="contain"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  image: {
    backgroundColor: 'transparent',
  },
});
