import React from "react"
import {
  Text,
  Pressable,
  StyleSheet,
  PressableStateCallbackType,
} from "react-native"

const styles = StyleSheet.create({
  button: {},
  buttonPressed: {
    backgroundColor: "#6bb6ff",
  },
  text: {
    padding: 12,
  },
})

const style = (state: PressableStateCallbackType) => {
  return state.pressed ? styles.buttonPressed : styles.button
}

type Props = {
  title: string
  onPress: () => void
}

export const Cell: React.FC<Props> = (props: Props) => {
  const { title, onPress } = props
  const onPressAnimation = () => {
    // reactnative.dev/docs/performance#my-touchablex-view-isnt-very-responsive
    // セルを一瞬「ちょん」と押した時も、ちゃんとハイライトされる対応
    requestAnimationFrame(() => {
      onPress()
    })
  }
  return (
    <Pressable style={style} onPress={onPressAnimation}>
      <Text style={styles.text}>{title}</Text>
    </Pressable>
  )
}
