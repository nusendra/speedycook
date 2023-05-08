import ResponsiveImage from 'react-native-responsive-image';
import { responsiveFontSize } from '../../styles/ResponsiveFontSize';
import { XStack, YStack } from 'tamagui';
import { StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Text } from 'react-native';
import { dark2, dark4 } from '../../styles/tamagui';

export default function Allergies() {
  const allergiesOption = [
    [
      {
        title: 'Vegetarian',
        image: require('../../assets/vegetarian.png'),
      },
      {
        title: 'Vegan',
        image: require('../../assets/vegan.png'),
      },
    ],
    [
      {
        title: 'Dairy - free',
        image: require('../../assets/dairy-free.png'),
      },
      {
        title: 'Low - carb',
        image: require('../../assets/low-carb.png'),
      },
    ],
    [
      {
        title: 'Peanut - free',
        image: require('../../assets/peanut-free.png'),
      },
      {
        title: 'Keto',
        image: require('../../assets/keto.png'),
      },
    ],
    [
      {
        title: 'Soy - free',
        image: require('../../assets/soy-free.png'),
      },
      {
        title: 'Raw food',
        image: require('../../assets/raw-food.png'),
      },
    ],
    [
      {
        title: 'Low fat',
        image: require('../../assets/low-fat.png'),
      },
      {
        title: 'Halal',
        image: require('../../assets/halal.png'),
      },
    ],
  ];

  return (
    <>
      <YStack ml={24} mr={24} mb={36}>
        <Text style={styles.title}>
          Do you have any dietary preferences? ⚙️
        </Text>
        <Text style={styles.subTitle}>
          Select your dietary preferences for better recommendations, or you can
          skip it.
        </Text>
      </YStack>
      <YStack f={1} ml={24} mr={24}>
        <ScrollView>
          {allergiesOption.map((allergy, allergyIndex) => {
            return (
              <YStack mb={16} key={allergyIndex}>
                <XStack jc="space-between">
                  {allergy.map((item, index) => {
                    return (
                      <TouchableOpacity style={styles.cardOptions} key={index}>
                        <XStack f={1} ai="center">
                          <ResponsiveImage
                            source={item.image}
                            initWidth="48"
                            initHeight="48"
                            style={{ marginRight: 12 }}
                          />
                          <Text style={styles.buttonText}>{item.title}</Text>
                        </XStack>
                      </TouchableOpacity>
                    );
                  })}
                </XStack>
              </YStack>
            );
          })}
        </ScrollView>
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
  subTitle: {
    fontFamily: 'Urbanist',
    color: 'white',
    fontSize: responsiveFontSize(18),
    marginTop: 12,
  },
  cardOptions: {
    borderRadius: 16,
    justifyContent: 'space-between',
    height: 80,
    width: '48%',
    padding: 16,

    backgroundColor: dark2,
    borderColor: dark4,
    borderWidth: 1,
  },
  buttonText: {
    fontFamily: 'UrbanistBold',
    color: 'white',
    fontSize: responsiveFontSize(18),
    maxWidth: '70%',
  },
});
