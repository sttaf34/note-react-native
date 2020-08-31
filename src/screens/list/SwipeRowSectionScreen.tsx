import React from "react"
import {
  Text,
  View,
  StyleSheet,
  SectionListData,
  SectionListRenderItemInfo,
} from "react-native"
import { SwipeRow, SwipeListView } from "react-native-swipe-list-view"

type Food = {
  id: string
  name: string
}

const styles = StyleSheet.create({
  renderSectionHeader: {
    backgroundColor: "#dddddd",
  },
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
    backgroundColor: "#ff0000",
  },
  text: {
    color: "#ffffff",
  },
})

const data: ReadonlyArray<SectionListData<Food>> = [
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
            <Text>スワイプしない</Text>
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
          <Text>
            {index}. {food.name}
          </Text>
        </View>
      </SwipeRow>
    )
  }

  const renderSectionHeader = (info: {
    section: SectionListData<Food>
  }): JSX.Element => {
    const { section } = info
    return <Text style={styles.renderSectionHeader}>{section.key}</Text>
  }

  return (
    <>
      <SwipeListView
        useSectionList
        sections={data}
        renderSectionHeader={renderSectionHeader}
        renderItem={renderItem}
      />
    </>
  )
}
