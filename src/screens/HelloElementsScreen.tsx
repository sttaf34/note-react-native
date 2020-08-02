import React from "react"
import { View, StyleSheet } from "react-native"
import { Text, Button, Divider, ListItem } from "react-native-elements"

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
  },
  button: {
    margin: 12,
  },
  text: {
    margin: 12,
  },
})

export const HelloElementsScreen: React.FC = () => {
  const subtitle =
    "単に前で意味方は充分その運動まいでしばかりを認めが過ぎるんよりは矛盾ましななけれけれども、すぐにはしななけれたいん。気分を釣っだのはとにかくほかをもしなんです。どうしても岡田さんが馳走人格あまり赴任を行かます威力その働私か留学よりってお存在でたたんから、そんな前は私かがた差のあるじゃ、三宅さんのつもりが趣味のどこにどうか小懊悩と呑み込むてそれ個性がお応用で利くように現にお中止にあるたありで、無論よく参考に出なけれといるた訳をさだた。"

  return (
    <View style={styles.container}>
      <Button
        style={styles.button}
        title="ボタン"
        onPress={() => console.log("短押し")}
        onLongPress={() => console.log("長押し")}
      />

      <Divider />
      <ListItem
        leftAvatar={{
          source: { uri: "https://reactnative.dev/img/tiny_logo.png" },
        }}
        title="タイトル"
        subtitle={subtitle}
        bottomDivider
      />

      <Text h1 style={styles.text}>
        あああ
      </Text>
      <Text h2 style={styles.text}>
        いいい
      </Text>
    </View>
  )
}
