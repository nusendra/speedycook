import { responsiveFontSize } from '../../styles/ResponsiveFontSize';
import ResponsiveImage from 'react-native-responsive-image';
import {
  Text,
  StyleSheet,
  TextInput,
  View,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { XStack, YStack, Separator } from 'tamagui';
import { red1, dark4 } from '../../styles/tamagui';
import { useState } from 'react';
import { shallow } from 'zustand/shallow';
import { useOnboardingStore } from '../../stores/OnboardingStore';

export default function YourFoods() {
  const { foods, addFood, removeFood } = useOnboardingStore(
    (state) => ({
      foods: state.foods,
      addFood: state.addFood,
      removeFood: state.removeFood,
    }),
    shallow
  );
  const [input, setInput] = useState<string>('');

  const addItem = () => {
    addFood(input);
  };

  const removeItem = (index: number) => {
    removeFood(index);
  };

  return (
    <>
      <YStack ml={24} mr={24} mb={36}>
        <Text style={styles.title}>What foods do you have at home? 🏡</Text>
        <Text style={styles.subTitle}>
          Add the food ingredients you have so that we can show you all the
          recipes you can make at the comfort of your own home!
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
          <TextInput
            style={styles.textInput}
            onChangeText={(newText) => setInput(newText)}
          />
          <TouchableOpacity style={styles.addButton} onPress={addItem}>
            <Text style={{ color: 'white', fontFamily: 'Urbanist' }}>Add</Text>
          </TouchableOpacity>
        </View>
        <YStack f={1}>
          {foods.length > 0 && (
            <>
              <Text style={styles.item}>Added Items</Text>
              <Separator borderColor={dark4} mt={24} />
            </>
          )}
          <ScrollView>
            {foods.map((item, index) => {
              return (
                <XStack jc="space-between" key={index}>
                  <Text style={styles.item}>{item}</Text>
                  <TouchableOpacity onPress={() => removeItem(index)}>
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
  addButton: {
    backgroundColor: red1,
    position: 'absolute',
    right: 10,
    width: 80,
    height: 40,
    borderRadius: 10,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textInput: {
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
});
