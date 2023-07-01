import React from "react"
import {
  StyleProp,
  ViewStyle,
  View,
  StyleSheet,
  Pressable,
  Image,
  ImageSourcePropType,
} from "react-native"
import { observer } from "mobx-react-lite"
import { PreBol14, PreReg14 } from "../basics/custom-texts/custom-texts"
import { images } from "#images"
import { BODY, GIVER_CASUAL_NAVY, WIDTH } from "#theme"
import { PaymentModuleType } from "#screens"

export interface PaymentToolProps {
  /**
   * 추가적인 padding, margin 을 줌으로써, 위치를 조정할 수 있습니다.
   */
  style?: StyleProp<ViewStyle>

  /**
   * 결제 모듈의 종류입니다.
   * "카카오페이" | "네이버페이" | "토스"
   */
  tool: Exclude<PaymentModuleType, "신용/체크카드">

  /**
   * 선택된 결제 모듈입니다. (스타일링을 위해 추가됨)
   * "카카오페이" | "네이버페이" | "토스"
   */
  selectedTool: Exclude<PaymentModuleType, "신용/체크카드">

  setSelectedTool: () => void
}

export const PaymentTool = observer(function PaymentTool(props: PaymentToolProps) {
  const { style, tool, selectedTool, setSelectedTool } = props
  const isSelected = tool === selectedTool

  const allStyles = Object.assign({}, styles.root, style)

  const ToolText = isSelected ? PreBol14 : PreReg14

  const imageSourceHandler = (): ImageSourcePropType => {
    switch (tool) {
      case "카카오페이":
        return images.payment_kakao
      case "네이버페이":
        return images.payment_naver
      case "토스":
        return images.payment_toss
    }
  }

  return (
    <Pressable style={allStyles} onPress={setSelectedTool}>
      <Image
        style={[styles.paymentImage, isSelected && styles.selectedImage]}
        source={imageSourceHandler()}
      />
      <View style={{ flexDirection: "row", justifyContent: "center" }}>
        <Image
          style={styles.radio}
          source={isSelected ? images.radio_active : images.radio_inactive}
        />
        <ToolText text={tool} color={isSelected ? GIVER_CASUAL_NAVY : BODY} />
      </View>
    </Pressable>
  )
})

const styles = StyleSheet.create({
  root: {
    width: 112 * WIDTH,
  },

  paymentImage: {
    flex: 1,
    width: "100%",
    height: 59,
    borderRadius: 10,
    marginBottom: 10,
    backgroundColor: "black",
  },

  selectedImage: {
    borderWidth: 1,
    borderColor: GIVER_CASUAL_NAVY,
  },

  radio: {
    width: 16,
    height: 16,
    marginRight: 7,
  },
})
