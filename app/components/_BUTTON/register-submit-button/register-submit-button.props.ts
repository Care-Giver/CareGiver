import { ViewStyle } from "react-native"

export interface RegisterSubmitButtonProps {
  isActive?: boolean
  text: string
  // ! 함수 타입 임시로 작성
  style?: ViewStyle
  onPress?: () => void
}
