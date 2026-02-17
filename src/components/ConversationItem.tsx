import React from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Conversation} from '../features/chat/types';
import {formatTime} from '../utils/date';
import {useAppColors} from '../theme/useAppColors';

type Props = {
  conversation: Conversation;
  isFavorite: boolean;
  onPress: () => void;
  onFavoriteToggle: () => void;
};

export function ConversationItem({
  conversation,
  isFavorite,
  onPress,
  onFavoriteToggle,
}: Props): React.JSX.Element {
  const colors = useAppColors();
  const latestMessage = conversation.messages[conversation.messages.length - 1];

  return (
    <Pressable
      onPress={onPress}
      style={[
        styles.container,
        {
          backgroundColor: colors.card,
          borderColor: colors.border,
        },
      ]}>
      <View style={styles.avatarWrap}>
        <View style={[styles.avatar, {backgroundColor: colors.primary}]}>
          <Text style={styles.avatarText}>{conversation.avatar}</Text>
        </View>
        {conversation.isOnline ? (
          <View style={[styles.onlineDot, {backgroundColor: '#22C55E'}]} />
        ) : null}
      </View>

      <View style={styles.content}>
        <View style={styles.row}>
          <Text style={[styles.title, {color: colors.text}]}>{conversation.name}</Text>
          <Text style={[styles.time, {color: colors.muted}]}>
            {latestMessage ? formatTime(latestMessage.timestamp) : ''}
          </Text>
        </View>
        <Text
          numberOfLines={1}
          style={[styles.preview, {color: colors.muted}]}>
          {conversation.isTyping ? 'typing...' : latestMessage?.text ?? 'No messages yet'}
        </Text>
      </View>

      <TouchableOpacity
        accessibilityRole="button"
        onPress={onFavoriteToggle}
        style={styles.favoriteBtn}>
        <Text style={{fontSize: 18}}>{isFavorite ? '★' : '☆'}</Text>
      </TouchableOpacity>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderRadius: 16,
    padding: 14,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarWrap: {
    position: 'relative',
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 13,
  },
  onlineDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    borderColor: '#FFFFFF',
    borderWidth: 1,
    position: 'absolute',
    right: 0,
    bottom: 1,
  },
  content: {
    flex: 1,
    marginHorizontal: 12,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  title: {
    fontWeight: '700',
    fontSize: 15,
  },
  time: {
    fontSize: 12,
  },
  preview: {
    fontSize: 13,
  },
  favoriteBtn: {
    padding: 8,
  },
});
