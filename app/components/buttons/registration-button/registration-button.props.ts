import { StyleProp, TextStyle } from "react-native"

export interface RegistrationButtonProps {
  text: string
  isActive: boolean
  onPress: () => any
  onXPress: () => any
  style?: StyleProp<TextStyle>
}
