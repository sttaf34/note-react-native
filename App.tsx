/* eslint-disable @typescript-eslint/no-unused-vars */

import React from "react"

import { TabApp } from "src/apps/TabApp"
import { ListApp } from "src/apps/ListApp"
import { SplashApp } from "src/apps/SplashApp"
import { TabModalApp } from "src/apps/TabModalApp"
import { AppearanceApp } from "src/apps/AppearanceApp"
import { NavigationApp } from "src/apps/NavigationApp"
import { NavigationModalApp } from "src/apps/NavigationModalApp"
import { TypedUseNavigationApp } from "src/apps/TypedUseNavigationApp"
import { NavigationPassValueApp } from "src/apps/NavigationPassValueApp"

const App = (): JSX.Element => {
  return (
    <>
      {/* <TabApp /> */}
      <ListApp />
      {/* <SplashApp /> */}
      {/* <TabModalApp /> */}
      {/* <NavigationApp /> */}
      {/* <NavigationModalApp /> */}
      {/* <TypedUseNavigationApp /> */}
      {/* <NavigationPassValueApp /> */}
    </>
  )
}

// eslint-disable-next-line import/no-default-export
export default App
