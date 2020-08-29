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
  // │ Hi!                 Hey! │
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

type SwipeValueChangeData = {
  key: string
  value: number
  direction: "left" | "right"
  isOpen: boolean
}

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
        <Text>Hi!</Text>
        <Text>Hey!</Text>
      </View>
    )
  }

  // スワイプの動作に合わせて何回も実行される
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const onSwipeValueChange = (data: SwipeValueChangeData): void => {
    // console.log(data.key) // スワイプ中の行の keyExtractor で指定してるキー
    // console.log(data.isOpen)
    // console.log(data.direction) // スワイプされた方向
    // console.log(data.value) // スワイプされたスクロールの量
    //
    // 例えば、左方向に一定量以上スワイプしたら削除の処理を実行したりする
  }

  return (
    <>
      <SwipeListView
        data={fruits}
        keyExtractor={(fruit) => fruit.id}
        renderItem={renderItem}
        renderHiddenItem={renderHiddenItem}
        leftOpenValue={60}
        rightOpenValue={-60}
        onSwipeValueChange={onSwipeValueChange}
      />
    </>
  )
}
