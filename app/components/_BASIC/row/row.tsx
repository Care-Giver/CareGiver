import React, { ReactNode } from "react"
import { Pressable, PressableProps, StyleProp, View, ViewStyle } from "react-native"
import { styles } from "../common-styles"

interface RowProps {
  children: ReactNode

  style?: StyleProp<ViewStyle>

  onPress?: PressableProps["onPress"]

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
}

export const Row = (props: RowProps) => {
  const { children, onPress, style, mt, mb, mv, ml, mr, mh } = props
  const Wrapper = onPress ? Pressable : View
  const $style = Object.assign(
    {},
    {
      marginVertical: mv,
      marginHorizontal: mh,
      marginTop: mt,
      marginBottom: mb,
      marginLeft: ml,
      marginRight: mr,
    },
  )

  return (
    <Wrapper style={[styles.ROW_PRESET, $style, style]} onPress={onPress}>
      {children}
    </Wrapper>
  )
}
