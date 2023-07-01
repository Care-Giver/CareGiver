import { View, ViewStyle } from "react-native"
import React from "react"
import { styles } from "./styles"
import { LIGHT_LINE } from "#theme"

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
  color = LIGHT_LINE,
  height = 2,
  style = undefined,
  mt,
  mb,
  mv,
}: DivisionLineProps) => {
  const $style = Object.assign({}, { marginVertical: mv, marginTop: mt, marginBottom: mb })
  const COLOR_AND_HEIGHT: ViewStyle = {
    backgroundColor: color,
    height: height,
  }

  return <View style={[styles.root, COLOR_AND_HEIGHT, $style, style]} />
}
