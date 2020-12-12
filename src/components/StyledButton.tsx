import React from "react"
import {
  Text,
  Pressable,
  StyleSheet,
  PressableStateCallbackType,
} from "react-native"

const styles = StyleSheet.create({
  button: {
    margin: 12,
    marginBottom: 0,
    borderWidth: 0.5,
    borderRadius: 4,
  },
  buttonPressed: {
    margin: 12,
    marginBottom: 0,
    borderWidth: 0.5,
    borderRadius: 4,
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

export const StyledButton: React.FC<Props> = (props: Props) => {
  const { title, onPress } = props
  const onPressAnimation = () => {
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