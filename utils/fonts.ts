// Font configuration for consistent typography across platforms using Expo Google Fonts
export const getFontFamily = (weight: 'normal' | 'bold' | '600' | '700' | '800' = 'normal') => {
  // Use Expo Google Fonts Roboto variants for consistent cross-platform rendering
  switch (weight) {
    case 'bold':
    case '700':
    case '800':
      return 'Roboto_700Bold';
    case '600':
      return 'Roboto_500Medium';
    default:
      return 'Roboto_400Regular';
  }
};

// Universal font using Expo Google Fonts
export const getUniversalFont = () => {
  return 'Roboto_400Regular';
};

// Roboto font variants for different weights
export const getRobotoFont = (weight: 'regular' | 'medium' | 'bold' = 'regular') => {
  switch (weight) {
    case 'bold':
      return 'Roboto_700Bold';
    case 'medium':
      return 'Roboto_500Medium';
    default:
      return 'Roboto_400Regular';
  }
};

// Backward compatibility function
export const getRobotoLikeFont = () => {
  return 'Roboto_400Regular';
};

// Typography system with Roboto fonts
export const typography = {
  heroTitle: {
    fontFamily: 'Roboto_700Bold',
    fontSize: { small: 20, medium: 24, tablet: 28 },
    fontWeight: '700' as const,
    lineHeight: { small: 24, medium: 28, tablet: 32 },
  },
  sectionTitle: {
    fontFamily: 'Roboto_700Bold',
    fontSize: { small: 18, medium: 20, tablet: 22 },
    fontWeight: '700' as const,
    lineHeight: { small: 22, medium: 24, tablet: 26 },
  },
  subsectionTitle: {
    fontFamily: 'Roboto_500Medium',
    fontSize: { small: 16, medium: 17, tablet: 18 },
    fontWeight: '500' as const,
    lineHeight: { small: 20, medium: 21, tablet: 22 },
  },
  cardTitle: {
    fontFamily: 'Roboto_500Medium',
    fontSize: { small: 14, medium: 15, tablet: 16 },
    fontWeight: '500' as const,
    lineHeight: { small: 18, medium: 19, tablet: 20 },
  },
  body: {
    fontFamily: 'Roboto_400Regular',
    fontSize: { small: 14, medium: 15, tablet: 16 },
    fontWeight: '400' as const,
    lineHeight: { small: 20, medium: 21, tablet: 22 },
  },
  small: {
    fontFamily: 'Roboto_400Regular',
    fontSize: { small: 12, medium: 13, tablet: 14 },
    fontWeight: '400' as const,
    lineHeight: { small: 16, medium: 17, tablet: 18 },
  },
  tiny: {
    fontFamily: 'Roboto_400Regular',
    fontSize: { small: 10, medium: 11, tablet: 12 },
    fontWeight: '400' as const,
    lineHeight: { small: 14, medium: 15, tablet: 16 },
  },
  button: {
    fontFamily: 'Roboto_500Medium',
    fontSize: { small: 14, medium: 15, tablet: 16 },
    fontWeight: '500' as const,
    lineHeight: { small: 18, medium: 19, tablet: 20 },
  },
  statValue: {
    fontFamily: 'Roboto_700Bold',
    fontSize: { small: 16, medium: 18, tablet: 20 },
    fontWeight: '700' as const,
    lineHeight: { small: 20, medium: 22, tablet: 24 },
  },
};
