// src/constants/theme.ts
export const Colors = {
  primary: '#E31837', // Vibrant Patrika Ribbon Red
  primaryDark: '#B71C1C',
  primaryLight: '#FF3856',
  accent: '#E31837',
  accentLight: '#FF5252',
  gold: '#F1C40F',
  goldDark: '#D4AC0D',
  
  background: '#FFFFFF', // Clean White Background
  surface: '#FFFFFF',
  surfaceVariant: '#FFF5F6',
  
  text: '#111111', // Deep Black for Headings
  textSecondary: '#666666', // Medium Gray for Subtitles
  textMuted: '#999999',
  textOnPrimary: '#FFFFFF',
  
  success: '#27AE60',
  successLight: '#2ECC71',
  warning: '#F39C12',
  error: '#E31837',
  info: '#3498DB',
  
  border: '#E0E0E0',
  borderLight: '#F2F2F7',
  divider: '#EEEEEE',
  
  cardShadow: 'rgba(0,0,0,0.06)',
  overlay: 'rgba(0,0,0,0.5)',
  overlayLight: 'rgba(0,0,0,0.3)',
  
  badge: {
    verified: '#27AE60',
    premium: '#F39C12',
    newspaper: '#3498DB',
    new: '#9B59B6',
  },
  
  gradient: {
    primary: ['#FF2E4D', '#E31837'],
    ribbon: ['#FF2E4D', '#E31837', '#A7001E'],
    accent: ['#E31837', '#FF5252'],
    dark: ['#111111', '#222222'],
    card: ['rgba(227,24,55,0.85)', 'rgba(167,0,30,0.95)'],
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
  pill: 28,
  full: 9999,
};

export const Shadow = {
  sm: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
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
