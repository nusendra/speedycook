import useCachedResources from '../hooks/useCachedResources';
import ResponsiveImage from 'react-native-responsive-image';
import { Text, StyleSheet, Animated, Easing } from 'react-native';
import { YStack } from 'tamagui';
import { useEffect } from 'react';
import { responsiveFontSize } from '../styles/ResponsiveFontSize';
import { useRouter } from 'expo-router';

export default function App() {
  const isLoadingComplete = useCachedResources();
  const router = useRouter();

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

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push('/authentication');
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  if (!isLoadingComplete) {
    return null;
  }

  return (
    <>
      <YStack f={1} jc="center" ai="center">
        <ResponsiveImage
          source={require('../assets/logo.png')}
          initWidth="127"
          initHeight="173"
        />
        <Text style={styles.title}>Speedycook</Text>

        <Animated.Image
          style={[styles.loading, { transform: [{ rotate: spin }] }]}
          source={require('../assets/progress.png')}
        />
      </YStack>
    </>
  );
}

const styles = StyleSheet.create({
  title: {
    fontFamily: 'UrbanistBold',
    fontSize: responsiveFontSize(48),
    color: 'white',
    marginTop: 33,
  },
  loading: {
    width: 60,
    height: 60,
    position: 'absolute',
    bottom: 0,
    marginBottom: 80,
  },
});
