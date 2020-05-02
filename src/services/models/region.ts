import { firestore } from 'firebase/app';

export type Region = {
  name: string
  nameReading: string
  todayInfection: number
  totalInfection: number
  todayRecovery: number
  totalRecovery: number
  comparisonInfection: number
  updateAt: firestore.Timestamp | null;
  createdAt: firestore.Timestamp | null;
}

export const blankRegion: Region = {
  name: '',
  nameReading: '',
  todayInfection: 0,
  totalInfection: 0,
  todayRecovery: 0,
  totalRecovery: 0,
  comparisonInfection: 0,
  updateAt: null,
  createdAt: null
}
