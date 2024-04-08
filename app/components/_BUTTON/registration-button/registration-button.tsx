import { Pressable, Image, StyleProp, ViewStyle } from "react-native"
import React from "react"
import { RegistrationButtonProps } from "./registration-button.props"
import { activeStyle, alwaysActiveStyle, inactiveStyle, styles } from "./styles"
import { images } from "#images"
import { DISABLED, GIVER_CASUAL_NAVY, HEAD_LINE, LIGHT_LINE, color } from "#theme"
import { PreReg14 } from "#components"

export const RegistrationButton = (props: RegistrationButtonProps, { children }) => {
  const { text, isActive, onPress, onXPress, style, alwaysActive = false } = props

  // * 활성화 | 비활성화 상태에 따라서 스타일을 다르게 지정
  const buttonStyle = alwaysActive ? alwaysActiveStyle : isActive ? activeStyle : inactiveStyle

  return (
    // ? 버튼이 선택되지 않았을 때만 onPress 지정 (onPress -> 옵션을 '선택된 옵션' 배열에 추가하는 작업을 시행)
    <Pressable onPress={!isActive ? onPress : null} style={[styles.root, style, buttonStyle]}>
      <PreReg14
        text={text}
        numberOfLines={1}
        adjustsFontSizeToFit={true}
        color={alwaysActive ? color.palette.white : isActive ? HEAD_LINE : DISABLED}
      />
      {isActive && !alwaysActive && (
        <Pressable style={styles.x_container} onPress={onXPress}>
          <Image source={images.x_grey} defaultSource={images.x_grey} style={styles.x_img} />
        </Pressable>
      )}
    </Pressable>
  )
}
