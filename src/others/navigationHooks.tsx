import React from "react"
import { Button } from "react-native-elements"
import { useNavigation } from "@react-navigation/native"
import { DetailScreenNavigationProp } from "src/apps/ListApp"

export const useLeftButton = (
  executeFunction: () => void,
  title: string
): void => {
  const navigation = useNavigation<DetailScreenNavigationProp>()
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <Button type="clear" onPress={executeFunction} title={title} />
      ),
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
      headerRight: () => (
        <Button type="clear" onPress={executeFunction} title={title} />
      ),
    })
  }, [executeFunction, navigation, title])
}
