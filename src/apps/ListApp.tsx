import React from "react"
import { Text, View, Button, StyleSheet, ScrollView } from "react-native"
import { NavigationContainer } from "@react-navigation/native"
import { createStackNavigator } from "@react-navigation/stack"
import { ScreenProps } from "src/type"

import { FontScreen } from "src/screens/FontScreen"
import { FlexScreen } from "src/screens/FlexScreen"
import { ImageScreen } from "src/screens/ImageScreen"
import { FlatListScreen } from "src/screens/FlatListScreen"
import { PressableScreen } from "src/screens/PressableScreen"
import { ConstantsScreen } from "src/screens/ConstantsScreen"
import { TextInputScreen } from "src/screens/TextInputScreen"
import { SectionListScreen } from "src/screens/SectionListScreen"
import { HelloElementsScreen } from "src/screens/HelloElementsScreen"

const styles = StyleSheet.create({
  item: {
    margin: 4,
  },
  scrollView: {
    backgroundColor: "white",
  },
})

const screenNames = [
  "FontScreen",
  "FlexScreen",
  "ImageScreen",
  "FlatListScreen",
  "PressableScreen",
  "ConstantsScreen",
  "TextInputScreen",
  "SectionListScreen",
  "HelloElementsScreen",
] as const
type ScreenName = typeof screenNames[number]

const DetailScreen: React.FC<ScreenProps> = ({ route }: ScreenProps) => {
  const { screenName } = route.params || { screenName: "ImageScreen" }

  const screenMap = new Map<ScreenName, JSX.Element>()
  screenMap.set("FontScreen", <FontScreen />)
  screenMap.set("FlexScreen", <FlexScreen />)
  screenMap.set("ImageScreen", <ImageScreen />)
  screenMap.set("FlatListScreen", <FlatListScreen />)
  screenMap.set("PressableScreen", <PressableScreen />)
  screenMap.set("ConstantsScreen", <ConstantsScreen />)
  screenMap.set("TextInputScreen", <TextInputScreen />)
  screenMap.set("SectionListScreen", <SectionListScreen />)
  screenMap.set("HelloElementsScreen", <HelloElementsScreen />)

  const element = screenMap.get(screenName)
  if (element) {
    return element
  }
  return <Text>スクリーンが見つかりません</Text>
}

const ListScreen: React.FC<ScreenProps> = ({ navigation }: ScreenProps) => {
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
