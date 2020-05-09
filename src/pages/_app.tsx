import React, { useState } from 'react'
import { AppProps } from 'next/app'
import firebase from 'firebase/app'
import 'firebase/firestore';
import 'styles/global.css'
import firebaseConfig from 'firebaseConfig'
import { FirebaseContext, HazardContext } from 'contexts'
import { ClientHazard } from 'services/models/hazard';

const App = ({ Component, pageProps }: AppProps) => {
  !firebase.apps.length
    ? firebase.initializeApp(firebaseConfig)
    : firebase.app()
  const db =  firebase.firestore()
  const [hazards, setHazards] = useState<ClientHazard[]>([])

  return (
    <FirebaseContext.Provider value={{ db }}>
      <HazardContext.Provider value={{ hazards, setHazards }}>
        <Component {...pageProps} />
      </HazardContext.Provider>
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
