import { Slot } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { TamaguiProvider, Theme, YStack } from 'tamagui';
import config from '../tamagui.config';
import { dark } from '../styles/tamagui';

export default function Layout() {
  return (
    <TamaguiProvider config={config}>
      <StatusBar style="auto" />
      <YStack f={1} backgroundColor={dark}>
        <Theme name="light">
          <Slot />
        </Theme>
      </YStack>
    </TamaguiProvider>
  );
}
