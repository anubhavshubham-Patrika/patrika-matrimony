// src/constants/theme.ts
export const Colors = {
  primary: '#C0392B',
  primaryDark: '#96281B',
  primaryLight: '#E74C3C',
  accent: '#E67E22',
  accentLight: '#F39C12',
  gold: '#F1C40F',
  goldDark: '#D4AC0D',
  
  background: '#F5F5F5',
  surface: '#FFFFFF',
  surfaceVariant: '#FFF5F5',
  
  text: '#1A1A2E',
  textSecondary: '#666666',
  textMuted: '#999999',
  textOnPrimary: '#FFFFFF',
  
  success: '#27AE60',
  successLight: '#2ECC71',
  warning: '#F39C12',
  error: '#E74C3C',
  info: '#3498DB',
  
  border: '#E0E0E0',
  borderLight: '#F0F0F0',
  divider: '#EEEEEE',
  
  cardShadow: 'rgba(0,0,0,0.08)',
  overlay: 'rgba(0,0,0,0.5)',
  overlayLight: 'rgba(0,0,0,0.3)',
  
  badge: {
    verified: '#27AE60',
    premium: '#F39C12',
    newspaper: '#3498DB',
    new: '#9B59B6',
  },
  
  gradient: {
    primary: ['#C0392B', '#E74C3C'],
    accent: ['#E67E22', '#F39C12'],
    dark: ['#1A1A2E', '#2C3E50'],
    card: ['rgba(192,57,43,0.8)', 'rgba(150,40,27,0.95)'],
  },
};

export const Typography = {
  fontFamily: {
    regular: undefined,
    medium: undefined,
    bold: undefined,
  },
  sizes: {
    xs: 10,
    sm: 12,
    md: 14,
    base: 16,
    lg: 18,
    xl: 20,
    '2xl': 24,
    '3xl': 28,
    '4xl': 32,
    '5xl': 40,
  },
  lineHeight: {
    tight: 1.2,
    normal: 1.5,
    relaxed: 1.75,
  },
};

export const Spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  base: 16,
  lg: 20,
  xl: 24,
  '2xl': 32,
  '3xl': 40,
  '4xl': 48,
  '5xl': 64,
};

export const BorderRadius = {
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  '2xl': 20,
  full: 9999,
};

export const Shadow = {
  sm: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 3,
    elevation: 2,
  },
  md: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 4,
  },
  lg: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 12,
    elevation: 8,
  },
};
