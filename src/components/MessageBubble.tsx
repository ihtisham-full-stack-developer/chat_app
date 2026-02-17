import React, {useEffect, useRef} from 'react';
import {Animated, StyleSheet, Text, View} from 'react-native';
import {Message} from '../features/chat/types';
import {formatTime} from '../utils/date';
import {useAppColors} from '../theme/useAppColors';

type Props = {
  message: Message;
};

export function MessageBubble({message}: Props): React.JSX.Element {
  const colors = useAppColors();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(8)).current;
  const isMine = message.sender === 'me';

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 220,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 220,
        useNativeDriver: true,
      }),
    ]).start();
  }, [fadeAnim, slideAnim]);

  return (
    <Animated.View
      style={[
        styles.wrapper,
        {alignItems: isMine ? 'flex-end' : 'flex-start'},
        {opacity: fadeAnim, transform: [{translateY: slideAnim}]},
      ]}>
      <View
        style={[
          styles.bubble,
          {
            backgroundColor: isMine ? colors.outgoingBubble : colors.incomingBubble,
          },
        ]}>
        <Text style={[styles.body, {color: isMine ? colors.outgoingText : colors.text}]}>
          {message.text}
        </Text>
        <Text
          style={[
            styles.time,
            {color: isMine ? colors.outgoingText : colors.muted},
          ]}>
          {formatTime(message.timestamp)}
        </Text>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    marginVertical: 4,
  },
  bubble: {
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 9,
    maxWidth: '80%',
  },
  body: {
    fontSize: 15,
    marginBottom: 4,
  },
  time: {
    fontSize: 10,
    alignSelf: 'flex-end',
  },
});
