import React from "react"
import axios from "axios"
import FormData from "form-data"
import * as Google from "expo-google-app-auth"
import * as FileSystem from "expo-file-system"

import { googleConfig } from "src/env"
import { StyledButton } from "src/components/StyledButton"

const getHeader = (accessToken: string) => {
  return {
    Authorization: `Bearer ${accessToken}`,
  }
}

type Props = {
  accessToken: string
}

const DataAccessComponent: React.FC<Props> = (props: Props) => {
  const { accessToken } = props

  const logLocalDirectory = async () => {
    const { documentDirectory } = FileSystem
    if (documentDirectory) {
      const paths = await FileSystem.readDirectoryAsync(documentDirectory)
      console.log(paths)
    }
  }

  const logServerFiles = async () => {
    // https://developers.google.com/drive/api/v3/reference/files/list
    const response = await axios.get(
      "https://www.googleapis.com/drive/v3/files",
      {
        headers: getHeader(accessToken),
        params: {
          pageSize: 5,
        },
      }
    )
    console.log(response.data)
  }

  const writeMetaDataFile = async () => {
    const metaUri = `${FileSystem.documentDirectory}metadata.json`
    await FileSystem.writeAsStringAsync(metaUri, "{name: 'sample'}")
  }

  const uploadFile = async () => {
    const uri =
      "https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart"

    const formData = new FormData()
    formData.append("metadata", {
      uri: `${FileSystem.documentDirectory}metadata.json`,
      type: "application/json;charset=UTF-8",
    })
    formData.append("file", {
      uri: `${FileSystem.documentDirectory}SQLite/sample`,
      name: "sample",
    })

    axios.post(uri, formData, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
  }

  const copyFile = async () => {
    // 間違って to と from に同じ値を渡すと、ファイルが完全に失われる
    const to = `${FileSystem.documentDirectory}database`
    const from = `${FileSystem.documentDirectory}SQLite/sample`
    FileSystem.copyAsync({ to, from }).catch((error) => {
      console.log(error)
    })
  }

  return (
    <>
      <StyledButton title="LOG LOCAL DIRECTORY" onPress={logLocalDirectory} />
      <StyledButton title="LOG SERVER FILES" onPress={logServerFiles} />
      <StyledButton title="WRITE META DATA FILE" onPress={writeMetaDataFile} />
      <StyledButton title="UPLOAD" onPress={uploadFile} />
      <StyledButton title="COPY" onPress={copyFile} />
    </>
  )
}

export const GoogleDriveScreen: React.FC = () => {
  // expo-google-app-auth
  // https://docs.expo.io/versions/latest/sdk/google/
  // スコープを渡すと PKCE な認可コードグラントでやってくれる

  // スコープの一覧が載っているページ
  // https://developers.google.com/drive/api/v3/about-auth

  const [accessToken, setAccessToken] = React.useState<string | undefined>()

  const config = {
    iosClientId: googleConfig.iosClientId,
    scopes: ["https://www.googleapis.com/auth/drive.file"],
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

  return <DataAccessComponent accessToken={accessToken} />
}
