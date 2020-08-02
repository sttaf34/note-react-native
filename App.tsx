import React from "react"
import { TabApp } from "src/apps/TabApp"
import { ListApp } from "src/apps/ListApp"
import { ModalApp } from "src/apps/ModalApp"
import { NavigationApp } from "src/apps/NavigationApp"
import { NavigationModalApp } from "src/apps/NavigationModalApp"
import { TypedNavigationApp } from "src/apps/TypedNavigationApp"
import { TypedUseNavigationApp } from "src/apps/TypedUseNavigationApp"

const App = (): JSX.Element => {
  return (
    <>
      {/* <TabApp /> */}
      <ListApp />
      {/* <ModalApp /> */}
      {/* <NavigationApp /> */}
      {/* <NavigationModalApp /> */}
      {/* <TypedNavigationApp /> */}
      {/* <TypedUseNavigationApp /> */}
    </>
  )
}

// eslint-disable-next-line import/no-default-export
export default App
