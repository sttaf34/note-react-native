import React from "react"
import { Button } from "react-native"
import { useNavigation } from "@react-navigation/native"
import { DetailScreenNavigationProp } from "src/apps/ListApp"

export const useLeftButton = (
  executeFunction: () => void,
  title: string
): void => {
  const navigation = useNavigation<DetailScreenNavigationProp>()
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => <Button onPress={executeFunction} title={title} />,
    })
  }, [executeFunction, navigation, title])
}

export const useRightButton = (
  executeFunction: () => void,
  title: string
): void => {
  const navigation = useNavigation<DetailScreenNavigationProp>()
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => <Button onPress={executeFunction} title={title} />,
    })
  }, [executeFunction, navigation, title])
}
