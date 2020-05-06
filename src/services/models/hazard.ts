import { firestore } from 'firebase/app';

export type Hazard = {
  id: number
  key: string
  region: string
  nowInfection: number
  todayInfection: number
  totalInfection: number
  comparisonYesterday: number
  updateAt: firestore.Timestamp | null;
  createdAt: firestore.Timestamp | null;
}

export const blankHazard: Hazard = {
  id: 0,
  key: '',
  region: '',
  nowInfection: 0,
  todayInfection: 0,
  totalInfection: 0,
  comparisonYesterday: 0,
  updateAt: null,
  createdAt: null
}
