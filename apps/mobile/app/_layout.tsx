import { Slot } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { TamaguiProvider, Theme } from 'tamagui';
import config from '../tamagui.config';

export default function Layout() {
  return (
    <TamaguiProvider config={config}>
      <StatusBar style="auto" />
      <Theme name="light">
        <Slot />
      </Theme>
    </TamaguiProvider>
  );
}
