import React, { useState, useEffect } from "react"
import { StyleProp, TouchableOpacity, ViewStyle, View, StyleSheet } from "react-native"
import { observer } from "mobx-react-lite"
import { PreMed14, PreReg14 } from "#components"
import { DISABLED, GIVER_CASUAL_NAVY } from "#theme"

export interface ClickToBlueButtonProps {
  /**
   * 추가적인 padding, margin 을 줌으로써, 위치를 조정할 수 있습니다.
   */
  style?: StyleProp<ViewStyle>

  isActiving: boolean

  buttonText: string

  buttonHeight: number

  buttonWidth: number

  onPress?: () => void
}

export const ClickToBlueButton = observer(function ClickToBlueButton(
  props: ClickToBlueButtonProps,
) {
  const { style, buttonText, buttonHeight, buttonWidth, isActiving, onPress } = props
  const allStyles = Object.assign({}, style)

  const [isActive, setIsActive] = useState(isActiving)

  const handlePress = () => {
    if (onPress) {
      onPress() // onPress prop이 정의되어 있을 때 실행
    } else {
      // 기본 동작 정의
      setIsActive(!isActive)
    }
  }

  const buttonStyle = {
    borderColor: isActiving ? GIVER_CASUAL_NAVY : DISABLED,
  }

  return (
    <View style={allStyles}>
      <TouchableOpacity
        style={[styles.button, buttonStyle, { height: buttonHeight, width: buttonWidth }]}
        onPress={handlePress}
      >
        {isActiving ? (
          <PreMed14 text={buttonText} color={GIVER_CASUAL_NAVY} />
        ) : (
          <PreReg14 text={buttonText} color={DISABLED} />
        )}
      </TouchableOpacity>
    </View>
  )
})

const styles = StyleSheet.create({
  button: {
    borderRadius: 8,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
})
