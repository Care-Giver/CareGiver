import * as React from "react"
import { Pressable, Text, PressableProps } from "react-native"
import { palette } from "../../../theme"
import { PreBol16 } from "../../custom-texts/custom-texts"
import { PressableButton } from "../pressable-button/pressable-button"
import { styles } from "./styles"

//TODO: ConditionalButtonProps 만들기
export const ConditionalButton = (props) => {
  const {
    isActivated = false,
    // activatedViewStyle,
    // defaultTextStyle,
    onPress,
    label,
    children,
    ...rest
  } = props

  const activatedViewStyle = [styles.root, styles.activatedViewStyle, props.style]
  const disabledViewStyle = [styles.root, styles.disabledViewStyle, props.style]

  const viewStyle = isActivated ? activatedViewStyle : disabledViewStyle
  // const textStyle = isActivated ? pressedTextStyle : defaultTextStyle
  // const content = children || <Text style={textStyle}>{label} </Text>

  return (
    <PressableButton style={viewStyle} isDisabled={!isActivated} onPress={onPress}>
      <PreBol16 text={label} color={palette.white} />
    </PressableButton>
  )
}
