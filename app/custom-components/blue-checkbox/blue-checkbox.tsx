import * as React from "react"
import { Pressable, Image, View, ViewStyle } from "react-native"
import IMAGES from "../../../assets/common-images"
import { color, HEIGHT, spacing, WIDTH } from "../../theme"
import { BlueCheckboxProps } from "./blue-checkbox.props"

const ROOT: ViewStyle = {
  flexDirection: "row",
  // backgroundColor: "red",
}

const IMAGE: ViewStyle = {
  width: WIDTH * 20,
  height: HEIGHT * 20,
}

export function BlueCheckbox(props: BlueCheckboxProps) {
  const rootStyle = [ROOT, props.style]

  // const onPress = props.onToggle ? () => props.onToggle && props.onToggle(!props.value) : null
  const onPress = props.onPress

  return (
    <Pressable
      // activeOpacity={1}
      // disabled={!props.onToggle}
      onPress={onPress}
      style={rootStyle}
    >
      <Image
        style={IMAGE}
        source={props.value ? IMAGES.select_checkbox : IMAGES.deselect_checkbox}
      />
    </Pressable>
  )
}
