import AsyncStorage from '@react-native-async-storage/async-storage';

export const storeData = async (key: string, value: any) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonValue);
  } catch (e) {
    console.log(e);
  }
};

export const getUserStorage = async () => {
  const allKeys = await AsyncStorage.getAllKeys();
  const found = allKeys.find((item) => item.includes('authUser'));

  let userData = await AsyncStorage.getItem(found as string);
  userData = JSON.parse(userData as string);

  return userData;
};
