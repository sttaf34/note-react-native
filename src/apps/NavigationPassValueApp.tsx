/* eslint-disable react/jsx-props-no-spreading */

import React from "react"
import { Button } from "react-native"
import { MarginText } from "src/components/MarginText"
import {
  useRoute,
  RouteProp,
  useNavigation,
  NavigationContainer,
} from "@react-navigation/native"
import {
  HeaderBackButton,
  StackNavigationProp,
  createStackNavigator,
} from "@react-navigation/stack"

type StackParamList = {
  // 一番最初の起動時は undefined の方に該当する
  Hello: { id: number } | undefined
  Goodbye: {
    id: number
  }
}
const Stack = createStackNavigator<StackParamList>()

// Hello に向かいたいときに使う
type HelloScreenNavigationProp = StackNavigationProp<StackParamList, "Hello">

// Hello 自身が値を受け取るのに使う
type HelloScreenRouteProp = RouteProp<StackParamList, "Hello">

// Goodbye に向かいたいときに使う
type GoodbyeScreenNavigationProp = StackNavigationProp<
  StackParamList,
  "Goodbye"
>
// Goodbye 自身が値を受け取るのに使う
type GoodbyeScreenRouteProp = RouteProp<StackParamList, "Goodbye">

const HelloScreen: React.FC = () => {
  const [value, setValue] = React.useState("")

  // 値の受け取り
  const route = useRoute<HelloScreenRouteProp>()
  const { params } = route
  React.useEffect(() => {
    setValue(params ? String(params.id) : "")
  }, [params])

  // Goodbye に向かいたい
  const navigation = useNavigation<GoodbyeScreenNavigationProp>()
  const onPress = () => {
    navigation.navigate("Goodbye", { id: 123 })
  }

  return (
    <>
      <MarginText>受け取った値は [{value}]</MarginText>
      <Button title="Push!" onPress={onPress} />
    </>
  )
}

const GoodbyeScreen: React.FC = () => {
  // 値の受け取り
  const route = useRoute<GoodbyeScreenRouteProp>()
  const { id } = route.params

  // Hello に向かいたい（遷移元に値を渡したい）
  const navigation = useNavigation<HelloScreenNavigationProp>()
  const onPress = () => {
    navigation.navigate("Hello", { id: 999 })
  }

  // 戻るボタンの動作の変更
  // デフォルトの戻るボタンだと HelloScreen は再実行されない
  navigation.setOptions({
    headerLeft: (props) => (
      <HeaderBackButton
        {...props}
        onPress={() => navigation.navigate("Hello", { id: 333 })}
      />
    ),
  })

  // スワイプバックのときの動作が制御できないかも、未確認

  return (
    <>
      <MarginText>受け取った値は [{id}]</MarginText>
      <Button title="Back!" onPress={onPress} />
    </>
  )
}

export const NavigationPassValueApp: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Hello">
        <Stack.Screen name="Hello" component={HelloScreen} />
        <Stack.Screen name="Goodbye" component={GoodbyeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
