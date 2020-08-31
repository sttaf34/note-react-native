import React from "react"
import {
  View,
  SectionList,
  SectionListData,
  SectionListRenderItemInfo,
} from "react-native"

import { Line } from "src/components/Line"
import { MarginText } from "src/components/MarginText"

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
        <MarginText>
          {section.key} / {index} / {food.id} / {food.name}
        </MarginText>
      </View>
    )
  }

  const renderSectionHeader = (info: {
    section: SectionListData<Food>
  }): React.ReactElement => {
    const { section } = info
    return <MarginText>{section.key}</MarginText>
  }

  const itemSeparatorComponent = (): JSX.Element => {
    return <Line />
  }

  return (
    <SectionList
      keyExtractor={(food) => food.id}
      sections={data}
      renderItem={renderItem}
      renderSectionHeader={renderSectionHeader}
      ItemSeparatorComponent={itemSeparatorComponent}
      SectionSeparatorComponent={itemSeparatorComponent}
    />
  )
}
