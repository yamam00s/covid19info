import { firestore } from 'firebase/app';

export type Hazard = {
  id: number
  key: string
  region: string
  todayInfection: number
  totalInfection: number
  comparisonInfection: number
  updateAt: firestore.Timestamp | null;
  createdAt: firestore.Timestamp | null;
}

export const blankHazard: Hazard = {
  id: 0,
  key: '',
  region: '',
  todayInfection: 0,
  totalInfection: 0,
  comparisonInfection: 0,
  updateAt: null,
  createdAt: null
}
