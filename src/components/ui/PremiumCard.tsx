import React, { ReactNode } from 'react';
import { View, StyleSheet, ViewStyle, StyleProp } from 'react-native';
import { Colors, BorderRadius, Shadow, Spacing } from '../../constants/theme';

export type CardVariant = 'default' | 'glass' | 'highlight' | 'outlined';

export interface PremiumCardProps {
  children: ReactNode;
  variant?: CardVariant;
  style?: StyleProp<ViewStyle>;
  noPadding?: boolean;
}

export default function PremiumCard({
  children,
  variant = 'default',
  style,
  noPadding = false,
}: PremiumCardProps) {
  
  const getVariantStyle = (): StyleProp<ViewStyle> => {
    switch (variant) {
      case 'default':
        return {
          backgroundColor: Colors.surface,
          ...Shadow.sm,
        };
      case 'glass':
        return {
          backgroundColor: Colors.surfaceGlass,
          borderColor: 'rgba(255,255,255,0.4)',
          borderWidth: 1,
          ...Shadow.md,
        };
      case 'highlight':
        return {
          backgroundColor: Colors.secondaryLight,
          borderColor: Colors.border,
          borderWidth: 1,
        };
      case 'outlined':
        return {
          backgroundColor: Colors.surface,
          borderColor: Colors.border,
          borderWidth: 1,
        };
    }
  };

  return (
    <View 
      style={[
        s.card,
        !noPadding && s.padding,
        getVariantStyle(),
        style
      ]}
    >
      {children}
    </View>
  );
}

const s = StyleSheet.create({
  card: {
    borderRadius: BorderRadius['2xl'], // 24px radius as per spec
    overflow: 'hidden',
  },
  padding: {
    padding: Spacing.lg,
  }
});
