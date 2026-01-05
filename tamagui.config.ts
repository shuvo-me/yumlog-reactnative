
import { createFont, createTamagui, createTokens } from '@tamagui/core';
import { shorthands } from '@tamagui/shorthands';
import { themes, tokens } from '@tamagui/themes';

const interFont = createFont({
  family: 'Inter',
  weight: {
    400: '400',
    600: '600',
    700: '700',
    800: '800',
    900: '900',
  },
  size: {
    1: 12,
    2: 14,
    3: 16,
    4: 18,
    5: 20,
    6: 24,
    7: 32,
    8: 40,
    9: 48,
    10: 56,
  },
  // REQUIRED: Line heights (usually ~1.2x to 1.5x the size)
  lineHeight: {
    1: 16,
    2: 18,
    3: 20,
    4: 24,
    5: 26,
    6: 30,
    7: 38,
    8: 48,
    9: 56,
    10: 64,
  },
  // REQUIRED: Letter spacing (usually 0 or negative for large display fonts)
  letterSpacing: {
    400: 0,
    700: -0.5,
    800: -1,
    900: -1.5,
  },
  // REQUIRED: Maps weights to the actual loaded font names from expo-font
  face: {
    400: { normal: 'Inter_400Regular' },
    600: { normal: 'Inter_600SemiBold' },
    700: { normal: 'Inter_700Bold' },
    800: { normal: 'Inter_800ExtraBold' },
    900: { normal: 'Inter_900Black' },
  },
});

const customTokens = createTokens({
  ...tokens,
  color: {
    ...tokens.color,
    primary: '#f26c0d',
    backgroundDark: '#221710',
    neutralMuted: '#54453b',
    gray10: '#a1a1aa', // Added gray10 as requested
    gray11: '#d4d4d8', // Added gray11 for secondary text
  },
  space: {
    ...tokens.space,
    10: 40,
    12: 48,
  },
  radius: {
    ...tokens.radius,
    5: 16,
    10: 24,
  }
});

const config = createTamagui({
  fonts: {
    heading: interFont,
    body: interFont,
  },
  themes,
  tokens: customTokens,
  shorthands,
});

export type AppConfig = typeof config;

declare module '@tamagui/core' {
  interface TamaguiCustomConfig extends AppConfig {}
}

export default config;
