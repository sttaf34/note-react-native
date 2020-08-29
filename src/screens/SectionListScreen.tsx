import React from "react"
import {
  Text,
  View,
  SectionList,
  SectionListData,
  SectionListRenderItemInfo,
} from "react-native"

type Food = {
  id: string
  name: string
}

// セクション毎で持たせたいプロパティを定義する形にしてみた
interface MySectionListData extends SectionListData<Food> {
  title: string
}

const data: ReadonlyArray<MySectionListData> = [
  {
    title: "Fruits",
    data: [
      { id: "1", name: "apple" },
      { id: "2", name: "grape" },
      { id: "3", name: "banana" },
    ],
  },
  {
    title: "Vegetables",
    data: [
      { id: "4", name: "okra" },
      { id: "5", name: "radish" },
      { id: "6", name: "pumpkin" },
    ],
  },
]

export const SectionListScreen: React.FC = () => {
  const renderItem = (info: SectionListRenderItemInfo<Food>): JSX.Element => {
    const { item: food, index, section } = info
    return (
      <View>
        <Text>
          {section.title} / {index} / {food.id} / {food.name}
        </Text>
      </View>
    )
  }

  const renderSectionHeader = (info: {
    section: SectionListData<Food>
  }): JSX.Element => {
    const { section } = info
    return <Text>{section.title}</Text>
  }

  return (
    <SectionList
      keyExtractor={(food) => food.id}
      sections={data}
      renderItem={renderItem}
      renderSectionHeader={renderSectionHeader}
    />
  )
}
