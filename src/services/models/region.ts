import { firestore } from 'firebase/app';

export type Region = {
  name: string
  todayInfection: number
  totalInfection: number
  comparisonInfection: number
  updateAt: firestore.Timestamp | null;
  createdAt: firestore.Timestamp | null;
}

export const blankRegion: Region = {
  name: '',
  todayInfection: 0,
  totalInfection: 0,
  comparisonInfection: 0,
  updateAt: null,
  createdAt: null
}
