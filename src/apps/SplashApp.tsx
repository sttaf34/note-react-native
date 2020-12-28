import React from "react"
import { hideAsync, preventAutoHideAsync } from "expo-splash-screen"

import { sleep } from "src/others/usefulFunctions"
import { StyledText } from "src/components/StyledText"
import { StyledSafeAreaView } from "src/components/StyledSafeAreaView"

export const SplashApp: React.FC = () => {
  const [isReady, setIsReady] = React.useState(false)

  const prepare = () => {
    sleep(2000).then(() => {
      setIsReady(true)
      hideAsync()
    })
  }

  React.useEffect(() => {
    const prevent = async () => {
      await preventAutoHideAsync()
    }
    prevent()
    prepare()
  }, [])

  if (isReady === false) {
    return null
  }

  return (
    <StyledSafeAreaView>
      <StyledText text="準備完了！" />
    </StyledSafeAreaView>
  )
}
