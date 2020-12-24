import React from "react"
import { Alert } from "react-native"

import { StyledButton } from "src/components/StyledButton"
import { StyledSafeAreaView } from "src/components/StyledSafeAreaView"

const createTwoButtonAlert = () =>
  Alert.alert(
    "削除の確認",
    "〇〇を削除します",
    [
      {
        text: "キャンセル",
        style: "cancel",
      },
      { text: "削除する", onPress: () => console.log("削除しました") },
    ],
    { cancelable: false }
  )

export const AlertScreen: React.FC = () => {
  return (
    <>
      <StyledSafeAreaView>
        <StyledButton title="ALERT" onPress={() => createTwoButtonAlert()} />
      </StyledSafeAreaView>
    </>
  )
}
