/* eslint-disable no-alert */

import React from "react"
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  TouchableHighlight,
  PressableStateCallbackType,
} from "react-native"
import { Divider } from "react-native-elements"

const styles = StyleSheet.create({
  button: {
    margin: 12,
  },
  text: {
    padding: 12,
    borderWidth: 1,
    borderRadius: 4,
  },
  divider: {
    margin: 5,
  },
})

export const PressableScreen: React.FC = () => {
  const style = (state: PressableStateCallbackType) => {
    const { pressed } = state
    if (pressed) {
      return {
        margin: 12,
        backgroundColor: "rgb(210, 230, 255)",
      }
    }
    return {
      margin: 12,
      backgroundColor: "#ffffee",
    }
  }

  return (
    <>
      <Pressable style={style} onPress={() => alert("Pressed!")}>
        <Text style={styles.text}>ボタン</Text>
      </Pressable>

      <TouchableHighlight
        style={styles.button}
        activeOpacity={0.6}
        underlayColor="#DDDDDD"
        onPress={() => alert("Pressed!")}
      >
        <View>
          <Text style={styles.text}>ボタン</Text>
          <Divider style={styles.divider} />
          <Text style={styles.text}>ボタン</Text>
        </View>
      </TouchableHighlight>
    </>
  )
}
