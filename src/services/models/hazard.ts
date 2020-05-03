import { firestore } from 'firebase/app';

export type Hazard = {
  id: number
  region: string
  todayInfection: number
  totalInfection: number
  comparisonInfection: number
  updateAt: firestore.Timestamp | null;
  createdAt: firestore.Timestamp | null;
}

export const blankHazard: Hazard = {
  id: 0,
  region: '',
  todayInfection: 0,
  totalInfection: 0,
  comparisonInfection: 0,
  updateAt: null,
  createdAt: null
}
