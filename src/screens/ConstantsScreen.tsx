import React from "react"
import { ScrollView } from "react-native"
import Constants from "expo-constants"
import { MarginText } from "src/components/MarginText"

export const ConstantsScreen: React.FC = () => {
  const constantsText = JSON.stringify(Constants)
  return (
    <ScrollView>
      <MarginText>{constantsText}</MarginText>
    </ScrollView>
  )
}
