import React from "react"
import * as Sharing from "expo-sharing"
import * as FileSystem from "expo-file-system"

import { StyledButton } from "src/components/StyledButton"

export const ShareFileScreen: React.FC = () => {
  const writeFile = () => {
    const { documentDirectory } = FileSystem
    if (documentDirectory) {
      const fileUri = `${FileSystem.documentDirectory}sample.txt`
      console.log(fileUri)
      FileSystem.writeAsStringAsync(fileUri, "ABCDEFG")
    }
  }

  const readDirectory = async () => {
    const { documentDirectory } = FileSystem
    if (documentDirectory) {
      const paths = await FileSystem.readDirectoryAsync(documentDirectory)
      console.log(paths)
    }
  }

  const share = () => {
    const fileUri = `${FileSystem.documentDirectory}sample.txt`
    Sharing.shareAsync(fileUri)
  }

  return (
    <>
      <StyledButton title="WRITE" onPress={writeFile} />
      <StyledButton title="READ" onPress={readDirectory} />
      <StyledButton title="INTENT" onPress={share} />
    </>
  )
}
