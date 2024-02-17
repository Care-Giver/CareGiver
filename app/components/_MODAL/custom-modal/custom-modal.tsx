import React from "react"
import { View, Image, Modal, useWindowDimensions } from "react-native"
import { observer } from "mobx-react-lite"
import {
  BASIC_BACKGROUND_PADDING_WIDTH,
  DeclineOrConfirmButton,
  PreBol20,
  PreReg14,
} from "#components"
import { styles } from "./styles"
import { BODY, HEAD_LINE } from "#theme"
import { CustomModalProps } from "./custom-modal.props"

export const CustomModal = observer(function CustomModal(props: CustomModalProps) {
  const {
    visibleState,
    image,
    imageWidth,
    imageHeight,
    title,
    subtitle,
    subtitleStyle,
    yesBtnText,
    noBtnText,
    handleYesPress,
    handleNoPress,
  } = props
  const windowWidth = useWindowDimensions().width
  const modalWidth = windowWidth

  const $subtitleStyle = Object.assign({}, styles.subtitle, subtitleStyle)
  return (
    <Modal animationType="fade" visible={visibleState} transparent>
      <View style={styles.centeredView}>
        <View
          style={[styles.modalView, { width: modalWidth - 2 * BASIC_BACKGROUND_PADDING_WIDTH }]}
        >
          <Image source={image} style={{ width: imageWidth, height: imageHeight }} />
          <PreBol20 text={title} color={HEAD_LINE} style={{ marginTop: 16 }} />
          {subtitle && <PreReg14 text={subtitle} color={BODY} style={$subtitleStyle} />}

          <DeclineOrConfirmButton
            size="m"
            onDeclinePress={handleYesPress}
            declineText={yesBtnText}
            onConfirmPress={handleNoPress}
            confirmText={noBtnText}
            style={{ marginTop: 48 }}
          />
        </View>
      </View>
    </Modal>
  )
})
