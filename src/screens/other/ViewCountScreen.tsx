import React from "react"
import { View, Text } from "react-native"
import { SocialIcon } from "react-native-elements"

import { StyledText } from "src/components/StyledText"
import { StyledButton } from "src/components/StyledButton"

export const ViewCountScreen: React.FC = () => {
  const [isVisibleA, setIsVisibleA] = React.useState(false)
  const [isVisibleB, setIsVisibleB] = React.useState(false)
  const [isVisibleC, setIsVisibleC] = React.useState(false)
  const [isVisibleD, setIsVisibleD] = React.useState(false)

  return (
    <>
      {/* Performance Monitor > Views は 2 増える */}
      <StyledButton title="A" onPress={() => setIsVisibleA((v) => !v)} />
      {isVisibleA ? <Text>HELLO</Text> : <></>}

      {/* Performance Monitor > Views は 2 増える */}
      <StyledButton title="B" onPress={() => setIsVisibleB((v) => !v)} />
      {isVisibleB ? <StyledText text="HELLO" /> : <></>}

      {/* Performance Monitor > Views は 1 増える */}
      <StyledButton title="C" onPress={() => setIsVisibleC((v) => !v)} />
      {isVisibleC ? <View /> : <></>}

      {/* Performance Monitor > Views は 7 増えた */}
      <StyledButton title="D" onPress={() => setIsVisibleD((v) => !v)} />
      {isVisibleD ? <SocialIcon button type="google" /> : <></>}
    </>
  )
}
