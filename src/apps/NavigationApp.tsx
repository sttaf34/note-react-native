import React from "react"
import { SafeAreaView } from "react-native"
import { NavigationContainer } from "@react-navigation/native"
import { createStackNavigator } from "@react-navigation/stack"

import { baseStyles } from "src/constants/baseStyles"
import { StyledText } from "src/components/StyledText"
import { ScreenProps } from "src/constants/navigationType"
import { StyledButton } from "src/components/StyledButton"
import { NavigationButton } from "src/components/NavigationButton"

const Stack = createStackNavigator()

const HelloScreen: React.FC<ScreenProps> = ({ navigation }: ScreenProps) => {
  const onPress = () => {
    navigation.navigate("Goodbye", { id: 777 })
  }
  return (
    <SafeAreaView style={baseStyles.safeAreaView}>
      <StyledText text="Hello" />
      <StyledButton title="Next" onPress={onPress} />
    </SafeAreaView>
  )
}

const GoodbyeScreen: React.FC<ScreenProps> = ({
  navigation,
  route,
}: ScreenProps) => {
  // 「遷移元」からの値の受け取り
  const { id } = route.params || { id: 0 }

  // 右上のボタン
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <NavigationButton title="Button" onPress={() => console.log("AAA")} />
      ),
    })
  }, [navigation])

  return (
    <SafeAreaView style={baseStyles.safeAreaView}>
      <StyledText text={id} />
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
