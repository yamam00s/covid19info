import React, { FC, useContext } from 'react'
import firebase from 'firebase/app'
import 'firebase/firestore';
import Head from 'next/head'
import TweetContainer from 'containers/Tweet'
import { HazardContext } from 'contexts'
import { ClientHazard, Hazard } from 'services/models/hazard';
import { collectionName } from 'services/constants'

const Home: FC<{ hazardData: ClientHazard[] }>= ({ hazardData }) => {
  const { setHazards } = useContext(HazardContext)
  setHazards(hazardData)

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

    // const hazardData: ClientHazard[] = [{
    //   region: '山口県',
    //   totalInfection: 37,
    //   updateAt: 'Fri May 08 2020',
    //   id: 35,
    //   todayInfection: 0,
    //   createdAt: 'Wed May 06 2020',
    //   key: 'yamaguchi',
    //   nowInfection: 13,
    //   comparisonYesterday: -1
    // }]

  return {
    props: {
      hazardData
    }
  }
}

export default Home
