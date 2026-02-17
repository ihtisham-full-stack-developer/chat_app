import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useAppDispatch, useAppSelector} from '../app/store/hooks';
import {setThemeMode} from '../features/chat/chatSlice';
import {ThemeMode} from '../features/chat/types';
import {useAppColors} from '../theme/useAppColors';

const modes: ThemeMode[] = ['light', 'dark', 'system'];

export function ProfileScreen(): React.JSX.Element {
  const colors = useAppColors();
  const dispatch = useAppDispatch();
  const themeMode = useAppSelector(state => state.chat.themeMode);
  const favorites = useAppSelector(state => state.chat.favorites.length);

  return (
    <View style={[styles.container, {backgroundColor: colors.background}]}>
      <Text style={[styles.heading, {color: colors.text}]}>Profile & Settings</Text>
      <Text style={[styles.label, {color: colors.muted}]}>
        Favorite conversations: {favorites}
      </Text>

      <Text style={[styles.subHeading, {color: colors.text}]}>Theme</Text>
      <View style={styles.modeRow}>
        {modes.map(mode => {
          const active = themeMode === mode;
          return (
            <TouchableOpacity
              key={mode}
              onPress={() => dispatch(setThemeMode(mode))}
              style={[
                styles.modeBtn,
                {
                  borderColor: active ? colors.primary : colors.border,
                  backgroundColor: active ? `${colors.primary}22` : colors.card,
                },
              ]}>
              <Text style={{color: colors.text, textTransform: 'capitalize'}}>
                {mode}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 18,
  },
  heading: {
    fontSize: 24,
    fontWeight: '700',
  },
  label: {
    marginTop: 8,
    fontSize: 14,
  },
  subHeading: {
    marginTop: 28,
    marginBottom: 10,
    fontSize: 17,
    fontWeight: '700',
  },
  modeRow: {
    flexDirection: 'row',
    gap: 8,
  },
  modeBtn: {
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderWidth: 1,
    borderRadius: 10,
  },
});
