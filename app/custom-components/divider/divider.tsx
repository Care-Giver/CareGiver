import { View, Text } from "react-native"
import React from "react"
import { HEIGHT } from "../../theme"
import { LBG } from "../../theme/palette"
import { DividerProps } from "./divider.props"

export const Divider = ({ style }: DividerProps) => {
  return (
    <View
      style={[
        {
          width: "100%",
          height: HEIGHT * 2,
          backgroundColor: LBG,
        },
        style,
      ]}
    />
  )
}
