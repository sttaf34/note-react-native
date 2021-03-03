import React from "react"
import { ButtonGroup } from "react-native-elements"
import { View, ScrollView, StyleSheet } from "react-native"

import { StyledText } from "src/components/StyledText"
import { HeavyComponent } from "src/components/HeavyComponent"

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  visible: {
    position: "absolute",
    top: 0,
    height: "100%",
    width: "100%",
    opacity: 0.9,
    // opacity: 1,
  },
  hidden: {
    position: "absolute",
    top: 0,
    height: "100%",
    width: "100%",
    opacity: 0.1,
    // opacity: 0,
  },
})

const LeftView: React.FC = () => {
  const texts = Array.from({ length: 10 }, (_, index) => {
    return <StyledText key={String(index)} text={String(index)} />
  })
  return <ScrollView>{texts}</ScrollView>
}

const RightView: React.FC = () => {
  return (
    <ScrollView>
      <HeavyComponent />
      <HeavyComponent />
      <HeavyComponent />
    </ScrollView>
  )
}

type ComponentProps = {
  selectedIndex: number
}

const Component: React.FC<ComponentProps> = (props: ComponentProps) => {
  const { selectedIndex } = props
  if (selectedIndex === 0) {
    return (
      <>
        <View style={styles.visible}>
          <LeftView />
        </View>
        <View style={styles.hidden} pointerEvents="none">
          <RightView />
        </View>
      </>
    )
  }
  if (selectedIndex === 1) {
    return (
      <>
        <View style={styles.hidden} pointerEvents="none">
          <LeftView />
        </View>
        <View style={styles.visible}>
          <RightView />
        </View>
      </>
    )
  }
  return <></>
}

export const SmoothButtonGroupScreen: React.FC = () => {
  const buttons = ["Left", "Right"]
  const [selectedIndex, setSelectedIndex] = React.useState(0)

  // ツリー上には残したまま、視覚的には見えなくすることで切り替える仕組み
  // 見えていない方のスクロールビューのスクロール位置もキープされる
  return (
    <>
      <ButtonGroup
        buttons={buttons}
        selectedIndex={selectedIndex}
        onPress={setSelectedIndex}
      />
      <View style={styles.container}>
        <Component selectedIndex={selectedIndex} />
      </View>
    </>
  )
}
