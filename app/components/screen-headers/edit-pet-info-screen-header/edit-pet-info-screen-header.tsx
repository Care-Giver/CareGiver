import * as React from "react"
import { StyleProp, View, ViewStyle, Image, Pressable } from "react-native"
import { observer } from "mobx-react-lite"
import { PreMed18 } from "#components"
import { styles } from "./styles"
import { images } from "#images"
import { HEADER_ROOT } from "../common-styles"
import { useNavigation, useRoute } from "@react-navigation/native"
import { goBack } from "#navigators"

export interface EditPetInfoScreenHeaderProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>
}

export const EditPetInfoScreenHeader = observer(function EditPetInfoScreenHeader(
  props: EditPetInfoScreenHeaderProps,
) {
  const { style } = props
  const _styles = Object.assign({}, styles, style)

  return <View style={_styles}>{/* 해피코딩^^ */}</View>
})
