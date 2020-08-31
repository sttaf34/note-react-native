import React from "react"
import { View, Text, Animated, StyleSheet } from "react-native"

const styles = StyleSheet.create({
  container: {
    height: 128,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 35,
  },
})

// このコンポーネントで囲むと、マウントされたときにフェードインで登場する
const FadeInView: React.FC<unknown> = (props: React.Props<unknown>) => {
  const { children } = props

  // このコンポーネントでは opacity をアニメーションさせたい

  // 初期値の設定
  const opacityValue = React.useRef(new Animated.Value(0)).current

  // ゴールの設定
  const config: Animated.TimingAnimationConfig = {
    toValue: 1,
    duration: 2000,
    useNativeDriver: true,
  }

  React.useEffect(() => {
    Animated.timing(opacityValue, config).start()
  }, [opacityValue])

  return (
    <Animated.View style={{ opacity: opacityValue }}>{children}</Animated.View>
  )
}

export const AnimatedHelloScreen: React.FC = () => {
  return (
    <>
      <View style={styles.container}>
        <FadeInView>
          <Text style={styles.text}>登場！</Text>
        </FadeInView>
      </View>
    </>
  )
}
