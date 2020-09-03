import React from "react"
import {
  StyleSheet,
  TouchableHighlight,
  TouchableHighlightProps,
} from "react-native"

const styles = StyleSheet.create({
  default: {},
})

export const Touchable = (
  props: React.Props<unknown> & TouchableHighlightProps
): JSX.Element => {
  const { children, style, onPress } = props
  return (
    <TouchableHighlight
      style={[styles.default, style]}
      activeOpacity={0.5}
      underlayColor="#dddddd"
      onPress={onPress}
    >
      {children}
    </TouchableHighlight>
  )
}
