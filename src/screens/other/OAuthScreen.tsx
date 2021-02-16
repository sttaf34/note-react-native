import React from "react"
import { ScrollView } from "react-native-gesture-handler"

import { StyledButton } from "src/components/StyledButton"
import { StyledText } from "src/components/StyledText"
import { GoogleContext, GoogleContextProvider } from "src/others/googleContext"

const OAuthScreenInner: React.FC = () => {
  const context = React.useContext(GoogleContext)
  const { isReady, log, logIn, request, deleteRefreshToken } = context

  if (isReady) {
    return (
      <>
        <StyledButton title="何かしらの API を使用" onPress={request} />
        <StyledButton
          title="リフレッシュトークン削除"
          onPress={deleteRefreshToken}
        />
        <ScrollView>
          <StyledText text={log} />
        </ScrollView>
      </>
    )
  }

  if (isReady === false) {
    return (
      <>
        <StyledButton title="同意を求めるモーダルを表示" onPress={logIn} />
        <ScrollView>
          <StyledText text={log} />
        </ScrollView>
      </>
    )
  }

  return <></>
}

export const OAuthScreen: React.FC = () => {
  return (
    <GoogleContextProvider>
      <OAuthScreenInner />
    </GoogleContextProvider>
  )
}
