import {chatReducer, hydrateFromStorage, sendMessage, toggleFavorite} from '../src/features/chat/chatSlice';

describe('chat reducer', () => {
  it('sends a new message', () => {
    const state = chatReducer(
      undefined,
      sendMessage({
        conversationId: 'c1',
        text: 'hello team',
        sender: 'me',
      }),
    );

    const target = state.conversations.find(c => c.id === 'c1');
    expect(target?.messages[target.messages.length - 1].text).toBe('hello team');
  });

  it('toggles favorites', () => {
    const first = chatReducer(undefined, toggleFavorite('c1'));
    expect(first.favorites).toContain('c1');

    const second = chatReducer(first, toggleFavorite('c1'));
    expect(second.favorites).not.toContain('c1');
  });

  it('hydrates from local storage payload', () => {
    const state = chatReducer(
      undefined,
      hydrateFromStorage({
        favorites: ['c2'],
        themeMode: 'dark',
      }),
    );

    expect(state.favorites).toEqual(['c2']);
    expect(state.themeMode).toBe('dark');
  });
});
