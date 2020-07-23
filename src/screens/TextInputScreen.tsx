import React from "react"
import { Text, TextInput, StyleSheet } from "react-native"

const styles = StyleSheet.create({
  input: {
    margin: 12,
    height: 40,
    borderColor: "pink",
    borderWidth: 1,
  },
  text: {
    margin: 12,
  },
})

export const TextInputScreen: React.FC = () => {
  const [value, setValue] = React.useState("")
  return (
    <>
      <TextInput
        style={styles.input}
        onChangeText={(text) => setValue(text)}
        value={value}
      />
      <Text style={styles.text}>{value}</Text>
    </>
  )
}
