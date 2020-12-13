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
        type="solid"
        onPress={() => console.log("短押し")}
        onLongPress={() => console.log("長押し")}
      />
      <Button style={styles.button} title="CLEAR" type="clear" />
      <Button style={styles.button} title="OUTLINE" type="outline" />

      <Divider />
      <ListItem title="Title" bottomDivider />

      <Text h1 style={styles.text}>
        あああ
      </Text>
      <Text h2 style={styles.text}>
        いいい
      </Text>
    </View>
  )
}
