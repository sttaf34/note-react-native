import React from "react"
import { TextInput, StyleSheet } from "react-native"

const styles = StyleSheet.create({
  input: {
    margin: 12,
    marginBottom: 0,
    paddingLeft: 8,
    height: 40,
    borderColor: "#444444",
    borderWidth: 0.5,
  },
})

type Props = {
  value: string
  onChangeValue: (text: string) => void
}

export const StyledTextInput: React.FC<Props> = (props: Props) => {
  const { value, onChangeValue } = props
  return (
    <TextInput
      style={styles.input}
      value={value}
      onChangeText={onChangeValue}
    />
  )
}
