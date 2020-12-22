import React from "react"
import { View, StyleSheet } from "react-native"
import { ScrollView } from "react-native-gesture-handler"
import { useFocusEffect } from "@react-navigation/native"

import { HeavyComponent } from "src/components/HeavyComponent"

const viewlength = 5

const styles = StyleSheet.create({
  container: {
    margin: 12,
  },
})

// 画面遷移先に大量のコンポーネントがあるほど、
// 画面遷移のボタンを押してからスクロール開始までの時間が長くなる

export const HeavySlowScreen: React.FC = () => {
  const views = Array.from({ length: viewlength }).map((_, index) => {
    return <HeavyComponent key={String(index)} />
  })
  return (
    <ScrollView>
      <View style={styles.container}>{views}</View>
    </ScrollView>
  )
}

// 画面遷移直後には見えない部分のレンダリングを分割することで、
// 画面遷移のボタンを押してからスクロール開始までの時間を短くできる
//
// 画面遷移直後に即座に⬇の方にスクロールした場合、不自然にはなる
// スクロール開始までの時間を短くするのと、どちらかを選ぶことになる

export const HeavyFastScreen: React.FC = () => {
  const [length, setLength] = React.useState(1)

  useFocusEffect(() => {
    setLength(viewlength)
  })

  const views = Array.from({ length }).map((_, index) => {
    return <HeavyComponent key={String(index)} />
  })
  return (
    <ScrollView>
      <View style={styles.container}>{views}</View>
    </ScrollView>
  )
}
