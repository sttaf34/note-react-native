import React, { useContext } from "react"
import { FlatList, ListRenderItemInfo, LogBox } from "react-native"

import { Cell } from "src/components/Cell"
import { MarginText } from "src/components/MarginText"
import { useRightButton } from "src/others/navigationHooks"
import {
  Score,
  ScoreContext,
  ScoreContextProvider,
} from "src/others/scoreStorageContext"

export const ScreenInner: React.FC = () => {
  LogBox.ignoreLogs(["Setting a timer"])

  const context = useContext(ScoreContext)
  const { scores, createScore, updateScore, deleteScore } = context
  useRightButton(createScore, "追加")

  if (scores.length === 0) {
    return <MarginText>データがありません</MarginText>
  }

  const renderItem = (info: ListRenderItemInfo<Score>): JSX.Element => {
    const { item: score, index } = info
    const title = `${score.id.slice(0, 4)} / ${score.value}`
    const onPress =
      index % 2 === 0
        ? () => deleteScore(score.id)
        : () => updateScore(score.id)
    return <Cell title={title} onPress={onPress} />
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
