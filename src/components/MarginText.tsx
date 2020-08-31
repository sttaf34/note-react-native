import React from "react"
import { Text, StyleSheet, TextProps } from "react-native"

const styles = StyleSheet.create({
  text: {
    fontSize: 14,
    margin: 10,
  },
})

export const MarginText = (
  props: React.Props<unknown> & TextProps
): JSX.Element => {
  const { children, style } = props
  return <Text style={[styles.text, style]}>{children}</Text>
}
