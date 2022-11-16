import { View, ViewStyle } from "react-native"
import React from "react"
import { styles } from "./styles"
import { HEIGHT } from "#theme/index"

interface DivisionLineProps {
  color?: string
  height?: number
  style?: ViewStyle

  /**
   * marginTop
   */
  mt?: number

  /**
   * marginBottom
   */
  mb?: number

  /**
   * marginVertical (could be overlapped by mt or mb)
   */
  mv?: number
}

export const DivisionLine = ({
  color = "#F0F0F6",
  height = HEIGHT * 2,
  style = undefined,
  mt,
  mb,
  mv,
}: DivisionLineProps) => {
  const $style = Object.assign({}, { marginVertical: mv, marginTop: mt, marginBottom: mb })
  const COLOR_AND_HEIGHT = {
    backgroundColor: color,
    height: height,
  }

  return <View style={[styles.root, COLOR_AND_HEIGHT, $style, style]} />
}
