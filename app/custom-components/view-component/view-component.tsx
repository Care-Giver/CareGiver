import { View, Text, ViewStyle, FlexStyle, StyleProp, ViewProps } from "react-native"
import React from "react"
import { palette, WIDTH } from "../../theme"
import { Screen } from "../../components/screen/screen"
import { isNonScrolling } from "../../components/screen/screen.presets"

const FULL: ViewStyle = { flex: 1 }

const FULL_WITH_SCROLLING: ViewStyle = { width: "100%", height: "auto" }

const BASIC_BACKGROUND_PADDING: FlexStyle = {
  paddingHorizontal: WIDTH * 16,
}

export const ScreenRootView = (props) => {
  return (
    <Screen
      preset={props.preset}
      backgroundColor={palette.white}
      style={
        isNonScrolling(props.preset)
          ? [FULL, BASIC_BACKGROUND_PADDING, props.style]
          : [FULL_WITH_SCROLLING, BASIC_BACKGROUND_PADDING, props.style]
      }
      {...props}
    />
  )
}
