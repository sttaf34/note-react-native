import React from "react"
import { Text, View, ListRenderItemInfo, StyleSheet } from "react-native"
import { SwipeListView } from "react-native-swipe-list-view"

type Fruit = {
  id: string
  name: string
}

const fruits: Fruit[] = [
  { id: "1", name: "apple" },
  { id: "2", name: "banana" },
  { id: "3", name: "coconut" },
]

const styles = StyleSheet.create({
  renderItem: {
    alignItems: "center",
    backgroundColor: "#CCC",
    justifyContent: "center",
    height: 50,
  },

  // 背後にこのようなセルを置いてるような仕組み
  // ┌──────────────────────────┐
  // │ Left               Right │
  // └──────────────────────────┘
  renderHiddenItem: {
    alignItems: "center",
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingLeft: 15,
    paddingRight: 15,
    height: 50,
  },
})

export const SwipeListScreen: React.FC = () => {
  const renderItem = (info: ListRenderItemInfo<Fruit>): JSX.Element => {
    const { item, index } = info
    return (
      <View style={styles.renderItem}>
        <Text>
          {index}. {item.name}
        </Text>
      </View>
    )
  }

  const renderHiddenItem = (): JSX.Element => {
    return (
      <View style={styles.renderHiddenItem}>
        <Text>Left</Text>
        <Text>Right</Text>
      </View>
    )
  }

  return (
    <>
      <SwipeListView
        data={fruits}
        renderItem={renderItem}
        renderHiddenItem={renderHiddenItem}
        leftOpenValue={60}
        rightOpenValue={-60}
      />
    </>
  )
}
