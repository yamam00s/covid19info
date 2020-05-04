import * as functions from 'firebase-functions';
import admin from 'firebase-admin';
import feedHazard from './crawlers/hazard-yahoo'
import saveHazard from './models/hazard'

admin.initializeApp();

export const fetchHazard = functions
  .region('asia-northeast1')
  .runWith({
    timeoutSeconds: 300,
    memory: '2GB',
  })
  .pubsub.schedule('0 0 * * *')
  .timeZone('Asia/Tokyo')
  .onRun(async () => {
    const db = admin.firestore()
    const feedData = await feedHazard()
    await saveHazard(db, feedData)
  })
