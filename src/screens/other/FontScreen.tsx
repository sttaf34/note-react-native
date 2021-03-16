import React from "react"
import { View, Text, StyleSheet, ScrollView } from "react-native"

import { MarginDivider } from "src/components/MarginDivider"

// iPhone SE      => 半角フォントと全角フォントの高さがずれる
// Android One X2 => 半角フォントと全角フォントの高さが揃う
const SampleA: React.FC = () => {
  const styles = StyleSheet.create({
    row: {
      flexDirection: "row",
    },
    border: {
      fontSize: 18,
      borderWidth: 0.5,
      marginRight: 5,
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
const SampleB: React.FC = () => {
  const styles = StyleSheet.create({
    row: {
      flexDirection: "row",
    },
    border: {
      fontSize: 18,
      borderWidth: 0.5,
      marginRight: 5,
    },
  })
  return (
    <View style={styles.row}>
      <Text style={styles.border}>abg</Text>
      <Text style={styles.border}>あいう </Text>
      <Text style={styles.border}>123</Text>
      <Text style={styles.border}>abgあいう123</Text>
    </View>
  )
}

// ⬆の小細工ではなくて、スタイルの指定で揃える
// https://github.com/facebook/react-native/issues/24465
const SampleC: React.FC = () => {
  const styles = StyleSheet.create({
    row: {
      flexDirection: "row",
    },
    border: {
      fontSize: 18,
      borderWidth: 0.5,
      marginRight: 5,
      padding: 2,
      // * 1.0 => Android で上部が掛ける
      // * 1.3 => iOS, Android で表示がほぼ一緒（一行であれば）
      lineHeight: 18 * 1.3,
    },
  })
  return (
    <View style={styles.row}>
      <Text style={styles.border}>abg</Text>
      <Text style={styles.border}>あいう</Text>
      <Text style={styles.border}>abgあいう</Text>
    </View>
  )
}

const SampleD: React.FC = () => {
  // コンポーネントの高さを Element Inspector で見ると、以下のようになっていた
  //
  // iPhone SE, iPhone 7
  // fontSize => height, 12 => 15, 14 => 17.5, 16 => 20, 18 => 22, 20 => 24.5
  //
  // Android One X2
  // fontSize => height, 12 => 16.3, 14 => 19, 16 => 21.7, 18 => 24.3, 20 => 27
  return (
    <>
      <Text style={{ fontSize: 12 }}>ab</Text>
      <Text style={{ fontSize: 14 }}>ab</Text>
      <Text style={{ fontSize: 16 }}>ab</Text>
      <Text style={{ fontSize: 18 }}>ab</Text>
      <Text style={{ fontSize: 20 }}>ab</Text>
      <Text style={{ fontSize: 12 }}>aあ</Text>
      <Text style={{ fontSize: 14 }}>aあ</Text>
      <Text style={{ fontSize: 16 }}>aあ</Text>
      <Text style={{ fontSize: 18 }}>aあ</Text>
      <Text style={{ fontSize: 20 }}>aあ</Text>
    </>
  )
}

const SampleE: React.FC = () => {
  return (
    <>
      <Text style={{ fontSize: 12, lineHeight: 12 * 1.3 }}>gb</Text>
      <Text style={{ fontSize: 14, lineHeight: 14 * 1.3 }}>gb</Text>
      <Text style={{ fontSize: 16, lineHeight: 16 * 1.3 }}>gb</Text>
      <Text style={{ fontSize: 18, lineHeight: 18 * 1.3 }}>gb</Text>
      <Text style={{ fontSize: 20, lineHeight: 20 * 1.3 }}>gb</Text>
      <Text style={{ fontSize: 12, lineHeight: 12 * 1.3 }}>gあ</Text>
      <Text style={{ fontSize: 14, lineHeight: 14 * 1.3 }}>gあ</Text>
      <Text style={{ fontSize: 16, lineHeight: 16 * 1.3 }}>gあ</Text>
      <Text style={{ fontSize: 18, lineHeight: 18 * 1.3 }}>gあ</Text>
    </>
  )
}

export const FontScreen: React.FC = () => {
  const styles = StyleSheet.create({
    container: {
      margin: 10,
    },
  })

  return (
    <ScrollView style={styles.container}>
      <MarginDivider />
      <SampleA />
      <MarginDivider />
      <SampleB />
      <MarginDivider />
      <SampleC />
      <MarginDivider />
      <SampleD />
      <MarginDivider />
      <SampleE />
    </ScrollView>
  )
}
