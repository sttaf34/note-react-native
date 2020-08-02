/* eslint-disable no-alert */

import React from "react"
import { View, Text, StyleSheet, TouchableHighlight } from "react-native"

// Pressable は Expo SDK 39 で多分使えるようになる

const styles = StyleSheet.create({
  button: {
    margin: 12,
  },
  text: {
    padding: 12,
    borderWidth: 1,
    borderRadius: 4,
  },
})

export const PressableScreen: React.FC = () => {
  return (
    <View>
      <TouchableHighlight
        style={styles.button}
        activeOpacity={0.6}
        underlayColor="#DDDDDD"
        onPress={() => alert("Pressed!")}
      >
        <Text style={styles.text}>ボタン</Text>
      </TouchableHighlight>
    </View>
  )
}
