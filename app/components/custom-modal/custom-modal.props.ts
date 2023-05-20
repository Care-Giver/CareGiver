import { ImageSourcePropType, TextStyle } from "react-native"
export interface CustomModalProps {
  visibleState: boolean
  image: ImageSourcePropType
  title: string
  subtitle?: string

  /**
   * subtitle 에 추가적인 스타일링이 필요하다면 입력해주세요 :)
   */
  subtitleStyle?: TextStyle
  yesBtnText: string
  noBtnText: string
  handleYesPress: () => any
  handleNoPress: () => any
}
