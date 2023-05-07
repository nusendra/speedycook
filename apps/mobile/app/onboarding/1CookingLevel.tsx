import ResponsiveImage from 'react-native-responsive-image';
import { responsiveFontSize } from '../../styles/ResponsiveFontSize';
import { Text, TouchableOpacity, Pressable, StyleSheet } from 'react-native';
import { XStack, YStack, ZStack, Stack, ScrollView } from 'tamagui';
import { dark2, dark4, dark, red1 } from '../../styles/tamagui';
import RoundedButton from '../../components/RoundedButton';
import { useRouter } from 'expo-router';

export default function CookingLevel() {
  const router = useRouter();

  const goBack = () => {
    router.back();
  };

  return (
    <>
      <YStack mt={55} ml={24} mr={24} mb={36}>
        <XStack>
          <ZStack>
            <Pressable
              style={({ pressed }) => [{}, { opacity: pressed ? 0.5 : 1 }]}
              hitSlop={{
                left: 100,
                right: 100,
                bottom: 100,
                top: 100,
              }}
              onPress={goBack}
            >
              <ResponsiveImage
                source={require('../../assets/arrow-left.png')}
                initWidth="28"
                initHeight="28"
                style={{ marginTop: 15 }}
              ></ResponsiveImage>
            </Pressable>
          </ZStack>
          <XStack mt={23} f={1} jc="center" ai="center">
            <ResponsiveImage
              source={require('../../assets/progress1.png')}
              initWidth="216"
              initHeight="12"
            />
          </XStack>
        </XStack>
        <YStack>
          <Text style={styles.title}>What is your cooking level? 🍳</Text>
          <Text style={styles.subTitle}>
            Please select your cooking level for a better recommendations.
          </Text>
        </YStack>
      </YStack>
      <YStack f={1} ml={24} mr={24}>
        <ScrollView width="100%" backgroundColor={dark}>
          <Pressable style={[styles.selectOption]}>
            <Text style={styles.optionTitle}>Novice</Text>
            <Text style={styles.optionDescription}>
              Basic understanding of kitchen tools and basic cooking techniques
              such as boiling and frying.
            </Text>
          </Pressable>
          <TouchableOpacity style={[styles.selectOption, { marginTop: 16 }]}>
            <Text style={styles.optionTitle}>Intermediate</Text>
            <Text style={styles.optionDescription}>
              Ability to follow recipes, prepare simple dishes, and basic knife
              skills.
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.selectOption, { marginTop: 16, height: 146 }]}
          >
            <Text style={styles.optionTitle}>Advanced</Text>
            <Text style={styles.optionDescription}>
              Understanding of cooking principles, create recipes, & proficiency
              in various cooking techniques such as baking, grilling, &
              roasting.
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.selectOption, { marginTop: 16, height: 146 }]}
          >
            <Text style={styles.optionTitle}>Advanced</Text>
            <Text style={styles.optionDescription}>
              Understanding of cooking principles, create recipes, & proficiency
              in various cooking techniques such as baking, grilling, &
              roasting.
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </YStack>
      <YStack f={0.15} jc="flex-end" mb={36} ml={24} mr={24} mt={24}>
        <RoundedButton
          title="Continue"
          customStyle={[styles.continueButton]}
          width="100%"
        />
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
  selectOption: {
    borderRadius: 16,
    height: 124,
    backgroundColor: dark2,
    borderColor: dark4,
    borderWidth: 1,
    paddingTop: 20,
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 20,
  },
  optionTitle: {
    fontFamily: 'UrbanistBold',
    color: 'white',
    fontSize: responsiveFontSize(20),
  },
  optionDescription: {
    fontFamily: 'Urbanist',
    color: 'white',
    fontSize: responsiveFontSize(16),
    marginTop: 8,
  },
  continueButton: {
    backgroundColor: red1,
  },
});
