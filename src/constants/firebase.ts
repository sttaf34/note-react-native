import firebase from "firebase"
import { firebaseConfig } from "src/env"

export const firestore =
  firebase.apps.length === 0
    ? firebase.initializeApp(firebaseConfig).firestore()
    : firebase.app().firestore()

export const initFirebase = (): void => {
  if (firebase.apps.length === 0) {
    firebase.initializeApp(firebaseConfig)
  }
}

export const auth =
  firebase.apps.length === 0
    ? firebase.initializeApp(firebaseConfig).auth()
    : firebase.app().auth()

export const tweetCollectionReference = firestore.collection("tweets")
