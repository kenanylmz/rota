import { lightColors, darkColors } from './colors';
import { typography } from './typography';
import { spacing } from './spacing';

export const lightTheme = {
  colors: lightColors,
  typography,
  spacing,
  isDark: false,
};

export const darkTheme = {
  colors: darkColors,
  typography,
  spacing,
  isDark: true,
}; 