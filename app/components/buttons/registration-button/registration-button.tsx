import { Pressable, Image, StyleProp, ViewStyle } from "react-native"
import React from "react"
import { RegistrationButtonProps } from "./registration-button.props"
import { styles } from "./styles"
import { images } from "#images"
import { DISABLED, GIVER_CASUAL_NAVY, LIGHT_LINE, color } from "#theme"
import { PreReg14 } from "#components"

export const RegistrationButton = (props: RegistrationButtonProps, { children }) => {
  const { text, isActive, onPress, onXPress, style } = props

  // * 버튼이 활성화 상태일 때 적용되는 스타일
  const activeStyle: StyleProp<ViewStyle> = {
    borderColor: GIVER_CASUAL_NAVY,
    borderWidth: 2,
    backgroundColor: GIVER_CASUAL_NAVY,
  }
  // * 버튼이 비활성화 상태일 때 적용되는 스타일
  const inactiveStyle: StyleProp<ViewStyle> = {
    borderColor: LIGHT_LINE,
    borderWidth: 2,
  }
  // * 활성화 | 비활성화 상태에 따라서 스타일을 다르게 지정
  const buttonStyle = isActive ? activeStyle : inactiveStyle

  return (
    // ? 버튼이 선택되지 않았을 때만 onPress 지정 (onPress -> 옵션을 '선택된 옵션' 배열에 추가하는 작업을 시행)
    <Pressable onPress={!isActive ? onPress : null} style={[styles.root, style, buttonStyle]}>
      <PreReg14 text={text} style={styles.text} color={isActive ? color.palette.white : DISABLED} />
      {isActive && (
        <Pressable style={styles.x_container} onPress={onXPress}>
          <Image source={images.x_white} defaultSource={images.x_white} style={styles.x_img} />
        </Pressable>
      )}
    </Pressable>
  )
}
