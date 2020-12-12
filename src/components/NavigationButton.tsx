import React from "react"
import { Button } from "react-native-elements"

type Props = {
  title: string
  onPress: () => void
}

export const NavigationButton: React.FC<Props> = (props: Props) => {
  const { title, onPress } = props
  return <Button type="clear" title={title} onPress={onPress} />
}
