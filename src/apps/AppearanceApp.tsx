import React from "react"
import { StatusBar, SafeAreaView } from "react-native"
import { NavigationContainer } from "@react-navigation/native"
import { createStackNavigator } from "@react-navigation/stack"
import { useColorScheme, AppearanceProvider } from "react-native-appearance"

import { baseStyles } from "src/constants/baseStyles"
import { StyledText } from "src/components/StyledText"

const Stack = createStackNavigator()

const HelloScreen: React.FC = () => {
  const scheme = useColorScheme()
  const message = `現在の設定は ${scheme} モードです`
  return (
    <SafeAreaView style={baseStyles.safeAreaView}>
      <StatusBar barStyle="dark-content" />
      <StyledText text={message} />
    </SafeAreaView>
  )
}

export const AppearanceApp: React.FC = () => {
  const headerStyle = { backgroundColor: "white" }
  return (
    <AppearanceProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Hello"
            component={HelloScreen}
            options={{ title: "記録する", headerStyle }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </AppearanceProvider>
  )
}
