import * as React from "react"
import { Pressable, Text, PressableProps } from "react-native"
import { palette } from "../../../theme"
import { PreBol16 } from "../../custom-texts/custom-texts"
import { PressableButton } from "../pressable-button/pressable-button"
import { styles } from "./styles"

//TODO: ConditionalButtonProps 만들기
export const ConditionalButton = (props) => {
  const {
    isActivate = false,
    // activatedViewStyle,
    // defaultTextStyle,
    label,
    children,
    ...rest
  } = props

  const activatedViewStyle = [styles.root, styles.activatedViewStyle]
  const disabledViewStyle = [styles.root, styles.disabledViewStyle]

  const viewStyle = isActivate ? activatedViewStyle : disabledViewStyle
  // const textStyle = isActivate ? pressedTextStyle : defaultTextStyle
  // const content = children || <Text style={textStyle}>{label} </Text>

  return (
    <PressableButton
      style={viewStyle}
      isDisabled={!isActivate}
      onPress={() => {
        alert("dd")
      }}
      {...props}
    >
      <PreBol16 text={label} color={palette.white} />
    </PressableButton>
  )
}
