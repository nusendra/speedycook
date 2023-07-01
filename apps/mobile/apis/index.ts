import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import { auth } from '../firebaseConfig';
import { API_URL } from '@env';
import { errorMessages } from '../utils/constants';

export const signUp = async (email: string, password: string) => {
  try {
    const create = await createUserWithEmailAndPassword(auth, email, password);
    return create;
  } catch (err: any) {
    console.log(err.message);
  }
};

export const signIn = async (
  email: string,
  password: string
): Promise<{ success: boolean; data: any }> => {
  try {
    const user = await signInWithEmailAndPassword(auth, email, password);
    return {
      success: true,
      data: user,
    };
  } catch (err: any) {
    const errorMessage = errorMessages.find((item) => {
      return err.message.includes(item.key);
    });
    console.log(errorMessage);
    return {
      success: false,
      data: errorMessage?.message,
    };
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

  const result = await fetch(
    `${API_URL}/foods-by-ingredients?cookingLevel=${cookingLevel}&ingredients=${foods?.toString()}&dietaries=${dietaries?.toString()}&allergies=${allergies?.toString()}`
  );
  const json = await result.json();
  console.log(json);
  return json;
};

export const getRecipe = async (food: string, ingredients: string) => {
  const param = `${food},${ingredients}`;

  const result = await fetch(`${API_URL}/recipes?foodName=${param}`);
  const json = await result.json();

  return json;
};

export const getInstructions = async (
  foodName: string,
  ingredients: string
) => {
  const result = await fetch(`${API_URL}/recipe-instructions`, {
    method: 'POST',
    body: JSON.stringify({
      foodName,
      ingredients,
    }),
  });
  const json = await result.json();
  console.log(json);

  return json;
};
