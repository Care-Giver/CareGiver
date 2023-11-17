import React from "react"
import { View } from "react-native"
import { styles } from "./styles"
import { PreMed16 } from "../_BASIC/custom-texts/custom-texts"
import { BODY } from "#theme"
import { Row } from "../_BASIC/row/row"

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
