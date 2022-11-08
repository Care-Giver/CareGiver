import { StyleProp, TextStyle } from "react-native"

export interface BorderRadioButtonProps {
  style?: StyleProp<TextStyle>
  children?: any
  onPress?: () => any
  active: boolean
}
