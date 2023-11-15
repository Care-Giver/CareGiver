import React from "react"
import { View, Image, Pressable, Modal, useWindowDimensions } from "react-native"
import { observer } from "mobx-react-lite"
import { BASIC_BACKGROUND_PADDING_WIDTH, PreBol14, PreBol20, PreReg14, Row } from "#components"
import { styles } from "./styles"
import { BODY, GIVER_CASUAL_NAVY, HEAD_LINE, color } from "#theme"
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
          <Row style={{ marginTop: 48 }}>
            <Pressable style={styles.modalYesBtn} onPress={handleYesPress}>
              <PreBol14 text={yesBtnText} color={GIVER_CASUAL_NAVY} />
            </Pressable>
            <Pressable style={styles.modalNoBtn} onPress={handleNoPress}>
              <PreBol14 text={noBtnText} color={color.palette.white} />
            </Pressable>
          </Row>
        </View>
      </View>
    </Modal>
  )
})
