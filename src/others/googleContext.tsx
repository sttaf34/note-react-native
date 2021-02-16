import React from "react"
import axios, { AxiosResponse } from "axios"
import * as Google from "expo-google-app-auth"
import * as SecureStore from "expo-secure-store"

import { googleConfig } from "src/env"
import { PropsChildren } from "src/constants/types"

const config: Google.GoogleLogInConfig = {
  iosClientId: googleConfig.iosClientId,
  scopes: ["https://www.googleapis.com/auth/drive.file"],
}

type Context = {
  isReady: boolean
  log: string
  logIn: () => Promise<void>
  request: () => Promise<void>
  deleteRefreshToken: () => Promise<void>
}

const initialContext: Context = {
  isReady: false,
  log: "",
  logIn: async () => {
    //
  },
  request: async () => {
    //
  },
  deleteRefreshToken: async () => {
    //
  },
}

//
// #region Helper
//

const KEY_FOR_GOOGLE_REFRESH_TOKEN = "KEY-FOR-GOOGLE-REFRESH_TOKEN"

const setGoogleRefreshToken = async (token: string | null): Promise<void> => {
  if (token === null || token.length === 0) {
    SecureStore.deleteItemAsync(KEY_FOR_GOOGLE_REFRESH_TOKEN)
    return
  }
  await SecureStore.setItemAsync(KEY_FOR_GOOGLE_REFRESH_TOKEN, token || "")
}

const getGoogleRefreshToken = async (): Promise<string | null> => {
  const token = await SecureStore.getItemAsync(KEY_FOR_GOOGLE_REFRESH_TOKEN)
  return token
}

const requestNewAccessToken = async (
  refreshToken: string
): Promise<AxiosResponse> => {
  const url = "https://www.googleapis.com/oauth2/v4/token"
  const clientId = config.iosClientId
  const params = [
    `refresh_token=${refreshToken}`,
    `client_id=${clientId}`,
    `grant_type=refresh_token`,
  ]
  return axios.post(url, params.join("&"))
}

const requestFiles = async (accessToken: string): Promise<AxiosResponse> => {
  // https://developers.google.com/drive/api/v3/reference/files/list
  console.log(accessToken)
  return axios.get("https://www.googleapis.com/drive/v3/files", {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })
}

// #endregion Helper

//
// #region Context
//

export const GoogleContext = React.createContext(initialContext)

export const GoogleContextProvider: React.FC<PropsChildren> = (
  props: PropsChildren
) => {
  const { children } = props

  const [, setAccessToken] = React.useState<string | null>(null)
  const [refreshToken, setRefreshToken] = React.useState<string | null>(null)
  const [log, setLog] = React.useState("")

  React.useEffect(() => {
    const setup = async () => {
      const token = await getGoogleRefreshToken()
      setRefreshToken(token)
    }
    setup()
  }, [])

  const logIn = async () => {
    // 圏外で実行された場合は、
    // モーダル内でインターネット接続がない旨が表示される

    const result: Google.LogInResult = await Google.logInAsync(config)
    if (result.type === "cancel") {
      // アラートでのキャンセル時、モーダルでのキャンセル時はここ
      return
    }

    if (result.accessToken === null) {
      return
    }

    setAccessToken(result.accessToken)
    setRefreshToken(result.refreshToken)

    // 永続化
    setGoogleRefreshToken(result.refreshToken)
  }

  const request = async () => {
    // TODO: 取得したばかりのアクセストークンを使うようにする

    if (refreshToken === null) {
      setLog("リフレッシュトークンがない")
      return
    }

    let response
    try {
      response = await requestNewAccessToken(refreshToken)
    } catch (error) {
      if (error.response === undefined) {
        setLog("インターネット接続がない")
      } else {
        setLog(`Error requestNewAccessToken()\n${error.message}`)
        // ここに来る可能性としては、
        // - requestNewAccessToken の処理が間違っている
        // - リフレッシュトークンが無効な値
        setRefreshToken(null)
        setGoogleRefreshToken(null)
      }
      return
    }

    const newAccessToken = response.data.access_token
    if (typeof newAccessToken !== "string") {
      setLog("アクセストークンが取得できなかった")
      setRefreshToken(null)
      setGoogleRefreshToken(null)
    }

    try {
      const responseFiles = await requestFiles(newAccessToken)
      setLog(JSON.stringify(responseFiles.data))
    } catch (error) {
      if (error.response === undefined) {
        console.log("インターネット接続がない")
      } else {
        // ここに来る可能性としては、
        // - アクセストークンの期限切れ
        // - requestFiles の処理が間違っている
        // - スコープで同意を求めていない API を使おうとしている
        // - GCP のコンパネでの設定が間違っている
        setLog(`Error requestFiles()\n${error.message}`)
      }
    }
  }

  const deleteRefreshToken = async () => {
    setRefreshToken(null)
    setGoogleRefreshToken(null)
  }

  const context: Context = {
    isReady: refreshToken !== null,
    log,
    logIn,
    request,
    deleteRefreshToken,
  }

  return (
    <GoogleContext.Provider value={context}>{children}</GoogleContext.Provider>
  )
}

// #endregion Context
