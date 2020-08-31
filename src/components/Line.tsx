import React from "react"
import { View, StyleSheet } from "react-native"

const styles = StyleSheet.create({
  line: {
    height: 0.5,
    backgroundColor: "#ff0000",
  },
})

export const Line: React.FC = () => {
  return <View style={styles.line} />
}
