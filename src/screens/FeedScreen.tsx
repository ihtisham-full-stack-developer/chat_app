import React from 'react';
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {useQuery} from '@tanstack/react-query';
import {fetchPosts} from '../features/feed/api';
import {useAppColors} from '../theme/useAppColors';

export function FeedScreen(): React.JSX.Element {
  const colors = useAppColors();
  const {data, isLoading, isError} = useQuery({
    queryKey: ['posts'],
    queryFn: fetchPosts,
  });

  if (isLoading) {
    return (
      <View style={[styles.center, {backgroundColor: colors.background}]}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  if (isError) {
    return (
      <View style={[styles.center, {backgroundColor: colors.background}]}>
        <Text style={{color: colors.text}}>Could not load posts.</Text>
      </View>
    );
  }

  return (
    <View style={[styles.container, {backgroundColor: colors.background}]}>
      <Text style={[styles.title, {color: colors.text}]}>Social Feed</Text>
      <FlatList
        data={data ?? []}
        keyExtractor={item => item.id.toString()}
        ListEmptyComponent={
          <Text style={{color: colors.muted, padding: 18}}>No posts available.</Text>
        }
        renderItem={({item}) => (
          <View
            style={[
              styles.card,
              {backgroundColor: colors.card, borderColor: colors.border},
            ]}>
            <Text style={[styles.postTitle, {color: colors.text}]}>{item.title}</Text>
            <Text style={[styles.postBody, {color: colors.muted}]}>{item.body}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 14,
    paddingTop: 14,
  },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 10,
  },
  card: {
    borderRadius: 14,
    borderWidth: 1,
    padding: 14,
    marginBottom: 10,
  },
  postTitle: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 7,
    textTransform: 'capitalize',
  },
  postBody: {
    fontSize: 14,
    lineHeight: 20,
  },
});
