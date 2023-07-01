import * as React from "react"
import { Pressable, StyleProp, ViewStyle } from "react-native"
import { palette } from "#theme"
import { PreBol16 } from "../../basics/custom-texts/custom-texts"
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
  const { style, isActivated = false, onPress, label } = props

  const activatedViewStyle = [styles.root, styles.activatedViewStyle]
  const disabledViewStyle = [styles.root, styles.disabledViewStyle]

  const viewStyle = isActivated ? activatedViewStyle : disabledViewStyle
  // const textStyle = isActivated ? pressedTextStyle : defaultTextStyle
  // const content = children || <Text style={textStyle}>{label} </Text>

  return (
    <Pressable style={[style, viewStyle]} disabled={!isActivated} onPress={onPress}>
      <PreBol16 text={label} color={palette.white} />
    </Pressable>
  )
}
