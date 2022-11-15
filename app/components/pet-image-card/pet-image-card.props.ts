import { ImageSourcePropType, StyleProp, TextStyle } from "react-native"

export interface PetImageCardProps {
  petImage: ImageSourcePropType
  name: string
  style?: StyleProp<TextStyle>
}
