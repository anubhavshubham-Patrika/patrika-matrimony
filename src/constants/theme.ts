// src/constants/theme.ts

export const Colors = {
  // Primary Icy Blue & Navy
  primary: '#183B82',          // Deep Navy / Primary Brand Color
  primaryDark: '#0B1F45',      // Deepest Navy / Blue-Black
  primaryLight: '#4169D8',     // Vibrant Blue
  primarySoft: '#6D91E8',      // Soft Blue Button Highlights
  
  // Secondary / Lavender Blue
  secondary: '#AFC7F8',
  secondaryLight: '#C9D9FF',
  
  // Accents
  gold: '#C8A75A',             // Elegant Champagne Gold
  goldLight: '#E5CD92',        
  teal: '#4A9C96',             // Muted Teal (Success/Supporting)
  aqua: '#89DFD9',             // Soft Aqua Highlight
  
  // Backgrounds & Surface
  background: '#F3F7FF',       // Very light icy blue background
  surface: '#FFFFFF',          // Clean White
  surfaceWarm: '#F7F3E8',      // Warm Ivory/Champagne Surface
  surfaceGlass: 'rgba(255, 255, 255, 0.85)',
  
  // Typography
  text: '#0B1F45',             // Deep Navy (Primary Text)
  textSecondary: '#4A5B7D',    // Muted Blue-Grey Text
  textMuted: '#8193B2',        // Light Blue-Grey Text
  textOnPrimary: '#FFFFFF',
  textGold: '#C8A75A',
  
  // Status & Feedback
  success: '#4A9C96',
  successLight: '#E8F6F5',
  warning: '#C8A75A',
  error: '#D9534F',
  
  // Borders & Dividers
  border: '#DCE8FF',           // Soft icy blue border
  borderLight: '#EAF1FF',
  divider: '#DCE8FF',
  
  // Shadows & Overlays
  cardShadow: 'rgba(11, 31, 69, 0.08)',
  overlay: 'rgba(11, 31, 69, 0.65)',
  overlayLight: 'rgba(243, 247, 255, 0.4)',
  
  gradient: {
    primary: ['#183B82', '#0B1F45'],
    secondary: ['#6D91E8', '#4169D8'],
    background: ['#F5F8FF', '#E7F0FF', '#F4F2FF'],
    gold: ['#E5CD92', '#C8A75A'],
  },
};

export const Typography = {
  fontFamily: {
    serif: 'PlayfairDisplay_600SemiBold',
    serifRegular: 'PlayfairDisplay_400Regular',
    sans: 'Inter_400Regular',
    sansMedium: 'Inter_500Medium',
    sansBold: 'Inter_600SemiBold',
  },
  sizes: {
    xs: 11,
    sm: 13,
    md: 15,
    base: 17,
    lg: 19,
    xl: 22,
    '2xl': 26,
    '3xl': 32,
    '4xl': 40,
    '5xl': 48,
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
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  '2xl': 24,
  '3xl': 32,
  pill: 40,
  full: 9999,
};

export const Shadow = {
  sm: {
    shadowColor: '#0B1F45',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 2,
  },
  md: {
    shadowColor: '#0B1F45',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.06,
    shadowRadius: 16,
    elevation: 4,
  },
  lg: {
    shadowColor: '#0B1F45',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.1,
    shadowRadius: 24,
    elevation: 8,
  },
};
