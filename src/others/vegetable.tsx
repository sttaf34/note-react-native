import React from "react"
import dayjs from "dayjs"
import firebase from "firebase"
import { useCollectionData } from "react-firebase-hooks/firestore"

import { firestore } from "src/others/firebase"

export const vegetablesReference = firestore.collection("vegetables")

type VegetableForCreate = {
  name: string
  price: number
  createdAt: firebase.firestore.FieldValue
  updatedAt: firebase.firestore.FieldValue
}

export type Vegetable = VegetableForCreate & {
  id: string
  createdAt: firebase.firestore.Timestamp
  updatedAt: firebase.firestore.Timestamp
}

type VegetableForUpdate = Partial<VegetableForCreate> & {
  updatedAt: firebase.firestore.FieldValue
}

export const serverTimeStamp = (): firebase.firestore.FieldValue => {
  return firebase.firestore.FieldValue.serverTimestamp()
}

export type UseWrite = {
  error: Error | undefined
  execute: () => void
}

export const useWrite = (executeFunction: () => Promise<void>): UseWrite => {
  const [error, setError] = React.useState<Error | undefined>(undefined)

  const execute = async () => {
    setError(undefined)
    try {
      await executeFunction()
    } catch (aError) {
      if (aError instanceof Error) {
        setError(aError)
      }
    }
  }
  return { error, execute }
}

export const useReadVegetables = (): {
  isLoading: boolean
  error: Error | undefined
  vegetables: Vegetable[]
} => {
  const [vegetables, isLoading, error] = useCollectionData<Vegetable>(
    vegetablesReference,
    { idField: "id" }
  )
  if (vegetables === undefined) {
    return { isLoading, error, vegetables: [] }
  }
  return { isLoading, error, vegetables }
}

export const useCreateVegetable = (name: string, price: string): UseWrite => {
  const newVegetable: VegetableForCreate = {
    name,
    price: Number(price),
    updatedAt: serverTimeStamp(),
    createdAt: serverTimeStamp(),
  }
  return useWrite(async () => {
    console.log(dayjs().format("ss.SSS"))
    await vegetablesReference.add(newVegetable)
    console.log("LAST")
    console.log(dayjs().format("ss.SSS"))
  })
}

export const useUpdateVegetable = (
  vegetableId: string,
  newName: string,
  newPrice: string
): UseWrite => {
  const diff: VegetableForUpdate = {
    name: newName,
    price: Number(newPrice),
    updatedAt: serverTimeStamp(),
  }
  return useWrite(async () => {
    vegetablesReference.doc(vegetableId).update(diff)
  })
}

export const useDeleteVegetable = (vegetableId: string): UseWrite => {
  return useWrite(async () => {
    vegetablesReference.doc(vegetableId).delete()
  })
}
