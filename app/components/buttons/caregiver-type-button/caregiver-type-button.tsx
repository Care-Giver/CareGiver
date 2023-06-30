import { View, ViewStyle, StyleProp } from "react-native"
import React from "react"
import { styles } from "./styles"
import { PreBol12 } from "../../basics/custom-texts/custom-texts"
import { palette } from "#theme"

export const CaregiverTypeButton = ({
  text,
  textColor,
  style,
}: {
  text: string
  textColor?: string
  style?: StyleProp<ViewStyle>
}) => {
  return (
    <View style={[styles.typeBtn, style]}>
      <PreBol12 text={text} color={textColor ? textColor : palette.white} />
    </View>
  )
}
