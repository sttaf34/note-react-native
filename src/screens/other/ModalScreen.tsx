import React from "react"
import CustomNativeModal from "react-native-modal"
import { Modal as OriginalModal } from "react-native"

import { StyledText } from "src/components/StyledText"
import { StyledButton } from "src/components/StyledButton"
import { HeavyComponent } from "src/components/HeavyComponent"
import { StyledTextInput } from "src/components/StyledTextInput"
import { StyledSafeAreaView } from "src/components/StyledSafeAreaView"

type OriginalModalViewProps = {
  isVisible: boolean
  setVisible: React.Dispatch<React.SetStateAction<boolean>>
  value: string
  setValue: React.Dispatch<React.SetStateAction<string>>
}

const OriginalModalView: React.FC<OriginalModalViewProps> = (
  props: OriginalModalViewProps
) => {
  const { isVisible, setVisible, value, setValue } = props

  // presentationStyle="pageSheet" にすると
  // 画面全体を専有しない半端モーダルにはできるが、
  // スワイプで画面を閉じる動作には対応していない
  // https://github.com/facebook/react-native/issues/29319

  return (
    <OriginalModal
      animationType="slide"
      visible={isVisible}
      presentationStyle="fullScreen"
    >
      <StyledSafeAreaView>
        <StyledText text="Hello Original Modal!" />
        <StyledTextInput
          onChangeValue={(aValue) => setValue(aValue)}
          value={value}
        />
        <StyledButton title="CLOSE" onPress={() => setVisible(false)} />
        <HeavyComponent />
      </StyledSafeAreaView>
    </OriginalModal>
  )
}

type CustomModalViewProps = {
  isVisible: boolean
  setVisible: React.Dispatch<React.SetStateAction<boolean>>
}

// https://github.com/react-native-modal/react-native-modal
// 標準の Modal からいろんな機能を拡張したもの、

const CustomModalView: React.FC<CustomModalViewProps> = (
  props: CustomModalViewProps
) => {
  const { isVisible, setVisible } = props
  return (
    <CustomNativeModal isVisible={isVisible}>
      <StyledSafeAreaView>
        <StyledText text="Hello React Native Modal!" />
        <StyledButton title="CLOSE" onPress={() => setVisible(false)} />
        <HeavyComponent />
      </StyledSafeAreaView>
    </CustomNativeModal>
  )
}

export const ModalScreen: React.FC = () => {
  const [modalVisibleOriginal, setModalVisibleOriginal] = React.useState(false)
  const [modalVisibleCustom, setModalVisibleCustom] = React.useState(false)
  const [value, setValue] = React.useState("") // モーダルの中で入力される用

  return (
    <>
      <OriginalModalView
        isVisible={modalVisibleOriginal}
        setVisible={setModalVisibleOriginal}
        value={value}
        setValue={setValue}
      />
      <CustomModalView
        isVisible={modalVisibleCustom}
        setVisible={setModalVisibleCustom}
      />
      <StyledSafeAreaView>
        <StyledText text={value} />
        <StyledButton
          title="OPEN ORIGINAL"
          onPress={() =>
            requestAnimationFrame(() => setModalVisibleOriginal(true))
          }
        />
        <StyledButton
          title="OPEN CUSTOM"
          onPress={() => setModalVisibleCustom(true)}
        />
      </StyledSafeAreaView>
    </>
  )
}
