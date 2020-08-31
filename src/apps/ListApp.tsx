import React from "react"
import { Text, View, Button, StyleSheet, ScrollView } from "react-native"
import { NavigationContainer } from "@react-navigation/native"
import { createStackNavigator } from "@react-navigation/stack"
import { ScreenProps } from "src/type"

import { FontScreen } from "src/screens/FontScreen"
import { FlexScreen } from "src/screens/FlexScreen"
import { ImageScreen } from "src/screens/ImageScreen"
import { ModalScreen } from "src/screens/ModalScreen"
import { UnmountScreen } from "src/screens/UnmountScreen"
import { SwipeRowScreen } from "src/screens/SwipeRowScreen"
import { FlatListScreen } from "src/screens/FlatListScreen"
import { SwipeListScreen } from "src/screens/SwipeListScreen"
import { PressableScreen } from "src/screens/PressableScreen"
import { ConstantsScreen } from "src/screens/ConstantsScreen"
import { TextInputScreen } from "src/screens/TextInputScreen"
import { SectionListScreen } from "src/screens/SectionListScreen"
import { SwipeAnimatedScreen } from "src/screens/SwipeAnimatedScreen"
import { AnimatedHelloScreen } from "src/screens/AnimatedHelloScreen"
import { HelloElementsScreen } from "src/screens/HelloElementsScreen"
import { SwipeListEditScreen } from "src/screens/SwipeListEditScreen"
import { AnimatedButtonScreen } from "src/screens/AnimatedButtonScreen"
import { SwipeRowSectionScreen } from "src/screens/SwipeRowSectionScreen"
import { SwipeListSectionScreen } from "src/screens/SwipeListSectionScreen"

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
  map.set("FontScreen", <FontScreen />)
  map.set("FlexScreen", <FlexScreen />)
  map.set("ImageScreen", <ImageScreen />)
  map.set("ModalScreen", <ModalScreen />)
  map.set("UnmountScreen", <UnmountScreen />)
  map.set("SwipeRowScreen", <SwipeRowScreen />)
  map.set("FlatListScreen", <FlatListScreen />)
  map.set("SwipeListScreen", <SwipeListScreen />)
  map.set("PressableScreen", <PressableScreen />)
  map.set("ConstantsScreen", <ConstantsScreen />)
  map.set("TextInputScreen", <TextInputScreen />)
  map.set("SectionListScreen", <SectionListScreen />)
  map.set("SwipeAnimatedScreen", <SwipeAnimatedScreen />)
  map.set("AnimatedHelloScreen", <AnimatedHelloScreen />)
  map.set("HelloElementsScreen", <HelloElementsScreen />)
  map.set("SwipeListEditScreen", <SwipeListEditScreen />)
  map.set("AnimatedButtonScreen", <AnimatedButtonScreen />)
  map.set("SwipeRowSectionScreen", <SwipeRowSectionScreen />)
  map.set("SwipeListSectionScreen", <SwipeListSectionScreen />)
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
