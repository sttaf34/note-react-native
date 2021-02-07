import React, { PropsWithChildren } from "react"

import { StyledText } from "src/components/StyledText"

type Props<T> = {
  value: T
}

const GenericComponent = <T,>(props: PropsWithChildren<Props<T>>) => {
  const { value } = props
  console.log(value)
  return (
    <>
      <StyledText text="Component" />
    </>
  )
}

export const GenericComponentScreen: React.FC = () => {
  return (
    <>
      <GenericComponent value="ABCDEFG" />
    </>
  )
}
