import * as React from "react"
import { Pressable, PressableProps, StyleProp, ViewStyle, TextStyle } from "react-native"

interface PressableButtonProps extends PressableProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>
  isPressed?: boolean
  defaultViewStyle?: StyleProp<ViewStyle>
  pressedViewStyle?: StyleProp<ViewStyle>
  defaultTextStyle?: StyleProp<TextStyle>
  pressedTextStyle?: StyleProp<TextStyle>
  label?: string
  isDisabled?: boolean
}

export const PressableButton = (props: PressableButtonProps) => {
  // grab the props
  const {
    style,
    isPressed = false,
    defaultViewStyle,
    pressedViewStyle,
    defaultTextStyle,
    pressedTextStyle,
    label,
    isDisabled = false,
    children,
    ...rest
  } = props

  const viewStyle = isPressed ? pressedViewStyle : defaultViewStyle
  // const textStyle = isPressed ? pressedTextStyle : defaultTextStyle
  // const content = children || <Text style={textStyle}>{label} </Text>
  const content = children

  return (
    <Pressable style={[style, viewStyle]} {...rest} disabled={isDisabled}>
      {content}
    </Pressable>
  )
}
