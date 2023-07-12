import { View, ViewStyle, StyleProp } from "react-native"
import React from "react"
import { styles } from "./styles"
import { PreBol12 } from "../../basics/custom-texts/custom-texts"
import { palette } from "#theme"

interface CaregiverTypeButtonPros {
  text: string
  textColor?: string
  style?: StyleProp<ViewStyle>
}

export const CaregiverTypeButton = ({ text, textColor, style }: CaregiverTypeButtonPros) => {
  return (
    <View style={[styles.typeBtn, style]}>
      <PreBol12 text={text} color={textColor || palette.white} />
    </View>
  )
}
