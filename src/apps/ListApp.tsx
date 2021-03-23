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

import { AnimatableScreen } from "src/screens/animation/AnimatableScreen"
import { AnimatedUseScreen } from "src/screens/animation/AnimatedUseScreen"
import { AnimatedHelloScreen } from "src/screens/animation/AnimatedHelloScreen"
import { AnimatedButtonScreen } from "src/screens/animation/AnimatedButtonScreen"
import { AnimatedScaleAnchorScreen } from "src/screens/animation/AnimatedScaleAnchorScreen"

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
import { SwipeListDeleteRowScreen } from "src/screens/list/SwipeListDeleteRowScreen"
import { FlatListPerformanceScreen } from "src/screens/list/FlatListPerformanceScreen"
import { SwipeAnimatedSectionScreen } from "src/screens/list/SwipeAnimatedSectionScreen"
import { FlatListInfiniteScrollScreen } from "src/screens/list/FlatListInfiniteScrollScreen"

import { FontScreen } from "src/screens/other/FontScreen"
import { FlexScreen } from "src/screens/other/FlexScreen"
import { AlertScreen } from "src/screens/other/AlertScreen"
import { ToastScreen } from "src/screens/other/ToastScreen"
import { GraphScreen } from "src/screens/other/GraphScreen"
import { ImageScreen } from "src/screens/other/ImageScreen"
import { ModalScreen } from "src/screens/other/ModalScreen"
import { OAuthScreen } from "src/screens/other/OAuthScreen"
import { CenterScreen } from "src/screens/other/CenterScreen"
import { PickerScreen } from "src/screens/other/PickerScreen"
import { SqliteScreen } from "src/screens/other/SQLiteScreen"
import { CaptureScreen } from "src/screens/other/CaptureScreen"
import { UnmountScreen } from "src/screens/other/UnmountScreen"
import { StorageScreen } from "src/screens/other/StorageScreen"
import { KeyboardScreen } from "src/screens/other/KeyboardScreen"
import { FirestoreScreen } from "src/screens/other/FirestoreScreen"
import { ViewCountScreen } from "src/screens/other/ViewCountScreen"
import { ConstantsScreen } from "src/screens/other/ConstantsScreen"
import { TextInputScreen } from "src/screens/other/TextInputScreen"
import { ShareFileScreen } from "src/screens/other/ShareFileScreen"
import { GoogleDriveScreen } from "src/screens/other/GoogleDriveScreen"
import { AsyncStorageScreen } from "src/screens/other/AsyncStorageScreen"
import { FileDownloadScreen } from "src/screens/other/FileDownloadScreen"
import { NetworkStateScreen } from "src/screens/other/NetworkStatusScreen"
import { HelloElementsScreen } from "src/screens/other/HelloElementsScreen"
import { SqliteDatetimeScreen } from "src/screens/other/SQLiteDatetimeScreen"
import { DateTimePickerScreen } from "src/screens/other/DateTimePickerScreen"
import { TextBlockInlineScreen } from "src/screens/other/TextBlockInlineScreen"
import { HeavySlowScreen, HeavyFastScreen } from "src/screens/other/HeavyScreen"
import { HelloButtonGroupScreen } from "src/screens/other/HelloButtonGroupScreen"
import { GenericComponentScreen } from "src/screens/other/GenericComponentScreen"
import { NavigationOptionScreen } from "src/screens/other/NavigationOptionScreen"
import { SmoothButtonGroupScreen } from "src/screens/other/SmoothButtonGroupScreen"
import { SqliteTransactionScreen } from "src/screens/other/SQLiteTransactionScreen"
import { SqliteBeginCommitScreen } from "src/screens/other/SQLiteBeginCommitScreen"

const screenFunctions = [
  <AnimatableScreen />,
  <AnimatedUseScreen />,
  <AnimatedHelloScreen />,
  <AnimatedButtonScreen />,
  <AnimatedScaleAnchorScreen />,

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
  <SwipeListDeleteRowScreen />,
  <FlatListPerformanceScreen />,
  <SwipeAnimatedSectionScreen />,
  <FlatListInfiniteScrollScreen />,
  <FontScreen />,
  <FlexScreen />,
  <AlertScreen />,
  <ToastScreen />,
  <GraphScreen />,
  <ImageScreen />,
  <ModalScreen />,
  <OAuthScreen />,
  <CenterScreen />,
  <PickerScreen />,
  <SqliteScreen />,
  <CaptureScreen />,
  <UnmountScreen />,
  <StorageScreen />,
  <KeyboardScreen />,
  <FirestoreScreen />,
  <ViewCountScreen />,
  <ConstantsScreen />,
  <TextInputScreen />,
  <ShareFileScreen />,
  <GoogleDriveScreen />,
  <AsyncStorageScreen />,
  <FileDownloadScreen />,
  <NetworkStateScreen />,
  <HelloElementsScreen />,
  <SqliteDatetimeScreen />,
  <DateTimePickerScreen />,
  <TextBlockInlineScreen />,
  <HeavySlowScreen />,
  <HeavyFastScreen />,
  <HelloButtonGroupScreen />,
  <GenericComponentScreen />,
  <NavigationOptionScreen />,
  <SmoothButtonGroupScreen />,
  <SqliteTransactionScreen />,
  <SqliteBeginCommitScreen />,
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
