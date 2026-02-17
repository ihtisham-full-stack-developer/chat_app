import {DarkTheme, DefaultTheme, Theme} from '@react-navigation/native';
import {palette} from './palette';

export const appLightTheme: Theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: palette.light.primary,
    background: palette.light.background,
    card: palette.light.card,
    text: palette.light.text,
    border: palette.light.border,
    notification: palette.light.danger,
  },
};

export const appDarkTheme: Theme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    primary: palette.dark.primary,
    background: palette.dark.background,
    card: palette.dark.card,
    text: palette.dark.text,
    border: palette.dark.border,
    notification: palette.dark.danger,
  },
};
