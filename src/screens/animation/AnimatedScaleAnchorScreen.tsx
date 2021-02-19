import React from "react"
import { Button, Animated, StyleSheet, Easing } from "react-native"

import { MarginDivider } from "src/components/MarginDivider"

//
// https://stackoverflow.com/questions/50047897/
//

const useAnimationInterpolateScaleOut = (width: number, height: number) => {
  const value = new Animated.Value(0)

  // 引数のデフォルトの四角形のサイズから、拡大アニメーション用の値を算出
  const scaleX = 5
  const scaleY = 5
  const translateX = (width * scaleX - width) / 2
  const translateY = (height * scaleY - height) / 2

  const interPolateTranslateX = value.interpolate({
    inputRange: [0, 1],
    outputRange: [0, translateX],
  })
  const interPolateTranslateY = value.interpolate({
    inputRange: [0, 1],
    outputRange: [0, translateY],
  })
  const interPolateScaleX = value.interpolate({
    inputRange: [0, 1],
    outputRange: [1, scaleX],
  })
  const interPolateScaleY = value.interpolate({
    inputRange: [0, 1],
    outputRange: [1, scaleY],
  })

  const config: Animated.TimingAnimationConfig = {
    toValue: 1,
    duration: 1000,
    useNativeDriver: false,
  }

  const start = () => {
    Animated.timing(value, config).start()
  }

  const styleAnimation = {
    transform: [
      { translateX: interPolateTranslateX },
      { translateY: interPolateTranslateY },
      { scaleX: interPolateScaleX },
      { scaleY: interPolateScaleY },
    ],
  }

  return { styleAnimation, start }
}

const HowToUseAnimationInterpolateScaleOut: React.FC = () => {
  const width = 15
  const height = 15
  const { start, styleAnimation } = useAnimationInterpolateScaleOut(
    width,
    height
  )

  const styles = StyleSheet.create({
    view: {
      backgroundColor: "pink",
      position: "absolute",
      left: 10,
      top: 10,
      width,
      height,
    },
  })

  return (
    <>
      <Button title="拡大 " onPress={() => start()} />
      <Animated.View style={[styles.view, styleAnimation]} />
    </>
  )
}

const useAnimationInterpolateScaleIn = (width: number, height: number) => {
  const value = new Animated.Value(0)

  const scaleX = 0
  const scaleY = 0
  const translateX = (width * scaleX - width) / 2
  const translateY = (height * scaleY - height) / 2

  const interPolateTranslateX = value.interpolate({
    inputRange: [0, 1],
    outputRange: [0, translateX],
  })
  const interPolateTranslateY = value.interpolate({
    inputRange: [0, 1],
    outputRange: [0, translateY],
  })
  const interPolateScaleX = value.interpolate({
    inputRange: [0, 1],
    outputRange: [1, scaleX],
  })
  const interPolateScaleY = value.interpolate({
    inputRange: [0, 1],
    outputRange: [1, scaleY],
  })

  const config: Animated.TimingAnimationConfig = {
    toValue: 1,
    duration: 1000,
    useNativeDriver: false,
    easing: Easing.out(Easing.exp),
  }

  const start = () => {
    Animated.timing(value, config).start()
  }

  const styleAnimation = {
    transform: [
      { translateX: interPolateTranslateX },
      { translateY: interPolateTranslateY },
      { scaleX: interPolateScaleX },
      { scaleY: interPolateScaleY },
    ],
  }

  return { styleAnimation, start }
}

const HowToUseAnimationInterpolateScaleIn: React.FC = () => {
  const width = 300
  const height = 40
  const { start, styleAnimation } = useAnimationInterpolateScaleIn(
    width,
    height
  )

  const styles = StyleSheet.create({
    view: {
      backgroundColor: "pink",
      position: "absolute",
      left: 10,
      top: 90,
      width,
      height,
    },
  })

  return (
    <>
      <Button title="縮小" onPress={() => start()} />
      <Animated.View style={[styles.view, styleAnimation]} />
    </>
  )
}

export const AnimatedScaleAnchorScreen: React.FC = () => {
  return (
    <>
      <HowToUseAnimationInterpolateScaleOut />
      <MarginDivider />
      <HowToUseAnimationInterpolateScaleIn />
    </>
  )
}
