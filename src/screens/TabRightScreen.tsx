import React from "react"
import { Text, Button, StyleSheet } from "react-native"
import { createStackNavigator } from "@react-navigation/stack"
import { ScreenProps } from "src/type"

const styles = StyleSheet.create({
  textInScreen: {
    margin: 12,
  },
})

const HelloScreen: React.FC<ScreenProps> = ({ navigation }: ScreenProps) => {
  return (
    <>
      <Text style={styles.textInScreen}>Hello Hello</Text>
      <Button title="Push!" onPress={() => navigation.navigate("Goodbye")} />
    </>
  )
}

const GoodbyeScreen: React.FC = () => {
  return (
    <>
      <Text style={styles.textInScreen}>Goodbye Goodbye</Text>
    </>
  )
}

const Stack = createStackNavigator()

export const TabRightScreen: React.FC = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Hello" component={HelloScreen} />
      <Stack.Screen name="Goodbye" component={GoodbyeScreen} />
    </Stack.Navigator>
  )
}
