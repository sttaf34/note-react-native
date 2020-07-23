import React from "react"
import { Text, StyleSheet, ScrollView } from "react-native"
import Constants from "expo-constants"

const styles = StyleSheet.create({
  text: {
    margin: 12,
  },
})

export const ConstantsScreen: React.FC = () => {
  const constantsText = JSON.stringify(Constants)
  return (
    <ScrollView>
      <Text style={styles.text}>{constantsText}</Text>
    </ScrollView>
  )
}
