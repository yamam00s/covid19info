// Start writing Firebase Functions
// https://firebase.google.com/docs/functions/typescript
import * as functions from 'firebase-functions';
import admin from 'firebase-admin';
import feedHazard from 'crawlers/hazard-yahoo'

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
    await feedHazard()
  })

