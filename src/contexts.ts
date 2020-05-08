import { createContext } from 'react';
import firebase from 'firebase/app';

type FirebaseContextValue = {
  db: firebase.firestore.Firestore | null
}

export const FirebaseContext = createContext<FirebaseContextValue>({
  db: null
})
