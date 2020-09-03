import React, { useState } from "react"
import dayjs from "dayjs"
import firebase from "firebase"
import { ScrollView } from "react-native"

import { MarginText } from "src/components/MarginText"
import { useRightButton } from "src/common/navigationHooks"
import {
  Vegetable,
  serverTimeStamp,
  vegetablesReference,
} from "src/common/vegetable"

type QueryDocumentSnapshot = firebase.firestore.QueryDocumentSnapshot<
  firebase.firestore.DocumentData
>

type Props = {
  vegetables: Vegetable[]
}

const createVegetable = () => {
  const newVegetable = {
    name: "大根",
    price: 198,
    updatedAt: serverTimeStamp(),
    createdAt: serverTimeStamp(),
  }
  console.log(dayjs().format("ss.SSS"))
  vegetablesReference.add(newVegetable)
}

export const FirestoreScreen: React.FC = () => {
  const [vegetables, setVegetables] = useState<QueryDocumentSnapshot[]>([])
  useRightButton(createVegetable, "追加")

  React.useEffect(() => {
    // 変更が通信のレスポンスを待たずに通知されるとは言え、
    // 即座に通知されるわけではない
    const unsubscribe = vegetablesReference.onSnapshot((querySnapshot) => {
      if (querySnapshot.metadata.hasPendingWrites) {
        const snapshots: QueryDocumentSnapshot[] = querySnapshot.docs
        setVegetables(snapshots)
        console.log(dayjs().format("ss.SSS")) // 0.1 - 0.5 秒とか
      }
    })
    return unsubscribe
  }, [])

  const list = vegetables.map((vegetable) => {
    return <MarginText key={vegetable.id}>{vegetable.get("name")}</MarginText>
  })

  return <ScrollView>{list}</ScrollView>
}
