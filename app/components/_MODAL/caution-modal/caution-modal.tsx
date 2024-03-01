import React, { useState } from "react"
import { View, StyleSheet, Image } from "react-native"
import { observer } from "mobx-react-lite"
import Modal from "react-native-modal"
import { BASIC_BACKGROUND_PADDING_WIDTH, ConditionalButton, PreBol20, PreReg14 } from "#components"
import { BODY, DEVICE_SCREEN_WIDTH, HEAD_LINE, HEIGHT, color } from "#theme"
import { images } from "#images"

export interface CautionModalProps {
  image?: "caution"
  title: string
  message?: string
}

export const CautionModal = observer(function CautionModal(props: CautionModalProps) {
  const { image, title, message } = props
  const [isVisible, setIsVisible] = useState(true)
  const imageSize = { width: 0, height: 0 }

  switch (image) {
    case "caution":
      imageSize.width = 90
      imageSize.height = 79
      break
  }

  const allStyles = Object.assign({}, styles.root)
  return (
    <Modal
      animationIn={"fadeIn"}
      animationOut={"fadeOut"}
      backdropOpacity={0.35}
      isVisible={isVisible}
      avoidKeyboard //* 키보드 자동 회피
      style={allStyles}
    >
      <View style={styles.center}>
        <View style={styles.modalRoot}>
          {/* 이미지 */}
          {image ? (
            <Image
              source={images[image]}
              style={{ width: imageSize.width, height: imageSize.height, marginBottom: 34 }}
            />
          ) : null}
          {/* 제목 */}
          <PreBol20 text={title} color={HEAD_LINE} />
          {/* 내용 */}
          {message ? <PreReg14 text={message} color={BODY} mt={10} /> : null}
          {/* 확인 버튼 (클릭시, 모달 닫힘) */}
          <ConditionalButton
            label="확인"
            isActivated
            style={{
              marginTop: 50 * HEIGHT,
              height: 48,
              width: "100%",
              alignSelf: "center",
            }}
            onPress={() => setIsVisible(false)}
          />
        </View>
      </View>
    </Modal>
  )
})

const styles = StyleSheet.create({
  root: { alignItems: "center" },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalRoot: {
    width: DEVICE_SCREEN_WIDTH - 2 * BASIC_BACKGROUND_PADDING_WIDTH,
    alignItems: "center",
    padding: 16,
    paddingTop: 48,
    backgroundColor: color.palette.white,
    borderRadius: 8,
  },
})
