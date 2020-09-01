import React from "react"
import { View, Button, Animated } from "react-native"

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

  return { opacityValue, start }
}

const HowToUseAnimationFadeOut: React.FC = () => {
  const { opacityValue, start } = useAnimationFadeOut()

  const style = {
    padding: 10,
    paddingBottom: 0,
  }

  return (
    <Animated.View style={[style, { opacity: opacityValue }]}>
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

  const start = (key: string) => {
    const opacityValue = opacityValues[key]
    if (opacityValue) {
      Animated.timing(opacityValue, config).start()
    }
  }

  return { opacityValues, start }
}

const HowToUseAnimationsFadeIn: React.FC = () => {
  const keys = ["AAA", "BBB", "CCC"]
  const { opacityValues, start } = useAnimationsFadeIn(keys)

  const list = keys.map((key) => {
    const opacityValue = opacityValues[key]
    return (
      <View key={key}>
        <Button title="Fade In" onPress={() => start(key)} />
        <Animated.View style={{ opacity: opacityValue }}>
          <MarginText>Hello!</MarginText>
        </Animated.View>
      </View>
    )
  })

  return <>{list}</>
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
    </>
  )
}
