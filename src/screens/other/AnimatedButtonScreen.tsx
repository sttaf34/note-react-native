import React from "react"
import { View, Text, Button, Animated, StyleSheet } from "react-native"

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

const FadeInView: React.FC<unknown> = (props: React.Props<unknown>) => {
  const { children } = props
  const opacityValue = React.useRef(new Animated.Value(0)).current
  const config: Animated.TimingAnimationConfig = {
    toValue: 1,
    duration: 500,
    useNativeDriver: true,
  }

  React.useEffect(() => {
    Animated.timing(opacityValue, config).start()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Animated.View style={{ opacity: opacityValue }}>{children}</Animated.View>
  )
}

const FadeOutView: React.FC<unknown> = (props: React.Props<unknown>) => {
  const { children } = props
  const opacityValue = React.useRef(new Animated.Value(1)).current
  const config: Animated.TimingAnimationConfig = {
    toValue: 0,
    duration: 500,
    useNativeDriver: true,
  }

  React.useEffect(() => {
    Animated.timing(opacityValue, config).start()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Animated.View style={{ opacity: opacityValue }}>{children}</Animated.View>
  )
}

// transform の値を動かして小さくする
const ScaleInView: React.FC<unknown> = (props: React.Props<unknown>) => {
  const { children } = props
  const scaleValue = React.useRef(new Animated.Value(1)).current
  const config: Animated.TimingAnimationConfig = {
    toValue: 0,
    duration: 500,
    useNativeDriver: true,
  }

  React.useEffect(() => {
    Animated.timing(scaleValue, config).start()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Animated.View style={{ transform: [{ scale: scaleValue }] }}>
      {children}
    </Animated.View>
  )
}

// transform の値を動かして大きくする
const ScaleOutView: React.FC<unknown> = (props: React.Props<unknown>) => {
  const { children } = props
  const scaleValue = React.useRef(new Animated.Value(0)).current
  const config: Animated.TimingAnimationConfig = {
    toValue: 1,
    duration: 500,
    useNativeDriver: true,
  }

  React.useEffect(() => {
    Animated.timing(scaleValue, config).start()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Animated.View style={{ transform: [{ scale: scaleValue }] }}>
      {children}
    </Animated.View>
  )
}

export const AnimatedButtonScreen: React.FC = () => {
  const [isVisible, setIsVisible] = React.useState(true)

  // ボタンを連打した場合、
  // アニメーションの途中から値を変更するようにはなってない

  if (isVisible) {
    return (
      <View style={styles.container}>
        <Button title="消去する" onPress={() => setIsVisible(false)} />
        <FadeInView>
          <Text style={styles.text}>Hey!</Text>
        </FadeInView>
        <ScaleOutView>
          <Text style={styles.text}>Hey!</Text>
        </ScaleOutView>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <Button title="表示する" onPress={() => setIsVisible(true)} />
      <FadeOutView>
        <Text style={styles.text}>Hey!</Text>
      </FadeOutView>
      <ScaleInView>
        <Text style={styles.text}>Hey!</Text>
      </ScaleInView>
    </View>
  )
}
