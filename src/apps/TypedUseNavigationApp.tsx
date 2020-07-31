import React from "react"
import { Text, Button, StyleSheet, SafeAreaView } from "react-native"
import {
  useRoute,
  RouteProp,
  useNavigation,
  NavigationContainer,
} from "@react-navigation/native"
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

// Goodbye への遷移元の画面
const HelloScreen: React.FC = () => {
  const navigation = useNavigation<GoodbyeScreenNavigationProp>()

  const onPress = () => {
    navigation.navigate("Goodbye", { id: 123 })
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

// 遷移先の画面
const GoodbyeScreen: React.FC = () => {
  const route = useRoute<GoodbyeScreenRouteProp>()
  const { id } = route.params // ここが undefined を考えなくてよくなる
  return (
    <SafeAreaView style={styles.safeAreaView}>
      <Text style={styles.textInScreen}>Goodbye Goodbye</Text>
      <Text>{id}</Text>
    </SafeAreaView>
  )
}

export const TypedUseNavigationApp: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Hello">
        <Stack.Screen name="Hello" component={HelloScreen} />
        <Stack.Screen name="Goodbye" component={GoodbyeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
