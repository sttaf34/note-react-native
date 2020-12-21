import React from "react"
import { useFocusEffect, useNavigation } from "@react-navigation/native"

export const NavigationOptionScreen: React.FC = () => {
  const navigation = useNavigation()

  // タイトル部分にデフォルトの文字列 "Detail" が一瞬表示されるときがある
  // されないときもある
  useFocusEffect(() => {
    navigation.setOptions({
      title: "",
      headerBackTitle: "戻る！",
    })
  })

  // 遷移開始が一瞬遅れるが、
  // タイトル部分にデフォルトの文字列 "Detail" が一瞬でも表示されない
  // React.useLayoutEffect(() => {
  //   navigation.setOptions({
  //     title: "",
  //     headerBackTitle: "戻る！",
  //   })
  // })

  return <></>
}
