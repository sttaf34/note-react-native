import React from "react"
import Toast from "react-native-toast-message"

import { StyledButton } from "src/components/StyledButton"

export const ToastScreen: React.FC = () => {
  const onPress = () => {
    Toast.show({
      type: "success",
      position: "bottom",
      text1: "Hello",
      text2: "Toast!",
    })
  }

  return (
    <>
      <Toast ref={(ref) => Toast.setRef(ref)} />
      <StyledButton title="SHOW" onPress={onPress} />
      <StyledButton title="HIDE" onPress={() => Toast.hide()} />
    </>
  )
}
