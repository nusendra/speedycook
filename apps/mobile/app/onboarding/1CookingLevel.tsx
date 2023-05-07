import { responsiveFontSize } from '../../styles/ResponsiveFontSize';
import { Text, TouchableOpacity, Pressable, StyleSheet } from 'react-native';
import { YStack, ScrollView } from 'tamagui';
import { dark2, dark4, dark } from '../../styles/tamagui';

export default function CookingLevel() {
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
