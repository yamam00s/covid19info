import { createContext } from 'react';
import firebase from 'firebase/app';
import { Hazard } from 'services/models/hazard';

type FirebaseContextValue = {
  db: firebase.firestore.Firestore | null
}

export const FirebaseContext = createContext<FirebaseContextValue>({
  db: null
})

type HazardContextValue = {
  hazards: Hazard[]
}

export const HazardContext = createContext<HazardContextValue>({
  hazards: []
})
