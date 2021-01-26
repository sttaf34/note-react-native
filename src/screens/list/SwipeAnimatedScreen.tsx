import React from "react"
import {
  View,
  Text,
  Easing,
  Button,
  Animated,
  StyleSheet,
  ListRenderItemInfo,
} from "react-native"
import { SwipeListView } from "react-native-swipe-list-view"

import { MarginText } from "src/components/MarginText"
import { fruits as initialFruits } from "src/constants/fruits"

const cellHeight = 50

const styles = StyleSheet.create({
  renderItem: {
    backgroundColor: "#ffffff",
    justifyContent: "center",
    height: cellHeight,
  },
  renderHiddenItem: {
    backgroundColor: "#ff0000",
    justifyContent: "center",
    paddingLeft: 240,
    height: cellHeight,
  },
  buttonContainer: {
    height: cellHeight,
  },
})

type Fruit = {
  key: string
  name: string
}

const useAnimationsDeleteItem = (keys: string[]) => {
  const heights: Record<string, Animated.Value | undefined> = {}
  const heightsHidden: Record<string, Animated.Value | undefined> = {}
  keys.forEach((key) => {
    heights[key] = new Animated.Value(cellHeight)
  })
  keys.forEach((key) => {
    heightsHidden[key] = new Animated.Value(cellHeight)
  })

  const config: Animated.TimingAnimationConfig = {
    toValue: 0,
    duration: 350,
    useNativeDriver: false,
    easing: Easing.out(Easing.exp),
  }

  const start = (key: string, callback: Animated.EndCallback) => {
    // 前に位置している方
    const height = heights[key]
    if (height) {
      Animated.timing(height, config).start(callback)
    }
    // 後ろに位置している方
    const heightHidden = heightsHidden[key]
    if (heightHidden) {
      Animated.timing(heightHidden, config).start(callback)
    }
  }

  // 前に位置している方用のスタイル
  const style = (key: string) => {
    return {
      height: heights[key],
    }
  }

  // 後ろに位置している方用のスタイル
  const styleHidden = (key: string) => {
    return {
      height: heightsHidden[key],
    }
  }

  return { style, styleHidden, start }
}

export const SwipeAnimatedScreen: React.FC = () => {
  const [fruits, setFruits] = React.useState(initialFruits)
  const keys = fruits.map((fruit) => fruit.key)
  const useHeightDown = useAnimationsDeleteItem(keys)

  const deleteFruit = (key: string) => {
    const deleteIndex = fruits.findIndex((fruit) => fruit.key === key)
    if (deleteIndex < 0) {
      return
    }

    // 高さをゼロにするアニメーションして、果物を削除する
    useHeightDown.start(key, () => {
      const slicedFruits = fruits.slice()
      slicedFruits.splice(deleteIndex, 1)
      setFruits(slicedFruits)
    })
  }

  const renderItem = (info: ListRenderItemInfo<Fruit>): JSX.Element => {
    const { item: fruit } = info
    return (
      <Animated.View
        style={[styles.renderItem, useHeightDown.style(fruit.key)]}
      >
        <MarginText>
          {fruit.name}
          {fruit.name}
          {fruit.name}
        </MarginText>
      </Animated.View>
    )
  }

  const renderHiddenItem = (info: ListRenderItemInfo<Fruit>): JSX.Element => {
    const { item: fruit } = info
    return (
      <Animated.View
        style={[styles.renderHiddenItem, useHeightDown.styleHidden(fruit.key)]}
      >
        <Text> </Text>
        <View style={styles.buttonContainer}>
          <Button title="" onPress={() => deleteFruit(fruit.key)} />
        </View>
      </Animated.View>
    )
  }

  return (
    <SwipeListView
      data={fruits}
      keyExtractor={(fruit) => fruit.key}
      renderItem={renderItem}
      renderHiddenItem={renderHiddenItem}
      rightOpenValue={-95}
      useNativeDriver={false}
    />
  )
}
