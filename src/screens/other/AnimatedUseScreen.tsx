import React from "react"
import {
  View,
  Easing,
  Button,
  Animated,
  StyleSheet,
  ScrollView,
} from "react-native"

import { MarginText } from "src/components/MarginText"
import { MarginDivider } from "src/components/MarginDivider"

//
// #region 一つのコンポーネントをフェードアウト（消える）
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

// #endregion

//
// #region 複数のコンポーネントをフェードイン（表示）
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

// #endregion

//
// #region 一つのコンポーネントをスケールイン（縮小）＆処理実行
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

// #endregion

//
// #region 一つのコンポーネントの位置を移動
//

const useAnimationPosition = () => {
  const positionX = new Animated.Value(0)
  const positionY = new Animated.Value(0)

  const config: Animated.TimingAnimationConfig = {
    toValue: 30,
    duration: 1500,
    useNativeDriver: true,
  }

  const start = () => {
    Animated.parallel([
      Animated.timing(positionX, config),
      Animated.timing(positionY, config),
    ]).start()
  }

  const styleAnimation = {
    transform: [{ translateX: positionX }, { translateY: positionY }],
  }

  return { styleAnimation, start }
}

const HowToUseAnimationPosition: React.FC = () => {
  const { start, styleAnimation } = useAnimationPosition()

  const styles = StyleSheet.create({
    view: {
      backgroundColor: "skyblue",
    },
  })

  return (
    <Animated.View style={[styles.view, styleAnimation]}>
      <Button title="Move" onPress={() => start()} />
    </Animated.View>
  )
}

// #endregion

//
// #region 一つのコンポーネントの高さをゼロにする
//

const useAnimationHeightDown = (initialHeight: number) => {
  const height = new Animated.Value(initialHeight)

  // イージングの設定はこれらを見ながらやる
  // https://reactnative.dev/docs/easing
  // https://easings.net/

  // SwipeListView との併用だと動かないかも

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

// #endregion

//
// #region 一つのコンポーネントの色を変化
//

const useAnimationInterpolcate = () => {
  const value = new Animated.Value(0) // inputRange の最初の値

  const interPolateColor = value.interpolate({
    inputRange: [0, 100, 200, 300, 400],
    outputRange: ["#0000ff", "#ffffff", "#ff0000", "#00ff00", "#000000"],
  })

  const config: Animated.TimingAnimationConfig = {
    toValue: 400, // inputRange の最後の値
    duration: 3000,
    useNativeDriver: false,
  }

  const start = () => {
    Animated.timing(value, config).start()
  }

  const styleAnimation = {
    color: interPolateColor,
  }

  return { styleAnimation, start }
}

const HowToUseAnimationInterpolate: React.FC = () => {
  const { start, styleAnimation } = useAnimationInterpolcate()

  return (
    <>
      <Button title="Change Text Color" onPress={() => start()} />
      <Animated.Text style={[styleAnimation]}>こんにちは！</Animated.Text>
    </>
  )
}

// #endregion

//
// #region スクリーン
//

export const AnimatedUseScreen: React.FC = () => {
  return (
    <ScrollView>
      <HowToUseAnimationFadeOut />
      <MarginDivider />
      <HowToUseAnimationsFadeIn />
      <MarginDivider />
      <HowToUseAnimationScaleIn />
      <MarginDivider />
      <HowToUseAnimationPosition />
      <MarginDivider />
      <HowToUseAnimationInterpolate />
      <MarginDivider />
      <HowToUseAnimationHeight />
    </ScrollView>
  )
}

// #endregion
