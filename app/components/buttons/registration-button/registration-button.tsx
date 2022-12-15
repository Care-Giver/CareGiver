import { View, Text, Pressable, Image, StyleProp, TextStyle } from "react-native"
import React from "react"
import { RegistrationButtonProps } from "./registration-button.props"
import { styles } from "./styles"
import { IMAGES } from "#images/"
import { DISABLED, GIVER_CASUAL_NAVY, LIGHT_LINE } from "#theme/palette"
import { color } from "#theme/color"
import { PreBol12, PreReg14 } from "#components/basics/custom-texts/custom-texts"

export const RegistrationButton = (props: RegistrationButtonProps, { children }) => {
  const { text, isActive, onPress, onXPress, style } = props

  // * 버튼이 활성화 상태일 때 적용되는 스타일
  const activeStyle: StyleProp<TextStyle> = {
    borderColor: GIVER_CASUAL_NAVY,
    borderWidth: 2,
    backgroundColor: GIVER_CASUAL_NAVY,
  }
  // * 버튼이 비활성화 상태일 때 적용되는 스타일
  const inactiveStyle: StyleProp<TextStyle> = { borderColor: LIGHT_LINE, borderWidth: 2 }
  // * 활성화 | 비활성화 상태에 따라서 스타일을 다르게 지정
  const buttonStyle = isActive ? activeStyle : inactiveStyle

  return (
    // ? 버튼이 선택되지 않았을 때만 onPress 지정 (onPress -> 옵션을 '선택된 옵션' 배열에 추가하는 작업을 시행)
    <Pressable onPress={!isActive ? onPress : null} style={[styles.root, style, buttonStyle]}>
      <PreReg14 text={text} color={isActive ? color.palette.white : DISABLED} />
      {isActive && (
        <Pressable onPress={onXPress}>
          {/* <Image source={IMAGES.x_white} style={styles.x_img} /> */}
          <PreBol12 text="X" />
        </Pressable>
      )}
    </Pressable>
  )
}
