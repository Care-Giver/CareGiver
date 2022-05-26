import { View, Text, ViewStyle, FlexStyle, StyleProp, ViewProps } from "react-native"
import React from "react"
import { palette, WIDTH } from "../../theme"
import { Screen } from "../../components/screen/screen"

const FULL: ViewStyle = { flex: 1 }

const BASIC_BACKGROUND_PADDING: FlexStyle = {
  paddingHorizontal: WIDTH * 16,
}

export const BackgroundRootView = (props) => {
  const preset = { props }

  return (
    <Screen
      preset={preset}
      backgroundColor={palette.white}
      style={[FULL, BASIC_BACKGROUND_PADDING]}
      {...props}
    />
  )
}

//- TODO: RowProps 생성 (ScreenProps) 참고할 것
// export const Row = (props: RowProps) => {
export const Row = (props: ViewProps) => {
  const PRESETS = {
    width: "100%",
    heiht: "auto",
    backgroundColor: palette.white,
    flexDirection: "row",
  }

  return <View style={[PRESETS, props.style]}>{props.children}</View>
}
