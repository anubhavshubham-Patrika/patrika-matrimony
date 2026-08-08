import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
  ViewStyle,
  TextStyle,
  StyleProp,
  View,
} from 'react-native';
import { Colors, Typography, Spacing, BorderRadius, Shadow } from '../../constants/theme';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

export type ButtonVariant = 'primary' | 'secondary' | 'premium' | 'outline' | 'text';

export interface PremiumButtonProps {
  title: string;
  onPress: () => void;
  variant?: ButtonVariant;
  disabled?: boolean;
  loading?: boolean;
  icon?: keyof typeof Ionicons.glyphMap;
  iconPosition?: 'left' | 'right';
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  fullWidth?: boolean;
}

export default function PremiumButton({
  title,
  onPress,
  variant = 'primary',
  disabled = false,
  loading = false,
  icon,
  iconPosition = 'left',
  style,
  textStyle,
  fullWidth = true,
}: PremiumButtonProps) {
  
  const getVariantStyles = () => {
    switch (variant) {
      case 'primary':
        return {
          container: [s.btn, s.primary, disabled && s.disabled],
          text: [s.text, s.textPrimary, disabled && s.textDisabled],
          iconColor: disabled ? Colors.textMuted : Colors.surface,
        };
      case 'secondary':
        return {
          container: [s.btn, s.secondary, disabled && s.disabled],
          text: [s.text, s.textSecondary, disabled && s.textDisabled],
          iconColor: disabled ? Colors.textMuted : Colors.primaryLight,
        };
      case 'premium':
        return {
          container: [s.btn, s.premium, disabled && s.disabled],
          text: [s.text, s.textPremium, disabled && s.textDisabled],
          iconColor: disabled ? Colors.textMuted : Colors.text,
        };
      case 'outline':
        return {
          container: [s.btn, s.outline, disabled && s.outlineDisabled],
          text: [s.text, s.textOutline, disabled && s.textDisabled],
          iconColor: disabled ? Colors.textMuted : Colors.primary,
        };
      case 'text':
        return {
          container: [s.btnText, disabled && s.disabledTextContainer],
          text: [s.text, s.textOutline, disabled && s.textDisabled],
          iconColor: disabled ? Colors.textMuted : Colors.primary,
        };
    }
  };

  const styles = getVariantStyles();

  const content = (
    <>
      {loading ? (
        <ActivityIndicator color={styles.iconColor} style={{ marginRight: Spacing.sm }} />
      ) : (
        icon && iconPosition === 'left' && (
          <Ionicons name={icon} size={20} color={styles.iconColor} style={{ marginRight: Spacing.sm }} />
        )
      )}
      
      <Text style={[styles.text, textStyle]}>{title}</Text>
      
      {!loading && icon && iconPosition === 'right' && (
        <Ionicons name={icon} size={20} color={styles.iconColor} style={{ marginLeft: Spacing.sm }} />
      )}
    </>
  );

  // For premium variant, we use a gradient
  if (variant === 'premium' && !disabled) {
    return (
      <TouchableOpacity
        onPress={onPress}
        disabled={disabled || loading}
        activeOpacity={0.8}
        style={[fullWidth && s.fullWidth, style, Shadow.md, { borderRadius: BorderRadius.pill }]}
      >
        <LinearGradient
          colors={Colors.gradient.gold as any}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={[styles.container, { borderWidth: 0 }]}
        >
          {content}
        </LinearGradient>
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.8}
      style={[
        styles.container, 
        fullWidth && s.fullWidth, 
        style,
        (variant === 'primary' || variant === 'secondary') && !disabled ? Shadow.sm : null
      ]}
    >
      {content}
    </TouchableOpacity>
  );
}

const s = StyleSheet.create({
  fullWidth: {
    width: '100%',
  },
  btn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 56,
    borderRadius: BorderRadius.pill,
    paddingHorizontal: Spacing.xl,
  },
  btnText: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.base,
  },
  text: {
    fontFamily: Typography.fontFamily.sansMedium,
    fontSize: Typography.sizes.base,
    letterSpacing: 0.2,
  },
  
  // Primary
  primary: {
    backgroundColor: Colors.primaryDark, // Deep navy
  },
  textPrimary: {
    color: Colors.surface,
  },
  
  // Secondary
  secondary: {
    backgroundColor: Colors.secondaryLight, // Soft blue
  },
  textSecondary: {
    color: Colors.primaryDark,
  },
  
  // Premium
  premium: {
    // Gradient handled in component
  },
  textPremium: {
    color: Colors.primaryDark,
  },
  
  // Outline
  outline: {
    backgroundColor: 'transparent',
    borderWidth: 1.5,
    borderColor: Colors.primaryDark,
  },
  textOutline: {
    color: Colors.primaryDark,
  },
  
  // Disabled
  disabled: {
    backgroundColor: Colors.border,
    elevation: 0,
    shadowOpacity: 0,
  },
  outlineDisabled: {
    borderColor: Colors.border,
    backgroundColor: 'transparent',
  },
  disabledTextContainer: {
    opacity: 0.5,
  },
  textDisabled: {
    color: Colors.textMuted,
  },
});
