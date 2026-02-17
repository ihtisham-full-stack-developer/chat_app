import {Conversation} from './types';

const now = Date.now();

export const mockConversations: Conversation[] = [
  {
    id: 'c1',
    name: 'Maya Stone',
    avatar: 'MS',
    isOnline: true,
    isTyping: false,
    messages: [
      {
        id: 'm1',
        text: 'Landing page is approved. Can we ship tonight?',
        sender: 'other',
        timestamp: new Date(now - 1000 * 60 * 25).toISOString(),
      },
      {
        id: 'm2',
        text: 'Yes, I am wrapping QA now.',
        sender: 'me',
        timestamp: new Date(now - 1000 * 60 * 22).toISOString(),
      },
      {
        id: 'm3',
        text: 'Perfect, ping me before release.',
        sender: 'other',
        timestamp: new Date(now - 1000 * 60 * 18).toISOString(),
      },
    ],
  },
  {
    id: 'c2',
    name: 'Daniel Brooks',
    avatar: 'DB',
    isOnline: false,
    isTyping: false,
    messages: [
      {
        id: 'm4',
        text: 'Can you share the updated estimates?',
        sender: 'other',
        timestamp: new Date(now - 1000 * 60 * 90).toISOString(),
      },
      {
        id: 'm5',
        text: 'Just sent them on email. Check inbox.',
        sender: 'me',
        timestamp: new Date(now - 1000 * 60 * 80).toISOString(),
      },
    ],
  },
  {
    id: 'c3',
    name: 'Design Squad',
    avatar: 'DS',
    isOnline: true,
    isTyping: false,
    messages: [
      {
        id: 'm6',
        text: 'New icon set uploaded to Figma.',
        sender: 'other',
        timestamp: new Date(now - 1000 * 60 * 210).toISOString(),
      },
    ],
  },
];
