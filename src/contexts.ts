import { createContext } from 'react'
import firebase from 'firebase/app'
import { ClientHazard } from 'services/models/hazard'

type FirebaseContextValue = {
  db: firebase.firestore.Firestore | null
}

export const FirebaseContext = createContext<FirebaseContextValue>({
  db: null
})

type HazardContextValue = {
  hazards: ClientHazard[]
  setHazards: React.Dispatch<React.SetStateAction<ClientHazard[]>>
}

export const HazardContext = createContext<HazardContextValue>({
  hazards: [],
  setHazards: () => undefined
})
