import React from "react"
import { SafeAreaView } from "react-native"
import { MaterialCommunityIcons } from "@expo/vector-icons"
import { NavigationContainer } from "@react-navigation/native"
import { createStackNavigator } from "@react-navigation/stack"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"

import { ScreenProps } from "src/constants/types"
import { baseStyles } from "src/constants/baseStyles"
import { StyledText } from "src/components/StyledText"
import { StyledButton } from "src/components/StyledButton"

const LeftScreen: React.FC = () => {
  return (
    <SafeAreaView style={baseStyles.safeAreaView}>
      <StyledText text="Left" />
    </SafeAreaView>
  )
}

const HelloScreen: React.FC<ScreenProps> = ({ navigation }: ScreenProps) => {
  const onPress = () => navigation.navigate("Goodbye")
  return (
    <>
      <StyledButton title="Next" onPress={onPress} />
      <StyledButton title="Log" onPress={() => console.log("Log")} />
    </>
  )
}

const GoodbyeScreen: React.FC = () => {
  return <StyledText text="Goodbye" />
}

const Stack = createStackNavigator()

export const RightNavigator: React.FC = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Hello" component={HelloScreen} />
      <Stack.Screen name="Goodbye" component={GoodbyeScreen} />
    </Stack.Navigator>
  )
}

//
// Tab
//

const Tab = createBottomTabNavigator()

type TabBarIconProps = {
  color: string
  size: number
}

export const TabApp: React.FC = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="Left"
        tabBarOptions={{
          activeTintColor: "#ff0000",
        }}
      >
        <Tab.Screen
          name="Left"
          component={LeftScreen}
          options={{
            tabBarLabel: "Left",
            tabBarIcon: ({ color, size }: TabBarIconProps) => (
              <MaterialCommunityIcons name="home" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="Right"
          component={RightNavigator}
          options={{
            tabBarLabel: "Right",
            tabBarIcon: ({ color, size }: TabBarIconProps) => (
              <MaterialCommunityIcons name="home" color={color} size={size} />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  )
}
