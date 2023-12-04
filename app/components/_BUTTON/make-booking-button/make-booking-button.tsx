import React from "react"
import { PreBol16, PreReg14 } from "../../_BASIC/custom-texts/custom-texts"
import { PressableButton } from "../pressable-button/pressable-button"
import { styles } from "./styles"
import { ServiceTypeKorean } from "#models"
import { StyleProp, ViewStyle } from "react-native"
import { price as priceFormatter } from "../../../utils/format"

interface MakeBookingButtonProps {
  price: number
  isActivated: boolean
  onPress: () => void
  serviceTypeKorean: ServiceTypeKorean
  style?: StyleProp<ViewStyle>
}
export const MakeBookingButton = (props: MakeBookingButtonProps) => {
  const { price, isActivated = false, onPress, serviceTypeKorean, style } = props

  const activatedViewStyle = [styles.root, styles.activatedViewStyle, style]
  const disabledViewStyle = [styles.root, styles.disabledViewStyle, style]

  const viewStyle = isActivated ? activatedViewStyle : disabledViewStyle

  return (
    <PressableButton style={viewStyle} isDisabled={!isActivated} onPress={onPress}>
      <PreBol16 text={priceFormatter(price?.toString())} color={"white"} />
      <PreReg14 text={serviceTypeKorean === "방문" ? " / 시간" : " / 박"} color={"white"} />
      <PreBol16 text={"예약 신청하기"} color={"white"} style={{ marginLeft: "auto" }} />
    </PressableButton>
  )
}
