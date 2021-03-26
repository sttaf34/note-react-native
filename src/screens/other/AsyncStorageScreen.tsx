import React from "react"
import { Button, ScrollView } from "react-native"
import AsyncStorage from "@react-native-community/async-storage"

const KEY_FOR_STRING = "KEY_FOR_STRING"
const KEY_FOR_OBJECTS = "KEY_FOR_OBJECTS"
const KEY_FOR_BOOLEAN = "KEY_FOR_BOOLEAN"

type Score = {
  id: string
  value: number
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

  const setBooleanToStorage = async (isSomething: boolean) => {
    try {
      // get するときに都合が良い値にしている
      // Boolean("true") => true, Boolean("") => false
      const value = isSomething ? "true" : ""
      await AsyncStorage.setItem(KEY_FOR_BOOLEAN, value)
    } catch (error) {
      console.log(error)
    }
  }

  const getBooleanFromStorage = async (): Promise<boolean> => {
    try {
      const value = await AsyncStorage.getItem(KEY_FOR_BOOLEAN)
      return Boolean(value)
    } catch (error) {
      console.log(error)
    }
    return false
  }

  const onPressGetBooleanFromStorage = async () => {
    const isSomething = await getBooleanFromStorage()
    console.log(isSomething)
  }

  return (
    <ScrollView>
      <Button title="setStringToStorage" onPress={setStringToStorage} />
      <Button title="getStringFromStorage" onPress={getStringFromStorage} />
      <Button title="setObjectsToStorage" onPress={setObjectsToStorage} />
      <Button title="getObjectsFromStorage" onPress={getObjectsFromStorage} />
      <Button
        title="setBooleanToStorage"
        onPress={() => setBooleanToStorage(true)}
      />
      <Button
        title="getBooleanFromStorage"
        onPress={onPressGetBooleanFromStorage}
      />
    </ScrollView>
  )
}
