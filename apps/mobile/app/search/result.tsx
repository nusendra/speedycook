import { View, ScrollView } from 'react-native';
import ResponsiveImage from 'react-native-responsive-image';
import { XStack, YStack } from 'tamagui';

export default function Result() {
  return (
    <>
      <YStack ml={24} mr={24} ai="center">
        <ResponsiveImage
          source={require('../../assets/recipe-result-header.png')}
          initWidth="379"
          initHeight="118"
          style={{ marginTop: 29 }}
        />
      </YStack>
      <YStack f={1} mt={40}>
        <ScrollView>
          <XStack mt={20} jc="space-between">
            <ResponsiveImage
              source={require('../../assets/results/food1.png')}
              initWidth="183"
              initHeight="260"
              style={{ marginLeft: 16 }}
            />
            <ResponsiveImage
              source={require('../../assets/results/food2.png')}
              initWidth="183"
              initHeight="260"
              style={{ marginRight: 16, marginLeft: 8 }}
            />
          </XStack>
          <XStack mt={20} jc="space-between">
            <ResponsiveImage
              source={require('../../assets/results/food3.png')}
              initWidth="183"
              initHeight="260"
              style={{ marginRight: 8, marginLeft: 16 }}
            />
            <ResponsiveImage
              source={require('../../assets/results/food4.png')}
              initWidth="183"
              initHeight="260"
              style={{ marginRight: 16, marginLeft: 8 }}
            />
          </XStack>
        </ScrollView>
      </YStack>
    </>
  );
}
