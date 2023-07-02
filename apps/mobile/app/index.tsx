import useCachedResources from '../hooks/useCachedResources';
import ResponsiveImage from 'react-native-responsive-image';
import { Text, StyleSheet } from 'react-native';
import { YStack } from 'tamagui';
import { useEffect } from 'react';
import { responsiveFontSize } from '../styles/ResponsiveFontSize';
import { useRouter } from 'expo-router';
import Loader from '../components/Loader';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function App() {
  const isLoadingComplete = useCachedResources();
  const router = useRouter();

  const checkAuth = async () => {
    const storage = await AsyncStorage.getAllKeys();
    const foundUser = storage.find((item) => item.includes('authUser'));
    const user = await AsyncStorage.getItem(foundUser as string);

    if (user) {
      router.push('/search');
    } else {
      router.push('/home');
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      checkAuth();
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
      </YStack>
      <YStack mb={80}>
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
