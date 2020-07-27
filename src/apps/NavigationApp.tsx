import React from "react"
import { Text, Button, StyleSheet, SafeAreaView } from "react-native"

import { NavigationContainer } from "@react-navigation/native"
import { createStackNavigator } from "@react-navigation/stack"
import { ScreenProps } from "src/type"

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
  },
  textInScreen: {
    margin: 12,
  },
})

const Stack = createStackNavigator()

const HelloScreen: React.FC<ScreenProps> = ({ navigation }: ScreenProps) => {
  return (
    <SafeAreaView style={styles.safeAreaView}>
      <Text style={styles.textInScreen}>Hello Hello</Text>
      <Button
        title="Push!"
        onPress={() =>
          // 「遷移先」と「遷移先に渡す値」
          navigation.navigate("Goodbye", {
            id: 777,
          })
        }
      />
    </SafeAreaView>
  )
}

const GoodbyeScreen: React.FC<ScreenProps> = ({ route }: ScreenProps) => {
  // 「遷移元」からの値の受け取り
  const { id } = route.params || { id: 0 }
  return (
    <SafeAreaView style={styles.safeAreaView}>
      <Text style={styles.textInScreen}>Goodbye Goodbye</Text>
      <Text style={styles.textInScreen}>{id}</Text>
    </SafeAreaView>
  )
}

export const NavigationApp: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Hello" component={HelloScreen} />
        <Stack.Screen name="Goodbye" component={GoodbyeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
