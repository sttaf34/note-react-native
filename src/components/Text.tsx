import React from "react"
import { Text as ReactNativeText, StyleSheet, TextProps } from "react-native"

const styles = StyleSheet.create({
  text: {
    fontSize: 14,
    margin: 10,
  },
})

export const Text = (props: React.Props<unknown> & TextProps): JSX.Element => {
  const { children, style } = props
  return (
    <ReactNativeText style={[styles.text, style]}>{children}</ReactNativeText>
  )
}
