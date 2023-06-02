import { responsiveFontSize } from '../../styles/ResponsiveFontSize';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import { YStack, ScrollView } from 'tamagui';
import { dark2, dark4, dark, red1 } from '../../styles/tamagui';
import {
  useOnboardingStore,
  CookingLevel as CookingLevelType,
} from '../../stores/OnboardingStore';

export default function CookingLevel() {
  const cookingLevel = useOnboardingStore((state) => state.cookingLevel);
  const setCookingLevelStore = useOnboardingStore(
    (state) => state.setCookingLevel
  );

  const setCookingLevel = (level: CookingLevelType) => {
    setCookingLevelStore(level);
  };

  const selectedStyle = (level: CookingLevelType) => {
    if (cookingLevel === level) {
      return {
        borderColor: red1,
      };
    }
    return '';
  };

  return (
    <>
      <YStack ml={24} mr={24} mb={36}>
        <Text style={styles.title}>What is your cooking level? 🍳</Text>
        <Text style={styles.subTitle}>
          Please select your cooking level for a better recommendations.
        </Text>
      </YStack>
      <YStack f={1} ml={24} mr={24}>
        <ScrollView width="100%" backgroundColor={dark}>
          <TouchableOpacity
            style={[styles.selectOption, selectedStyle('novice')]}
            onPress={() => setCookingLevel('novice')}
          >
            <Text style={styles.optionTitle}>Novice</Text>
            <Text style={styles.optionDescription}>
              Basic understanding of kitchen tools and basic cooking techniques
              such as boiling and frying.
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.selectOption,
              selectedStyle('intermediate'),
              {
                marginTop: 16,
              },
            ]}
            onPress={() => setCookingLevel('intermediate')}
          >
            <Text style={styles.optionTitle}>Intermediate</Text>
            <Text style={styles.optionDescription}>
              Ability to follow recipes, prepare simple dishes, and basic knife
              skills.
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.selectOption,
              selectedStyle('advanced'),
              { marginTop: 16, height: 146 },
            ]}
            onPress={() => setCookingLevel('advanced')}
          >
            <Text style={styles.optionTitle}>Advanced</Text>
            <Text style={styles.optionDescription}>
              Understanding of cooking principles, create recipes, & proficiency
              in various cooking techniques such as baking, grilling, &
              roasting.
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.selectOption,
              selectedStyle('professional'),
              { marginTop: 16, height: 146 },
            ]}
            onPress={() => setCookingLevel('professional')}
          >
            <Text style={styles.optionTitle}>Professional</Text>
            <Text style={styles.optionDescription}>
              Extensive knowledge of cooking techniques and ingredients, ability
              to work in a fast-paced environment, and experience in a
              professional kitchen setting.
            </Text>
          </TouchableOpacity>
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
});
