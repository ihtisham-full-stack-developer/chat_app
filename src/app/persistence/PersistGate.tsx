import React, {PropsWithChildren, useEffect, useState} from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';
import {useAppDispatch, useAppSelector} from '../store/hooks';
import {hydrateFromStorage} from '../../features/chat/chatSlice';
import {loadPersistedData, saveFavorites, saveTheme} from './storage';

export function PersistGate({children}: PropsWithChildren): React.JSX.Element {
  const dispatch = useAppDispatch();
  const favorites = useAppSelector(state => state.chat.favorites);
  const themeMode = useAppSelector(state => state.chat.themeMode);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let active = true;
    const hydrate = async () => {
      const data = await loadPersistedData();
      if (active) {
        dispatch(hydrateFromStorage(data));
        setReady(true);
      }
    };
    hydrate();
    return () => {
      active = false;
    };
  }, [dispatch]);

  useEffect(() => {
    if (!ready) {
      return;
    }
    saveFavorites(favorites).catch(() => undefined);
  }, [favorites, ready]);

  useEffect(() => {
    if (!ready) {
      return;
    }
    saveTheme(themeMode).catch(() => undefined);
  }, [themeMode, ready]);

  if (!ready) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return <>{children}</>;
}

const styles = StyleSheet.create({
  loader: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
