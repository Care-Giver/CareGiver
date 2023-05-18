import { ImageSourcePropType } from "react-native"
export interface CustomModalProps {
  visibleState: boolean
  image: ImageSourcePropType,
  title: string
  subtitle?: string
  yesBtnText: string
  noBtnText: string
  handleYesPress: () => any
  handleNoPress: () => any
}
