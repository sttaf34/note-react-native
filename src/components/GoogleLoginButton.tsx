/* eslint-disable global-require */
/* eslint-disable import/no-unresolved */

import React from "react"
import {
  Image,
  Pressable,
  StyleSheet,
  PressableStateCallbackType,
} from "react-native"

const styles = StyleSheet.create({
  // 元画像の比率 => 573 x 138 => 191 : 46
  image: {
    width: 305.5,
    height: 73.5,
  },
})

type Props = {
  onPress: () => void
}

// https://developers.google.com/identity/branding-guidelines

export const GoogleLoginButton: React.FC<Props> = ({ onPress }: Props) => {
  const pressable = (state: PressableStateCallbackType) => {
    const source = state.pressed
      ? require("../../assets/light_pressed.png")
      : require("../../assets/light_normal.png")
    return <Image style={styles.image} source={source} />
  }
  return <Pressable onPress={onPress}>{pressable}</Pressable>
}
