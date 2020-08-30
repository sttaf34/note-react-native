import React from "react"
import {
  Text,
  Button,
  Animated,
  StyleSheet,
  ListRenderItemInfo,
} from "react-native"
import { SwipeListView } from "react-native-swipe-list-view"

type Fruit = {
  id: string
  name: string
}

const initialFruits: Fruit[] = [
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

const opacityValues = Array.from({ length: 3 }).map(() => new Animated.Value(1))

export const SwipeAnimatedScreen: React.FC = () => {
  const [fruits, setFruits] = React.useState(initialFruits)

  const renderItem = (info: ListRenderItemInfo<Fruit>): JSX.Element => {
    const { item, index } = info
    const opacityValue = opacityValues[index]
    return (
      <Animated.View style={[styles.renderItem, { opacity: opacityValue }]}>
        <Text>
          {index}. {item.name}
        </Text>
      </Animated.View>
    )
  }

  const onPress = () => {
    const deleteIndex = fruits.findIndex((fruit) => fruit.id === "3")
    const opacityValue = opacityValues[deleteIndex]
    if (deleteIndex < 0) {
      return
    }

    const config: Animated.TimingAnimationConfig = {
      toValue: 0,
      duration: 1500,
      useNativeDriver: false,
    }

    Animated.timing(opacityValue, config).start(() => {
      const slicedFruits = fruits.slice()
      slicedFruits.splice(deleteIndex, 1)
      setFruits(slicedFruits)
    })
  }

  return (
    <>
      <Button title="削除" onPress={onPress} />
      <SwipeListView
        disableLeftSwipe
        disableRightSwipe
        data={fruits}
        keyExtractor={(fruit) => fruit.id}
        renderItem={renderItem}
      />
    </>
  )
}
