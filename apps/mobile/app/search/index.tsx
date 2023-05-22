import {
  StyleSheet,
  Text,
  TextInput,
  View,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { YStack, Separator, XStack } from 'tamagui';
import { responsiveFontSize } from '../../styles/ResponsiveFontSize';
import ResponsiveImage from 'react-native-responsive-image';
import { red1, dark4 } from '../../styles/tamagui';
import RoundedButton from '../../components/RoundedButton';

export default function SearchIndex() {
  const items = [
    'Bread',
    'Butter',
    'Cheese Permesan',
    'Toast',
    'Peanut Butter',
    'Tomato',
    'Creamy Garlic Shrimp',
    'Tomato Basil Soup',
    'Chocolate Chip Cookies',
  ];

  return (
    <>
      <YStack ml={24} mr={24} mb={36}>
        <Text style={styles.title}>Edit your fridge</Text>
        <Text style={styles.subTitle}>
          Edit the foods you selected earlier from your fridge if needed and
          press go!
        </Text>
      </YStack>
      <YStack f={1} ml={24} mr={24}>
        <View style={styles.inputContainer}>
          <ResponsiveImage
            source={require('../../assets/search.png')}
            initWidth="20"
            initHeight="20"
            style={styles.searchIcon}
          ></ResponsiveImage>
          <TextInput style={styles.searchInput} />
        </View>
        <YStack f={1}>
          <Text style={styles.item}>Added Items</Text>
          <Separator borderColor={dark4} mt={24} />
          <ScrollView>
            {items.map((item, index) => {
              return (
                <XStack jc="space-between" key={index}>
                  <Text style={styles.item}>{item}</Text>
                  <TouchableOpacity>
                    <ResponsiveImage
                      source={require('../../assets/cross.png')}
                      initWidth="24"
                      initHeight="24"
                      style={{ marginTop: 24 }}
                    ></ResponsiveImage>
                  </TouchableOpacity>
                </XStack>
              );
            })}
          </ScrollView>
          <RoundedButton
            title="Go !"
            customStyle={{
              backgroundColor: red1,
              marginTop: 10,
              marginBottom: 10,
            }}
            width="100%"
          />
        </YStack>
      </YStack>
    </>
  );
}

const styles = StyleSheet.create({
  title: {
    fontFamily: 'UrbanistBold',
    color: 'white',
    fontSize: responsiveFontSize(32),
    marginTop: 42,
  },
  searchInput: {
    borderColor: red1,
    borderWidth: 1,
    borderRadius: 16,
    height: 58,
    fontFamily: 'Urbanist',
    color: 'white',
    paddingLeft: 52,
    paddingTop: 20,
    paddingBottom: 18,
    fontSize: responsiveFontSize(16),
  },
  subTitle: {
    fontFamily: 'Urbanist',
    color: 'white',
    fontSize: responsiveFontSize(18),
    marginTop: 12,
  },
  inputContainer: {
    justifyContent: 'center',
  },
  searchIcon: {
    position: 'absolute',
    padding: 10,
    marginLeft: 20,
  },
  item: {
    fontFamily: 'UrbanistBold',
    color: 'white',
    fontSize: responsiveFontSize(20),
    marginTop: 24,
  },
});
