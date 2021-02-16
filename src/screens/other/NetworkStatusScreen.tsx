import React from "react"
import * as Network from "expo-network"

import { StyledText } from "src/components/StyledText"
import { StyledButton } from "src/components/StyledButton"

export const NetworkStateScreen: React.FC = () => {
  const [state, setState] = React.useState<Network.NetworkState | null>(null)

  const logNetworkState = async () => {
    const newState: Network.NetworkState = await Network.getNetworkStateAsync()
    setState(newState)
  }

  return (
    <>
      <StyledButton onPress={logNetworkState} />
      <StyledText text={JSON.stringify(state)} />
    </>
  )
}
