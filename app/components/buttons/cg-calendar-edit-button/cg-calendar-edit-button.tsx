import * as React from "react"
import { FlexStyle, Pressable, StyleProp, View, ViewStyle } from "react-native"
import { observer } from "mobx-react-lite"
import { PreBol16 } from "../../../../app/components/basics/custom-texts/custom-texts"
import { styles } from "./styles"

export interface CgCalendarEditButtonProps {
  /**
   * 추가적인 padding, margin 을 줌으로써, 위치를 조정할 수 있습니다.
   */
  style?: StyleProp<ViewStyle>
  title?: string
}

export const CgCalendarEditButton = observer(function CgCalendarEditButton(
  props: CgCalendarEditButtonProps,
) {
  const { style, title } = props
  const $subStyle = Object.assign({}, style)

  return (
    <Pressable style={[styles.root, $subStyle]}>
      <PreBol16 text={title} color="#00206C" />
    </Pressable>
  )
})
