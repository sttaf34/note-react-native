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
]

export const SectionListScreen: React.FC = () => {
  const renderItem = (info: SectionListRenderItemInfo<Food>): JSX.Element => {
    const { item: food, index, section } = info
    return (
      <View>
        <Text>
          {section.key} / {index} / {food.id} / {food.name}
        </Text>
      </View>
    )
  }

  const renderSectionHeader = (info: {
    section: SectionListData<Food>
  }): React.ReactElement => {
    const { section } = info
    return <Text>{section.key}</Text>
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
