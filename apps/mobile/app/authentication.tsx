import ResponsiveImage from 'react-native-responsive-image';
import { responsiveFontSize } from '../styles/ResponsiveFontSize';
import { Text, StyleSheet } from 'react-native';
import { ZStack, Stack, Separator, YStack } from 'tamagui';
import { dark2, dark4, red1 } from '../styles/tamagui';
import RoundedButton from '../components/RoundedButton';
import { useRouter } from 'expo-router';

export default function Welcome() {
  const router = useRouter();

  const sign = (type: string) => {
    router.push('/onboarding/1CookingLevel');
  };

  return (
    <>
      <ZStack
        f={1}
        jc="flex-start"
        ai="center"
        style={{ position: 'absolute' }}
      >
        <Stack>
          <ResponsiveImage
            source={require('../assets/welcome-top.png')}
            initWidth="425"
            initHeight="425"
          />
          <ResponsiveImage
            source={require('../assets/welcome-bottom.png')}
            style={styles.bottomImage}
            initWidth="425"
            initHeight="425"
          />
        </Stack>
      </ZStack>
      <Stack f={1} jc="center" ai="center">
        <Text style={[styles.title, { color: 'white' }]}>Welcome to</Text>
        <Text style={[styles.title, { color: 'red' }]}>Speedycook 👋</Text>
        <Text style={styles.description}>
          The only AI recipe app thats gives you recipes for exactly what you
          have in your fridge.
        </Text>
        <YStack width="100%" maxWidth={334} marginHorizontal={15} mt={32}>
          <Separator marginHorizontal={15} borderColor={dark4} />
          <RoundedButton
            title="Continue with Google"
            customStyle={styles.googleButton}
            onPress={() => sign('google')}
          >
            <ResponsiveImage
              source={require('../assets/google.png')}
              initWidth="23"
              initHeight="23"
            />
          </RoundedButton>
          <RoundedButton
            title="Get Started"
            customStyle={styles.getStartedButton}
            onPress={() => sign('get_started')}
          />
          <RoundedButton
            title="I Already Have an Account"
            customStyle={styles.haveAccountButton}
            onPress={() => sign('sign_in')}
          />
        </YStack>
      </Stack>
    </>
  );
}

const styles = StyleSheet.create({
  bottomImage: {
    bottom: 0,
  },
  title: {
    fontFamily: 'UrbanistBold',
    fontSize: responsiveFontSize(40),
    marginBottom: 15,
    paddingRight: 48,
    paddingLeft: 48,
  },
  description: {
    fontFamily: 'Urbanist',
    fontSize: responsiveFontSize(20),
    color: 'white',
    paddingRight: 48,
    paddingLeft: 48,
    marginTop: 20,
    textAlign: 'center',
  },
  googleButton: {
    backgroundColor: dark2,
    marginTop: 32,
    borderColor: dark4,
    borderWidth: 1,
  },
  getStartedButton: {
    backgroundColor: red1,
    marginTop: 24,
  },
  haveAccountButton: {
    backgroundColor: dark4,
    marginTop: 24,
  },
});
