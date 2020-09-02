import React from "react"
import { Text, Button, StatusBar, StyleSheet, SafeAreaView } from "react-native"
import { NavigationContainer } from "@react-navigation/native"
import { createStackNavigator } from "@react-navigation/stack"
import { ScreenProps } from "src/constants/navigationType"

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
  },
  modal: {
    backgroundColor: "pink",
  },
  textInScreen: {
    margin: 12,
  },
  title: {
    fontSize: 32,
  },
})

const HomeScreen: React.FC<ScreenProps> = ({ navigation }: ScreenProps) => {
  // navigation.navigate にわたすのは Stack.Screen の name の値
  return (
    <SafeAreaView style={styles.safeAreaView}>
      <StatusBar hidden={false} />
      <Text style={styles.textInScreen}>Hello Hello</Text>
      <Button title="Open!" onPress={() => navigation.navigate("PinkModal")} />
    </SafeAreaView>
  )
}

const ModalScreen: React.FC<ScreenProps> = ({ navigation }: ScreenProps) => {
  return (
    <SafeAreaView style={[styles.safeAreaView, styles.modal]}>
      <StatusBar hidden={false} />
      <Text style={styles.textInScreen}>Hello Hello</Text>
      <Button title="Close!" onPress={() => navigation.goBack()} />
    </SafeAreaView>
  )
}

const Stack = createStackNavigator()

export const NavigationModalApp: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator mode="modal">
        <Stack.Screen
          name="Main"
          component={HomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="PinkModal"
          component={ModalScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
