import * as React from "react"
import { Pressable, StyleProp, View, ViewStyle } from "react-native"
import { observer } from "mobx-react-lite"
import { PreBol16 } from "../../../../app/components/basics/custom-texts/custom-texts"

const ROOT: ViewStyle = {
  justifyContent: "center",
}

export interface CgCalendarEditButtonProps {
  /**
   * 추가적인 padding, margin 을 줌으로써, 위치를 조정할 수 있습니다.
   */
  style?: StyleProp<ViewStyle>
}

export const CgCalendarEditButton = observer(function CgCalendarEditButton(
  props: CgCalendarEditButtonProps,
) {
  const { style } = props
  const styles = Object.assign({}, ROOT, style)

  return (
    <Pressable style={styles}>
      <PreBol16 text={"bb"} />
    </Pressable>
  )
})
