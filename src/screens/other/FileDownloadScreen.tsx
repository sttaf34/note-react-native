import React from "react"
import * as FileSystem from "expo-file-system"

import { StyledText } from "src/components/StyledText"
import { StyledButton } from "src/components/StyledButton"

export const FileDownloadScreen: React.FC = () => {
  const [text, setText] = React.useState("")

  const downloadFile = async () => {
    const url = "https://sttaf34.net/"
    const fileUri = `${FileSystem.documentDirectory}download.html`

    // FOREGROUND => 圏外のときに即座にエラー発生してくれる
    // BACKGROUND => 圏外のときに処理が完了しないっぽい、エラーも返さない
    const option: FileSystem.DownloadOptions = {
      sessionType: FileSystem.FileSystemSessionType.FOREGROUND,
      // sessionType: FileSystem.FileSystemSessionType.BACKGROUND,
    }

    try {
      await FileSystem.downloadAsync(url, fileUri, option)
      setText("Hello")
    } catch (error) {
      setText(`${String(error.response)}\n${error.message}`)
    }
  }

  return (
    <>
      <StyledButton onPress={downloadFile} />
      <StyledText text={text} />
    </>
  )
}
