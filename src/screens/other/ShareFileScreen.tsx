import React from "react"
import * as Sharing from "expo-sharing"
import * as FileSystem from "expo-file-system"

import { StyledButton } from "src/components/StyledButton"

export const ShareFileScreen: React.FC = () => {
  const readDirectory = async () => {
    const { documentDirectory } = FileSystem
    if (documentDirectory) {
      const paths = await FileSystem.readDirectoryAsync(documentDirectory)
      console.log(paths)
    }
  }

  const writeFile = () => {
    const fileUri = `${FileSystem.documentDirectory}sample.txt`
    console.log(fileUri)
    FileSystem.writeAsStringAsync(fileUri, "ABCDEFG")
  }

  const shareTextFile = () => {
    const fileUri = `${FileSystem.documentDirectory}sample.txt`
    Sharing.shareAsync(fileUri)
  }

  const downloadFile = () => {
    const url = "https://sttaf34.net/images/0/2.png"
    const fileUri = `${FileSystem.documentDirectory}download.png`
    const option: FileSystem.DownloadOptions = {
      sessionType: FileSystem.FileSystemSessionType.FOREGROUND,
    }
    FileSystem.downloadAsync(url, fileUri, option)
  }

  const shareImageFile = () => {
    const fileUri = `${FileSystem.documentDirectory}download.png`
    Sharing.shareAsync(fileUri)
  }

  return (
    <>
      <StyledButton title="READ" onPress={readDirectory} />

      <StyledButton title="WRITE" onPress={writeFile} />
      <StyledButton title="INTENT" onPress={shareTextFile} />

      <StyledButton title="DOWNLOAD" onPress={downloadFile} />
      <StyledButton title="INTENT" onPress={shareImageFile} />
    </>
  )
}
