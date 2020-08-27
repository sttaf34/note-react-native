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
  return (
    <View style={styles.container}>
      <Button
        style={styles.button}
        title="ボタン"
        onPress={() => console.log("短押し")}
        onLongPress={() => console.log("長押し")}
      />

      <Divider />
      <ListItem title="タイトル" bottomDivider />

      <Text h1 style={styles.text}>
        あああ
      </Text>
      <Text h2 style={styles.text}>
        いいい
      </Text>
    </View>
  )
}
