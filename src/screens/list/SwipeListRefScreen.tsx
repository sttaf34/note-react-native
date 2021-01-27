import React from "react"
import { SwipeListView } from "react-native-swipe-list-view"
import {
  Text,
  View,
  FlatList,
  StyleSheet,
  ListRenderItemInfo,
} from "react-native"

import { Fruit, fruits } from "src/constants/fruits"
import { useRightButton } from "src/others/navigationHooks"

const styles = StyleSheet.create({
  renderItem: {
    alignItems: "center",
    backgroundColor: "#CCC",
    justifyContent: "center",
    height: 50,
  },
})

export const SwipeListRefScreen: React.FC = () => {
  let fuga: FlatList<Fruit>

  const scrollToIndex = () => {
    fuga.scrollToIndex({ animated: true, index: 2 })
  }
  useRightButton(scrollToIndex, "移動")

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

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const listViewRef = (ref: any) => {
    fuga = ref
  }

  return (
    <>
      <SwipeListView
        listViewRef={listViewRef}
        data={fruits}
        keyExtractor={(fruit) => fruit.id}
        renderItem={renderItem}
      />
    </>
  )
}
