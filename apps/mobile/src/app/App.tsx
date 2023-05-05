import useCachedResources from '../../hooks/useCachedResources';
import { StatusBar } from 'expo-status-bar';
import ResponsiveImage from 'react-native-responsive-image';
import { TamaguiProvider, Theme, YStack } from 'tamagui';
import { Text, StyleSheet } from 'react-native';
import { responsiveFontSize } from '../styles/ResponsiveFontSize';
import { dark } from '../styles/tamagui';
import config from '../../tamagui.config';

export default function App() {
  const isLoadingComplete = useCachedResources();

  if (!isLoadingComplete) {
    return null;
  }

  return (
    <TamaguiProvider config={config}>
      <StatusBar style="auto" />
      <Theme name="light">
        <YStack f={1} jc="center" ai="center" backgroundColor={dark}>
          <ResponsiveImage
            source={require('../../assets/logo.png')}
            initWidth="127"
            initHeight="173"
          />
          <Text style={styles.title}>SpeedyCook</Text>
        </YStack>
      </Theme>
    </TamaguiProvider>
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
