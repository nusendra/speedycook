import RoundedButton from '../../components/RoundedButton';
import ResponsiveImage from 'react-native-responsive-image';
import {
  Pressable,
  StyleSheet,
  SafeAreaView,
  Dimensions,
  View,
  Text,
  Animated,
  Easing,
} from 'react-native';
import { XStack, YStack, ZStack } from 'tamagui';
import { Slot, useRouter, usePathname } from 'expo-router';
import { red1, dark2 } from '../../styles/tamagui';
import { useState } from 'react';
import Modal from 'react-native-modal';
import { responsiveFontSize } from '../../styles/ResponsiveFontSize';
import { useOnboardingStore } from '../../stores/OnboardingStore';
import { db } from '../../firebaseConfig';
import { collection, addDoc } from 'firebase/firestore';
import { shallow } from 'zustand/shallow';
import { signUp } from '../../apis';

export default function OnboardingLayout() {
  const height = Dimensions.get('window').height;
  const router = useRouter();
  const pathName = usePathname();

  const {
    cookingLevel,
    foods,
    allergies,
    dietaries,
    fullName,
    phoneNumber,
    gender,
    dob,
    username,
    email,
    password,
  } = useOnboardingStore(
    (state) => ({
      cookingLevel: state.cookingLevel,
      foods: state.foods,
      allergies: state.allergies,
      dietaries: state.dietaries,
      fullName: state.fullName,
      phoneNumber: state.phoneNumber,
      gender: state.gender,
      dob: state.dob,
      username: state.username,
      email: state.email,
      password: state.password,
    }),
    shallow
  );

  const [created, setCreated] = useState<boolean>(false);

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

  const enum PathList {
    COOKING_LEVEL = '/onboarding/1CookingLevel',
    YOUR_FOODS = '/onboarding/2YourFoods',
    ALLERGIES = '/onboarding/3Allergies',
    DIETARY = '/onboarding/4Dietary',
    COMPLETE_PROFILE = '/onboarding/5CompleteProfile',
    CREATE_ACCOUNT = '/onboarding/6CreateAccount',
  }

  const goBack = () => {
    router.back();
  };

  const showProgress = () => {
    if (pathName === PathList.COOKING_LEVEL) {
      return require('../../assets/progress1.png');
    } else if (
      pathName === PathList.YOUR_FOODS ||
      pathName === PathList.ALLERGIES ||
      pathName === PathList.DIETARY
    ) {
      return require('../../assets/progress2.png');
    } else if (pathName === PathList.COMPLETE_PROFILE) {
      return require('../../assets/progress3.png');
    } else if (pathName === PathList.CREATE_ACCOUNT) {
      return require('../../assets/progress4.png');
    }
  };

  const onSubmit = async () => {
    switch (pathName) {
      case PathList.COOKING_LEVEL:
        if (cookingLevel) {
          router.push(PathList.YOUR_FOODS);
        }
        break;
      case PathList.YOUR_FOODS:
        router.push(PathList.ALLERGIES);
        break;
      case PathList.ALLERGIES:
        router.push(PathList.DIETARY);
        break;
      case PathList.DIETARY:
        router.push(PathList.COMPLETE_PROFILE);
        break;
      case PathList.COMPLETE_PROFILE:
        router.push(PathList.CREATE_ACCOUNT);
        break;
      case PathList.CREATE_ACCOUNT:
        const userCredential: any = await signUp(email, password);
        const {
          createdAt,
          email: userEmail,
          emailVerified,
        } = userCredential.user;

        const colRef = collection(db, 'users');
        const data = {
          cookingLevel,
          foods,
          allergies,
          dietaries,
          fullName,
          phoneNumber,
          gender,
          dob,
          user: {
            username,
            email: userEmail,
            emailVerified,
          },
        };

        try {
          await addDoc(colRef, data);
          setCreated(true);

          setTimeout(() => {
            router.push('/search');
          }, 3000);
        } catch (err) {
          console.log('failed to save');
          console.log(err);
        }

        break;
      default:
    }
  };

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
          <XStack mt={23} f={1} jc="center" ai="center">
            <ResponsiveImage
              source={showProgress()}
              initWidth="216"
              initHeight="12"
            />
          </XStack>
        </XStack>
      </YStack>
      <SafeAreaView style={{ height: height - 40 }}>
        <Slot />
        <YStack f={0.15} jc="flex-end" mb={36} ml={24} mr={24} mt={24}>
          <RoundedButton
            title="Continue"
            customStyle={[styles.continueButton]}
            width="100%"
            onPress={onSubmit}
          />
        </YStack>
      </SafeAreaView>
      <Modal isVisible={created}>
        <View style={styles.modalContainer}>
          <YStack flex={1} justifyContent="center" ai="center">
            <ResponsiveImage
              source={require('../../assets/account-created.png')}
              initWidth="186"
              initHeight="180"
            />
            <Text style={styles.successTitle}>Sign Up Successful!</Text>
            <Text style={styles.successDescription}>
              Your account has been created. Please wait a moment, we are
              preparing for you...
            </Text>
            <Animated.Image
              style={[styles.loading, { transform: [{ rotate: spin }] }]}
              source={require('../../assets/progress.png')}
            />
          </YStack>
        </View>
      </Modal>
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
