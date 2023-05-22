import { Slot } from 'expo-router';
import { Dimensions, Text, StyleSheet, SafeAreaView, View } from 'react-native';
import { XStack, YStack, ZStack } from 'tamagui';
import ResponsiveImage from 'react-native-responsive-image';
import { inactive, red1 } from '../../styles/tamagui';

export default function SearchLayout() {
  const height = Dimensions.get('window').height;

  return (
    <>
      <YStack mt={55} ml={34} mr={24}>
        <XStack ai="center">
          <ResponsiveImage
            source={require('../../assets/logo.png')}
            initWidth="19"
            initHeight="24"
          ></ResponsiveImage>
          <Text style={styles.menuTitle}>Recipe Finder</Text>
          <ResponsiveImage
            source={require('../../assets/bookmark.png')}
            initWidth="20"
            initHeight="24"
            style={{ right: 11, position: 'absolute' }}
          ></ResponsiveImage>
        </XStack>
      </YStack>
      <SafeAreaView style={{ height: height - 40 }}>
        <Slot />
        <YStack f={0.12} jc="flex-end" mb={36} ml={24} mr={24}>
          <XStack jc="space-around" ai="center">
            <YStack ai="center">
              <ResponsiveImage
                source={require('../../assets/Home.png')}
                initWidth="19"
                initHeight="20"
              />
              <Text style={styles.bottomTextIcon}>Home</Text>
            </YStack>
            <View
              style={{ backgroundColor: red1, padding: 12, borderRadius: 100 }}
            >
              <ResponsiveImage
                source={require('../../assets/search.png')}
                initWidth="19"
                initHeight="20"
              />
            </View>
            <YStack ai="center">
              <ResponsiveImage
                source={require('../../assets/people.png')}
                initWidth="19"
                initHeight="20"
              />
              <Text style={styles.bottomTextIcon}>Profile</Text>
            </YStack>
          </XStack>
        </YStack>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  menuTitle: {
    color: 'white',
    fontFamily: 'UrbanistBold',
    fontSize: 24,
    marginLeft: 21,
  },
  bottomTextIcon: {
    color: inactive,
    fontSize: 10,
    fontFamily: 'Urbanist',
    marginTop: 4,
  },
});
