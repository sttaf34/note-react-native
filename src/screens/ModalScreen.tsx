import React, { useState } from "react"
import {
  Text,
  Modal,
  Button,
  TextInput,
  StatusBar,
  StyleSheet,
  SafeAreaView,
} from "react-native"

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
  },
  input: {
    margin: 12,
    height: 40,
    borderColor: "pink",
    borderWidth: 1,
  },
})

type ModalViewProps = {
  isVisible: boolean
  setVisible: React.Dispatch<React.SetStateAction<boolean>>
  value: string
  setValue: React.Dispatch<React.SetStateAction<string>>
}

const ModalView: React.FC<ModalViewProps> = (props: ModalViewProps) => {
  const { isVisible, setVisible, value, setValue } = props

  return (
    <Modal animationType="slide" visible={isVisible}>
      <SafeAreaView style={styles.safeAreaView}>
        <Text>Hello Modal!</Text>
        <TextInput
          style={styles.input}
          onChangeText={(text) => setValue(text)}
          value={value}
        />
        <Button title="Close!" onPress={() => setVisible(false)} />
      </SafeAreaView>
    </Modal>
  )
}

export const ModalScreen: React.FC = () => {
  const [modalVisible, setModalVisible] = useState(false)
  const [value, setValue] = React.useState("") // モーダルの中で入力される用

  return (
    <>
      <ModalView
        isVisible={modalVisible}
        setVisible={setModalVisible}
        value={value}
        setValue={setValue}
      />

      <SafeAreaView style={styles.safeAreaView}>
        <StatusBar hidden={false} />
        <Text>{value}</Text>
        <Button title="Open!" onPress={() => setModalVisible(true)} />
      </SafeAreaView>
    </>
  )
}
