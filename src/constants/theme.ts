// src/constants/theme.ts
export const Colors = {
  // Deep Royal Crimson / Maroon Red (from reference images)
  primary: '#6B0000', 
  primaryDark: '#4A0000',
  primaryLight: '#8B1A1A',
  
  // Royal Gold & Amber (from reference images)
  gold: '#D4AF37',
  goldDark: '#786C10',
  goldLight: '#E5B869',
  goldPill: '#FCD04B',
  goldBg: '#FFF9E6',
  
  // Warm Parchment / Cream Backgrounds (from reference images)
  background: '#FAF6F0', 
  surface: '#FFFDF9',
  surfaceVariant: '#F5EFE6',
  cardBg: '#FFFFFF',
  
  // Royal Dark Text Colors
  text: '#200D08', // Deep Royal Brown/Maroon Headings
  textSecondary: '#665544', // Warm Medium Brown Subtitles
  textMuted: '#8C7B6B',
  textOnPrimary: '#FFFFFF',
  textGold: '#E5B869',
  
  // System Colors
  success: '#27AE60',
  successLight: '#E8F8F5',
  warning: '#F39C12',
  error: '#6B0000',
  info: '#3498DB',
  
  // Borders & Dividers
  border: '#E2D7C7',
  borderLight: '#F2EBE1',
  divider: '#EAE2D5',
  
  cardShadow: 'rgba(107,0,0,0.08)',
  overlay: 'rgba(32,13,8,0.6)',
  overlayLight: 'rgba(32,13,8,0.3)',
  
  badge: {
    verified: '#786C10',
    premium: '#D4AF37',
    newspaper: '#6B0000',
    new: '#8B1A1A',
  },
  
  gradient: {
    primary: ['#7A0000', '#500000'],
    ribbon: ['#8B0000', '#6B0000', '#4A0000'],
    accent: ['#6B0000', '#8B1A1A'],
    gold: ['#FCD04B', '#D4AF37'],
    dark: ['#200D08', '#100604'],
    card: ['rgba(107,0,0,0.85)', 'rgba(74,0,0,0.95)'],
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
    shadowColor: '#6B0000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  md: {
    shadowColor: '#6B0000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 4,
  },
  lg: {
    shadowColor: '#6B0000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 12,
    elevation: 8,
  },
};
