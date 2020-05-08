import React, { FC, useContext } from 'react'
import Head from 'next/head'
import firebase from 'firebase/app'
import 'firebase/firestore';
import firebaseConfig from 'firebaseConfig'
import TweetContainer from 'containers/Tweet'
import { collectionName } from 'services/constants';
import { Hazard } from 'services/models/hazard';
// import { FirebaseContext } from 'contexts';

firebase.initializeApp(firebaseConfig)

const Home: FC<{ hazardData : Hazard }>= ({ hazardData }) => {

  return (
    <div>
      <Head>
        <title>Home</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>Home</div>
      <TweetContainer />
    </div>
  )
}

export async function getStaticProps() {
  const db = firebase.firestore()
  const hazardsDoc = await db
    .collection(collectionName.hazard)
    .get()
  const hazardData = await hazardsDoc
    .docs.map(doc => {
      const hazardDoc = doc.data() as Hazard
      const { createdAt, updateAt } = hazardDoc
      return {
        ...hazardDoc,
        createdAt: createdAt.toDate().toDateString(),
        updateAt: updateAt.toDate().toDateString()
      }
    })

  return {
    props: {
      hazardData
    }
  }
}

export default Home
