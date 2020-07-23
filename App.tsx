import React from "react"
import { TabApp } from "src/apps/TabApp"
import { ListApp } from "src/apps/ListApp"
import { ModalApp } from "src/apps/ModalApp"
import { NavigationApp } from "src/apps/NavigationApp"
import { NavigationModalApp } from "src/apps/NavigationModalApp"

const App = (): JSX.Element => {
  return (
    <>
      <TabApp />
      {/* <ListApp /> */}
      {/* <ModalApp /> */}
      {/* <NavigationApp /> */}
      {/* <NavigationModalApp /> */}
    </>
  )
}

// eslint-disable-next-line import/no-default-export
export default App
