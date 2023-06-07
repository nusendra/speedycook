import RoundedButton from '../../components/RoundedButton';
import ResponsiveImage from 'react-native-responsive-image';
import { Pressable, StyleSheet, SafeAreaView, Dimensions } from 'react-native';
import { XStack, YStack, ZStack } from 'tamagui';
import { Slot, useRouter, usePathname } from 'expo-router';
import { red1, dark2 } from '../../styles/tamagui';
import { responsiveFontSize } from '../../styles/ResponsiveFontSize';
import { useEffect, useState } from 'react';
import { useAuthStore } from '../../stores/AuthStore';
import { signIn, userSignOut } from '../../apis';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function AuthLayout() {
  const height = Dimensions.get('window').height;
  const router = useRouter();
  const pathName = usePathname();
  const [submitText, setSubmitText] = useState<string>('Continue');
  const email = useAuthStore((state) => state.email);
  const password = useAuthStore((state) => state.password);

  const enum PathList {
    LOGIN = '/auth/login',
  }

  const goBack = () => {
    router.back();
  };

  const onSubmit = async () => {
    if (pathName === PathList.LOGIN) {
      // const a = await AsyncStorage.getAllKeys();
      // console.log(a.find((item) => item.includes('authUser')));
      // const b = await AsyncStorage.getItem(
      //   'firebase:authUser:AIzaSyD1IpBOBgAuXIJOBnCZ4DUWPpbXec_-SSs:[DEFAULT]'
      // );
      // console.log(a);
      // console.log(b);
      signIn(email, password);

      router.replace('/search');

      // userSignOut();
    }
  };

  useEffect(() => {
    if (pathName === PathList.LOGIN) {
      setSubmitText('Sign In');
    }
  }, [pathName]);

  return (
    <>
      <YStack mt={55} ml={24} mr={24}>
        <XStack>
          <ZStack>
            <Pressable
              style={({ pressed }) => [{}, { opacity: pressed ? 0.5 : 1 }]}
              hitSlop={{
                left: 100,
                right: 100,
                bottom: 100,
                top: 100,
              }}
              onPress={goBack}
            >
              <ResponsiveImage
                source={require('../../assets/arrow-left.png')}
                initWidth="28"
                initHeight="28"
                style={{ marginTop: 15 }}
              ></ResponsiveImage>
            </Pressable>
          </ZStack>
        </XStack>
      </YStack>
      <SafeAreaView style={{ height: height - 40 }}>
        <Slot />
        <YStack f={0.15} jc="flex-end" mb={36} ml={24} mr={24} mt={24}>
          <RoundedButton
            title={submitText}
            customStyle={[styles.continueButton]}
            width="100%"
            onPress={onSubmit}
          />
        </YStack>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  continueButton: {
    backgroundColor: red1,
    position: 'absolute',
    bottom: 0,
  },
  modalContainer: {
    justifyContent: 'center',
    backgroundColor: dark2,
    height: 496,
    borderRadius: 10,
    marginRight: 20,
    marginLeft: 20,
  },
  successTitle: {
    fontFamily: 'UrbanistBold',
    color: red1,
    fontSize: responsiveFontSize(24),
    marginTop: 32,
    marginRight: 32,
    marginLeft: 32,
  },
  successDescription: {
    fontFamily: 'Urbanist',
    color: 'white',
    fontSize: responsiveFontSize(16),
    marginTop: 16,
    marginRight: 32,
    marginLeft: 32,
    textAlign: 'center',
  },
  loading: {
    marginTop: 32,
    width: 60,
    height: 60,
  },
});
