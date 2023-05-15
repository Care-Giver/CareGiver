import { StyleProp, ImageStyle, ImageProps } from "react-native"
export interface CustomModalProps {
  visibleState: boolean
  image: StyleProp<ImageProps>,
  title: string
  subtitle?: string
  yesBtnText: string
  noBtnText: string
  handleYesPress: () => any
  handleNoPress: () => any
}
