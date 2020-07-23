import React, { useState } from "react"
import {
  Text,
  Modal,
  Button,
  StatusBar,
  StyleSheet,
  SafeAreaView,
} from "react-native"

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
  },
})

type ModalViewProps = {
  isVisible: boolean
  setVisible: React.Dispatch<React.SetStateAction<boolean>>
}

const ModalView: React.FC<ModalViewProps> = (props: ModalViewProps) => {
  const { isVisible, setVisible } = props

  return (
    <Modal animationType="slide" visible={isVisible}>
      <Text>Hello Modal!</Text>
      <Button title="Close!" onPress={() => setVisible(false)} />
    </Modal>
  )
}

export const ModalApp: React.FC = () => {
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
