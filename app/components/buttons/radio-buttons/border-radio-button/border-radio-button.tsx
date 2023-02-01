import { View, Text, Pressable } from "react-native"
import React from "react"
import { BorderRadioButtonProps } from "./border-radio-button.props"
import { styles } from "./styles"
import { GIVER_CASUAL_NAVY, MIDDLE_LINE } from "#theme"

export const BorderRadioButton = (props: BorderRadioButtonProps) => {
  const { style, onPress, active } = props
  return (
    <Pressable
      style={[styles.root, { borderColor: active ? GIVER_CASUAL_NAVY : MIDDLE_LINE }, style]}
      onPress={onPress}
    >
      <Text style={{ color: active ? GIVER_CASUAL_NAVY : MIDDLE_LINE }}>{props.children}</Text>
    </Pressable>
  )
}
