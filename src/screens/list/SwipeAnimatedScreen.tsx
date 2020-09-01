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

const cellHeight = 50

const styles = StyleSheet.create({
  renderItem: {
    backgroundColor: "#ffffff",
    justifyContent: "center",
    height: cellHeight,
  },
  renderHiddenItem: {
    alignItems: "center",
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#ff0000",
    paddingRight: 5,
    height: cellHeight,
  },
  buttonContainer: {
    borderWidth: 0.5,
  },
})

type Fruit = {
  key: string
  name: string
}

const initialFruits: Fruit[] = [
  { key: "1", name: "apple" },
  { key: "2", name: "banana" },
  { key: "3", name: "coconut" },
  { key: "4", name: "durian" },
  { key: "5", name: "fig" },
  { key: "6", name: "grape" },
  { key: "7", name: "kiwi" },
  { key: "8", name: "lemon" },
  { key: "9", name: "lime" },
  { key: "10", name: "mango" },
  { key: "11", name: "melon" },
  { key: "12", name: "orange" },
  { key: "13", name: "papaya" },
  { key: "14", name: "peach" },
  { key: "15", name: "pear" },
  { key: "16", name: "plum" },
  { key: "17", name: "pineapple" },
  { key: "18", name: "strawberry" },
]

const useAnimationsHeightDown = (keys: string[], height: number) => {
  const values: Record<string, Animated.Value | undefined> = {}
  keys.forEach((key) => {
    values[key] = new Animated.Value(0)
  })

  const config: Animated.TimingAnimationConfig = {
    toValue: 1,
    duration: 1000,
    useNativeDriver: true,
    easing: Easing.out(Easing.exp),
  }

  const start = (key: string, endCallback: Animated.EndCallback) => {
    const value = values[key]
    if (value) {
      Animated.timing(value, config).start(endCallback)
    }
  }

  const styleAnimations = (key: string) => {
    const value = values[key]
    if (value === undefined) {
      return {}
    }

    const scaleY = 0
    const translateY = (height * scaleY - height) / 2

    const interPolateTranslateY = value.interpolate({
      inputRange: [0, 1],
      outputRange: [0, translateY],
    })
    const interPolateScaleY = value.interpolate({
      inputRange: [0, 1],
      outputRange: [1, scaleY],
    })

    return {
      transform: [
        { translateY: interPolateTranslateY },
        { scaleY: interPolateScaleY },
      ],
    }
  }

  return { styleAnimations, start }
}

const useAnimationsMoveUp = (keys: string[], height: number) => {
  const values: Record<string, Animated.Value | undefined> = {}
  keys.forEach((key) => {
    values[key] = new Animated.Value(0)
  })

  const config: Animated.TimingAnimationConfig = {
    toValue: 1,
    duration: 1000,
    useNativeDriver: true,
    easing: Easing.out(Easing.exp),
  }

  const start = (key: string) => {
    const value = values[key]
    if (value) {
      Animated.timing(value, config).start()
    }
  }

  const styleAnimations = (key: string) => {
    const value = values[key]
    if (value === undefined) {
      return {}
    }

    const interPolateTranslateY = value.interpolate({
      inputRange: [0, 1],
      outputRange: [0, -height],
    })

    return {
      transform: [{ translateY: interPolateTranslateY }],
    }
  }

  return { styleAnimations, start }
}

export const SwipeAnimatedScreen: React.FC = () => {
  const [fruits, setFruits] = React.useState(initialFruits)
  const keys = fruits.map((fruit) => fruit.key)
  const useHeightDown = useAnimationsHeightDown(keys, cellHeight)
  const useMoveUp = useAnimationsMoveUp(keys, cellHeight)

  const deleteFruit = (key: string) => {
    const deleteIndex = fruits.findIndex((fruit) => fruit.key === key)
    if (deleteIndex < 0) {
      return
    }

    // 削除する果物は高さをゼロにするアニメーション
    useHeightDown.start(key, () => {
      const slicedFruits = fruits.slice()
      slicedFruits.splice(deleteIndex, 1)
      setFruits(slicedFruits)
    })

    // 削除する果物より下に位置するものは移動のアニメーション
    fruits.forEach((fruit, index) => {
      if (deleteIndex < index) {
        useMoveUp.start(fruit.key)
      }
    })
  }

  const renderItem = (info: ListRenderItemInfo<Fruit>): JSX.Element => {
    const { item: fruit } = info
    return (
      <Animated.View
        style={[
          styles.renderItem,
          useHeightDown.styleAnimations(fruit.key),
          useMoveUp.styleAnimations(fruit.key),
        ]}
      >
        <MarginText>{fruit.name}</MarginText>
      </Animated.View>
    )
  }

  const renderHiddenItem = (info: ListRenderItemInfo<Fruit>): JSX.Element => {
    const { item: fruit } = info
    return (
      <Animated.View
        style={[
          styles.renderHiddenItem,
          useHeightDown.styleAnimations(fruit.key),
          useMoveUp.styleAnimations(fruit.key),
        ]}
      >
        <Text> </Text>
        <View style={styles.buttonContainer}>
          <Button title="Hey!" onPress={() => deleteFruit(fruit.key)} />
        </View>
      </Animated.View>
    )
  }

  return (
    <>
      <SwipeListView
        data={fruits}
        keyExtractor={(fruit) => fruit.key}
        renderItem={renderItem}
        renderHiddenItem={renderHiddenItem}
        rightOpenValue={-66}
      />
    </>
  )
}
