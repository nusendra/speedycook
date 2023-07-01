import { Slot } from 'expo-router';
import { Dimensions, Text, StyleSheet, SafeAreaView, View } from 'react-native';
import { usePathname } from 'expo-router';
import { XStack, YStack, ZStack } from 'tamagui';
import ResponsiveImage from 'react-native-responsive-image';
import { inactive, red1 } from '../../styles/tamagui';

export default function SearchLayout() {
  const height = Dimensions.get('window').height;
  const pathName = usePathname();

  const enum PathList {
    RECIPE_FINDER = '/search',
    RESULT = '/search/result',
    RECIPE_DETAIL = '/search/recipe',
  }

  const RecipeFinderHeader = () => {
    return (
      <>
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
      </>
    );
  };

  const NavigateBackHeader = (props: any) => {
    const withoutTitle = props.withoutTitle;

    return (
      <>
        <XStack ai="center">
          <ResponsiveImage
            source={require('../../assets/arrow-left.png')}
            initWidth="19"
            initHeight="24"
          ></ResponsiveImage>
          {!withoutTitle && <Text style={styles.menuTitle}>Back</Text>}
        </XStack>
      </>
    );
  };

  const Header = () => {
    return (
      <>
        {pathName === PathList.RECIPE_FINDER && <RecipeFinderHeader />}
        {pathName === PathList.RESULT && <NavigateBackHeader />}
        {pathName === PathList.RECIPE_DETAIL && (
          <NavigateBackHeader withoutTitle />
        )}
      </>
    );
  };

  return (
    <>
      <YStack mt={55} ml={34} mr={24}>
        <Header />
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
