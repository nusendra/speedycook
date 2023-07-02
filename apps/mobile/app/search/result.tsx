import { ScrollView, TouchableOpacity, StyleSheet, Text } from 'react-native';
import ResponsiveImage from 'react-native-responsive-image';
import { XStack, YStack } from 'tamagui';
import { useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { GenerateFoodsType, generateFoods } from '../../apis';
import { dark2, dark4 } from '../../styles/tamagui';
import { responsiveFontSize } from '../../styles/ResponsiveFontSize';
import { useRouter } from 'expo-router';
import Loader from '../../components/Loader';

export default function Result() {
  const router = useRouter();
  const params = useLocalSearchParams<GenerateFoodsType>();
  const [foods, setFoods] = useState<string[]>([]);
  const [showLoader, setShowLoader] = useState<boolean>(false);

  const getFoods = async () => {
    const { data } = await generateFoods(params);
    setFoods(data);
    setShowLoader(false);
  };

  const showRecipe = async (
    foodName: string,
    ingredients: string,
    description: string
  ) => {
    router.push({
      pathname: '/search/recipe',
      params: { foodName, ingredients, description },
    });
  };

  useEffect(() => {
    setShowLoader(true);
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
        {showLoader && (
          <XStack f={1} jc="center">
            <Loader />
          </XStack>
        )}
        <ScrollView>
          {foods.map((item: any, index) => {
            return (
              <TouchableOpacity
                style={[styles.selectOption]}
                key={index}
                onPress={() =>
                  showRecipe(item.foodName, item.ingredients, item.description)
                }
              >
                <Text style={styles.optionTitle}>{item.foodName}</Text>
                <Text numberOfLines={3} style={styles.optionDescription}>
                  {item.description}
                </Text>
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
    height: 130,
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
