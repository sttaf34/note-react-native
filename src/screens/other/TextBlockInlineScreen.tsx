import React from "react"
import { View, Text, StyleSheet } from "react-native"
import { MarginDivider } from "src/components/MarginDivider"

const styles = StyleSheet.create({
  container: {
    margin: 10,
  },
  row: {
    flexDirection: "row",
  },
  border: {
    borderWidth: 0.5,
    borderColor: "black",
    marginRight: 5,
    padding: 2,
  },
})

const Block: React.FC = () => {
  return (
    <View>
      <Text style={styles.border}>abcdefg</Text>
      <Text style={styles.border}>abcdefg</Text>
    </View>
  )
}

const Inline: React.FC = () => {
  return (
    <View style={styles.row}>
      <Text style={styles.border}>abcdefg</Text>
      <Text style={styles.border}>abcdefg</Text>
    </View>
  )
}

export const TextBlockInlineScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <Block />
      <MarginDivider />
      <Inline />
    </View>
  )
}
