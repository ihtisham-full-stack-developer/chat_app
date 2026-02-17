import React from 'react';
import {StyleSheet, Switch, Text, View} from 'react-native';
import {useAppDispatch, useAppSelector} from '../app/store/hooks';
import {setThemeMode} from '../features/chat/chatSlice';
import {useAppColors} from '../theme/useAppColors';

export function ProfileScreen(): React.JSX.Element {
  const colors = useAppColors();
  const dispatch = useAppDispatch();
  const themeMode = useAppSelector(state => state.chat.themeMode);
  const favorites = useAppSelector(state => state.chat.favorites.length);
  const isDark = themeMode === 'dark';

  return (
    <View style={[styles.container, {backgroundColor: colors.background}]}>
      <Text style={[styles.heading, {color: colors.text}]}>Profile & Settings</Text>
      <Text style={[styles.label, {color: colors.muted}]}>
        Favorite conversations: {favorites}
      </Text>

      <Text style={[styles.subHeading, {color: colors.text}]}>Theme</Text>
      <View
        style={[
          styles.switchRow,
          {backgroundColor: colors.card, borderColor: colors.border},
        ]}>
        <View>
          <Text style={[styles.switchTitle, {color: colors.text}]}>Dark Mode</Text>
          <Text style={[styles.switchText, {color: colors.muted}]}>
            {isDark ? 'On' : 'Off'}
          </Text>
        </View>
        <Switch
          value={isDark}
          onValueChange={value => dispatch(setThemeMode(value ? 'dark' : 'light'))}
          trackColor={{false: '#9CA3AF', true: colors.primary}}
          thumbColor="#FFFFFF"
        />
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
  switchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  switchTitle: {
    fontSize: 15,
    fontWeight: '600',
  },
  switchText: {
    marginTop: 2,
    fontSize: 12,
  },
});
