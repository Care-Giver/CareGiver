import React from "react"
import { StyleProp, TouchableOpacity, ViewStyle } from "react-native"
import { palette } from "#theme"
import { PreBol16 } from "../../_BASIC/custom-texts/custom-texts"
import { styles } from "./styles"

interface ConditionalButtonProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>
  isActivated: boolean
  label: string
  labelTextColor?: string
  onPress?: () => void
}

export const ConditionalButton = (props: ConditionalButtonProps) => {
  const { style, isActivated = false, onPress, label, labelTextColor } = props

  const activatedViewStyle = { ...styles.root, ...styles.activatedViewStyle }
  const disabledViewStyle = { ...styles.root, ...styles.disabledViewStyle }

  const viewStyle = isActivated ? activatedViewStyle : disabledViewStyle
  // const textStyle = isActivated ? pressedTextStyle : defaultTextStyle
  // const content = children || <Text style={textStyle}>{label} </Text>
  const color = labelTextColor || palette.white

  const allStyles = Object.assign({}, viewStyle, style)

  return (
    <TouchableOpacity style={allStyles} disabled={!isActivated} onPress={onPress}>
      <PreBol16 text={label} color={color} />
    </TouchableOpacity>
  )
}
