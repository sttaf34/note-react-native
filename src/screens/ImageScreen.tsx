/* eslint-disable global-require */
/* eslint-disable import/no-unresolved */

import React from "react"
import { Image, StyleSheet } from "react-native"

const styles = StyleSheet.create({
  image: {
    margin: 12,
    width: 64,
    height: 64,
  },
})

export const ImageScreen: React.FC = () => {
  return (
    <>
      <Image
        style={styles.image}
        source={require("../../assets/favicon.png")}
      />
      <Image
        style={styles.image}
        source={{ uri: "https://reactnative.dev/img/tiny_logo.png" }}
      />
    </>
  )
}
