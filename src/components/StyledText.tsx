import React from "react"
import { Text, StyleSheet } from "react-native"

const styles = StyleSheet.create({
  text: {
    padding: 12,
    paddingBottom: 0,
  },
})

type Props = {
  text: string
}

export const StyledText: React.FC<Props> = (props: Props) => {
  const { text } = props
  return <Text style={styles.text}>{text}</Text>
}
