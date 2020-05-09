import React, { FC } from 'react'
import firebase from 'firebase/app'
import 'firebase/firestore';
import Head from 'next/head'
import HazardContainer from 'containers/Hazard'
import TweetContainer from 'containers/Tweet'
import { ClientHazard, Hazard } from 'services/models/hazard';
import { collectionName } from 'services/constants'

const Home: FC<{ hazardData: ClientHazard[] }>= ({ hazardData }) => (
  <div>
    <Head>
      <title>Home</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <HazardContainer hazards={hazardData} />
    <TweetContainer />
  </div>
)

export async function getStaticProps() {
  const db =  firebase.firestore()
  const hazardsDoc = await db
    .collection(collectionName.hazard)
    .get()
  const hazardData: ClientHazard[] = await hazardsDoc
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
