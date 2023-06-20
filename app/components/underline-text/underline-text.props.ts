import React from "react"
import { StyleProp, ViewStyle } from "react-native"

export interface UnderlineTextProps {
  textColor?: string
  underlineHeight?: number
  underlineColor?: string
  style?: StyleProp<ViewStyle>
  children: React.ReactElement | React.ReactElement[]
}
