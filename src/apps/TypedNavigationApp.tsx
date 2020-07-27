import React from "react"
import { Text, Button, StyleSheet, SafeAreaView } from "react-native"

import { RouteProp, NavigationContainer } from "@react-navigation/native"
import {
  StackNavigationProp,
  createStackNavigator,
} from "@react-navigation/stack"

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
  },
  textInScreen: {
    margin: 12,
  },
})

// 行き来する画面のリストを用意し、スタックも用意する
type StackParamList = {
  Hello: undefined
  Goodbye: { id: number }
}
const Stack = createStackNavigator<StackParamList>()

// Goodbye への遷移元用の型
type GoodbyeScreenNavigationProp = StackNavigationProp<
  StackParamList,
  "Goodbye"
>
type HelloProps = {
  navigation: GoodbyeScreenNavigationProp
}

// Goodbye への遷移元の画面
const HelloScreen: React.FC<HelloProps> = (props: HelloProps) => {
  const { navigation } = props

  const onPress = () => {
    navigation.navigate("Goodbye", { id: 123 })

    // StackParamList に定義しているものと異なると異なると指摘してくれる
    // navigation.navigate("Great")
    // navigation.navigate("Goodbye")
    // navigation.navigate("Goodbye", { name: "sttaf34" })
  }

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <Text style={styles.textInScreen}>Hello Hello</Text>
      <Button title="Push!" onPress={onPress} />
    </SafeAreaView>
  )
}

// 遷移先用の型
type GoodbyeScreenRouteProp = RouteProp<StackParamList, "Goodbye">
type GoodbyeProps = {
  route: GoodbyeScreenRouteProp
}

// 遷移先の画面
const GoodbyeScreen: React.FC<GoodbyeProps> = (props: GoodbyeProps) => {
  const { route } = props
  const { id } = route.params // ここが undefined を考えなくてよくなる
  return (
    <SafeAreaView style={styles.safeAreaView}>
      <Text style={styles.textInScreen}>Goodbye Goodbye</Text>
      <Text>{id}</Text>
    </SafeAreaView>
  )
}

export const TypedNavigationApp: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Hello">
        <Stack.Screen name="Hello" component={HelloScreen} />
        <Stack.Screen name="Goodbye" component={GoodbyeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
