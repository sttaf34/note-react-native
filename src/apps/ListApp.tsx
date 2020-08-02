import React from "react"
import { Text, View, Button, StyleSheet, ScrollView } from "react-native"
import { NavigationContainer } from "@react-navigation/native"
import { createStackNavigator } from "@react-navigation/stack"
import { ScreenProps } from "src/type"

import { ImageScreen } from "src/screens/ImageScreen"
import { FlatListScreen } from "src/screens/FlatListScreen"
import { FirebaseScreen } from "src/screens/FirebaseScreen"
import { ConstantsScreen } from "src/screens/ConstantsScreen"
import { TextInputScreen } from "src/screens/TextInputScreen"
import { SectionListScreen } from "src/screens/SectionListScreen"

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
  },
  item: {
    margin: 12,
  },
  title: {
    fontSize: 32,
  },
  textInScreen: {
    margin: 12,
  },
})

const screenNames = [
  "ImageScreen",
  "FlatListScreen",
  "FirebaseScreen",
  "ConstantsScreen",
  "TextInputScreen",
  "SectionListScreen",
] as const
type ScreenName = typeof screenNames[number]

const DetailScreen: React.FC<ScreenProps> = ({ route }: ScreenProps) => {
  const { screenName } = route.params || { screenName: "ImageScreen" }

  const screenMap = new Map<ScreenName, JSX.Element>()
  screenMap.set("ImageScreen", <ImageScreen />)
  screenMap.set("FlatListScreen", <FlatListScreen />)
  screenMap.set("FirebaseScreen", <FirebaseScreen />)
  screenMap.set("ConstantsScreen", <ConstantsScreen />)
  screenMap.set("TextInputScreen", <TextInputScreen />)
  screenMap.set("SectionListScreen", <SectionListScreen />)

  const element = screenMap.get(screenName)
  if (element) {
    return element
  }
  return <Text style={styles.textInScreen}>スクリーンが見つかりません</Text>
}

const ListScreen: React.FC<ScreenProps> = ({ navigation }: ScreenProps) => {
  const lis = screenNames.map((screenName) => (
    <View style={styles.item} key={screenName}>
      <Text style={styles.title}>{screenName}</Text>
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

  return <ScrollView>{lis}</ScrollView>
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
