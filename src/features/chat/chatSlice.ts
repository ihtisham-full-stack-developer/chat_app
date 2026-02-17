import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {mockConversations} from './mockData';
import {ChatState, Message, ThemeMode} from './types';

const initialState: ChatState = {
  conversations: mockConversations,
  favorites: [],
  themeMode: 'system',
};

type PersistedPayload = {
  favorites?: string[];
  themeMode?: ThemeMode;
};

type MessagePayload = {
  conversationId: string;
  text: string;
  sender: 'me' | 'other';
};

type TypingPayload = {
  conversationId: string;
  isTyping: boolean;
};

function createMessage(payload: MessagePayload): Message {
  return {
    id: `${payload.conversationId}-${Date.now()}-${Math.floor(Math.random() * 10000)}`,
    text: payload.text.trim(),
    sender: payload.sender,
    timestamp: new Date().toISOString(),
  };
}

export const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    sendMessage: (state, action: PayloadAction<MessagePayload>) => {
      const target = state.conversations.find(
        c => c.id === action.payload.conversationId,
      );
      if (!target || !action.payload.text.trim()) {
        return;
      }
      target.messages.push(createMessage(action.payload));
    },
    toggleFavorite: (state, action: PayloadAction<string>) => {
      if (state.favorites.includes(action.payload)) {
        state.favorites = state.favorites.filter(id => id !== action.payload);
        return;
      }
      state.favorites.push(action.payload);
    },
    setTypingStatus: (state, action: PayloadAction<TypingPayload>) => {
      const target = state.conversations.find(
        c => c.id === action.payload.conversationId,
      );
      if (target) {
        target.isTyping = action.payload.isTyping;
      }
    },
    setThemeMode: (state, action: PayloadAction<ThemeMode>) => {
      state.themeMode = action.payload;
    },
    hydrateFromStorage: (state, action: PayloadAction<PersistedPayload>) => {
      if (action.payload.favorites) {
        state.favorites = action.payload.favorites;
      }
      if (action.payload.themeMode) {
        state.themeMode = action.payload.themeMode;
      }
    },
    fakePushMessage: state => {
      if (state.conversations.length === 0) {
        return;
      }
      const randomConversation =
        state.conversations[Math.floor(Math.random() * state.conversations.length)];
      randomConversation.messages.push(
        createMessage({
          conversationId: randomConversation.id,
          text: 'Quick update: the latest build passed smoke tests.',
          sender: 'other',
        }),
      );
    },
  },
});

export const {
  sendMessage,
  toggleFavorite,
  setTypingStatus,
  setThemeMode,
  hydrateFromStorage,
  fakePushMessage,
} = chatSlice.actions;
export const chatReducer = chatSlice.reducer;
