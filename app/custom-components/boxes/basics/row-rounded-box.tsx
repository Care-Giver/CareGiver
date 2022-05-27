import React from "react"
import { Pressable, Text, View, ViewProps } from "react-native"
import { isPressable } from "./row-rounded-box.presets"
import { styles } from "./styles"

//- TODO: RowRoundedBoxProps 생성 (ScreenProps) 참고할 것
export const RowRoundedBox = (props: ViewProps) => {
  const preset = props.preset

  if (isPressable(preset)) {
    return (
      <Pressable style={[styles.ROW_ROUNDED_BOX_PRESET, props.style]} onPress={props.onPress}>
        {props.children}
      </Pressable>
    )
  } else {
    return <View style={[styles.ROW_ROUNDED_BOX_PRESET, props.style]}>{props.children}</View>
  }
}
