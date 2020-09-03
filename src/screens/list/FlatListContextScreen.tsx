import React, { useContext } from "react"
import { FlatList, YellowBox, ListRenderItemInfo } from "react-native"

import { Touchable } from "src/components/Touchable"
import { MarginText } from "src/components/MarginText"
import { useRightButton } from "src/others/navigationHooks"
import {
  Score,
  ScoreContext,
  ScoreContextProvider,
} from "src/others/scoreStorageContext"

export const ScreenInner: React.FC = () => {
  YellowBox.ignoreWarnings(["Setting a timer"])

  const context = useContext(ScoreContext)
  const { scores, createScore, updateScore, deleteScore } = context
  useRightButton(createScore, "追加")

  if (scores.length === 0) {
    return <MarginText>データがありません</MarginText>
  }

  const renderItem = (info: ListRenderItemInfo<Score>): JSX.Element => {
    const { item: score, index } = info
    const onPress =
      index % 2 === 0
        ? () => deleteScore(score.id)
        : () => updateScore(score.id)
    return (
      <Touchable onPress={onPress}>
        <MarginText>
          {score.id.slice(0, 4)} / {score.value}
        </MarginText>
      </Touchable>
    )
  }

  return (
    <>
      <FlatList
        data={scores}
        renderItem={renderItem}
        keyExtractor={(score) => score.id}
      />
    </>
  )
}

export const FlatListContextScreen: React.FC = () => {
  return (
    <ScoreContextProvider>
      <ScreenInner />
    </ScoreContextProvider>
  )
}
