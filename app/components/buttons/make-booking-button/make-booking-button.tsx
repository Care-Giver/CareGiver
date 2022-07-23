import * as React from "react"
import { PreBol16, PreReg14 } from "../../basics/custom-texts/custom-texts"
import { PressableButton } from "../pressable-button/pressable-button"
import { styles } from "./styles"

//TODO: Props 만들기
export const MakeBookingButton = (props) => {
  const { pricePerHour, isActivated = false, onPress, children, ...rest } = props

  const activatedViewStyle = [styles.root, styles.activatedViewStyle, props.style]
  const disabledViewStyle = [styles.root, styles.disabledViewStyle, props.style]

  const viewStyle = isActivated ? activatedViewStyle : disabledViewStyle
  // const textStyle = isActivated ? pressedTextStyle : defaultTextStyle
  // const content = children || <Text style={textStyle}>{label} </Text>

  return (
    <PressableButton style={viewStyle} isDisabled={!isActivated} onPress={onPress}>
      <PreBol16
        text={pricePerHour.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "원"}
        color={"white"}
      />
      <PreReg14 text={" / 시간"} color={"white"} />
      <PreBol16 text={"예약 신청하기"} color={"white"} style={{ marginLeft: "auto" }} />
    </PressableButton>
  )
}
