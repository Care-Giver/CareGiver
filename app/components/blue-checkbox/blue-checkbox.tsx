import React from "react"
import { Pressable, Image, ViewStyle } from "react-native"
import { images } from "#images"
import { BlueCheckboxProps } from "./blue-checkbox.props"

const ROOT: ViewStyle = {
  flexDirection: "row",
  // backgroundColor: "red",
}

export function BlueCheckbox(props: BlueCheckboxProps) {
  const { style, imageSize = 20 } = props
  const allStyles = Object.assign({}, ROOT, style)
  // const onPress = props.onToggle ? () => props.onToggle && props.onToggle(!props.value) : null
  const onPress = props.onPress

  return (
    <Pressable
      // activeOpacity={1}
      // disabled={!props.onToggle}
      onPress={onPress}
      style={allStyles}
      hitSlop={4} // 터치 영역 개선
    >
      <Image
        style={{ width: imageSize, height: imageSize }}
        source={props.value ? images.select_checkbox : images.deselect_checkbox}
      />
    </Pressable>
  )
}
