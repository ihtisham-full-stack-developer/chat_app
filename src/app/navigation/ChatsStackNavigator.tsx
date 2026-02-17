import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {ChatsStackParamList} from './types';
import {ChatsScreen} from '../../screens/ChatsScreen';
import {ChatScreen} from '../../screens/ChatScreen';

const Stack = createNativeStackNavigator<ChatsStackParamList>();

export function ChatsStackNavigator(): React.JSX.Element {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Chats"
        component={ChatsScreen}
        options={{title: 'Chats'}}
      />
      <Stack.Screen
        name="ChatDetail"
        component={ChatScreen}
        options={{title: 'Conversation'}}
      />
    </Stack.Navigator>
  );
}
