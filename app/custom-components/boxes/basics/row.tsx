import React from "react"
import { View, ViewProps } from "react-native"
import { styles } from "./styles"
//- TODO: RowProps 생성 (ScreenProps) 참고할 것
// export const Row = (props: RowProps) => {
export const Row = (props: ViewProps) => {
  return <View style={[styles.ROW_PRESET, props.style]}>{props.children}</View>
}
