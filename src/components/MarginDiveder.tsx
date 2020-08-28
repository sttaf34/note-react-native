import React from "react"
import { StyleSheet } from "react-native"
import { Divider } from "react-native-elements"

export const MarginDiveder: React.FC = () => {
  const styles = StyleSheet.create({
    margin: {
      marginTop: 5,
      marginBottom: 5,
    },
  })
  return <Divider style={styles.margin} />
}
