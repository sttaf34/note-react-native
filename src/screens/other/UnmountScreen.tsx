import React from "react"
import { TextInput } from "react-native"
import { useFocusEffect } from "@react-navigation/native"

import { baseStyles } from "src/constants/baseStyles"
import { MarginText } from "src/components/MarginText"
import { MarginDiveder } from "src/components/MarginDiveder"

//
// スクリーンが消えるときに TextInput の値で何かしたい
//

type Props = {
  value: string
}

// スクリーンが消えるときだけ動作する
class UnmountHelper extends React.Component<Props> {
  public componentWillUnmount = (): void => {
    const { value } = this.props
    console.log(`componentWillUnmount => ${value}`)
  }

  public render(): JSX.Element {
    return <></>
  }
}

export const UnmountScreen: React.FC = () => {
  const [value, setValue] = React.useState("")

  // useFocusEffect でも制御できるかもだが、ちゃんと調べてない
  useFocusEffect(
    React.useCallback(() => {
      return () => console.log(`useFocusEffect => ${value}`)
    }, [value])
  )

  return (
    <>
      <TextInput
        style={baseStyles.textInput}
        value={value}
        onChangeText={(text) => setValue(text)}
      />
      <MarginText>{value}</MarginText>
      <MarginDiveder />
      <UnmountHelper value={value} />
    </>
  )
}
