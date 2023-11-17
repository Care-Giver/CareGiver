import React from "react"
import { View, Image, Pressable } from "react-native"
import { styles } from "./styles"
import { PreReg16 } from "../_BASIC/custom-texts/custom-texts"
import { SUB_HEAD_LINE } from "#theme"
import { Row } from "../_BASIC/row/row"
import { images } from "#images"

export const CaregiverCertificate = (props) => {
  const { style: viewStyle } = props
  const { label, detail } = props

  return (
    <View style={viewStyle}>
      <Row style={styles.root}>
        {/* //* 뱃지 */}
        <Image source={images.certificate_badge} style={styles.badgeImage} />

        {/* //* 라벨(자격증 이름) */}
        <PreReg16 text={label} color={SUB_HEAD_LINE} style={{ marginLeft: 4, marginRight: 4 }} />

        {/* //* ⓘ */}
        <Pressable
          onPress={() => {
            alert(detail)
          }}
        >
          <Image source={images.more_info} style={styles.moreInfoImage} />
          {/* <PreReg12
            text={detail}
            color={BODY}
            style={{ marginLeft: "auto", marginRight: 13 }}
          /> */}
        </Pressable>
      </Row>
    </View>
  )
}
