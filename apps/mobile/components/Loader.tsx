import { StyleSheet, Animated, Easing } from 'react-native';
import { XStack } from 'tamagui';

export default function Loader() {
  const spinValue = new Animated.Value(0);
  Animated.loop(
    Animated.timing(spinValue, {
      toValue: 1,
      duration: 1500,
      easing: Easing.linear,
      useNativeDriver: true,
    })
  ).start();

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <>
      <XStack f={1} jc="center">
        <Animated.Image
          style={[styles.loading, { transform: [{ rotate: spin }] }]}
          source={require('../assets/progress.png')}
        />
      </XStack>
    </>
  );
}

const styles = StyleSheet.create({
  loading: {
    width: 60,
    height: 60,
    position: 'absolute',
    bottom: 0,
  },
});
