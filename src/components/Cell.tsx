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
  isRequestAnimation: boolean
}

export const Cell: React.FC<Props> = (props: Props) => {
  const { title, onPress, isRequestAnimation } = props

  // reactnative.dev/docs/performance#my-touchablex-view-isnt-very-responsive
  const onPressAnimation = isRequestAnimation
    ? () => {
        // セルを一瞬「ちょん」と押した時、
        // 遷移先の Screen が重い場合もハイライトされるが、
        // 画面遷移開始のタイミングが一瞬遅くなる
        requestAnimationFrame(() => {
          onPress()
        })
      }
    : () => {
        // 遷移先の Screen の最初のレンダリングを工夫すれば、
        // セルを一瞬「ちょん」と押した時のハイライトがされないことはなくなり、
        // 画面遷移開始のタイミングは遅くならない
        onPress()
      }

  return (
    <Pressable style={style} onPress={onPressAnimation}>
      <Text style={styles.text}>{title}</Text>
    </Pressable>
  )
}
