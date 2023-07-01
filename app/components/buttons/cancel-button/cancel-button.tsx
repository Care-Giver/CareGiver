import * as React from "react"
import { Pressable, StyleProp, View, ViewStyle } from "react-native"
import { observer } from "mobx-react-lite"
import { styles } from "./styles"
import { PreMed12 } from "../../../../app/components/basics/custom-texts/custom-texts"
export interface CancelButtonProps {
  /**
   * 추가적인 padding, margin 을 줌으로써, 위치를 조정할 수 있습니다.
   */
  style?: StyleProp<ViewStyle>
  title?: string
  textcolor?: string
}

export const CancelButton = observer(function CancelButton(props: CancelButtonProps) {
  const { style, title, textcolor } = props
  const $subStyle = Object.assign({}, style)

  return (
    <Pressable style={[styles.root, $subStyle]}>
      <PreMed12
        text={title}
        color={textcolor}
        style={{ width: 58, height: 23, paddingVertical: 4, textAlign: "center" }}
      />
    </Pressable>
  )
})
