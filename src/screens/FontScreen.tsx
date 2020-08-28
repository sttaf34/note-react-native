import React from "react"
import { View, Text, StyleSheet } from "react-native"
import { MarginDiveder } from "src/components/MarginDiveder"

// iPhone SE      => 半角フォントと全角フォントの高さがずれる
// Android One X2 => 半角フォントと全角フォントの高さが揃う
const BorderText: React.FC = () => {
  const styles = StyleSheet.create({
    row: {
      flexDirection: "row",
    },
    border: {
      borderWidth: 0.5,
      borderColor: "black",
      marginRight: 5,
      padding: 2,
    },
  })
  return (
    <View style={styles.row}>
      <Text style={styles.border}>abg</Text>
      <Text style={styles.border}>あいう</Text>
      <Text style={styles.border}>123</Text>
      <Text style={styles.border}>abgあいう123</Text>
    </View>
  )
}

// 同じ Text の中に全角と半角が両方あれば高さが揃う
// 小細工だが、全角フォントのみの Text に半角スペースを含めれば高さが揃う
// TODO: StyleSheet で高さを揃える書き方
const Space: React.FC = () => {
  const styles = StyleSheet.create({
    row: {
      flexDirection: "row",
    },
    border: {
      borderWidth: 0.5,
      borderColor: "black",
      marginRight: 5,
    },
  })
  return (
    <View style={styles.row}>
      <Text style={styles.border}>abcdefg</Text>
      <Text style={styles.border}> あいうえお</Text>
      <Text style={styles.border}>123456</Text>
    </View>
  )
}

export const FontScreen: React.FC = () => {
  const styles = StyleSheet.create({
    container: {
      margin: 10,
    },
  })

  return (
    <View style={styles.container}>
      <MarginDiveder />
      <BorderText />
      <MarginDiveder />
      <Space />
    </View>
  )
}
