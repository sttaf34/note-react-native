import React from "react"
import { View, ScrollView } from "react-native"
import {
  StackNavigationProp,
  createStackNavigator,
} from "@react-navigation/stack"
import {
  useRoute,
  RouteProp,
  useNavigation,
  NavigationContainer,
} from "@react-navigation/native"

import { Cell } from "src/components/Cell"
import { Line } from "src/components/Line"

import { SwipeRowScreen } from "src/screens/list/SwipeRowScreen"
import { FlatListScreen } from "src/screens/list/FlatListScreen"
import { SwipeListScreen } from "src/screens/list/SwipeListScreen"
import { SectionListScreen } from "src/screens/list/SectionListScreen"
import { SwipeListRefScreen } from "src/screens/list/SwipeListRefScreen"
import { SwipeAnimatedScreen } from "src/screens/list/SwipeAnimatedScreen"
import { SwipeListEditScreen } from "src/screens/list/SwipeListEditScreen"
import { FlatListContextScreen } from "src/screens/list/FlatListContextScreen"
import { SwipeRowSectionScreen } from "src/screens/list/SwipeRowSectionScreen"
import { SwipeListSectionScreen } from "src/screens/list/SwipeListSectionScreen"
import { FlatListAnimatedScreen } from "src/screens/list/FlatListAnimatedScreen"
import { FlatListDraggableScreen } from "src/screens/list/FlatListDraggableScreen"
import { FlatListPerformanceScreen } from "src/screens/list/FlatListPerformanceScreen"
import { FlatListInfiniteScrollScreen } from "src/screens/list/FlatListInfiniteScrollScreen"

import { FontScreen } from "src/screens/other/FontScreen"
import { FlexScreen } from "src/screens/other/FlexScreen"
import { AlertScreen } from "src/screens/other/AlertScreen"
import { GraphScreen } from "src/screens/other/GraphScreen"
import { ImageScreen } from "src/screens/other/ImageScreen"
import { ModalScreen } from "src/screens/other/ModalScreen"
import { CenterScreen } from "src/screens/other/CenterScreen"
import { PickerScreen } from "src/screens/other/PickerScreen"
import { SqliteScreen } from "src/screens/other/SQLiteScreen"
import { UnmountScreen } from "src/screens/other/UnmountScreen"
import { StorageScreen } from "src/screens/other/StorageScreen"
import { KeyboardScreen } from "src/screens/other/KeyboardScreen"
import { FirestoreScreen } from "src/screens/other/FirestoreScreen"
import { ViewCountScreen } from "src/screens/other/ViewCountScreen"
import { ConstantsScreen } from "src/screens/other/ConstantsScreen"
import { TextInputScreen } from "src/screens/other/TextInputScreen"
import { AnimatableScreen } from "src/screens/other/AnimatableScreen"
import { AnimatedUseScreen } from "src/screens/other/AnimatedUseScreen"
import { AsyncStorageScreen } from "src/screens/other/AsyncStorageScreen"
import { AnimatedHelloScreen } from "src/screens/other/AnimatedHelloScreen"
import { HelloElementsScreen } from "src/screens/other/HelloElementsScreen"
import { SqliteDatetimeScreen } from "src/screens/other/SQLiteDatetimeScreen"
import { AnimatedButtonScreen } from "src/screens/other/AnimatedButtonScreen"
import { DateTimePickerScreen } from "src/screens/other/DateTimePickerScreen"
import { TextBlockInlineScreen } from "src/screens/other/TextBlockInlineScreen"
import { HeavySlowScreen, HeavyFastScreen } from "src/screens/other/HeavyScreen"
import { NavigationOptionScreen } from "src/screens/other/NavigationOptionScreen"
import { AnimatedScaleAnchorScreen } from "src/screens/other/AnimatedScaleAnchorScreen"

const screenFunctions = [
  <SwipeRowScreen />,
  <FlatListScreen />,
  <SwipeListScreen />,
  <SectionListScreen />,
  <SwipeListRefScreen />,
  <SwipeAnimatedScreen />,
  <SwipeListEditScreen />,
  <FlatListContextScreen />,
  <SwipeRowSectionScreen />,
  <SwipeListSectionScreen />,
  <FlatListAnimatedScreen />,
  <FlatListDraggableScreen />,
  <FlatListPerformanceScreen />,
  <FlatListInfiniteScrollScreen />,
  <FontScreen />,
  <FlexScreen />,
  <AlertScreen />,
  <GraphScreen />,
  <ImageScreen />,
  <ModalScreen />,
  <CenterScreen />,
  <PickerScreen />,
  <SqliteScreen />,
  <UnmountScreen />,
  <StorageScreen />,
  <KeyboardScreen />,
  <FirestoreScreen />,
  <ViewCountScreen />,
  <ConstantsScreen />,
  <TextInputScreen />,
  <AnimatableScreen />,
  <AnimatedUseScreen />,
  <AsyncStorageScreen />,
  <AnimatedHelloScreen />,
  <HelloElementsScreen />,
  <SqliteDatetimeScreen />,
  <AnimatedButtonScreen />,
  <DateTimePickerScreen />,
  <TextBlockInlineScreen />,
  <HeavySlowScreen />,
  <HeavyFastScreen />,
  <NavigationOptionScreen />,
  <AnimatedScaleAnchorScreen />,
]

//
// #region Navigation
//

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

// #endregion Navigation

//
// #region Screen
//

const ListScreen: React.FC = () => {
  const { navigate } = useNavigation<DetailScreenNavigationProp>()
  const screenNames: string[] = screenFunctions.map(
    (aFunction) => aFunction.type.name
  )

  const onPress = (screenName: string) => {
    navigate("Detail", { screenName })
  }

  const lis = screenNames.map((name) => (
    <View key={name}>
      <Cell
        title={name}
        onPress={() => onPress(name)}
        isRequestAnimation={false}
      />
      <Line />
    </View>
  ))

  return <ScrollView>{lis}</ScrollView>
}

const DetailScreen: React.FC = () => {
  const { params } = useRoute<DetailScreenRouteProp>()
  const screen = screenFunctions.find((aFunction) => {
    return params.screenName === aFunction.type.name
  })
  return screen || <></>
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

// #endregion Screen
