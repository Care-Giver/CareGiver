import { View } from "react-native"
import React from "react"

import { BODY, HEAD_LINE, MIDDLE_LINE, DISABLED } from "#theme"

import { PreMed16, PreMed14, DivisionLine, BASIC_BACKGROUND_PADDING_WIDTH } from "#components"

export const UserOrPetProfileInfo = (props) => {
  //? props 를 이런 문법으로 쓰는 이유?
  //? 아래와 같은 방뻐과 좀 다름 https://react.vlpt.us/basic/05-props.html
  const { title, profileInfo, color } = props

  return (
    <View style={{ paddingHorizontal: BASIC_BACKGROUND_PADDING_WIDTH, paddingTop: 20 }}>
      <PreMed14 color={BODY} text={title} style={{ marginBottom: 10 }} />
      {/*<PreMed16 color={color} text={profileInfo} />*/}
      <PreMed16 color={color === true ? DISABLED : HEAD_LINE} text={profileInfo} />
      <DivisionLine color={MIDDLE_LINE} style={{ marginTop: 4 }} />
    </View>
  )
}
