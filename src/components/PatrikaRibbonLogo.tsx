import React from 'react';
import { View, Image, ViewStyle, StyleSheet } from 'react-native';

interface PatrikaRibbonLogoProps {
  size?: number;
  color?: string;
  style?: ViewStyle;
  rounded?: boolean;
}

export default function PatrikaRibbonLogo({ size = 80, style, rounded = true }: PatrikaRibbonLogoProps) {
  const width = size;
  const height = size;
  const borderRadius = rounded ? size / 2 : 12;

  return (
    <View style={[styles.container, { width, height, borderRadius }, style]}>
      <Image
        source={require('../../assets/patrika-logo.png')}
        style={[styles.image, { width, height, borderRadius }]}
        resizeMode="cover"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    overflow: 'hidden',
    shadowColor: '#2C1A1D',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  image: {
    backgroundColor: '#FFFFFF',
  },
});
