import { ViewStyle } from "react-native"

export interface RegisterSubmitButtonProps {
  isActive?: boolean
  text: string
  // ! 함수 타입 임시로 작성
  style?: ViewStyle
  onPress?: () => void

  //* 아래 코드는 교육용입니다 ^^
  // addition: (a: number, b: number)  => number
  // useState: (state: string) => void
}

// const addition = (a: number, b: number) => {
//   const added = a + b
//   return added
// }
