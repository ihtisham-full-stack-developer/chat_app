import React, {PropsWithChildren, useMemo} from 'react';
import {StatusBar, useColorScheme} from 'react-native';
import {Provider, useSelector} from 'react-redux';
import {NavigationContainer, Theme} from '@react-navigation/native';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {PersistGate} from './persistence/PersistGate';
import {RootState, store} from './store';
import {appDarkTheme, appLightTheme} from '../theme/navigationTheme';

function ThemedNavigation({children}: PropsWithChildren): React.JSX.Element {
  const mode = useSelector((state: RootState) => state.chat.themeMode);
  const systemIsDark = useColorScheme() === 'dark';
  const isDark = mode === 'system' ? systemIsDark : mode === 'dark';
  const theme: Theme = isDark ? appDarkTheme : appLightTheme;

  return (
    <>
      <StatusBar
        barStyle={isDark ? 'light-content' : 'dark-content'}
        backgroundColor={theme.colors.card}
      />
      <NavigationContainer theme={theme}>{children}</NavigationContainer>
    </>
  );
}

export function AppProviders({children}: PropsWithChildren): React.JSX.Element {
  const queryClient = useMemo(() => new QueryClient(), []);

  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <SafeAreaProvider>
          <PersistGate>
            <ThemedNavigation>{children}</ThemedNavigation>
          </PersistGate>
        </SafeAreaProvider>
      </QueryClientProvider>
    </Provider>
  );
}
