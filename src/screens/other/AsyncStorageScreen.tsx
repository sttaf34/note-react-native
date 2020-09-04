import React from "react"
import firebase from "firebase"
import { Button, ScrollView } from "react-native"
import AsyncStorage from "@react-native-community/async-storage"

const KEY_FOR_STRING = "KEY_FOR_STRING"
const KEY_FOR_OBJECTS = "KEY_FOR_OBJECTS"
const KEY_FOR_FIREBASE = "KEY_FOR_FIREBASE"

type Score = {
  id: string
  value: number
}

type Vegetable = {
  id: string
  name: string
  price: number
  createdAt: firebase.firestore.Timestamp
  updatedAt: firebase.firestore.Timestamp
}

export const AsyncStorageScreen: React.FC = () => {
  const setStringToStorage = () => {
    AsyncStorage.setItem(KEY_FOR_STRING, "Hello!")
      .then(() => {
        console.log("SAVE")
      })
      .catch((error) => {
        console.log(error)
      })
  }

  const getStringFromStorage = async () => {
    try {
      const value = await AsyncStorage.getItem(KEY_FOR_STRING)
      console.log(value || "NULL!")
    } catch (error) {
      console.log(error)
    }
  }

  const setObjectsToStorage = async () => {
    const scores: Score[] = [
      { id: String(Math.random()), value: Math.random() },
      { id: String(Math.random()), value: Math.random() },
    ]
    try {
      const jsonString = JSON.stringify(scores)
      await AsyncStorage.setItem(KEY_FOR_OBJECTS, jsonString)
      console.log("SAVE")
    } catch (error) {
      console.log(error)
    }
  }

  const getObjectsFromStorage = async () => {
    try {
      const jsonString = await AsyncStorage.getItem(KEY_FOR_OBJECTS)
      if (jsonString) {
        const scores = JSON.parse(jsonString)
        console.log(scores)
      } else {
        console.log(jsonString || "NULL!")
      }
    } catch (error) {
      console.log(error)
    }
  }

  const setFirebaseObjectToStorage = async () => {
    const vegetable: Vegetable = {
      id: String(Math.random()),
      name: "大根",
      price: 198,
      createdAt: firebase.firestore.Timestamp.now(),
      updatedAt: firebase.firestore.Timestamp.now(),
    }
    console.log(vegetable)

    try {
      const jsonString = JSON.stringify(vegetable)
      await AsyncStorage.setItem(KEY_FOR_FIREBASE, jsonString)
      console.log("SAVE")
    } catch (error) {
      console.log(error)
    }
  }

  const getFirebaseObjectFromStorage = async () => {
    try {
      const jsonString = await AsyncStorage.getItem(KEY_FOR_FIREBASE)
      if (jsonString) {
        const object = JSON.parse(jsonString)
        // new しないとインスタンスメソッドが使えない
        const createdAt = new firebase.firestore.Timestamp(
          object.createdAt.seconds,
          object.createdAt.nanoseconds
        )
        const updatedAt = new firebase.firestore.Timestamp(
          object.updatedAt.seconds,
          object.updatedAt.nanoseconds
        )
        const vegetable: Vegetable = {
          id: object.id,
          name: object.name,
          price: object.price,
          createdAt,
          updatedAt,
        }
        console.log(vegetable.createdAt.toDate())
      } else {
        console.log(jsonString || "NULL!")
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <ScrollView>
      <Button title="setStringToStorage" onPress={setStringToStorage} />
      <Button title="getStringFromStorage" onPress={getStringFromStorage} />
      <Button title="setObjectsToStorage" onPress={setObjectsToStorage} />
      <Button title="getObjectsFromStorage" onPress={getObjectsFromStorage} />
      <Button
        title="setFirebaseObjectToStorage"
        onPress={setFirebaseObjectToStorage}
      />
      <Button
        title="getFirebaseObjectFromStorage"
        onPress={getFirebaseObjectFromStorage}
      />
    </ScrollView>
  )
}
