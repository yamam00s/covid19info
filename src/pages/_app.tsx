import { AppProps, Container } from 'next/app'
import firebase from 'firebase/app'
import 'firebase/firestore';
import 'styles/global.css'
import firebaseConfig from 'firebaseConfig'
import { FirebaseContext, HazardContext } from 'contexts'
import { collectionName } from 'services/constants'
import { Hazard } from 'services/models/hazard'

firebase.initializeApp(firebaseConfig)

const App = ({ Component, pageProps }: AppProps) => {
  const { db, hazardData } = pageProps

  return (
    <FirebaseContext.Provider value={{ db }}>
      <HazardContext.Provider value={{ hazards: hazardData }}>
        <Component {...pageProps} />
      </HazardContext.Provider>
    </FirebaseContext.Provider>
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
      db,
      hazardData
    }
  }
}

export default App
