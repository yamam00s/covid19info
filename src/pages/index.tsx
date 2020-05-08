import React, { FC, useContext } from 'react'
import Head from 'next/head'
import TweetContainer from 'containers/Tweet'
import { Hazard } from 'services/models/hazard';

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

export default Home
