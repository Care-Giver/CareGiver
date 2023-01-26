import React from "react"
import { Pressable, Text, View, ViewProps, ViewStyle } from "react-native"
import { isPressable } from "./row-rounded-box.presets"
// import { styles } from "../common-styles"
import  palette, LIGHT_LINE } from "#theme"

//- TODO: RowRoundedBoxProps 생성 (ScreenProps) 참고할 것
export const RowRoundedBox = (props: ViewProps) => {
  const preset = props.preset

  if (isPressable(preset)) {
    return (
      <Pressable style={[ROW_ROUNDED_BOX_PRESET, props.style]} onPress={props.onPress}>
        {props.children}
      </Pressable>
    )
  } else {
    return <View style={[ROW_ROUNDED_BOX_PRESET, props.style]}>{props.children}</View>
  }
}

const ROW_ROUNDED_BOX_PRESET: ViewStyle = {
  width: "100%",
  height: 48,
  backgroundColor: palette.white,
  flexDirection: "row",
  alignItems: "center",
  borderWidth: 2,
  borderRadius: 8,
  borderColor: LIGHT_LINE,
}
