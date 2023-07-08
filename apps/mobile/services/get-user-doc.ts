import { db } from '../firebaseConfig';
import { doc, getDoc } from '@firebase/firestore';

export const getUserDoc = async (uid: string) => {
  // @ts-ignore
  const docRef = doc(db, 'users', uid);
  const docSnap = await getDoc(docRef);
  const userDoc = docSnap.data();

  return userDoc;
};
