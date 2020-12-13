import React from "react"
import { StyleSheet, SafeAreaView } from "react-native"

export type PropsChildren = {
  children: React.ReactNode
}

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
})

export const StyledSafeAreaView: React.FC<PropsChildren> = (
  props: PropsChildren
) => {
  const { children } = props
  return <SafeAreaView style={styles.safeAreaView}>{children}</SafeAreaView>
}
