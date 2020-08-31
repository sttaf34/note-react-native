/* eslint-disable global-require */
/* eslint-disable import/no-unresolved */

import React from "react"
import { View, Image, StyleSheet } from "react-native"
import { FontAwesome } from "@expo/vector-icons"

const styles = StyleSheet.create({
  image: {
    margin: 12,
    width: 64,
    height: 64,
  },
  // 中央に配置
  view: {
    borderWidth: 0.5,
    height: 128,
    alignItems: "center",
    justifyContent: "center",
  },
})

export const ImageScreen: React.FC = () => {
  return (
    <>
      <Image
        style={styles.image}
        source={require("../../../assets/favicon.png")}
      />
      <Image
        style={styles.image}
        source={{ uri: "https://reactnative.dev/img/tiny_logo.png" }}
      />
      <View style={styles.view}>
        <FontAwesome name="chevron-right" size={96} color="black" />
      </View>
    </>
  )
}
