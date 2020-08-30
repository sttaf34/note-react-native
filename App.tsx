/* eslint-disable @typescript-eslint/no-unused-vars */

import React from "react"
import { TabApp } from "src/apps/TabApp"
import { ListApp } from "src/apps/ListApp"
import { NavigationApp } from "src/apps/NavigationApp"
import { NavigationModalApp } from "src/apps/NavigationModalApp"
import { TypedNavigationApp } from "src/apps/TypedNavigationApp"
import { TypedUseNavigationApp } from "src/apps/TypedUseNavigationApp"
import { NavigationPassValueApp } from "src/apps/NavigationPassValueApp"

const App = (): JSX.Element => {
  return (
    <>
      {/* <TabApp /> */}
      <ListApp />
      {/* <NavigationApp /> */}
      {/* <NavigationModalApp /> */}
      {/* <TypedNavigationApp /> */}
      {/* <TypedUseNavigationApp /> */}
      {/* <NavigationPassValueApp /> */}
    </>
  )
}

// eslint-disable-next-line import/no-default-export
export default App
