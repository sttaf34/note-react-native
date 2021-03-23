import React from "react"
import { Image } from "react-native"
import * as Sharing from "expo-sharing"
import * as FileSystem from "expo-file-system"
import ViewShot, { captureRef } from "react-native-view-shot"

import { StyledText } from "src/components/StyledText"
import { StyledButton } from "src/components/StyledButton"

export const CaptureScreen: React.FC = () => {
  const viewShotRef = React.useRef<ViewShot>(null)
  const [base64, setBase64] = React.useState<string>("")

  const capture = async () => {
    const resultBase64 = await captureRef(viewShotRef, {
      format: "png",
      result: "data-uri",
    })

    // data:image/png;base64,iVBORw0KGg......... のような DATA URI の形式が返る
    setBase64(resultBase64)

    // ローカルに保存
    const fileUri = `${FileSystem.documentDirectory}capture.png`
    const contents = resultBase64.split(",")[1]
    FileSystem.writeAsStringAsync(fileUri, contents, {
      encoding: FileSystem.EncodingType.Base64,
    })
  }

  const share = async () => {
    // ローカルに保存したファイルであれば
    // 共有モーダルのヘッダのところに画像が表示される
    const fileUri = `${FileSystem.documentDirectory}capture.png`
    Sharing.shareAsync(fileUri)
  }

  return (
    <>
      <ViewShot
        ref={viewShotRef}
        style={{ width: 120, height: 40, margin: 10, borderWidth: 1 }}
      >
        <StyledText text="あああ" />
      </ViewShot>
      <StyledButton title="CAPTURE" onPress={capture} />
      {base64 === "" ? (
        <></>
      ) : (
        <Image
          style={{ width: 120, height: 40, borderWidth: 1, margin: 10 }}
          source={{ uri: base64 }}
        />
      )}
      <StyledButton title="SHARE" onPress={share} />
    </>
  )
}
