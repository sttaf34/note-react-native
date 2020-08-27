import React from "react"
import { Text, Button, StatusBar, SafeAreaView, StyleSheet } from "react-native"
import { NavigationContainer } from "@react-navigation/native"
import { createStackNavigator } from "@react-navigation/stack"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { MaterialCommunityIcons } from "@expo/vector-icons"
import { ScreenProps } from "src/type"

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
