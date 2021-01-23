import React from "react"
import {
  View,
  Easing,
  FlatList,
  Animated,
  Keyboard,
  TextInput,
  StyleSheet,
  KeyboardEvent,
  ListRenderItemInfo,
} from "react-native"

import { StyledText } from "src/components/StyledText"

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f2f2f2",
  },
  input: {
    margin: 12,
    height: 40,
    borderColor: "pink",
    borderWidth: 1,
  },
})

const numbers = Array.from({ length: 30 }, (_, index) => index)

type Props = {
  height: number
}

const HeightDownView: React.FC<Props> = (props: Props) => {
  const { height } = props
  const heightValue = React.useRef(new Animated.Value(height)).current

  const config: Animated.TimingAnimationConfig = {
    toValue: 0,
    duration: 250, // キーボードが下がるよりちょっと早め
    easing: Easing.out(Easing.exp),
    useNativeDriver: false,
  }

  React.useEffect(() => {
    Animated.timing(heightValue, config).start()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const style = {
    backgroundColor: "#f2f2f2",
  }

  return <Animated.View style={[style, { height: heightValue }]} />
}

const BehindKeyboardView: React.FC = () => {
  const [keyboardHeight, setKeyboardHeight] = React.useState(0)
  const [keyboardStatus, setKeyboardStatus] = React.useState("")

  const keyboardDidShow = (event: KeyboardEvent) => {
    setKeyboardHeight(event.endCoordinates.height)
  }
  const keyboardWillHide = () => {
    setKeyboardStatus("WillHide")
  }
  const keyboardDidHide = () => {
    setKeyboardHeight(0)
    setKeyboardStatus("DidHide")
  }

  React.useEffect(() => {
    Keyboard.addListener("keyboardDidShow", keyboardDidShow)
    Keyboard.addListener("keyboardWillHide", keyboardWillHide)
    Keyboard.addListener("keyboardDidHide", keyboardDidHide)
    return () => {
      Keyboard.removeListener("keyboardDidShow", keyboardDidShow)
      Keyboard.removeListener("keyboardWillHide", keyboardWillHide)
      Keyboard.removeListener("keyboardDidHide", keyboardDidHide)
    }
  }, [])

  if (keyboardStatus === "WillHide") {
    return <HeightDownView height={keyboardHeight} />
  }

  const style = {
    height: keyboardHeight,
  }

  return <View style={style} />
}

export const KeyboardScreen: React.FC = () => {
  const [value, setValue] = React.useState("")

  const renderItem = (info: ListRenderItemInfo<number>): JSX.Element => {
    const { item: aNumber } = info
    return <StyledText text={String(aNumber)} />
  }

  return (
    <>
      <TextInput
        style={styles.input}
        onChangeText={(text) => setValue(text)}
        value={value}
      />
      <FlatList
        data={numbers}
        renderItem={renderItem}
        keyExtractor={(aNumber) => String(aNumber)}
      />
      <BehindKeyboardView />
    </>
  )
}
