export type ThemeMode = 'light' | 'dark';

export type Message = {
  id: string;
  text: string;
  sender: 'me' | 'other';
  timestamp: string;
};

export type Conversation = {
  id: string;
  name: string;
  avatar: string;
  isOnline: boolean;
  messages: Message[];
  isTyping: boolean;
};

export type ChatState = {
  conversations: Conversation[];
  favorites: string[];
  themeMode: ThemeMode;
};
