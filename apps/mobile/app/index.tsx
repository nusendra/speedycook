import useCachedResources from '../hooks/useCachedResources';
import ResponsiveImage from 'react-native-responsive-image';
import { Text, StyleSheet } from 'react-native';
import { YStack } from 'tamagui';
import { useEffect } from 'react';
import { responsiveFontSize } from '../styles/ResponsiveFontSize';
import { useRouter } from 'expo-router';
import Loader from '../components/Loader';

export default function App() {
  const isLoadingComplete = useCachedResources();
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push('/home');
    }, 1000);
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

        <Loader />
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
});
