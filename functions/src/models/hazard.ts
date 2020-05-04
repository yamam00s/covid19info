import admin from 'firebase-admin';
import { collectionName } from '../services/constants';
import { Hazard } from '../services/models/hazard';

const saveHazard = async (
  db: admin.firestore.Firestore,
  hazards: Hazard[],
) => {
  const hazardRef = await db.collection(collectionName.hazard)

  for await (const hazard of hazards) {
    const hazardDoc = await hazardRef.doc(hazard.key).get()
    if (hazardDoc.exists) {
      hazardDoc.ref.set({
        ...hazard,
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
        updateAt: admin.firestore.FieldValue.serverTimestamp()
      })
    } else {
      hazardDoc.ref.set({
        ...hazard,
        updateAt: admin.firestore.FieldValue.serverTimestamp()
      })
    }
  }
}

export default saveHazard
