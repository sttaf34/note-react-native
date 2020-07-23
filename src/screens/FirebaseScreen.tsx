import React from "react"
import { View, Text, Button, StyleSheet } from "react-native"
import { tweetCollectionReference } from "src/constants/firebase"

const styles = StyleSheet.create({
  container: {
    margin: 12,
  },
})

export const FirebaseScreen: React.FC = () => {
  const [message, setMessage] = React.useState("やってる？")

  const onPress = async (): Promise<void> => {
    const querySnapshot = await tweetCollectionReference.get()
    querySnapshot.forEach((tweet) => {
      console.log(tweet.id, tweet.data().message)
      setMessage(tweet.data().message)
    })
  }

  return (
    <View style={styles.container}>
      <Button title="Firebase" onPress={onPress} />
      <Text>{message}</Text>
    </View>
  )
}
