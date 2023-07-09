import React from "react"
import { Pressable, StyleProp, ViewStyle, StyleSheet } from "react-native"
import { GIVER_CASUAL_NAVY, palette } from "#theme"
import { PreBol16 } from "../../basics/custom-texts/custom-texts"

interface ConditionalButtonProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>
  isActivated?: boolean
  label: string
  onPress?: () => void

  textColor?: string
}

export const ConditionalButton = (props: ConditionalButtonProps) => {
  const { style, isActivated = false, onPress, label, textColor } = props

  // const textStyle = isActivated ? pressedTextStyle : defaultTextStyle
  // const content = children || <Text style={textStyle}>{label} </Text>

  const allStyles = Object.assign(
    {},
    styles.root,
    isActivated ? styles.activatedViewStyle : styles.disabledViewStyle,
    style,
  )

  return (
    <Pressable style={allStyles} disabled={!isActivated} onPress={onPress}>
      <PreBol16 text={label} color={textColor || palette.white} />
    </Pressable>
  )
}

const styles = StyleSheet.create({
  root: {
    width: "100%",
    height: 56,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "red",
  },
  activatedViewStyle: {
    backgroundColor: GIVER_CASUAL_NAVY,
  },
  disabledViewStyle: {
    backgroundColor: "#F1F1F4",
  },
})
