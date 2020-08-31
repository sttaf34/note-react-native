import React from "react"
import { Text, View, FlatList, ListRenderItemInfo } from "react-native"

type Fruit = {
  id: string
  name: string
}

const fruits: Fruit[] = [
  { id: "1", name: "apple" },
  { id: "2", name: "banana" },
  { id: "3", name: "grape" },
]

export const FlatListScreen: React.FC = () => {
  // fruits のそれぞれの要素を元に、
  // JSX.Element を返す関数を <FlatList> に渡すような仕組み
  const renderItem = (info: ListRenderItemInfo<Fruit>): JSX.Element => {
    const { item, index } = info
    return (
      <View>
        <Text>
          {index}. {item.name}
        </Text>
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
