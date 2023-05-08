import ResponsiveImage from 'react-native-responsive-image';
import { responsiveFontSize } from '../../styles/ResponsiveFontSize';
import { XStack, YStack, Separator } from 'tamagui';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Text } from 'react-native';
import { dark2, dark4 } from '../../styles/tamagui';

export default function Allergies() {
  const allergiesOption = [
    [
      {
        title: 'Gluten - free',
        image: require('../../assets/gluten-free.png'),
      },
      {
        title: 'Nut - free',
        image: require('../../assets/nut-free.png'),
      },
    ],
    [
      {
        title: 'Dairy - free',
        image: require('../../assets/dairy-free.png'),
      },
      {
        title: 'Peanut - free',
        image: require('../../assets/peanut-free.png'),
      },
    ],
  ];

  return (
    <>
      <YStack ml={24} mr={24} mb={36}>
        <Text style={styles.title}>Do you have any allergies? ❌</Text>
        <Text style={styles.subTitle}>
          Select any allergies you have so that we only give you recipes that
          are safe for you!*
        </Text>
      </YStack>
      <YStack f={1} ml={24} mr={24} mb={28}>
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
        <YStack>
          <Text style={styles.description}>
            (AI algorithm cannot promise 100% accuracy)
          </Text>
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
  description: {
    fontFamily: 'Urbanist',
    color: 'white',
    fontSize: responsiveFontSize(18),
  },
});
