import * as React from "react"
import { StyleProp, View, ViewStyle } from "react-native"
import { observer } from "mobx-react-lite"
import { PreReg14 } from "#components"
import { styles } from "./styles"

//*edit-mypage-screen, edit-pet-info-screen 에서 닉네임, 이름 등의 input 받을때 사용 .
//*재사용 할때 어떻게 refactor 할지 추후 고민 필요

export interface CustomInputModalProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>
}

export const CustomInputModal = observer(function CustomInputModal(props: CustomInputModalProps) {
  const { style } = props
  const _styles = Object.assign({}, styles, style)

  return <View style={_styles}>{/* 해피코딩^^ */}</View>
})
