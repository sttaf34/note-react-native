import React from "react"
import { Text, View, Button, StyleSheet, ScrollView } from "react-native"
import { NavigationContainer } from "@react-navigation/native"
import { createStackNavigator } from "@react-navigation/stack"
import { ScreenProps } from "src/type"

import { ImageScreen } from "src/screens/ImageScreen"

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

const screenNames = ["ImageScreen", "screenB"]

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

const DetailScreen: React.FC<ScreenProps> = ({ route }: ScreenProps) => {
  const { screenName } = route.params || { screenName: "" }
  switch (screenName) {
    case "ImageScreen":
      return <ImageScreen />
    default:
      return <Text style={styles.textInScreen}>スクリーンが見つかりません</Text>
  }
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
