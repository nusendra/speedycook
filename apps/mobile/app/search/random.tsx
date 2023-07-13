import { ScrollView, TouchableOpacity, StyleSheet, Text } from 'react-native';
import { XStack, YStack } from 'tamagui';
import { useEffect, useState } from 'react';
import { getRandomFoods } from '../../apis';
import { dark2, dark4 } from '../../styles/tamagui';
import { responsiveFontSize } from '../../styles/ResponsiveFontSize';
import { useRouter } from 'expo-router';
import Loader from '../../components/Loader';
import { getUserStorage } from '../../utils/Storage';
import { getUserDoc } from '../../services/get-user-doc';
import { userSignOut } from '../../apis';

export default function Result() {
  const router = useRouter();
  const [foods, setFoods] = useState<string[]>([]);
  const [showLoader, setShowLoader] = useState<boolean>(false);

  const getFoods = async () => {
    try {
      const user = await getUserStorage();
      // @ts-ignore
      const userDoc = await getUserDoc(user.uid);
      // @ts-ignore
      const allergies = userDoc.allergies;
      // @ts-ignore
      const cookingLevel = userDoc.cookingLevel;
      // @ts-ignore
      const dietaries = userDoc.dietaries;

      const { data } = await getRandomFoods({
        allergies,
        cookingLevel,
        dietaries,
      });
      setFoods(data);
    } catch (err) {
      userSignOut();
      router.replace('/home');
    }
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
      <YStack ml={24} mr={24} mb={24}>
        <Text style={styles.title}>Today's Food</Text>
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
  title: {
    fontFamily: 'UrbanistBold',
    color: 'white',
    fontSize: responsiveFontSize(32),
    marginTop: 24,
  },
});
