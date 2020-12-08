import React from "react"
import { Pressable, StyleSheet } from "react-native"
import DraggableFlatList, {
  DragEndParams,
  RenderItemParams,
} from "react-native-draggable-flatlist"

import { Fruit, fruits as initialFruits } from "src/constants/fruits"
import { MarginText } from "src/components/MarginText"

const styles = StyleSheet.create({
  isActive: {
    borderWidth: 0.5,
    borderColor: "red",
  },
})

export const FlatListDraggableScreen: React.FC = () => {
  const [fruits, setFruits] = React.useState(initialFruits)

  const renderItem = (params: RenderItemParams<Fruit>): JSX.Element => {
    const { item: fruit, drag, isActive } = params

    if (isActive) {
      return (
        <Pressable onLongPress={drag} style={styles.isActive}>
          <MarginText>
            {fruit.id} / {fruit.name}
          </MarginText>
        </Pressable>
      )
    }
    return (
      <Pressable onLongPress={drag}>
        <MarginText>
          {fruit.id} / {fruit.name}
        </MarginText>
      </Pressable>
    )
  }

  const onDragEnd = (params: DragEndParams<Fruit>) => {
    const { from, to, data } = params
    console.log(from, to, data)
    setFruits(data)
  }

  return (
    <DraggableFlatList
      data={fruits}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      onDragEnd={onDragEnd}
    />
  )
}
