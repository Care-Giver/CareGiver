import * as React from "react"
import { Pressable, Text, PressableProps } from "react-native"

//- TODO: CustomPressableProps 만들기
export const PressableButton = (props: PressableProps) => {
  // grab the props
  const {
    isPressed = false,
    defaultViewStyle,
    pressedViewStyle,
    defaultTextStyle,
    pressedTextStyle,
    label,
    children,
    isDisabled,
    ...rest
  } = props

  const viewStyle = isPressed ? pressedViewStyle : defaultViewStyle
  // const textStyle = isPressed ? pressedTextStyle : defaultTextStyle
  // const content = children || <Text style={textStyle}>{label} </Text>
  const content = children

  return (
    <Pressable style={viewStyle} {...rest} disabled={isDisabled}>
      {content}
    </Pressable>
  )
}
