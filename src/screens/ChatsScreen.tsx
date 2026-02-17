import React, {useMemo} from 'react';
import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {ChatsStackParamList} from '../app/navigation/types';
import {ConversationItem} from '../components/ConversationItem';
import {useAppDispatch, useAppSelector} from '../app/store/hooks';
import {fakePushMessage, toggleFavorite} from '../features/chat/chatSlice';
import {useAppColors} from '../theme/useAppColors';

type Props = NativeStackScreenProps<ChatsStackParamList, 'Chats'>;

export function ChatsScreen({navigation}: Props): React.JSX.Element {
  const colors = useAppColors();
  const dispatch = useAppDispatch();
  const conversations = useAppSelector(state => state.chat.conversations);
  const favorites = useAppSelector(state => state.chat.favorites);

  const sortedConversations = useMemo(() => {
    return [...conversations].sort((a, b) => {
      const aTime = a.messages[a.messages.length - 1]?.timestamp ?? '';
      const bTime = b.messages[b.messages.length - 1]?.timestamp ?? '';
      return bTime.localeCompare(aTime);
    });
  }, [conversations]);

  return (
    <View style={[styles.container, {backgroundColor: colors.background}]}>
      <View style={styles.headerRow}>
        <Text style={[styles.title, {color: colors.text}]}>Recent Chats</Text>
        <TouchableOpacity
          onPress={() => dispatch(fakePushMessage())}
          style={[styles.pushBtn, {borderColor: colors.border}]}>
          <Text style={{color: colors.text, fontSize: 12}}>Simulate Push</Text>
        </TouchableOpacity>
      </View>

      <Text style={[styles.subtitle, {color: colors.muted}]}>
        Favorites: {favorites.length}
      </Text>

      <FlatList
        data={sortedConversations}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.list}
        renderItem={({item}) => (
          <ConversationItem
            conversation={item}
            isFavorite={favorites.includes(item.id)}
            onPress={() =>
              navigation.navigate('ChatDetail', {conversationId: item.id})
            }
            onFavoriteToggle={() => dispatch(toggleFavorite(item.id))}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 14,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
  },
  subtitle: {
    marginTop: 8,
    marginBottom: 12,
    fontSize: 13,
  },
  pushBtn: {
    borderWidth: 1,
    borderRadius: 20,
    paddingVertical: 7,
    paddingHorizontal: 12,
  },
  list: {
    paddingBottom: 16,
  },
});
