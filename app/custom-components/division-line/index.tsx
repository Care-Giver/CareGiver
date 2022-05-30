import { View, Text } from "react-native"
import React from "react"
import { styles } from "./styles"
import { HEIGHT } from "../../theme"

export const DivisionLine = ({ color = "red", height = HEIGHT * 2, style }) => {
  const COLOR_AND_HEIGHT = {
    backgroundColor: color,
    height: height,
  }

  return <View style={[styles.root, COLOR_AND_HEIGHT, style]} />
}
