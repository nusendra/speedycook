import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import { auth } from '../firebaseConfig';

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
