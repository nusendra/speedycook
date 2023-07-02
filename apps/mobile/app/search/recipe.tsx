import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { YStack, Separator, XStack } from 'tamagui';
import { responsiveFontSize } from '../../styles/ResponsiveFontSize';
import ResponsiveImage from 'react-native-responsive-image';
import { red1, dark4, dark2 } from '../../styles/tamagui';
import { useLocalSearchParams } from 'expo-router';
import { getInstructions, getRecipe } from '../../apis';
import { useState, useEffect } from 'react';
import Loader from '../../components/Loader';

export default function RecipeDetail() {
  const params = useLocalSearchParams();
  const [foodName, setFoodName] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [ingredients, setIngredients] = useState([]);
  const [instructions, setInstructions] = useState([]);
  const [showLoader, setShowLoader] = useState<boolean>(false);

  const fetchRecipe = async () => {
    const { foodName, ingredients, description } = params;
    setFoodName(foodName as string);
    setDescription(description as string);

    const data = await getRecipe(foodName as string, ingredients as string);

    setIngredients(data.data.recipe.ingredientLines);

    const instructions = await getInstructions(
      foodName as string,
      // @ts-ignore
      ingredients.toString()
    );
    setInstructions(instructions.data.instructions);
    setShowLoader(false);
  };

  useEffect(() => {
    setShowLoader(true);
    fetchRecipe();
  }, []);

  return (
    <>
      <YStack ml={24} mr={24} mb={36}>
        <ResponsiveImage
          source={require('../../assets/bookmark.png')}
          initWidth="20"
          initHeight="24"
          style={{ right: 11, position: 'absolute' }}
        ></ResponsiveImage>
        <Text style={styles.title}>{foodName}</Text>
      </YStack>
      <Separator mb={16} marginHorizontal={20} borderColor={dark4} />
      {showLoader && (
        <XStack f={1} jc="center">
          <Loader />
        </XStack>
      )}
      {!showLoader && (
        <YStack f={1} mb={10} mr={24}>
          <ScrollView>
            <YStack ml={24} mr={24} mb={36}>
              <Text style={styles.subTitle}>{description}</Text>
            </YStack>
            <Separator mb={16} marginHorizontal={20} borderColor={dark4} />
            <YStack ml={24} mr={24} mb={20}>
              <Text style={styles.ingredientTitle}>Ingredients :</Text>
            </YStack>
            <YStack ml={24} mr={24} mb={36}>
              {ingredients.map((item, index) => {
                return (
                  <XStack key={index}>
                    <View style={styles.circledNumber}>
                      <Text style={styles.circledText}>{index + 1}</Text>
                    </View>
                    <Text style={[styles.subTitle, { marginTop: 15 }]}>
                      {item}
                    </Text>
                  </XStack>
                );
              })}
            </YStack>
            <Separator mb={16} marginHorizontal={20} borderColor={dark4} />
            <YStack ml={24} mr={24} mb={20}>
              <Text style={styles.ingredientTitle}>Instructions :</Text>
            </YStack>
            <YStack ml={24} mr={24} mb={36}>
              {instructions.map((item, index) => {
                return (
                  <XStack key={index}>
                    <View style={styles.circledNumber}>
                      <Text style={styles.circledText}>{index + 1}</Text>
                    </View>
                    <Text style={[styles.subTitle, { marginTop: 15 }]}>
                      {item}
                    </Text>
                  </XStack>
                );
              })}
            </YStack>
          </ScrollView>
        </YStack>
      )}
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
  ingredientTitle: {
    fontFamily: 'UrbanistBold',
    color: 'white',
    fontSize: responsiveFontSize(24),
  },
  circledNumber: {
    borderRadius: 20,
    padding: 20,
    height: 20,
    backgroundColor: dark2,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
    marginRight: 10,
  },
  circledText: {
    position: 'absolute',
    color: red1,
    fontFamily: 'UrbanistBold',
  },
});
