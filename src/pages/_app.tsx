import React, { useState } from 'react'
import { AppProps } from 'next/app'
import firebase from 'firebase/app'
import 'firebase/firestore'
import 'styles/global.css'
import firebaseConfig from 'firebaseConfig'
import Layout from 'components/Layout'
import { FirebaseContext, HazardContext } from 'contexts'

const App = ({ Component, pageProps }: AppProps) => {
  !firebase.apps.length
    ? firebase.initializeApp(firebaseConfig)
    : firebase.app()
  const db =  firebase.firestore()

  return (
    <FirebaseContext.Provider value={{ db }}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </FirebaseContext.Provider>
  )
}

// App.getInitialProps = async () => {
// return {
//   pageProps: {
//   }
// }
// }

export default App
