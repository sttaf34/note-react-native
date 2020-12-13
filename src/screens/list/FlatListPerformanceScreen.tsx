import React from "react"
import { FlatList, ListRenderItemInfo } from "react-native"

import { StyledText } from "src/components/StyledText"
import { StyledButton } from "src/components/StyledButton"

const lengthA = 50
const lengthB = 200
const getNumbers = (length: number) => {
  return Array.from({ length }, (_, index) => index)
}

// 何かの値が一定以内だと、
// （ビューの数？スクロールの中身の高さ？）
// 全データの renderItem が一度終わってしまえば、
// いくら上下にスクロールしても、再度 renderItem は実行されないので、
// Performance Monitor の JS の値は 60 がキープされる

// 何かの値が一定を超えると、
// 上下のスクロールの都度 renderItem が実行されるようになり、
// Performance Monitor の JS の値は一気に落ちる、真っ白のセルが表示される
// 無限スクロールなリストを flatlist で作るのは厳しいっぽい

// 無限スクロールしたいのであれば
// github.com/Flipkart/recyclerlistview とかが良いかも

const renderItem = (info: ListRenderItemInfo<number>): JSX.Element => {
  const { item: aNumber } = info
  // console.log(aNumber)
  return (
    <>
      <StyledText text={String(aNumber)} />
    </>
  )
}

export const FlatListPerformanceScreen: React.FC = () => {
  const [numbers, setNumbers] = React.useState(getNumbers(lengthA))

  const onPress = () => {
    const newLength = numbers.length === lengthA ? lengthB : lengthA
    const newNumbers = Array.from({ length: newLength }, (_, index) => index)
    setNumbers(newNumbers)
  }

  return (
    <>
      <StyledButton title="CHANGE LENGTH" onPress={onPress} />
      <FlatList
        data={numbers}
        renderItem={renderItem}
        keyExtractor={(aNumber) => String(aNumber)}
      />
    </>
  )
}
