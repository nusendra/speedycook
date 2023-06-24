import { ScrollView, TouchableOpacity, StyleSheet, Text } from 'react-native';
import ResponsiveImage from 'react-native-responsive-image';
import { XStack, YStack } from 'tamagui';
import DishCard from '../../components/DishCard';
import { useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { GenerateFoodsType, generateFoods } from '../../apis';
import { dark2, dark4 } from '../../styles/tamagui';
import { responsiveFontSize } from '../../styles/ResponsiveFontSize';

export default function Result() {
  const params = useLocalSearchParams<GenerateFoodsType>();
  const [foods, setFoods] = useState<string[]>([]);

  const getFoods = async () => {
    const { data } = await generateFoods(params);
    setFoods(data);
  };

  useEffect(() => {
    getFoods();
  }, []);

  return (
    <>
      <YStack mx={24} ai="center">
        <ResponsiveImage
          source={require('../../assets/recipe-result-header.png')}
          initWidth="379"
          initHeight="118"
          style={{ marginTop: 29 }}
        />
      </YStack>
      <YStack f={1} mt={20} mx={24}>
        <ScrollView>
          {foods.map((item: any, index) => {
            return (
              <TouchableOpacity style={[styles.selectOption]} key={index}>
                <Text style={styles.optionTitle}>{item.foodName}</Text>
                <Text style={styles.optionDescription}>{item.description}</Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </YStack>
    </>
  );
}

const styles = StyleSheet.create({
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
    marginTop: 20,
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
