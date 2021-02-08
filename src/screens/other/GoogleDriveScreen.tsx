import React from "react"
import axios from "axios"
import * as Google from "expo-google-app-auth"

import { googleConfig, googleDriveFileId } from "src/env"
import { StyledButton } from "src/components/StyledButton"

export const GoogleDriveScreen: React.FC = () => {
  const [accessToken, setAccessToken] = React.useState<string | undefined>()

  const config = {
    iosClientId: googleConfig.iosClientId,
    scopes: ["https://www.googleapis.com/auth/drive.metadata.readonly"],
  }

  if (accessToken === undefined) {
    const onPress = async () => {
      // ログイン画面のモーダルが出てくる
      // モーダル閉じるところまで操作を進めると result が得られる
      const result: Google.LogInResult = await Google.logInAsync(config)
      if (result.type === "cancel") {
        return
      }
      if (result.accessToken === null) {
        return
      }
      setAccessToken(result.accessToken)
    }
    return <StyledButton title="LOGIN" onPress={onPress} />
  }

  const onPressAbout = async () => {
    // https://developers.google.com/drive/api/v3/reference/about/get
    const response = await axios.get(
      "https://www.googleapis.com/drive/v3/about",
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          Accept: "application/json",
        },
        params: {
          fields: "user",
        },
      }
    )
    console.log(response.data)
  }

  const onPressGetFiles = async () => {
    // https://developers.google.com/drive/api/v3/reference/files/list
    const response = await axios.get(
      "https://www.googleapis.com/drive/v3/files",
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          Accept: "application/json",
        },
        params: {
          pageSize: 5,
        },
      }
    )
    console.log(response.data)
  }

  const onPressGetFile = async () => {
    // https://developers.google.com/drive/api/v3/reference/files/get
    const response = await axios.get(
      `https://www.googleapis.com/drive/v3/files/${googleDriveFileId}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          Accept: "application/json",
        },
      }
    )
    console.log(response)
  }

  return (
    <>
      <StyledButton title="ABOUT" onPress={onPressAbout} />
      <StyledButton title="GET FILES" onPress={onPressGetFiles} />
      <StyledButton title="GET FILE" onPress={onPressGetFile} />
    </>
  )
}
