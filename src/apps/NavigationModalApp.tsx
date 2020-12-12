import React from "react"
import { StyleSheet, SafeAreaView } from "react-native"
import { NavigationContainer } from "@react-navigation/native"
import { createStackNavigator } from "@react-navigation/stack"

import { baseStyles } from "src/constants/baseStyles"
import { ScreenProps } from "src/constants/navigationType"
import { StyledButton } from "src/components/StyledButton"

const styles = StyleSheet.create({
  modal: {
    backgroundColor: "pink",
  },
})

const HomeScreen: React.FC<ScreenProps> = ({ navigation }: ScreenProps) => {
  // navigation.navigate にわたすのは Stack.Screen の name の値
  return (
    <SafeAreaView style={baseStyles.safeAreaView}>
      <StyledButton title="Open" onPress={() => navigation.navigate("Modal")} />
    </SafeAreaView>
  )
}

const ModalScreen: React.FC<ScreenProps> = ({ navigation }: ScreenProps) => {
  return (
    <SafeAreaView style={[baseStyles.safeAreaView, styles.modal]}>
      <StyledButton title="Close!" onPress={() => navigation.goBack()} />
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
          name="Modal"
          component={ModalScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
