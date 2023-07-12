import {
  GestureResponderEvent,
  StyleProp,
  TextProps as TextProperties,
  TextStyle,
} from "react-native"
import i18n from "i18n-js"
import { TextPresets } from "./text.presets"
import { TxKeyPath } from "../../../../i18n"

type TargetTextProperties = "numberOfLines" | "ellipsizeMode"

export interface CustomTextProps extends Pick<TextProperties, TargetTextProperties> {
  /**
   * 텍스트 입력 시에는 이 prop 대신, text prop 을 사용해주세요
   * Children components.
   */
  children?: React.ReactNode

  /**
   * i18n 옵션입니다 (사용하지 마세요)
   * Text which is looked up via i18n.
   */
  tx?: TxKeyPath

  /**
   * i18n 옵션입니다 (사용하지 마세요)
   * Optional options to pass to i18n. Useful for interpolation
   * as well as explicitly setting locale or translation fallbacks.
   */
  txOptions?: i18n.TranslateOptions

  /**
   * 텍스트를 입력해주세요.
   * The text to display if not using `tx` or nested components.
   */
  text?: string

  /**
   * 텍스트에 추가 style 을 줍니다.
   * - 색상만 주는 경우에는 color prop 을 사용해주세요
   * - 마진을 주는 경우에는 mt, mb, mv, ml, mr, mh prop 을 사용해주세요
   * - 그 외, 나머지 경우에만 style prop 을 사용해주세요 :)
   */
  style?: StyleProp<TextStyle>

  /**
   * 텍스트의 색상을 부여합니다. 이 색상은 style 로 준 색상을 무시하고, 우선되어 적용됩니다.
   */
  color?: string

  /**
   * marginTop
   */
  mt?: number

  /**
   * marginBottom
   */
  mb?: number

  /**
   * marginVertical (mt, mb 사용시, 무시됩니다)
   */
  mv?: number

  /**
   * marginLeft
   */
  ml?: number

  /**
   * marginRight
   */
  mr?: number

  /**
   * marginHorizontal (mr, ml 사용시, 무시됩니다)
   */
  mh?: number

  /**
   * 텍스트 컴포넌트도 onPress prop 을 갖을 수 있습니다.
   */
  onPress?: ((event: GestureResponderEvent) => void) | undefined
}

export interface TextProps extends TextProperties, CustomTextProps {
  /**
   * 텍스트의 크기입니다. (사용하지 마세요)
   */
  size?: number

  /**
   * One of the different types of text presets.
   */
  preset?: TextPresets
}
