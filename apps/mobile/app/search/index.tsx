import {
  StyleSheet,
  Text,
  TextInput,
  View,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { YStack, Separator, XStack } from 'tamagui';
import { responsiveFontSize } from '../../styles/ResponsiveFontSize';
import ResponsiveImage from 'react-native-responsive-image';
import { red1, dark4 } from '../../styles/tamagui';
import RoundedButton from '../../components/RoundedButton';
import { useRouter } from 'expo-router';
import { useEffect, useState, useRef } from 'react';
import { db } from '../../firebaseConfig';
import { doc, getDoc, setDoc, updateDoc } from '@firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Loader from '../../components/Loader';
import { isArraySame } from '../../utils/isSameArrays';

export default function SearchIndex() {
  const router = useRouter();
  const [cookingLevel, setCookingLevel] = useState<string>('');
  const [foods, setFoods] = useState<string[]>([]);
  const [dietaries, setDietaries] = useState<string[]>([]);
  const [allergies, setAllergies] = useState<string[]>([]);
  const [showLoader, setShowLoader] = useState<boolean>(false);
  const [input, setInput] = useState<string>('');
  const [user, setUser] = useState<any>(null);
  const [dataLoaded, setDataLoaded] = useState<boolean>(false);

  const getData = async () => {
    setShowLoader(true);
    const allKeys = await AsyncStorage.getAllKeys();
    const found = allKeys.find((item) => item.includes('authUser'));

    // const user = await AsyncStorage.getItem(found as string);
    // setUserData(JSON.parse(user as string));
    let userData = await AsyncStorage.getItem(found as string);
    userData = JSON.parse(userData as string);

    // @ts-ignore
    const docRef = doc(db, 'users', userData.uid);
    const docSnap = await getDoc(docRef);
    const userDoc = docSnap.data();

    setUser(userData);

    // @ts-ignore
    setFoods(userDoc.foods);
    // @ts-ignore
    setCookingLevel(userDoc.cookingLevel);
    // @ts-ignore
    setDietaries(userDoc.dietaries);
    // @ts-ignore
    setAllergies(userDoc.allergies);

    setShowLoader(false);
    setDataLoaded(true);
  };

  const addItem = async () => {
    setFoods([...foods, input]);
  };

  const removeItem = async (index: number) => {
    setFoods(foods.filter((_, index_) => index_ !== index));
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    if (dataLoaded) {
      const docRef = doc(db, 'users', user.uid);
      updateDoc(docRef, {
        foods,
      });
    }
  }, [foods]);

  return (
    <>
      <YStack ml={24} mr={24} mb={36}>
        <Text style={styles.title}>Edit your fridge</Text>
        <Text style={styles.subTitle}>
          Edit the foods you selected earlier from your fridge if needed and
          press go!
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
            style={styles.searchInput}
            onChangeText={(newText) => setInput(newText)}
          />
          <TouchableOpacity style={styles.addButton} onPress={addItem}>
            <Text style={{ color: 'white', fontFamily: 'Urbanist' }}>Add</Text>
          </TouchableOpacity>
        </View>
        <YStack f={1}>
          <Text style={styles.item}>Added Items</Text>
          <Separator borderColor={dark4} mt={24} />
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
          {showLoader && <Loader />}
          <RoundedButton
            title="Go !"
            customStyle={{
              backgroundColor: red1,
              marginTop: 10,
              marginBottom: 10,
            }}
            width="100%"
            onPress={() =>
              router.replace({
                pathname: '/search/result',
                params: { cookingLevel, foods, dietaries, allergies },
              })
            }
          />
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
});
