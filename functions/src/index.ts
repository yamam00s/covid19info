import * as functions from 'firebase-functions'
import admin from 'firebase-admin'
import fetch from 'node-fetch'
import feedHazard from './crawlers/hazard-yahoo'
import saveHazard from './models/hazard'
import { deployHooksUrl } from './deploy-hooks'

admin.initializeApp()

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
    if (!feedData.length) throw new Error('feed error')
    await saveHazard(db, feedData)
    await fetch(deployHooksUrl)
  })

// local node.js環境での実行用
// import serviceAccount from './covid19info-firebase-adminsdk.json'

// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
//   databaseURL: "https://covid19info-574cd.firebaseio.com"
// })

// const localTest = async () => {
//   const db = admin.firestore()
//   const feedData = await feedHazard()
//   await saveHazard(db, feedData)
// }

// localTest()
