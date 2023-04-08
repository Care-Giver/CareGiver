import * as React from "react"
import { StyleProp, ViewStyle } from "react-native"
import { palette } from "#theme"
import { PreBol16 } from "../../basics/custom-texts/custom-texts"
import { PressableButton } from "../pressable-button/pressable-button"
import { styles } from "./styles"

interface ConditionalButtonProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>
  isActivated: boolean
  label: string
  onPress: () => void
}

export const ConditionalButton = (props: ConditionalButtonProps) => {
  const {
    isActivated = false,
    // activatedViewStyle,
    // defaultTextStyle,
    label,
    onPress,
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
