// src/constants/theme.ts
export const Colors = {
  // Official Patrika News Red (#E31E25)
  primary: '#E31E25',          // Official Patrika News Crimson Red
  primaryDark: '#C2141A',
  primaryCrimson: '#E31E25',   // Patrika Crimson Red
  primaryLight: '#FF3B42',
  
  // Gold, Amber & Taupe Accents
  gold: '#D4AF37',             // Royal Gold Accent
  goldDark: '#B38F24',
  goldLight: '#F5D77F',
  taupe: '#A67C52',
  taupeBg: '#FFF0F1',
  taupeCard: '#FFE4E6',
  
  // Backgrounds & Surface
  background: '#FFF9F6',       // Soft Warm Cream Background
  onboardingBg: '#FFF0F1',     // Soft Patrika Tint Onboarding Background
  roseBg: '#E31E25',
  surface: '#FFFFFF',
  surfaceVariant: '#FFF0F1',
  cardBg: '#FFFFFF',
  
  // High-Contrast Typography Colors
  text: '#2C1A1D',             // Deep Dark Brown Headline Text
  textSecondary: '#5A4A4D',    // Subtitle Text
  textMuted: '#8C7A7C',
  textOnPrimary: '#FFFFFF',
  textGold: '#D4AF37',
  
  // Callouts & Badges
  success: '#27AE60',
  successLight: '#E8F8F5',
  successText: '#1E8449',
  warning: '#F39C12',
  error: '#E31E25',
  info: '#3498DB',
  
  // Borders & Dividers
  border: '#EFE6DD',
  borderLight: '#FFF0F1',
  divider: '#EFE6DD',
  
  cardShadow: 'rgba(227,30,37,0.12)',
  overlay: 'rgba(44,26,29,0.6)',
  overlayLight: 'rgba(44,26,29,0.3)',
  
  badge: {
    verified: '#D4AF37',
    premium: '#E31E25',
    newspaper: '#E31E25',
    new: '#9C27B0',
  },
  
  gradient: {
    primary: ['#E31E25', '#C2141A'],
    rose: ['#FF3B42', '#E31E25'],
    ribbon: ['#E31E25', '#C2141A'],
    gold: ['#F5D77F', '#D4AF37'],
    dark: ['#2C1A1D', '#1A0E10'],
  },
};

export const Typography = {
  fontFamily: {
    serif: 'serif',
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
  sm: 6,
  md: 10,
  lg: 14,
  xl: 18,
  '2xl': 24,
  pill: 30,
  full: 9999,
};

export const Shadow = {
  sm: {
    shadowColor: '#E31E25',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 2,
  },
  md: {
    shadowColor: '#E31E25',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
  },
  lg: {
    shadowColor: '#E31E25',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.12,
    shadowRadius: 14,
    elevation: 8,
  },
};
