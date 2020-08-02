import React from "react"
import { View, Text, StyleSheet } from "react-native"

const styles = StyleSheet.create({
  container: {
    // 全体を確保みたいな感じ
    // SafeAreaView で指定してたりする
    flex: 1,
    backgroundColor: "green",
  },
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

export const FlexScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <View style={styles.left}>
          <Text />
        </View>
        <View style={styles.right}>
          <Text>あいうえおかきくけこ</Text>
        </View>
      </View>
    </View>
  )
}
