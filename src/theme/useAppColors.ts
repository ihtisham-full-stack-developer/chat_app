import {useTheme} from '@react-navigation/native';
import {palette} from './palette';

export function useAppColors() {
  const theme = useTheme();
  const isDark = theme.dark;
  return isDark ? palette.dark : palette.light;
}
