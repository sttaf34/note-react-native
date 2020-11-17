import React from "react"
import { View, Text, StyleSheet } from "react-native"
import { MarginDiveder } from "src/components/MarginDiveder"

const Block: React.FC = () => {
  const styles = StyleSheet.create({
    border: {
      borderWidth: 0.5,
      borderColor: "black",
      marginRight: 5,
      padding: 2,
    },
  })
  return (
    <View>
      <Text style={styles.border}>abcdefg</Text>
    </View>
  )
}

const Inline: React.FC = () => {
  const styles = StyleSheet.create({
    row: {
      flexDirection: "row",
    },
    border: {
      borderWidth: 0.5,
      borderColor: "black",
      marginRight: 5,
    },
  })
  return (
    <View style={styles.row}>
      <Text style={styles.border}>abcdefg</Text>
    </View>
  )
}

export const TextScreen: React.FC = () => {
  const styles = StyleSheet.create({
    container: {
      margin: 10,
    },
    border: {
      borderWidth: 0.5,
      borderColor: "black",
      marginRight: 5,
    },
  })

  return (
    <View style={styles.container}>
      <Block />
      <MarginDiveder />
      <Inline />
    </View>
  )
}
