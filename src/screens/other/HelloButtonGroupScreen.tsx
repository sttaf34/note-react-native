import React from "react"
import { ButtonGroup } from "react-native-elements"
import { ScrollView } from "react-native-gesture-handler"

import { StyledText } from "src/components/StyledText"
import { HeavyComponent } from "src/components/HeavyComponent"

type Props = {
  length: number
  isHeavy: boolean
}

const InnerScrollView: React.FC<Props> = (props: Props) => {
  const { length, isHeavy } = props
  const texts = Array.from({ length }, (_, index) => {
    return isHeavy ? (
      <HeavyComponent key={String(index)} />
    ) : (
      <StyledText key={String(index)} text={String(index)} />
    )
  })
  return <ScrollView>{texts}</ScrollView>
}

type ComponentProps = {
  selectedIndex: number
}

const Component: React.FC<ComponentProps> = (props: ComponentProps) => {
  const { selectedIndex } = props
  if (selectedIndex === 0) {
    return <></>
  }
  if (selectedIndex === 1) {
    // 表示するものが多いと、切り替えに時間がかかる
    // React.memo, useMemo は React Native だとメモ化されてないっぽい
    return <InnerScrollView length={5} isHeavy />
  }
  if (selectedIndex === 2) {
    return <InnerScrollView length={50} isHeavy={false} />
  }
  if (selectedIndex === 3) {
    return <InnerScrollView length={5} isHeavy={false} />
  }
  return <></>
}

export const HelloButtonGroupScreen: React.FC = () => {
  const buttons = ["Hello", "World", "Buttons", "!"]
  const [selectedIndex, setSelectedIndex] = React.useState(0)

  return (
    <>
      <ButtonGroup
        buttons={buttons}
        selectedIndex={selectedIndex}
        onPress={setSelectedIndex}
      />
      <Component selectedIndex={selectedIndex} />
    </>
  )
}
