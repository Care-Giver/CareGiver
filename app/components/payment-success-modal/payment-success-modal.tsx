import * as React from "react"
import { View, Image, Pressable, Modal, useWindowDimensions } from "react-native"
import { observer } from "mobx-react-lite"
import { BASIC_BACKGROUND_PADDING_WIDTH, PreBol14, PreBol20, PreReg14, Row } from "#components"
import { styles } from "./styles"
import { BODY, GIVER_CASUAL_NAVY, HEAD_LINE, color } from "#theme"
import { images } from "#images"
import { PaymentSuccessModalProps } from "./payment-success-modal.props"

export const PaymentSuccessModal = observer(function PaymentSuccessModal(
  props: PaymentSuccessModalProps,
) {
  const {
    visibleState,
    title,
    subtitle,
    HomeBtnText,
    BookBtnText,
    handleHomePress,
    handleBookPress,
  } = props
  const windowWidth = useWindowDimensions().width
  const modalWidth = windowWidth
  return (
    <Modal animationType="fade" visible={visibleState} transparent>
      <View style={styles.centeredView}>
        <View
          style={[styles.modalView, { width: modalWidth - 2 * BASIC_BACKGROUND_PADDING_WIDTH }]}
        >
          <Image source={images.select_checkbox} style={{ width: 66, height: 66 }} />
          <PreBol20 text={title} color={HEAD_LINE} style={{ marginTop: 16 }} />
          <PreReg14 text={subtitle} color={BODY} style={{ marginTop: 8, textAlign: "center" }} />
          <Row style={{ marginTop: 60 }}>
            <Pressable style={styles.modalYesBtn} onPress={handleHomePress}>
              <PreBol14 text={HomeBtnText} color={GIVER_CASUAL_NAVY} />
            </Pressable>
            <Pressable style={styles.modalNoBtn} onPress={handleBookPress}>
              <PreBol14 text={BookBtnText} color={color.palette.white} />
            </Pressable>
          </Row>
        </View>
      </View>
    </Modal>
  )
})
