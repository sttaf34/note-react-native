import React from "react"
import { Text, StatusBar, SafeAreaView, StyleSheet } from "react-native"
import { NavigationContainer } from "@react-navigation/native"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { MaterialCommunityIcons } from "@expo/vector-icons"
import { TabRightScreen } from "src/screens/TabRightScreen"

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
  },
  textInScreen: {
    margin: 12,
  },
})

const LeftScreen: React.FC = () => {
  return (
    <SafeAreaView style={styles.safeAreaView}>
      <StatusBar hidden={false} />
      <Text style={styles.textInScreen}>Left Left</Text>
    </SafeAreaView>
  )
}

const Tab = createBottomTabNavigator()

type TabBarIconProps = {
  focused: boolean
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
          component={TabRightScreen}
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
