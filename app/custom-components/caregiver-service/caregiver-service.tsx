import { View, Image } from "react-native"
import React from "react"
import { styles } from "./styles"
import { HEIGHT, WIDTH } from "../../theme"
import { PreMed16 } from "../custom-texts/custom-texts"
import { BODY } from "../../theme/palette"
import { Row } from "../boxes/basics/row"
import IMAGES from "../../../assets/common-images"

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
