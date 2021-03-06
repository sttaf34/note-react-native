import React from "react"
import { SwipeRow, SwipeListView } from "react-native-swipe-list-view"
import {
  Text,
  View,
  StyleSheet,
  SectionListData,
  SectionListRenderItemInfo,
} from "react-native"
import { MarginText } from "src/components/MarginText"

type Food = {
  id: string
  name: string
}

const styles = StyleSheet.create({
  renderSectionHeader: {
    backgroundColor: "#dddddd",
  },
  renderItem: {
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
    backgroundColor: "#ff0000",
  },
  text: {
    color: "#ffffff",
  },
})

const sections: ReadonlyArray<SectionListData<Food>> = [
  {
    key: "Others",
    data: [{ id: "empty", name: "empty" }],
  },
  {
    key: "Fruits",
    data: [
      { id: "1", name: "apple" },
      { id: "2", name: "grape" },
      { id: "3", name: "banana" },
      { id: "4", name: "apple" },
      { id: "5", name: "grape" },
      { id: "6", name: "banana" },
    ],
  },
  {
    key: "Vegetables",
    data: [
      { id: "7", name: "okra" },
      { id: "8", name: "radish" },
      { id: "9", name: "pumpkin" },
      { id: "10", name: "okra" },
      { id: "11", name: "radish" },
      { id: "12", name: "pumpkin" },
    ],
  },
]

export const SwipeRowSectionScreen: React.FC = () => {
  const renderItem = (info: SectionListRenderItemInfo<Food>): JSX.Element => {
    const { item: food, index, section } = info

    if (section.key === "Others") {
      return (
        <SwipeRow disableLeftSwipe disableRightSwipe>
          <View style={styles.renderHiddenItem} />
          <View style={styles.renderItem}>
            <MarginText>スワイプしない</MarginText>
          </View>
        </SwipeRow>
      )
    }

    return (
      <SwipeRow>
        <View style={styles.renderHiddenItem}>
          <Text>Hello!</Text>
          <Text>Hello!</Text>
        </View>
        <View style={styles.renderItem}>
          <MarginText>
            {index}. {food.name}
          </MarginText>
        </View>
      </SwipeRow>
    )
  }

  return (
    <>
      <SwipeListView
        useSectionList
        sections={sections}
        renderItem={renderItem}
      />
    </>
  )
}
