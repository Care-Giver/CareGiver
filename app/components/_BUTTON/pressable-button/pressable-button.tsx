import _ from "lodash"
import * as React from "react"
import { TouchableOpacity, PressableProps, StyleProp, ViewStyle, TextStyle } from "react-native"

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
    onPress,
    ...rest
  } = props

  const viewStyle = isPressed ? pressedViewStyle : defaultViewStyle
  // const textStyle = isPressed ? pressedTextStyle : defaultTextStyle
  // const content = children || <Text style={textStyle}>{label} </Text>
  const content = children

  return (
    <TouchableOpacity
      style={[style, viewStyle]}
      onPress={_.debounce(onPress, 300)}
      disabled={isDisabled}
      {...rest}
    >
      {content}
    </TouchableOpacity>
  )
}
