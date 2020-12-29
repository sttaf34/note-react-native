import React from "react"
import { SocialIcon } from "react-native-elements"
import * as Animatable from "react-native-animatable"

import { StyledText } from "src/components/StyledText"
import { StyledButton } from "src/components/StyledButton"
import { MarginDivider } from "src/components/MarginDivider"

type FadeViewProps = {
  isVisible: boolean
}

// 画面全体が再レンダーされた時、
// fadeIn になっているものが再度フェードインのアニメーションすると思いきや、
// そうはならないようになっている
// const MemoFadeView = React.memo(FadeView) する必要ない
const FadeView: React.FC<FadeViewProps> = (props: FadeViewProps) => {
  const { isVisible } = props
  const animation = isVisible ? "fadeIn" : "fadeOut"
  return (
    <Animatable.View animation={animation}>
      <SocialIcon type="youtube" />
    </Animatable.View>
  )
}

const FlipView: React.FC<FadeViewProps> = (props: FadeViewProps) => {
  const { isVisible } = props
  const animation = isVisible ? "flipInX" : "flipOutX"
  return (
    <Animatable.View animation={animation}>
      <SocialIcon button type="youtube" />
    </Animatable.View>
  )
}

export const AnimatableScreen: React.FC = () => {
  const [isVisibleA, setIsVisibleA] = React.useState(true)
  const [isVisibleB, setIsVisibleB] = React.useState(true)
  const [isVisibleC, setIsVisibleC] = React.useState(true)

  console.log("AnimatableScreen")

  return (
    <>
      <StyledButton
        title="CHANGE VISIBLE"
        onPress={() => setIsVisibleA((isVisible) => !isVisible)}
      />
      <StyledText text={String(isVisibleA)} />
      <FadeView isVisible={isVisibleA} />

      <MarginDivider />

      <StyledButton
        title="CHANGE VISIBLE"
        onPress={() => setIsVisibleB((isVisible) => !isVisible)}
      />
      <StyledText text={String(isVisibleB)} />
      <FadeView isVisible={isVisibleB} />

      <MarginDivider />

      <StyledButton
        title="CHANGE VISIBLE"
        onPress={() => setIsVisibleC((isVisible) => !isVisible)}
      />
      <StyledText text={String(isVisibleC)} />
      <FlipView isVisible={isVisibleC} />
    </>
  )
}
