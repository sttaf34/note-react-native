import React from "react"
import { SwipeListView } from "react-native-swipe-list-view"
import {
  Text,
  Easing,
  Animated,
  Pressable,
  StyleSheet,
  ListRenderItemInfo,
} from "react-native"

import { Line } from "src/components/Line"
import { MarginText } from "src/components/MarginText"
import { Fruit, fruits as initialFruits } from "src/constants/fruits"

const duration = 1200
const cellHeight = 120

const useAnimationsDeleteRow = (keys: string[]) => {
  // 前に位置している方の高さ
  const heights: Record<string, Animated.Value | undefined> = {}
  keys.forEach((key) => {
    heights[key] = new Animated.Value(cellHeight)
  })
  const configHeight: Animated.TimingAnimationConfig = {
    toValue: 0,
    duration,
    useNativeDriver: false,
    easing: Easing.out(Easing.exp),
  }
  const styleHeight = (key: string) => {
    return {
      height: heights[key],
    }
  }

  // 後ろに位置している方の高さ
  const heightsHidden: Record<string, Animated.Value | undefined> = {}
  keys.forEach((key) => {
    heightsHidden[key] = new Animated.Value(cellHeight)
  })
  const configHeightHidden: Animated.TimingAnimationConfig = {
    toValue: 0,
    duration: duration - 50, // チラチラ見えてしまうのを防いでる
    useNativeDriver: false,
    easing: Easing.out(Easing.exp),
  }
  const styleHeightHidden = (key: string) => {
    return {
      height: heightsHidden[key],
    }
  }

  // 前に位置している方の線の色
  const colors: Record<string, Animated.Value | undefined> = {}
  keys.forEach((key) => {
    colors[key] = new Animated.Value(0)
  })
  const configColor: Animated.TimingAnimationConfig = {
    toValue: 1,
    duration,
    useNativeDriver: false,
  }
  const styleBorderColor = (key: string) => {
    const color = colors[key]
    if (color) {
      const borderColor = color.interpolate({
        inputRange: [0, 0.8, 1],
        outputRange: ["#c4c4c4", "#c4c4c4", "white"],
      })
      return {
        borderColor,
      }
    }
    return {
      borderColor: undefined,
    }
  }

  // 後ろに位置している方の線の色
  const colorsHidden: Record<string, Animated.Value | undefined> = {}
  keys.forEach((key) => {
    colorsHidden[key] = new Animated.Value(0)
  })
  const configColorHidden: Animated.TimingAnimationConfig = {
    toValue: 1,
    duration,
    useNativeDriver: false,
  }
  const styleBorderColorHidden = (key: string) => {
    const color = colorsHidden[key]
    if (color) {
      const borderColor = color.interpolate({
        inputRange: [0, 0.8, 1],
        outputRange: ["#c4c4c4", "#c4c4c4", "white"],
      })
      return {
        borderColor,
      }
    }
    return {
      borderColor: undefined,
    }
  }

  const start = (key: string, callback: Animated.EndCallback) => {
    // 前に位置している方の高さ
    const height = heights[key]
    if (height) {
      Animated.timing(height, configHeight).start(callback)
    }

    // 後ろに位置している方の高さ
    const heightHidden = heightsHidden[key]
    if (heightHidden) {
      Animated.timing(heightHidden, configHeightHidden).start()
    }

    // 前に位置している方の線
    const color = colors[key]
    if (color) {
      Animated.timing(color, configColor).start()
    }

    // 後ろに位置している方の線
    const colorHidden = colorsHidden[key]
    if (colorHidden) {
      Animated.timing(colorHidden, configColorHidden).start()
    }
  }

  return {
    styleHeight,
    styleHeightHidden,
    styleBorderColor,
    styleBorderColorHidden,
    start,
  }
}

type CellFruitProps = {
  styleHeight: { height: Animated.Value | undefined }
  styleBorderColor: {
    borderColor: Animated.AnimatedInterpolation | undefined
  }
  name: string
}

const CellFruit: React.FC<CellFruitProps> = (props: CellFruitProps) => {
  const { styleHeight, styleBorderColor, name } = props

  const cellStyles = StyleSheet.create({
    container: {
      backgroundColor: "#ffffff",
      justifyContent: "center",
      borderBottomWidth: StyleSheet.hairlineWidth,

      // 上下の padding は、
      // 一番下のセルを消した時のアニメーションに影響があるので使わない方が良い
      // paddingVertical: 20,
    },
    pressable: {
      height: "100%",
    },
    text: {
      margin: 20,
      marginVertical: 0,
      fontSize: 50,
      color: "#333333",
    },
  })

  const style = [cellStyles.container, styleHeight, styleBorderColor]

  const onPress = () => {
    console.log(name)
  }

  return (
    <Animated.View style={style}>
      <Pressable style={cellStyles.pressable} onPress={onPress}>
        <Text style={cellStyles.text}>{name}</Text>
        <Text style={cellStyles.text}>{name}</Text>
      </Pressable>
    </Animated.View>
  )
}

type CellDeleteProps = {
  styleHeight: { height: Animated.Value | undefined }
  styleBorderColor: {
    borderColor: Animated.AnimatedInterpolation | undefined
  }
  onPress: () => void
}

const CellDelete: React.FC<CellDeleteProps> = (props: CellDeleteProps) => {
  const { styleHeight, styleBorderColor, onPress } = props

  const cellStyles = StyleSheet.create({
    container: {
      backgroundColor: "#ff0000",
      borderBottomWidth: StyleSheet.hairlineWidth,
      // 上下の padding は、
      // 一番下のセルを消した時のアニメーションに影響があるので使わない方が良い
      // paddingVertical: 20,
    },
    pressable: {
      height: "100%",
      alignItems: "center",
      flexDirection: "row",
    },
    text: {
      flex: 1,
      fontSize: 20,
      color: "#ffffff",
      textAlign: "right",
      paddingRight: 20,
    },
  })

  const style = [cellStyles.container, styleHeight, styleBorderColor]

  return (
    <Animated.View style={style}>
      <Pressable style={cellStyles.pressable} onPress={onPress}>
        <Text style={cellStyles.text}> 削除 </Text>
      </Pressable>
    </Animated.View>
  )
}

export const SwipeListDeleteRowScreen: React.FC = () => {
  const [fruits, setFruits] = React.useState(initialFruits)
  const keys = fruits.map((fruit) => fruit.key)
  const useDeleteRow = useAnimationsDeleteRow(keys)

  const deleteFruit = (key: string) => {
    const deleteIndex = fruits.findIndex((fruit) => fruit.key === key)
    if (deleteIndex < 0) {
      return
    }
    // 高さをゼロにするアニメーションの後、データを変更する
    useDeleteRow.start(key, () => {
      const slicedFruits = fruits.slice()
      slicedFruits.splice(deleteIndex, 1)
      setFruits(slicedFruits)
    })
  }

  const renderItem = (info: ListRenderItemInfo<Fruit>): JSX.Element => {
    const { item: fruit } = info
    return (
      <CellFruit
        styleHeight={useDeleteRow.styleHeight(fruit.key)}
        styleBorderColor={useDeleteRow.styleBorderColor(fruit.key)}
        name={fruit.name}
      />
    )
  }

  const renderHiddenItem = (info: ListRenderItemInfo<Fruit>): JSX.Element => {
    const { item: fruit } = info
    return (
      <CellDelete
        styleHeight={useDeleteRow.styleHeightHidden(fruit.key)}
        styleBorderColor={useDeleteRow.styleBorderColorHidden(fruit.key)}
        onPress={() => deleteFruit(fruit.key)}
      />
    )
  }

  return (
    <SwipeListView
      data={fruits}
      keyExtractor={(fruit) => fruit.key}
      renderItem={renderItem}
      renderHiddenItem={renderHiddenItem}
      rightOpenValue={-95}
      ListHeaderComponent={() => <Line />}
      ListFooterComponent={() => <MarginText>フッタ</MarginText>}
      useNativeDriver={false}
    />
  )
}
