import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import { auth } from '../firebaseConfig';
import { API_URL } from '@env';

export const signUp = async (email: string, password: string) => {
  try {
    const create = await createUserWithEmailAndPassword(auth, email, password);
    return create;
  } catch (err: any) {
    console.log(err.message);
  }
};

export const signIn = async (email: string, password: string) => {
  try {
    const user = await signInWithEmailAndPassword(auth, email, password);
    return user;
  } catch (err: any) {
    console.log(err.message);
  }
};

export const userSignOut = async () => {
  try {
    const user = await signOut(auth);
    return user;
  } catch (err: any) {
    console.log(err.message);
  }
};

export type GenerateFoodsType = {
  cookingLevel?: string;
  foods?: string[];
  dietaries?: string[];
  allergies?: string[];
};

export const generateFoods = async (params: GenerateFoodsType) => {
  const { cookingLevel, foods, dietaries, allergies } = params;

  console.log(API_URL);
  const result = await fetch(
    `${API_URL}/foods-by-ingredients?cookingLevel=${cookingLevel}&ingredients=${foods?.toString()}&dietaries=${dietaries?.toString()}&allergies=${allergies?.toString()}`
  );
  const json = await result.json();
  console.log(json);
  return json;
};
