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
    // data は SectionBase で定義されてて必須
    data: [
      { id: "1", name: "apple" },
      { id: "2", name: "grape" },
      { id: "3", name: "banana" },
    ],

    // title は SectionListData で定義されている [key: string]: any に
    // 該当することになる、補完が効かないのでどうにかしたい
    title: "Fruits",
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
      sections={data}
      renderItem={renderItem}
      renderSectionHeader={renderSectionHeader}
    />
  )
}
