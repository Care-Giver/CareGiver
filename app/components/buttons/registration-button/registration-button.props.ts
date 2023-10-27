import { StyleProp, TextStyle } from "react-native"

export interface RegistrationButtonProps {
  text: string
  isActive: boolean
  onPress: () => void
  onXPress: () => void
  style?: StyleProp<TextStyle>
  alwaysActive?: boolean
}
