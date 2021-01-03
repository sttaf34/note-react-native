import React from "react"
import Storage from "react-native-storage"
import AsyncStorage from "@react-native-community/async-storage"

import { StyledButton } from "src/components/StyledButton"

const KEY_FOR_STRING = "KEYFORSTRING"
const KEY_FOR_BOOLEAN = "KEYFORBOOLEAN"

const storage = new Storage({
  storageBackend: AsyncStorage,
})

export const StorageScreen: React.FC = () => {
  const setStringToStorage = () => {
    storage
      .save({
        key: KEY_FOR_STRING,
        data: "Hello!",
      })
      .then(() => {
        console.log("SAVE")
      })
      .catch((error) => {
        console.log(error)
      })
  }

  const getStringFromStorage = async () => {
    try {
      const value = await storage.load<string>({ key: KEY_FOR_STRING })
      console.log(value)
    } catch (error) {
      // セットがまだな場合はこっちに来る
      console.log(error)
    }
  }

  const setBooleanToStorage = async () => {
    storage
      .save({
        key: KEY_FOR_BOOLEAN,
        data: false,
      })
      .then(() => {
        console.log("SAVE")
      })
      .catch((error) => {
        console.log(error)
      })
  }

  const getBooleanFromStorage = async () => {
    try {
      const value = await storage.load<boolean>({ key: KEY_FOR_BOOLEAN })
      console.log(value)
    } catch (error) {
      console.log(error)
    }
  }

  const getSomethingFromStorage = async () => {
    // セットしたときと異なる型を指定してしまうと、実行時にエラーになる
    const value = await storage.load<string>({ key: KEY_FOR_BOOLEAN })
    console.log(value.slice())
  }

  return (
    <>
      <StyledButton title="setStringToStorage" onPress={setStringToStorage} />
      <StyledButton
        title="getStringFromStorage"
        onPress={getStringFromStorage}
      />
      <StyledButton title="setBooleanToStorage" onPress={setBooleanToStorage} />
      <StyledButton
        title="getBooleanFromStorage"
        onPress={getBooleanFromStorage}
      />
      <StyledButton
        title="getSomethingFromStorage"
        onPress={getSomethingFromStorage}
      />
    </>
  )
}
