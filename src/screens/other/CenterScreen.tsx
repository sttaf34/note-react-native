import React from "react"
import { Text, View, StyleSheet, ScrollView } from "react-native"

const baseStyles = StyleSheet.create({
  scrollView: {
    paddingBottom: 10,
  },
  container: {
    height: 100,
    margin: 10,
    marginBottom: 0,
    borderWidth: 0.5,
  },
  view: {
    backgroundColor: "black",
    height: 50,
    width: 50,
  },
})

// View の横方向の中央配置
const ComponentA = () => {
  const styles = StyleSheet.create({
    container: {
      ...baseStyles.container,
      alignItems: "center",
    },
    view: {
      ...baseStyles.view,
    },
  })
  return (
    <View style={styles.container}>
      <View style={styles.view} />
    </View>
  )
}

// Text の横方向の中央配置
const ComponentB = () => {
  const styles = StyleSheet.create({
    container: {
      ...baseStyles.container,
    },
    text: {
      textAlign: "center",
      margin: 10,
      borderWidth: 0.5,
    },
  })
  return (
    <View style={styles.container}>
      <Text style={styles.text}>こんにちは</Text>
    </View>
  )
}

// Text の横方向の中央配置
const ComponentC = () => {
  const styles = StyleSheet.create({
    container: {
      ...baseStyles.container,
      alignItems: "center",
    },
    text: {
      margin: 10,
      borderWidth: 0.5,
    },
  })
  return (
    <View style={styles.container}>
      <Text style={styles.text}>こんにちは</Text>
    </View>
  )
}

// View の縦方向の中央配置
const ComponentD = () => {
  const styles = StyleSheet.create({
    container: {
      ...baseStyles.container,
      alignItems: "center",
      flexDirection: "row",
    },
    view: {
      ...baseStyles.view,
    },
  })
  return (
    <View style={styles.container}>
      <View style={styles.view} />
    </View>
  )
}

// Text の縦方向の中央配置
const ComponentE = () => {
  const styles = StyleSheet.create({
    container: {
      ...baseStyles.container,
      alignItems: "center",
      flexDirection: "row",
    },
    text: {
      margin: 10,
      borderWidth: 0.5,
    },
  })
  return (
    <View style={styles.container}>
      <Text style={styles.text}>こんにちは</Text>
    </View>
  )
}

// View の縦横方向の中央配置
const ComponentF = () => {
  const styles = StyleSheet.create({
    container: {
      ...baseStyles.container,
      alignItems: "center",
      flexDirection: "row",
    },
    containerInContainer: {
      alignItems: "center",
      flexDirection: "column",
      flex: 1,
      // borderWidth: 0.5,
    },
    view: {
      ...baseStyles.view,
    },
  })
  return (
    <View style={styles.container}>
      <View style={styles.containerInContainer}>
        <View style={styles.view} />
      </View>
    </View>
  )
}

// Text の縦横方向の中央配置
const ComponentG = () => {
  const styles = StyleSheet.create({
    container: {
      ...baseStyles.container,
      alignItems: "center",
      flexDirection: "row",
    },
    text: {
      flex: 1,
      textAlign: "center",
      margin: 10,
      borderWidth: 0.5,
    },
  })
  return (
    <View style={styles.container}>
      <Text style={styles.text}>こんにちは</Text>
    </View>
  )
}

export const CenterScreen: React.FC = () => {
  return (
    <ScrollView contentContainerStyle={baseStyles.scrollView}>
      <ComponentA />
      <ComponentB />
      <ComponentC />
      <ComponentD />
      <ComponentE />
      <ComponentF />
      <ComponentG />
    </ScrollView>
  )
}
