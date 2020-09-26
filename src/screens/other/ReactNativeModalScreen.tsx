import React, { useState } from "react"
import { Text, Button, StatusBar, StyleSheet, SafeAreaView } from "react-native"
import Modal from "react-native-modal"

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
  },
})

type ModalViewProps = {
  isVisible: boolean
  setVisible: React.Dispatch<React.SetStateAction<boolean>>
}

// https://github.com/react-native-community/react-native-modal
// 標準の Modal からいろんな機能を拡張したもの

const ModalView: React.FC<ModalViewProps> = (props: ModalViewProps) => {
  const { isVisible, setVisible } = props

  return (
    <Modal isVisible={isVisible}>
      <SafeAreaView style={styles.safeAreaView}>
        <Text>Hello Modal!</Text>
        <Button title="Close!" onPress={() => setVisible(false)} />
      </SafeAreaView>
    </Modal>
  )
}

export const ReactNativeModalScreen: React.FC = () => {
  const [modalVisible, setModalVisible] = useState(false)

  return (
    <>
      <ModalView isVisible={modalVisible} setVisible={setModalVisible} />

      <SafeAreaView style={styles.safeAreaView}>
        <StatusBar hidden={false} />
        <Button title="Open!" onPress={() => setModalVisible(true)} />
      </SafeAreaView>
    </>
  )
}
