import firebase from "firebase"
import { firebaseConfig } from "src/env"

export const firestore =
  firebase.apps.length === 0
    ? firebase.initializeApp(firebaseConfig).firestore()
    : firebase.app().firestore()
if (process.env.NODE_ENV === "development") {
  firestore.settings({
    host: "192.168.10.5:8080",
    ssl: false,
  })
}
