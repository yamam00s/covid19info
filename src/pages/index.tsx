import React, { FC } from 'react'
import firebase from 'firebase/app'
import 'firebase/firestore'
import Head from 'next/head'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import firebaseConfig from 'firebaseConfig'
import HazardContainer from 'containers/Hazard'
import TweetContainer from 'containers/Tweet'
import HazardMain from 'components/Hazard'
import { ClientHazard, Hazard } from 'services/models/hazard'
import { collectionName } from 'services/constants'

const Home: FC<{ hazardData: ClientHazard[] }>= ({ hazardData }) => (
  <div>
    <Head>
      <title>Home</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>

    <Container>
      <Grid container spacing={3}>
        <Grid item xs={9}>
          <HazardContainer hazards={hazardData} />
          <HazardMain hazard={hazardData[40]} />
          <HazardMain hazard={hazardData[45]} />
        </Grid>
        <Grid item xs={3}>
          <TweetContainer />
        </Grid>
      </Grid>
    </Container>
  </div>
)

export async function getStaticProps() {
  !firebase.apps.length
    ? firebase.initializeApp(firebaseConfig)
    : firebase.app()

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
