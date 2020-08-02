import React from "react"
import { Text, View, FlatList } from "react-native"

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
  // TODO: 型きっちりする
  const renderItem = ({ item }: { item: Fruit }): JSX.Element => (
    <View>
      <Text>{item.name}</Text>
    </View>
  )

  return (
    <FlatList
      data={fruits}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
    />
  )
}
