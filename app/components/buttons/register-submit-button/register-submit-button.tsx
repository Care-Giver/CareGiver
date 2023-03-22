import React from "react"
import { PressableButton } from "../pressable-button/pressable-button"
import { styles } from "./styles"
import { RegisterSubmitButtonProps } from "./register-submit-button.props"
import { PreBol16 } from "#components"
import { color } from "#theme"

export const RegisterSubmitButton = (props: RegisterSubmitButtonProps) => {
  const { isActive, text, onPress } = props

  return (
    <PressableButton
      style={[
        styles.submitBtn,
        { backgroundColor: isActive || isActive === undefined ? "#00196C" : "#F1F1F4" },
      ]}
      // ? submit 버튼이 active 상태가 아닐 때는 이벤트 헨들러를 지정하지 않는다.
      onPress={isActive || isActive === undefined ? onPress : null}
    >
      <PreBol16 text={text} color={color.palette.white} />
    </PressableButton>
  )
}
