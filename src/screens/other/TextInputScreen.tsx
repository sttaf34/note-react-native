import React from "react"
import { Button, Text, TextInput, StyleSheet, Keyboard } from "react-native"
import { MarginDivider } from "src/components/MarginDivider"

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
      <MarginDivider />
      <Button title="キーボードを閉じる" onPress={Keyboard.dismiss} />
    </>
  )
}
