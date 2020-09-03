import React from "react"
import { View, FlatList, ListRenderItemInfo } from "react-native"

import { Fruit, fruits as initialFruits } from "src/constants/fruits"
import { MarginText } from "src/components/MarginText"
import { useRightButton } from "src/others/navigationHooks"

export const FlatListScreen: React.FC = () => {
  const [fruits, setFruits] = React.useState(initialFruits)

  const addFruit = () => {
    const newFruit: Fruit = {
      id: String(Math.random()),
      key: String(Math.random()),
      name: "cranberry",
    }
    const newFruits = [newFruit, ...fruits]
    setFruits(newFruits)
  }

  useRightButton(addFruit, "追加")

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

  // https://reactnative.dev/docs/flatlist
  // <li key={} /> の代わりに keyExtractor で指定する仕組み
  return (
    <FlatList
      data={fruits}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
    />
  )
}
