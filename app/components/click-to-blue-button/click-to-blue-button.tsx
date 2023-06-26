import React, { useState } from "react"
import { StyleProp, TouchableOpacity, ViewStyle, View, StyleSheet } from "react-native"
import { observer } from "mobx-react-lite"
import { PreMed14, PreReg14 } from "#components"
import { DISABLED, GIVER_CASUAL_NAVY } from "#theme"

export interface ClickToBlueButtonProps {
  /**
   * 추가적인 padding, margin 을 줌으로써, 위치를 조정할 수 있습니다.
   */
  style?: StyleProp<ViewStyle>

  /**
   * 버튼의 활성화 여부 (True -> 파란색 / False -> 회색으로 Border와 Text 색상이 변경)
   */
  isActiving: boolean

  /**
   * 버튼의 Text를 추가하여 사용할 수 있음
   */
  buttonText: string

  /**
   * 버튼의 Height을 사용자 마음대로 설정할 수 있음
   */
  buttonHeight: number

  /**
   * 버튼의 Width을 사용자 마음대로 설정할 수 있음
   */
  buttonWidth: number

  /**
   * 클릭시 적용되는 함수를 설정, Default 값은 setIsActive(!isActive)
   */
  onPress?: () => void
}

export const ClickToBlueButton = observer(function ClickToBlueButton(
  props: ClickToBlueButtonProps,
) {
  const {
    style,
    buttonText = "예시",
    buttonHeight,
    buttonWidth,
    isActiving = false,
    onPress,
  } = props
  const allStyles = Object.assign({}, style)

  const [isActive, setIsActive] = useState(isActiving)

  /**
   * onPress prop이 정의되어 있을 때 실행
   * 정의되어 있지 않으면 기본 동작 정의
   */
  const handlePress = () => {
    if (onPress) {
      onPress()
    } else {
      setIsActive(!isActive)
    }
  }

  const buttonStyle: ViewStyle = {
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
