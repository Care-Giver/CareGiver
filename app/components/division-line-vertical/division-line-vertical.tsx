import { View } from "react-native"
import React from "react"
import { styles } from "./styles"
import { WIDTH } from "~/app/theme"

export const DivisionLineVertical = ({
  color = "red",
  width = WIDTH * 2,
  height,
  style: viewStyle,
}) => {
  const COLOR_AND_WIDTH_HEIGHT = {
    backgroundColor: color,
    width: width,
    height: height || "100%",
  }

  return <View style={[styles.root, COLOR_AND_WIDTH_HEIGHT, viewStyle]} />
}
