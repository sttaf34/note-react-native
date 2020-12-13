import React from "react"
import { FlatList, ListRenderItemInfo } from "react-native"

import { StyledText } from "src/components/StyledText"
import { StyledButton } from "src/components/StyledButton"

const initialNumbers = Array.from({ length: 20 }, (_, index) => index)

const renderItem = (info: ListRenderItemInfo<number>): JSX.Element => {
  const { item: aNumber } = info
  return <StyledText text={String(aNumber)} />
}

export const FlatListScreen: React.FC = () => {
  const [numbers, setNumbers] = React.useState(initialNumbers)

  const onPress = () => {
    const newNumbers = [...numbers, Math.random()]
    setNumbers(newNumbers)
  }

  return (
    <>
      <StyledButton title="ADD" onPress={onPress} />
      <FlatList
        data={numbers}
        renderItem={renderItem}
        keyExtractor={(aNumber) => String(aNumber)}
      />
    </>
  )
}
