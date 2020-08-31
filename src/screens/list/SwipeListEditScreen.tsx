import React from "react"
import {
  Text,
  View,
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

const opacityValue = new Animated.Value(1)

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

type SwipeValueChangeData = {
  key: string
  value: number
  direction: "left" | "right"
  isOpen: boolean
}

export const SwipeListEditScreen: React.FC = () => {
  const [fruits, setFruits] = React.useState(initialFruits)

  const renderItem = (info: ListRenderItemInfo<Fruit>): JSX.Element => {
    const { item, index } = info
    return (
      <Animated.View style={[styles.renderItem, { opacity: opacityValue }]}>
        <Text>
          {index}. {item.name}
        </Text>
      </Animated.View>
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

  const onSwipeValueChange = (data: SwipeValueChangeData): void => {
    if (data.value > -250) {
      return
    }

    const deleteIndex = fruits.findIndex((fruit) => fruit.id === data.key)
    if (deleteIndex < 0) {
      return
    }

    const slicedFruits = fruits.slice()
    slicedFruits.splice(deleteIndex, 1)
    setFruits(slicedFruits)
  }

  const onPress = () => {
    const deleteIndex = fruits.findIndex((fruit) => fruit.id === "3")

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
