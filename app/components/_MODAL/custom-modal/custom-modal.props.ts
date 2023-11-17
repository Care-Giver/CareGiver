import { ImageSourcePropType, TextStyle } from "react-native"
export interface CustomModalProps {
  visibleState: boolean

  /**
   * modal 이미지
   */
  image: ImageSourcePropType

  /**
   * 이미지 가로길이
   */
  imageWidth: number

  /**
   * 이미지 높이
   */
  imageHeight: number

  /**
   * modal 제목
   */
  title: string

  /**
   * modal 설명 - 제목 하단에 설명이 추가됩니다
   */
  subtitle?: string

  /**
   * subtitle 에 추가적인 스타일링이 필요하다면 입력해주세요 :)
   */
  subtitleStyle?: TextStyle

  /**
   * 좌측버튼[YES] 텍스트
   */
  yesBtnText: string

  /**
   * 우측버튼[NO] 텍스트
   */
  noBtnText: string

  /**
   * 좌측버튼[YES] 클릭시 액션
   */
  handleYesPress: () => any

  /**
   * 우측버튼[NO] 클릭시 액션
   */
  handleNoPress: () => any
}
