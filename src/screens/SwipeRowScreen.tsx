import React from "react"
import { Text, View, ListRenderItemInfo, StyleSheet } from "react-native"
import { SwipeRow, SwipeListView } from "react-native-swipe-list-view"

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
    backgroundColor: "#ffffff",
    justifyContent: "center",
    height: 50,
  },
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

export const SwipeRowScreen: React.FC = () => {
  const renderItem = (info: ListRenderItemInfo<Fruit>): JSX.Element => {
    const { item, index } = info

    if (index === 0) {
      return (
        <SwipeRow disableLeftSwipe disableRightSwipe>
          <View style={styles.renderHiddenItem} />
          <View style={styles.renderItem}>
            <Text>スワイプしない</Text>
          </View>
        </SwipeRow>
      )
    }

    // <SwipeRow> の中に二つの <View> を置くような仕組みになってる
    return (
      <SwipeRow leftOpenValue={70}>
        <View style={styles.renderHiddenItem}>
          <Text>Hello!</Text>
          <Text>Hello!</Text>
        </View>
        <View style={styles.renderItem}>
          <Text>
            {index}. {item.name}
          </Text>
        </View>
      </SwipeRow>
    )
  }

  return (
    <>
      <SwipeListView
        data={fruits}
        keyExtractor={(fruit) => fruit.id}
        renderItem={renderItem}
      />
    </>
  )
}
