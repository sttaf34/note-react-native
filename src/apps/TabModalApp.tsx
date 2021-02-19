import React from "react"
import { SafeAreaView } from "react-native"
import { MaterialCommunityIcons } from "@expo/vector-icons"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import {
  useRoute,
  RouteProp,
  NavigationContainer,
  useNavigation,
} from "@react-navigation/native"
import {
  TransitionPresets,
  StackNavigationProp,
  createStackNavigator,
} from "@react-navigation/stack"

import { ScreenProps } from "src/constants/types"
import { baseStyles } from "src/constants/baseStyles"
import { StyledText } from "src/components/StyledText"
import { StyledButton } from "src/components/StyledButton"
import { StyledSafeAreaView } from "src/components/StyledSafeAreaView"

//
// #region Tab
//

const LeftScreen: React.FC = () => {
  const navigation = useNavigation<ModalANavigationProp>()
  const onPress = () => {
    navigation.navigate("ModalA", { id: 777 })
  }
  return (
    <SafeAreaView style={baseStyles.safeAreaView}>
      <StyledText text="Left" />
      <StyledButton title="ModalA" onPress={onPress} />
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
  const navigation = useNavigation<ModalBNavigationProp>()
  const onPress = () => {
    navigation.navigate("ModalB", { message: "こんにちは！" })
  }
  return (
    <>
      <StyledText text="Goodbye" />
      <StyledButton title="ModalB" onPress={onPress} />
    </>
  )
}

const Stack = createStackNavigator()

export const RightNavigator: React.FC = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: true,
      }}
    >
      <Stack.Screen name="Hello" component={HelloScreen} />
      <Stack.Screen name="Goodbye" component={GoodbyeScreen} />
    </Stack.Navigator>
  )
}

const Tab = createBottomTabNavigator()

type TabBarIconProps = {
  color: string
  size: number
}

const TabNavigator: React.FC = () => {
  return (
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
  )
}

// #endregion Tab

//
// #region Modal
//

const ModalAScreen: React.FC = () => {
  const navigation = useNavigation()
  const route = useRoute<ModalARouteProp>()
  const { id } = route.params || { id: 0 }

  return (
    <StyledSafeAreaView>
      <StyledText text="ModalA" />
      <StyledText text={String(id)} />
      <StyledButton title="Close" onPress={() => navigation.goBack()} />
    </StyledSafeAreaView>
  )
}

const ModalBScreen: React.FC = () => {
  const navigation = useNavigation()
  const route = useRoute<ModalBRouteProp>()
  const { message } = route.params || { message: "" }

  return (
    <StyledSafeAreaView>
      <StyledText text="ModalB" />
      <StyledText text={message} />
      <StyledButton title="Close" onPress={() => navigation.goBack()} />
    </StyledSafeAreaView>
  )
}

// #endregion Modal

//
// #region Root
//

type RootStackParamList = {
  Tab: undefined
  ModalA: { id: number }
  ModalB: { message: string }
}
const RootStack = createStackNavigator<RootStackParamList>()

type ModalANavigationProp = StackNavigationProp<RootStackParamList, "ModalA">
type ModalARouteProp = RouteProp<RootStackParamList, "ModalA">
type ModalBNavigationProp = StackNavigationProp<RootStackParamList, "ModalB">
type ModalBRouteProp = RouteProp<RootStackParamList, "ModalB">

export const TabModalApp: React.FC = () => {
  // モーダル出現時にタブを隠そうとすると、この構造になる
  return (
    <NavigationContainer>
      <RootStack.Navigator
        mode="modal"
        headerMode="none"
        screenOptions={{
          // reactnavigation.org/docs/stack-navigator
          // 半端なモーダルにする設定
          ...TransitionPresets.ModalPresentationIOS,

          // github.com/software-mansion/react-native-screens/issues/361
          // 半端なモーダルを表示しているときに、
          // 後ろ側の画面の周辺の背景色を黒くする
          cardOverlayEnabled: true,
        }}
      >
        <RootStack.Screen name="Tab" component={TabNavigator} />
        <RootStack.Screen name="ModalA" component={ModalAScreen} />
        <RootStack.Screen name="ModalB" component={ModalBScreen} />
      </RootStack.Navigator>
    </NavigationContainer>
  )
}

// #endregion Root
