import RoundedButton from '../../components/RoundedButton';
import ResponsiveImage from 'react-native-responsive-image';
import { Pressable, StyleSheet } from 'react-native';
import { XStack, YStack, ZStack } from 'tamagui';
import { Slot, useRouter, usePathname } from 'expo-router';
import { red1 } from '../../styles/tamagui';

export default function OnboardingLayout() {
  const router = useRouter();
  const pathName = usePathname();

  const enum PathList {
    COOKING_LEVEL = '/onboarding/1CookingLevel',
    YOUR_FOODS = '/onboarding/2YourFoods',
    ALLERGIES = '/onboarding/3Allergies',
    DIETARY = '/onboarding/4Dietary',
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
    }
  };

  const onSubmit = () => {
    if (pathName === PathList.COOKING_LEVEL) {
      router.push(PathList.YOUR_FOODS);
    } else if (pathName === PathList.YOUR_FOODS) {
      router.push(PathList.ALLERGIES);
    } else if (pathName === PathList.ALLERGIES) {
      router.push(PathList.DIETARY);
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
      <Slot />
      <YStack f={0.15} jc="flex-end" mb={36} ml={24} mr={24} mt={24}>
        <RoundedButton
          title="Continue"
          customStyle={[styles.continueButton]}
          width="100%"
          onPress={onSubmit}
        />
      </YStack>
    </>
  );
}

const styles = StyleSheet.create({
  continueButton: {
    backgroundColor: red1,
  },
});
