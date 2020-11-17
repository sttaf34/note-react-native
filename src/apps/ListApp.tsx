import React from "react"
import { Text, View, Button, StyleSheet, ScrollView } from "react-native"
import {
  useRoute,
  RouteProp,
  useNavigation,
  NavigationContainer,
} from "@react-navigation/native"
import {
  StackNavigationProp,
  createStackNavigator,
} from "@react-navigation/stack"

import { SwipeRowScreen } from "src/screens/list/SwipeRowScreen"
import { FlatListScreen } from "src/screens/list/FlatListScreen"
import { SwipeListScreen } from "src/screens/list/SwipeListScreen"
import { SectionListScreen } from "src/screens/list/SectionListScreen"
import { SwipeAnimatedScreen } from "src/screens/list/SwipeAnimatedScreen"
import { SwipeListEditScreen } from "src/screens/list/SwipeListEditScreen"
import { FlatListContextScreen } from "src/screens/list/FlatListContextScreen"
import { SwipeRowSectionScreen } from "src/screens/list/SwipeRowSectionScreen"
import { SwipeListSectionScreen } from "src/screens/list/SwipeListSectionScreen"
import { FlatListAnimatedScreen } from "src/screens/list/FlatListAnimatedScreen"

import { FontScreen } from "src/screens/other/FontScreen"
import { TextScreen } from "src/screens/other/TextScreen"
import { FlexScreen } from "src/screens/other/FlexScreen"
import { ImageScreen } from "src/screens/other/ImageScreen"
import { ModalScreen } from "src/screens/other/ModalScreen"
import { UnmountScreen } from "src/screens/other/UnmountScreen"
import { FirestoreScreen } from "src/screens/other/FirestoreScreen"
import { PressableScreen } from "src/screens/other/PressableScreen"
import { ConstantsScreen } from "src/screens/other/ConstantsScreen"
import { TextInputScreen } from "src/screens/other/TextInputScreen"
import { AnimatedUseScreen } from "src/screens/other/AnimatedUseScreen"
import { AsyncStorageScreen } from "src/screens/other/AsyncStorageScreen"
import { AnimatedHelloScreen } from "src/screens/other/AnimatedHelloScreen"
import { HelloElementsScreen } from "src/screens/other/HelloElementsScreen"
import { AnimatedButtonScreen } from "src/screens/other/AnimatedButtonScreen"
import { ReactNativeModalScreen } from "src/screens/other/ReactNativeModalScreen"
import { AnimatedScaleAnchorScreen } from "src/screens/other/AnimatedScaleAnchorScreen"

const screenMap = () => {
  const map = new Map<string, JSX.Element>()
  map.set("SwipeRowScreen", <SwipeRowScreen />)
  map.set("FlatListScreen", <FlatListScreen />)
  map.set("FirestoreScreen", <FirestoreScreen />)
  map.set("SwipeListScreen", <SwipeListScreen />)
  map.set("SectionListScreen", <SectionListScreen />)
  map.set("SwipeAnimatedScreen", <SwipeAnimatedScreen />)
  map.set("SwipeListEditScreen", <SwipeListEditScreen />)
  map.set("FlatListContextScreen", <FlatListContextScreen />)
  map.set("SwipeRowSectionScreen", <SwipeRowSectionScreen />)
  map.set("SwipeListSectionScreen", <SwipeListSectionScreen />)
  map.set("FlatListAnimatedScreen", <FlatListAnimatedScreen />)
  map.set("FontScreen", <FontScreen />)
  map.set("TextScreen", <TextScreen />)
  map.set("FlexScreen", <FlexScreen />)
  map.set("ImageScreen", <ImageScreen />)
  map.set("ModalScreen", <ModalScreen />)
  map.set("UnmountScreen", <UnmountScreen />)
  map.set("PressableScreen", <PressableScreen />)
  map.set("ConstantsScreen", <ConstantsScreen />)
  map.set("TextInputScreen", <TextInputScreen />)
  map.set("AnimatedUseScreen", <AnimatedUseScreen />)
  map.set("AsyncStorageScreen", <AsyncStorageScreen />)
  map.set("AnimatedHelloScreen", <AnimatedHelloScreen />)
  map.set("HelloElementsScreen", <HelloElementsScreen />)
  map.set("AnimatedButtonScreen", <AnimatedButtonScreen />)
  map.set("ReactNativeModalScreen", <ReactNativeModalScreen />)
  map.set("AnimatedScaleAnchorScreen", <AnimatedScaleAnchorScreen />)
  return map
}

type StackParamList = {
  List: undefined
  Detail: { screenName: string }
}

const Stack = createStackNavigator<StackParamList>()

export type DetailScreenNavigationProp = StackNavigationProp<
  StackParamList,
  "Detail"
>
type DetailScreenRouteProp = RouteProp<StackParamList, "Detail">

const ListScreen: React.FC = () => {
  const styles = StyleSheet.create({
    item: {
      margin: 4,
    },
  })

  const { navigate } = useNavigation<DetailScreenNavigationProp>()
  const screenNames = Array.from(screenMap().keys())
  const lis = screenNames.map((screenName) => (
    <View style={styles.item} key={screenName}>
      <Button
        title={screenName}
        onPress={() =>
          navigate("Detail", {
            screenName,
          })
        }
      />
    </View>
  ))
  return <ScrollView>{lis}</ScrollView>
}

const DetailScreen: React.FC = () => {
  const { params } = useRoute<DetailScreenRouteProp>()
  const element = screenMap().get(params.screenName)
  return element || <Text>スクリーンが見つかりません</Text>
}

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
