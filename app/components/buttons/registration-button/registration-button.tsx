import { View, Text, Pressable, Image, StyleProp, TextStyle } from "react-native"
import React from "react"
import { RegistrationButtonProps } from "./registration-button.props"
import { styles } from "./styles"
import { IMAGES } from "#images/"
import { DISABLED, GIVER_CASUAL_NAVY, LIGHT_LINE } from "#theme/palette"
import { color } from "#theme/color"
import { PreReg14 } from "#components/basics/custom-texts/custom-texts"

export const RegistrationButton = (props: RegistrationButtonProps, { children }) => {
  const { text, isActive, onPress, onXPress, style } = props

  const activeStyle: StyleProp<TextStyle> = { backgroundColor: GIVER_CASUAL_NAVY }
  const inactiveStyle: StyleProp<TextStyle> = { borderColor: LIGHT_LINE, borderWidth: 2 }
  const buttonStyle = isActive ? activeStyle : inactiveStyle

  return (
    <Pressable onPress={onPress} style={[styles.root, style, buttonStyle]}>
      <PreReg14 text={text} color={isActive ? color.palette.white : DISABLED} />
      {isActive && (
        <Pressable onPress={onXPress}>
          <Image source={IMAGES.x_white} style={styles.x_img} />
        </Pressable>
      )}
    </Pressable>
  )
}
