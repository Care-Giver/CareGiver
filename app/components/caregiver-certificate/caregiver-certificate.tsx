import { View, Image, Pressable } from "react-native"
import React from "react"
import { styles } from "./styles"
import { HEIGHT, WIDTH } from "#theme/index"
import { PreReg12, PreReg16 } from "../basics/custom-texts/custom-texts"
import { SUB_HEAD_LINE } from "#theme/palette"
import { Row } from "../basics/row/row"
import IMAGES from "#images"

export const CaregiverCertificate = (props) => {
  const { style: viewStyle } = props
  const { label, detail } = props

  return (
    <View style={viewStyle}>
      <Row style={styles.root}>
        {/* //* 뱃지 */}
        <Image source={IMAGES.certificate_badge} style={styles.badgeImage} />

        {/* //* 라벨(자격증 이름) */}
        <PreReg16
          text={label}
          color={SUB_HEAD_LINE}
          style={{ marginLeft: WIDTH * 4, marginRight: WIDTH * 4 }}
        />

        {/* //* ⓘ */}
        <Pressable
          onPress={() => {
            alert(detail)
          }}
        >
          <Image source={IMAGES.more_info} style={styles.moreInfoImage} />
          {/* <PreReg12
            text={detail}
            color={BODY}
            style={{ marginLeft: "auto", marginRight: WIDTH * 13 }}
          /> */}
        </Pressable>
      </Row>
    </View>
  )
}
