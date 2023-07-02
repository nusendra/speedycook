import ResponsiveImage from 'react-native-responsive-image';
import { Pressable, StyleSheet, SafeAreaView, Dimensions } from 'react-native';
import { XStack, YStack, ZStack } from 'tamagui';
import { Slot, useRouter } from 'expo-router';
import { red1, dark2 } from '../../styles/tamagui';
import { responsiveFontSize } from '../../styles/ResponsiveFontSize';

export default function AuthLayout() {
  const height = Dimensions.get('window').height;
  const router = useRouter();

  const goBack = () => {
    router.back();
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
        </XStack>
      </YStack>
      <SafeAreaView style={{ height: height - 40 }}>
        <Slot />
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
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
});
