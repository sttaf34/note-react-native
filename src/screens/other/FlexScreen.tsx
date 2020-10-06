import React from "react"
import { View, Text, StyleSheet } from "react-native"

const Hello: React.FC = () => {
  const styles = StyleSheet.create({
    row: {
      height: "20%",
      flexDirection: "row",
      backgroundColor: "white",
    },
    left: {
      width: "20%",
      height: "100%",
      backgroundColor: "#eeeeee",
    },
    right: {
      width: "80%",
      height: "100%",
      padding: 8,
      backgroundColor: "#dddddd",
    },
  })
  return (
    <View style={styles.row}>
      <View style={styles.left}>
        <Text />
      </View>
      <View style={styles.right}>
        <Text>
          あいうえおかきくけこさしすせそあいうえおかきくけこさしすせそあいうえおかきくけこさしすせそ
        </Text>
      </View>
    </View>
  )
}

const FixedFluidRow: React.FC = () => {
  // 左右をピクセル指定、中を残り全部にするように指定
  const styles = StyleSheet.create({
    row: {
      height: "20%",
      flexDirection: "row",
      backgroundColor: "white",
    },
    left: {
      width: 120,
      height: "100%",
      backgroundColor: "#eeeeee",
    },
    center: {
      flex: 1,
      height: "100%",
      padding: 8,
      backgroundColor: "#dddddd",
    },
    right: {
      width: 10,
      height: "100%",
      backgroundColor: "#cccccc",
    },
  })
  return (
    <View style={styles.row}>
      <View style={styles.left}>
        <Text />
      </View>
      <View style={styles.center}>
        <Text>
          あいうえおかきくけこさしすせそあいうえおかきくけこさしすせそあいうえおかきくけこさしすせそ
        </Text>
      </View>
      <View style={styles.right}>
        <Text />
      </View>
    </View>
  )
}

const FixedFluidColumn: React.FC = () => {
  // 上下をピクセル指定、中を残り全部にするように指定
  const styles = StyleSheet.create({
    column: {
      height: "100%",
      width: "20%",
      flexDirection: "column",
      backgroundColor: "white",
    },
    top: {
      width: "100%",
      height: 40,
      backgroundColor: "#eeeeee",
    },
    center: {
      flex: 1,
      height: "100%",
      padding: 8,
      backgroundColor: "#dddddd",
    },
    bottom: {
      width: "100%",
      height: 40,
      backgroundColor: "#cccccc",
    },
  })
  return (
    <View style={styles.column}>
      <View style={styles.top}>
        <Text />
      </View>
      <View style={styles.center}>
        <Text>
          あいうえおかきくけこさしすせそあいうえおかきくけこさしすせそあいうえおかきくけこさしすせそ
        </Text>
      </View>
      <View style={styles.bottom}>
        <Text />
      </View>
    </View>
  )
}

export const FlexScreen: React.FC = () => {
  const styles = StyleSheet.create({
    container: {
      // 全体を確保みたいな感じ
      // SafeAreaView で指定してたりする
      flex: 1,
      backgroundColor: "green",
    },
  })

  return (
    <View style={styles.container}>
      <Hello />
      <FixedFluidRow />
      <FixedFluidColumn />
    </View>
  )
}
