import React from "react"
import { View, Easing, Button, Animated, StyleSheet } from "react-native"

import { MarginText } from "src/components/MarginText"
import { MarginDiveder } from "src/components/MarginDiveder"

//
// 一つのコンポーネントをフェードアウト（消える）
//

const useAnimationFadeOut = () => {
  const opacityValue = new Animated.Value(1)

  const config: Animated.TimingAnimationConfig = {
    toValue: 0,
    duration: 1500,
    useNativeDriver: true,
  }

  const start = () => {
    Animated.timing(opacityValue, config).start()
  }

  const styleAnimation = {
    opacity: opacityValue,
  }

  return { opacityValue, styleAnimation, start }
}

const HowToUseAnimationFadeOut: React.FC = () => {
  const { styleAnimation, start } = useAnimationFadeOut()

  const styles = StyleSheet.create({
    view: {
      padding: 10,
      paddingBottom: 0,
    },
  })

  // この書き方はちゃんと動くけど補完が効かない
  // const style = {
  //   padding: 10,
  //   paddingBottom: 0,
  // }

  return (
    <Animated.View style={[styles.view, styleAnimation]}>
      <Button title="Fade Out Myself" onPress={() => start()} />
    </Animated.View>
  )
}

//
// 複数のコンポーネントをフェードイン（表示）
//

const useAnimationsFadeIn = (keys: string[]) => {
  const opacityValues: Record<string, Animated.Value | undefined> = {}
  keys.forEach((key) => {
    opacityValues[key] = new Animated.Value(0)
  })

  const config: Animated.TimingAnimationConfig = {
    toValue: 1,
    duration: 1500,
    useNativeDriver: true,
  }

  const styleAnimations = (key: string) => {
    return {
      opacity: opacityValues[key],
    }
  }

  const start = (key: string) => {
    const opacityValue = opacityValues[key]
    if (opacityValue) {
      Animated.timing(opacityValue, config).start()
    }
  }

  return { opacityValues, styleAnimations, start }
}

const HowToUseAnimationsFadeIn: React.FC = () => {
  const keys = ["AAA", "BBB"]
  const { styleAnimations, start } = useAnimationsFadeIn(keys)

  const list = keys.map((key) => {
    return (
      <View key={key}>
        <Button title="Fade In" onPress={() => start(key)} />
        <Animated.View style={[styleAnimations(key)]}>
          <MarginText>Hello!</MarginText>
        </Animated.View>
      </View>
    )
  })

  return <>{list}</>
}

//
// 一つのコンポーネントをスケールイン＆処理実行
//

const useAnimationScaleIn = () => {
  const scaleValue = new Animated.Value(1)

  const config: Animated.TimingAnimationConfig = {
    toValue: 0,
    duration: 1500,
    useNativeDriver: true,
  }

  const start = (callback: Animated.EndCallback) => {
    Animated.timing(scaleValue, config).start(callback)
  }

  const styleAnimation = {
    transform: [{ scale: scaleValue }],
  }

  return { scaleValue, styleAnimation, start }
}

const HowToUseAnimationScaleIn: React.FC = () => {
  const { start, styleAnimation } = useAnimationScaleIn()

  const styles = StyleSheet.create({
    view: {
      backgroundColor: "#f2f2f2",
    },
  })

  const endCallback = () => {
    console.log("データの削除！")
  }

  return (
    <Animated.View style={[styles.view, styleAnimation]}>
      <Button title="Scale In Myself" onPress={() => start(endCallback)} />
    </Animated.View>
  )
}

//
// 一つのコンポーネントの高さをゼロにする
//

const useAnimationHeightDown = (initialHeight: number) => {
  const height = new Animated.Value(initialHeight)

  // イージングの設定はこれらを見ながらやる
  // https://reactnative.dev/docs/easing
  // https://easings.net/

  const config: Animated.TimingAnimationConfig = {
    toValue: 0,
    duration: 500,
    useNativeDriver: false,
    easing: Easing.out(Easing.exp),
  }

  const start = () => {
    Animated.timing(height, config).start()
  }

  const styleAnimation = {
    height,
  }

  return { styleAnimation, start }
}

const HowToUseAnimationHeight: React.FC = () => {
  const { start, styleAnimation } = useAnimationHeightDown(100)

  const styles = StyleSheet.create({
    view: {
      backgroundColor: "pink",
    },
  })

  return (
    <Animated.View style={[styles.view, styleAnimation]}>
      <Button title="Height" onPress={() => start()} />
    </Animated.View>
  )
}

//
// スクリーン
//

export const AnimatedUseScreen: React.FC = () => {
  return (
    <>
      <HowToUseAnimationFadeOut />
      <MarginDiveder />
      <HowToUseAnimationsFadeIn />
      <MarginDiveder />
      <HowToUseAnimationHeight />
      <HowToUseAnimationScaleIn />
    </>
  )
}
