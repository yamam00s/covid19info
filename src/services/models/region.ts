import { firestore } from 'firebase/app';

export type Region = {
  id: number
  name: string
  todayInfection: number
  totalInfection: number
  comparisonInfection: number
  updateAt: firestore.Timestamp | null;
  createdAt: firestore.Timestamp | null;
}

export const blankRegion: Region = {
  id: 0,
  name: '',
  todayInfection: 0,
  totalInfection: 0,
  comparisonInfection: 0,
  updateAt: null,
  createdAt: null
}
