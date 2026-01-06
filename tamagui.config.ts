import { createAnimations } from '@tamagui/animations-react-native';
import { createFont, createTamagui, createTokens } from '@tamagui/core';
import { shorthands } from '@tamagui/shorthands';
import { tokens as defaultTokens } from '@tamagui/themes';

// 1. Define your custom tokens
const customTokens = createTokens({
  ...defaultTokens,
  color: {
    ...defaultTokens.color,
    // Brand Accents from HTML
    primary: '#f26c0d', // Orange used in Dark HTML
    primaryBurnt: '#E0580C', // Burnt Orange from Light HTML
    limeGreen: '#65A30D',
    
    // Dark Mode Palette (from 1st HTML)
    darkBg: '#221710',
    darkCard: '#2c241b',
    darkTextMain: '#FFFFFF',
    darkTextSec: '#baa89c',
    darkBorder: 'rgba(255,255,255,0.05)',
    
    // Light Mode Palette (from 2nd HTML)
    lightBg: '#FAFAFA',
    lightCard: '#FFFFFF',
    lightTextMain: '#171717',
    lightTextSec: '#737373',
    lightBorder: '#E5E5E5',
  },
});

const light = {
  background: customTokens.color.lightBg,
  backgroundSecondary: customTokens.color.lightCard,
  color: customTokens.color.lightTextMain,
  colorSecondary: customTokens.color.lightTextSec,
  borderColor: customTokens.color.lightBorder,
  accent: customTokens.color.primaryBurnt,
  success: customTokens.color.limeGreen,
  cardBackground: customTokens.color.lightCard,
  shadowColor: 'rgba(0,0,0,0.06)',
};

const dark = {
  background: customTokens.color.darkBg,
  backgroundSecondary: customTokens.color.darkCard,
  color: customTokens.color.darkTextMain,
  colorSecondary: customTokens.color.darkTextSec,
  borderColor: customTokens.color.darkBorder,
  accent: customTokens.color.primary,
  success: customTokens.color.limeGreen,
  cardBackground: customTokens.color.darkCard,
  shadowColor: 'rgba(0,0,0,0.4)',
};

// 3. Keep Font and Animation logic
const interFont = createFont({
  family: 'Inter',
  weight: { 400: '400', 600: '600', 700: '700', 800: '800', 900: '900' },
  size: { 1: 12, 2: 14, 3: 16, 4: 18, 5: 20, 6: 24, 7: 32, 8: 40, 9: 48, 10: 56 },
  lineHeight: { 1: 16, 2: 18, 3: 20, 4: 24, 5: 26, 6: 30, 7: 38, 8: 48, 9: 56, 10: 64 },
  letterSpacing: { 400: 0, 700: -0.5, 800: -1, 900: -1.5 },
  face: {
    400: { normal: 'Inter_400Regular' },
    600: { normal: 'Inter_600SemiBold' },
    700: { normal: 'Inter_700Bold' },
    800: { normal: 'Inter_800ExtraBold' },
    900: { normal: 'Inter_900Black' },
  },
});

const animations = createAnimations({
  fast: { damping: 20, mass: 1.2, stiffness: 250 },
  medium: { damping: 10, mass: 0.9, stiffness: 100 },
  quick: { type: 'spring', damping: 20, mass: 1, stiffness: 250 },
  smooth: { type: 'timing', duration: 300, style: 'ease-in-out' },
});

// 4. Final Config
const config = createTamagui({
  fonts: {
    heading: interFont,
    body: interFont,
  },
  themes: {
    light,
    dark,
  },
  tokens: customTokens,
  shorthands,
  animations,
});

export type AppConfig = typeof config;
declare module '@tamagui/core' {
  interface TamaguiCustomConfig extends AppConfig {}
}

export default config;