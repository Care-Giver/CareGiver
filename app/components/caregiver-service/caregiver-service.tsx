import { View, Image } from "react-native"
import React from "react"
import { styles } from "./styles"

import { PreMed16 } from "../basics/custom-texts/custom-texts"
import { BODY } from "#theme"
import { Row } from "../basics/row/row"
import { images } from "#images"

export const CaregiverService = (props) => {
  const { style: viewStyle } = props
  const { emoji, label } = props

  return (
    <View style={viewStyle}>
      <Row style={styles.root}>
        {/* //* 이모지 */}
        <PreMed16 text={emoji} style={styles.emoji} />
        {/* //* 라벨(서비스 이름) */}
        <PreMed16 text={` ${label}`} color={BODY} />
      </Row>
    </View>
  )
}
