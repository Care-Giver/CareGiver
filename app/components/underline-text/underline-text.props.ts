import { StyleProp, ViewStyle } from "react-native"

export interface UnderlineTextProps {
  text: string
  textColor?: string
  underlineHeight?: number
  underlineColor?: string
  style?: StyleProp<ViewStyle>
}
