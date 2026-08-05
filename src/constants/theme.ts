// src/constants/theme.ts
export const Colors = {
  // Deep Royal Crimson & Vibrant Rose (from reference screenshots 1-5)
  primary: '#E91E63',          // Vibrant Rose Red (from Matrimony Onboarding)
  primaryDark: '#D81B60',
  primaryCrimson: '#6B0000',   // Deep Royal Crimson
  primaryLight: '#FF4081',
  
  // Royal Gold, Amber & Taupe (from reference screenshots 4 & 5)
  gold: '#C5A059',             // Warm Gold Accent
  goldDark: '#786C10',
  goldLight: '#E5B869',
  taupe: '#A67C52',            // Warm Taupe
  taupeBg: '#ECE3D8',          // AI-Selected Section Background (Screenshot 5)
  taupeCard: '#E6DCCF',
  
  // Backgrounds & Surface (from reference screenshots 2-5)
  background: '#F9F6F0',       // Warm Parchment Feed Background (Screenshots 4 & 5)
  onboardingBg: '#FFF4F6',     // Soft Pastel Pink Onboarding Background (Screenshot 2)
  roseBg: '#FF7597',           // Vibrant Pink Background (Screenshot 3)
  surface: '#FFFFFF',
  surfaceVariant: '#F5EFE6',
  cardBg: '#FFFFFF',
  
  // High-Contrast Indian Typography Colors
  text: '#2C1A1D',             // Deep Dark Brown/Red Headline Text
  textSecondary: '#5A4A4D',    // Warm Subtitle Text
  textMuted: '#8C7A7C',
  textOnPrimary: '#FFFFFF',
  textGold: '#C5A059',
  
  // Callouts & Badges
  success: '#27AE60',
  successLight: '#E8F8F5',     // Green Profile Activity Callout (Screenshot 2)
  successText: '#1E8449',
  warning: '#F39C12',
  error: '#E91E63',
  info: '#3498DB',
  
  // Borders & Dividers
  border: '#EFE6DD',
  borderLight: '#F5EFE6',
  divider: '#E5DBD0',
  
  cardShadow: 'rgba(44,26,29,0.08)',
  overlay: 'rgba(44,26,29,0.6)',
  overlayLight: 'rgba(44,26,29,0.3)',
  
  badge: {
    verified: '#C5A059',
    premium: '#E91E63',
    newspaper: '#6B0000',
    new: '#9C27B0',
  },
  
  gradient: {
    primary: ['#E91E63', '#C2185B'],
    rose: ['#FF5E83', '#E91E63'],
    ribbon: ['#8B0000', '#6B0000', '#4A0000'],
    gold: ['#E5B869', '#C5A059'],
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
    shadowColor: '#2C1A1D',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 2,
  },
  md: {
    shadowColor: '#2C1A1D',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
  },
  lg: {
    shadowColor: '#2C1A1D',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.12,
    shadowRadius: 14,
    elevation: 8,
  },
};
