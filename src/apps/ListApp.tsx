import React from "react"
import { Text, View, Button, StyleSheet, ScrollView } from "react-native"
import { NavigationContainer } from "@react-navigation/native"
import { createStackNavigator } from "@react-navigation/stack"
import { ScreenProps } from "src/type"

import { SwipeRowScreen } from "src/screens/list/SwipeRowScreen"
import { FlatListScreen } from "src/screens/list/FlatListScreen"
import { SwipeListScreen } from "src/screens/list/SwipeListScreen"
import { SectionListScreen } from "src/screens/list/SectionListScreen"
import { SwipeAnimatedScreen } from "src/screens/list/SwipeAnimatedScreen"
import { SwipeListEditScreen } from "src/screens/list/SwipeListEditScreen"
import { SwipeRowSectionScreen } from "src/screens/list/SwipeRowSectionScreen"
import { SwipeListSectionScreen } from "src/screens/list/SwipeListSectionScreen"

import { FontScreen } from "src/screens/other/FontScreen"
import { FlexScreen } from "src/screens/other/FlexScreen"
import { ImageScreen } from "src/screens/other/ImageScreen"
import { ModalScreen } from "src/screens/other/ModalScreen"
import { UnmountScreen } from "src/screens/other/UnmountScreen"
import { PressableScreen } from "src/screens/other/PressableScreen"
import { ConstantsScreen } from "src/screens/other/ConstantsScreen"
import { TextInputScreen } from "src/screens/other/TextInputScreen"
import { AnimatedUseScreen } from "src/screens/other/AnimatedUseScreen"
import { AnimatedHelloScreen } from "src/screens/other/AnimatedHelloScreen"
import { HelloElementsScreen } from "src/screens/other/HelloElementsScreen"
import { AnimatedButtonScreen } from "src/screens/other/AnimatedButtonScreen"

const styles = StyleSheet.create({
  item: {
    margin: 4,
  },
  scrollView: {
    backgroundColor: "white",
  },
})

const screenMap = () => {
  const map = new Map<string, JSX.Element>()
  map.set("SwipeRowScreen", <SwipeRowScreen />)
  map.set("FlatListScreen", <FlatListScreen />)
  map.set("SwipeListScreen", <SwipeListScreen />)
  map.set("SectionListScreen", <SectionListScreen />)
  map.set("SwipeAnimatedScreen", <SwipeAnimatedScreen />)
  map.set("SwipeListEditScreen", <SwipeListEditScreen />)
  map.set("SwipeRowSectionScreen", <SwipeRowSectionScreen />)
  map.set("SwipeListSectionScreen", <SwipeListSectionScreen />)
  map.set("FontScreen", <FontScreen />)
  map.set("FlexScreen", <FlexScreen />)
  map.set("ImageScreen", <ImageScreen />)
  map.set("ModalScreen", <ModalScreen />)
  map.set("UnmountScreen", <UnmountScreen />)
  map.set("PressableScreen", <PressableScreen />)
  map.set("ConstantsScreen", <ConstantsScreen />)
  map.set("TextInputScreen", <TextInputScreen />)
  map.set("AnimatedUseScreen", <AnimatedUseScreen />)
  map.set("AnimatedHelloScreen", <AnimatedHelloScreen />)
  map.set("HelloElementsScreen", <HelloElementsScreen />)
  map.set("AnimatedButtonScreen", <AnimatedButtonScreen />)
  return map
}

const DetailScreen: React.FC<ScreenProps> = ({ route }: ScreenProps) => {
  const { screenName } = route.params || { screenName: "ImageScreen" }

  const element = screenMap().get(screenName)
  if (element) {
    return element
  }
  return <Text>スクリーンが見つかりません</Text>
}

const ListScreen: React.FC<ScreenProps> = ({ navigation }: ScreenProps) => {
  const screenNames = Array.from(screenMap().keys())
  const lis = screenNames.map((screenName) => (
    <View style={styles.item} key={screenName}>
      <Button
        title={screenName}
        onPress={() =>
          navigation.navigate("Detail", {
            screenName,
          })
        }
      />
    </View>
  ))
  return <ScrollView style={styles.scrollView}>{lis}</ScrollView>
}

const Stack = createStackNavigator()

export const ListApp: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="List" component={ListScreen} />
        <Stack.Screen name="Detail" component={DetailScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
