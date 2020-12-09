import React from "react"
import { View, FlatList, ListRenderItemInfo } from "react-native"

import { Fruit, fruits as initialFruits } from "src/constants/fruits"
import { MarginText } from "src/components/MarginText"

export const FlatListInfiniteScrollScreen: React.FC = () => {
  const [fruits, setFruits] = React.useState(initialFruits)

  const renderItem = (info: ListRenderItemInfo<Fruit>): JSX.Element => {
    const { item: fruit } = info
    return (
      <View>
        <MarginText>
          {fruit.id} / {fruit.name}
        </MarginText>
      </View>
    )
  }

  const onEndReached = () => {
    const randomNumber = Math.random()
    const newFruits = fruits.map((aFruit) => {
      const newFruit: Fruit = {
        id: aFruit.id,
        key: `${aFruit.key}${randomNumber}`,
        name: aFruit.name,
      }
      return newFruit
    })
    setFruits([...fruits, ...newFruits])
  }

  // https://reactnative.dev/docs/flatlist
  // <li key={} /> の代わりに keyExtractor で指定する仕組み
  return (
    <FlatList
      data={fruits}
      renderItem={renderItem}
      keyExtractor={(fruit) => fruit.key}
      onEndReached={onEndReached}
      onEndReachedThreshold={0.1}
    />
  )
}
