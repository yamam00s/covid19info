import admin from 'firebase-admin'
import { firestore } from 'firebase/app'
import { collectionName } from '../services/constants'
import { Hazard } from '../services/models/hazard'

const saveHazard = async (
  db: admin.firestore.Firestore,
  hazards: Hazard[],
) => {
  const hazardRef = await db.collection(collectionName.hazard)
  let hazardData!: Hazard

  for await (const hazard of hazards) {
    const { key, todayInfection } = hazard
    const hazardDoc = await hazardRef.doc(key).get()
    const serverTimestamp = admin.firestore.FieldValue.serverTimestamp() as firestore.Timestamp

    if (hazardDoc.exists) {
      const existingData = hazardDoc.data() as Hazard
      const {
        todayInfection: yesterdayInfection, createdAt
      } = existingData

      hazardData = {
        ...hazard,
        comparisonYesterday: todayInfection - yesterdayInfection,
        createdAt,
        updateAt: serverTimestamp
      }
    } else {
      hazardData = {
        ...hazard,
        createdAt: serverTimestamp
      }
    }

    hazardDoc.ref.set(hazardData)
  }
}

export default saveHazard
