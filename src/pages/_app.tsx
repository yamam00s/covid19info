import { AppProps, Container } from 'next/app'
import firebase from 'firebase/app'
import 'firebase/firestore';
import 'styles/global.css'
import firebaseConfig from 'firebaseConfig'
import { FirebaseContext } from 'contexts'

firebase.initializeApp(firebaseConfig)

const App = ({ Component, pageProps }: AppProps) => {
  const db = firebase.firestore()

  return (
    <Container>
      <FirebaseContext.Provider value={{ db }}>
        <Component {...pageProps} />
      </FirebaseContext.Provider>
    </Container>
  )
}

export default App
