import React from "react"
import { Button, SocialIcon } from "react-native-elements"

import { StyledText } from "src/components/StyledText"
import { MarginDivider } from "src/components/MarginDivider"

export const HeavyComponent: React.FC = () => {
  return (
    <>
      <StyledText text="AAA" />
      <StyledText text="BBB" />
      <MarginDivider />
      <Button title="ボタン" type="solid" />
      <Button title="CLEAR" type="clear" />
      <Button title="OUTLINE" type="outline" />
      <MarginDivider />
      <SocialIcon type="twitter" />
      <SocialIcon light type="medium" />
      <SocialIcon raised={false} type="gitlab" />
      <SocialIcon button light type="instagram" />
      <SocialIcon button type="google" />
      <SocialIcon type="quora" />
      <SocialIcon type="github" />
      <SocialIcon type="youtube" />
    </>
  )
}
