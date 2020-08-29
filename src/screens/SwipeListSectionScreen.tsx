import React from "react"
import {
  Text,
  View,
  StyleSheet,
  SectionListData,
  SectionListRenderItemInfo,
} from "react-native"
import { SwipeListView } from "react-native-swipe-list-view"

type Food = {
  id: string
  name: string
}

const data: ReadonlyArray<SectionListData<Food>> = [
  {
    key: "Fruits",
    data: [
      { id: "1", name: "apple" },
      { id: "2", name: "grape" },
      { id: "3", name: "banana" },
    ],
  },
  {
    key: "Vegetables",
    data: [
      { id: "4", name: "okra" },
      { id: "5", name: "radish" },
      { id: "6", name: "pumpkin" },
    ],
  },
  {
    key: "Others",
    data: [{ id: "", name: "" }],
  },
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
    backgroundColor: "#ff0000",
  },
  text: {
    color: "#ffffff",
  },
})

export const SwipeListSectionScreen: React.FC = () => {
  const renderItem = (info: SectionListRenderItemInfo<Food>): JSX.Element => {
    const { item: food, index, section } = info

    return (
      <View style={styles.renderItem}>
        <Text>
          {section.key} / {index} / {food.id} / {food.name}
        </Text>
      </View>
    )
  }

  const renderHiddenItem = (): JSX.Element => {
    return (
      <View style={styles.renderHiddenItem}>
        <Text style={styles.text}>Hey!</Text>
        <Text style={styles.text}>Hello!</Text>
      </View>
    )
  }

  const renderSectionHeader = (info: {
    section: SectionListData<Food>
  }): JSX.Element => {
    const { section } = info
    return <Text>{section.key}</Text>
  }

  return (
    <>
      <SwipeListView
        useSectionList
        sections={data}
        renderSectionHeader={renderSectionHeader}
        renderItem={renderItem}
        renderHiddenItem={renderHiddenItem}
      />
    </>
  )
}
