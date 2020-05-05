import React, {FC} from 'react'
import Head from 'next/head'

import TweetContainer from 'containers/Tweet'

const Home: FC = () => (
  <div>
    <Head>
      <title>Home</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <div>Home</div>
    <TweetContainer />
  </div>
)

export default Home
