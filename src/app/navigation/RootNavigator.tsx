import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {RootTabParamList} from './types';
import {ChatsStackNavigator} from './ChatsStackNavigator';
import {FeedScreen} from '../../screens/FeedScreen';
import {ProfileScreen} from '../../screens/ProfileScreen';
import {Text} from 'react-native';

const Tab = createBottomTabNavigator<RootTabParamList>();

function TabLabel({symbol}: {symbol: string}) {
  return <Text style={{fontSize: 16}}>{symbol}</Text>;
}

export function RootNavigator(): React.JSX.Element {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          height: 64,
          paddingBottom: 8,
          paddingTop: 8,
        },
      }}>
      <Tab.Screen
        name="ChatsTab"
        component={ChatsStackNavigator}
        options={{
          title: 'Chats',
          tabBarIcon: () => <TabLabel symbol="💬" />,
        }}
      />
      <Tab.Screen
        name="Feed"
        component={FeedScreen}
        options={{
          tabBarIcon: () => <TabLabel symbol="📰" />,
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: () => <TabLabel symbol="⚙️" />,
        }}
      />
    </Tab.Navigator>
  );
}
