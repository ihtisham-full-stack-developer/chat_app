import React, {useEffect, useMemo, useRef, useState} from 'react';
import {
  FlatList,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {ChatsStackParamList} from '../app/navigation/types';
import {useAppDispatch, useAppSelector} from '../app/store/hooks';
import {MessageBubble} from '../components/MessageBubble';
import {sendMessage, setTypingStatus} from '../features/chat/chatSlice';
import {TypingIndicator} from '../components/TypingIndicator';
import {useAppColors} from '../theme/useAppColors';

type Props = NativeStackScreenProps<ChatsStackParamList, 'ChatDetail'>;

const autoReplyPool = [
  'Sounds good. Let me confirm in 10 mins.',
  'Shared. Please check and tell me if changes are needed.',
  'Sure, I can handle this now.',
];

export function ChatScreen({route}: Props): React.JSX.Element {
  const colors = useAppColors();
  const dispatch = useAppDispatch();
  const listRef = useRef<FlatList>(null);
  const [input, setInput] = useState('');

  const conversation = useAppSelector(state =>
    state.chat.conversations.find(c => c.id === route.params.conversationId),
  );

  const messages = conversation?.messages ?? [];

  useEffect(() => {
    const timeout = setTimeout(() => {
      listRef.current?.scrollToEnd({animated: true});
    }, 120);
    return () => clearTimeout(timeout);
  }, [messages.length, conversation?.isTyping]);

  const headerStatus = useMemo(() => {
    if (!conversation) {
      return '';
    }
    if (conversation.isTyping) {
      return 'typing...';
    }
    return conversation.isOnline ? 'online' : 'offline';
  }, [conversation]);

  const onSend = () => {
    const text = input.trim();
    if (!text || !conversation) {
      return;
    }

    dispatch(
      sendMessage({
        conversationId: conversation.id,
        text,
        sender: 'me',
      }),
    );
    setInput('');

    dispatch(setTypingStatus({conversationId: conversation.id, isTyping: true}));
    setTimeout(() => {
      dispatch(
        sendMessage({
          conversationId: conversation.id,
          text: autoReplyPool[Math.floor(Math.random() * autoReplyPool.length)],
          sender: 'other',
        }),
      );
      dispatch(setTypingStatus({conversationId: conversation.id, isTyping: false}));
    }, 1200);
  };

  if (!conversation) {
    return (
      <View style={[styles.center, {backgroundColor: colors.background}]}>
        <Text style={{color: colors.text}}>Conversation not found.</Text>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={[styles.container, {backgroundColor: colors.background}]}>
      <View style={[styles.statusBar, {borderColor: colors.border}]}>
        <Text style={[styles.name, {color: colors.text}]}>{conversation.name}</Text>
        <Text style={[styles.status, {color: colors.muted}]}>{headerStatus}</Text>
      </View>

      <FlatList
        ref={listRef}
        data={messages}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.messages}
        renderItem={({item}) => <MessageBubble message={item} />}
      />

      {conversation.isTyping ? (
        <View style={styles.typingWrap}>
          <TypingIndicator />
        </View>
      ) : null}

      <View style={[styles.inputRow, {backgroundColor: colors.card}]}>
        <TextInput
          value={input}
          onChangeText={setInput}
          style={[styles.input, {color: colors.text}]}
          placeholder="Type a message..."
          placeholderTextColor={colors.muted}
        />
        <TouchableOpacity onPress={onSend} style={styles.sendBtn}>
          <Text style={{color: '#FFFFFF', fontWeight: '700'}}>Send</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  statusBar: {
    borderBottomWidth: 1,
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  name: {
    fontSize: 17,
    fontWeight: '700',
  },
  status: {
    fontSize: 12,
    marginTop: 2,
  },
  messages: {
    paddingHorizontal: 12,
    paddingVertical: 12,
  },
  typingWrap: {
    paddingHorizontal: 12,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#00000010',
    padding: 8,
    marginHorizontal: 10,
    marginBottom: 10,
    borderRadius: 14,
  },
  input: {
    flex: 1,
    fontSize: 15,
    paddingHorizontal: 10,
  },
  sendBtn: {
    backgroundColor: '#0F766E',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 14,
  },
});
