import React from "react"
import {
  Easing,
  FlatList,
  Animated,
  StyleSheet,
  ListRenderItemInfo,
} from "react-native"

import { Fruit, fruits as initialFruits } from "src/constants/fruits"
import { MarginText } from "src/components/MarginText"
import { useRightButton } from "src/others/navigationHooks"

const styles = StyleSheet.create({
  flatlist: {
    backgroundColor: "#ff0000",
  },
  renderItem: {
    backgroundColor: "#eeeeee",
  },
})

const useAnimationHeightDown = (keys: string[]) => {
  const heights: Record<string, Animated.Value | undefined> = {}
  keys.forEach((key) => {
    heights[key] = new Animated.Value(50)
  })

  const config: Animated.TimingAnimationConfig = {
    toValue: 0,
    duration: 450,
    useNativeDriver: false,
    easing: Easing.out(Easing.exp),
  }

  const start = (key: string, callback: Animated.EndCallback) => {
    const height = heights[key]
    if (height) {
      Animated.timing(height, config).start(callback)
    }
  }

  const styleAnimations = (key: string) => {
    return {
      height: heights[key],
    }
  }

  return { styleAnimations, start }
}

export const FlatListAnimatedScreen: React.FC = () => {
  const [fruits, setFruits] = React.useState(initialFruits)
  const keys = fruits.map((fruit) => fruit.key)
  const { styleAnimations, start } = useAnimationHeightDown(keys)
  const flatListRef = React.useRef<FlatList>(null)

  const deleteLastFruit = () => {
    const deleteIndex = fruits.length - 1
    if (deleteIndex >= 0) {
      const deleteKey = keys[deleteIndex]
      start(deleteKey, () => {
        const newFruits = fruits.slice()
        newFruits.splice(deleteIndex, 1)
        setFruits(newFruits)
      })
    }
  }

  useRightButton(deleteLastFruit, "削除")

  const renderItem = (info: ListRenderItemInfo<Fruit>): JSX.Element => {
    const { item: fruit } = info
    return (
      <Animated.View style={[styles.renderItem, styleAnimations(fruit.key)]}>
        <MarginText>
          {fruit.key} / {fruit.name}
        </MarginText>
      </Animated.View>
    )
  }

  return (
    <FlatList
      ref={flatListRef}
      style={styles.flatlist}
      data={fruits}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
    />
  )
}
