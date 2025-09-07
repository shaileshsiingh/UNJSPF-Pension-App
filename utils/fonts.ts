import { Platform } from 'react-native';

// Font configuration for consistent typography across platforms
export const getFontFamily = (weight: 'normal' | 'bold' | '600' | '700' | '800' = 'normal') => {
  if (Platform.OS === 'ios') {
    // iOS system fonts that are similar to Roboto
    switch (weight) {
      case 'bold':
      case '700':
      case '800':
        return 'System'; // Uses SF Pro Display Bold on iOS
      case '600':
        return 'System'; // Uses SF Pro Display Semibold on iOS
      default:
        return 'System'; // Uses SF Pro Text Regular on iOS
    }
  } else {
    // Android - use Roboto
    switch (weight) {
      case 'bold':
      case '700':
      case '800':
        return 'Roboto-Bold';
      case '600':
        return 'Roboto-Medium';
      default:
        return 'Roboto-Regular';
    }
  }
};

// Alternative approach - use fonts that are available on both platforms
export const getUniversalFont = () => {
  if (Platform.OS === 'ios') {
    return 'System'; // SF Pro (iOS system font)
  } else {
    return 'sans-serif'; // Android's default sans-serif (usually Roboto)
  }
};

// For specific Roboto-like styling on iOS
export const getRobotoLikeFont = () => {
  if (Platform.OS === 'ios') {
    return 'System'; // SF Pro is very similar to Roboto
  } else {
    return 'Roboto';
  }
};
