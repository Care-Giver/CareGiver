import { StyleProp, TextStyle } from "react-native"

export interface TextInputProps {
  placeholder?: string
  placeholderColor?: string
  value: string
  handleChange: (value: any) => void
  style?: StyleProp<TextStyle>
}
