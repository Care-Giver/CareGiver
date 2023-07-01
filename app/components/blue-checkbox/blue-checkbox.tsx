import * as React from "react"
import { Pressable, Image, ViewStyle, ImageStyle } from "react-native"
import { images } from "#images"
import { BlueCheckboxProps } from "./blue-checkbox.props"

const ROOT: ViewStyle = {
  flexDirection: "row",
  // backgroundColor: "red",
}

const IMAGE: ImageStyle = {
  width: 20,
  height: 20,
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
        source={props.value ? images.select_checkbox : images.deselect_checkbox}
      />
    </Pressable>
  )
}
