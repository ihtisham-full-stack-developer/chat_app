import AsyncStorage from '@react-native-async-storage/async-storage';
import {ThemeMode} from '../../features/chat/types';

const FAVORITES_KEY = '@chat_app:favorites';
const THEME_KEY = '@chat_app:theme';

export type PersistedData = {
  favorites: string[];
  themeMode: ThemeMode;
};

export async function loadPersistedData(): Promise<Partial<PersistedData>> {
  try {
    const [favoritesRaw, themeRaw] = await Promise.all([
      AsyncStorage.getItem(FAVORITES_KEY),
      AsyncStorage.getItem(THEME_KEY),
    ]);

    const favorites = favoritesRaw ? (JSON.parse(favoritesRaw) as string[]) : undefined;
    const themeMode = themeRaw ? (JSON.parse(themeRaw) as ThemeMode) : undefined;
    return {favorites, themeMode};
  } catch {
    return {};
  }
}

export async function saveFavorites(favorites: string[]): Promise<void> {
  await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
}

export async function saveTheme(themeMode: ThemeMode): Promise<void> {
  await AsyncStorage.setItem(THEME_KEY, JSON.stringify(themeMode));
}
