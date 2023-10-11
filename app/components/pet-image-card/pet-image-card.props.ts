import { StyleProp, TextStyle } from "react-native"

export interface PetImageCardProps {
  petImageUri: string // URI string
  name: string
  style?: StyleProp<TextStyle>
}
