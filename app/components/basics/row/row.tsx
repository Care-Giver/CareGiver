import React, { ReactNode } from "react"
import { FlexStyle, View, ViewStyle } from "react-native"
import { styles } from "../common-styles"
//- TODO: RowProps 생성 (ScreenProps) 참고할 것
// export const Row = (props: RowProps) => {

interface RowProps {
  children: ReactNode

  style?: FlexStyle | ViewStyle

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

export const Row = (props: RowProps) => {
  const { children, style, mv, mt, mb } = props
  const $style = Object.assign({}, style, { marginVertical: mv, marginTop: mt, marginBottom: mb })

  return <View style={[styles.ROW_PRESET, $style]}>{children}</View>
}
