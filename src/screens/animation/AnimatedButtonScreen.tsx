import React from "react"
import { View, Text, Button, Animated, StyleSheet } from "react-native"

import { PropsChildren } from "src/constants/types"

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 35,
  },
})

const FadeInView: React.FC<PropsChildren> = (props: PropsChildren) => {
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

const FadeOutView: React.FC<PropsChildren> = (props: PropsChildren) => {
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
const ScaleInView: React.FC<PropsChildren> = (props: PropsChildren) => {
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
const ScaleOutView: React.FC<PropsChildren> = (props: PropsChildren) => {
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

// 高さを変更
const HeightDownView: React.FC<PropsChildren> = (props: PropsChildren) => {
  const { children } = props
  const heightValue = React.useRef(new Animated.Value(100)).current
  const config: Animated.TimingAnimationConfig = {
    toValue: 0,
    duration: 500,
    useNativeDriver: false,
  }

  React.useEffect(() => {
    Animated.timing(heightValue, config).start()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Animated.View style={[{ height: heightValue }]}>{children}</Animated.View>
  )
}

// 色を変更
const ChangeColorView: React.FC<PropsChildren> = (props: PropsChildren) => {
  const { children } = props
  const value = React.useRef(new Animated.Value(0)).current
  const config: Animated.TimingAnimationConfig = {
    toValue: 1,
    duration: 500,
    useNativeDriver: false,
  }

  const color = value.interpolate({
    inputRange: [0, 1],
    outputRange: ["rgb(0, 0, 0)", "rgb(255, 30, 100)"],
  })

  React.useEffect(() => {
    Animated.timing(value, config).start()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Animated.View style={[{ backgroundColor: color }]}>
      {children}
    </Animated.View>
  )
}

// 文字色を変更
const ChangeTextColorView: React.FC = () => {
  const value = React.useRef(new Animated.Value(0)).current
  const config: Animated.TimingAnimationConfig = {
    toValue: 1,
    duration: 500,
    useNativeDriver: false,
  }

  const color = value.interpolate({
    inputRange: [0, 1],
    outputRange: ["rgb(0, 0, 0)", "rgb(255, 30, 100)"],
  })

  React.useEffect(() => {
    Animated.timing(value, config).start()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Animated.Text style={[{ color }]}>
      <Text style={styles.text}>Hey!</Text>
    </Animated.Text>
  )
}

//
const ChangeTextHeightView: React.FC = () => {
  const height = React.useRef(new Animated.Value(100)).current
  const config: Animated.TimingAnimationConfig = {
    toValue: 0,
    duration: 500,
    useNativeDriver: false,
  }

  React.useEffect(() => {
    Animated.timing(height, config).start()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Animated.Text style={[{ height }]}>
      <Text style={styles.text}>Hey!</Text>
    </Animated.Text>
  )
}

// 高さと色を並列で変更
const ChangeColorAndHeightView: React.FC<PropsChildren> = (
  props: PropsChildren
) => {
  const { children } = props

  // 色
  const valueColor = React.useRef(new Animated.Value(0)).current
  const configColor: Animated.TimingAnimationConfig = {
    toValue: 1,
    duration: 500,
    useNativeDriver: false,
  }
  const color = valueColor.interpolate({
    inputRange: [0, 1],
    outputRange: ["rgb(255, 255, 255)", "rgb(255, 30, 100)"],
  })

  // 高さ
  const valueHeight = React.useRef(new Animated.Value(0)).current
  const configHeight: Animated.TimingAnimationConfig = {
    toValue: 150,
    duration: 500,
    useNativeDriver: false,
  }

  React.useEffect(() => {
    Animated.parallel([
      Animated.timing(valueColor, configColor),
      Animated.timing(valueHeight, configHeight),
    ]).start()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Animated.View style={[{ backgroundColor: color, height: valueHeight }]}>
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
        <ChangeColorView>
          <Text style={styles.text}>Hey!</Text>
        </ChangeColorView>
        <ChangeTextColorView />
        <ChangeColorAndHeightView>
          <Text style={styles.text}>Hey!</Text>
        </ChangeColorAndHeightView>
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
      <HeightDownView>
        <Text style={styles.text}>Hey!</Text>
      </HeightDownView>
      <ChangeTextHeightView />
    </View>
  )
}
