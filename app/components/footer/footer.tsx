import React from "react"
import { StyleProp, ViewStyle, View, StyleSheet, FlexStyle } from "react-native"
import { observer } from "mobx-react-lite"
import { PreMed12, PreMed14, PreReg10, PreReg12 } from "../_BASIC/custom-texts/custom-texts"
import { BOTTOM_HEIGHT, SUB_HEAD_LINE } from "#theme"
import { BASIC_BACKGROUND_PADDING_WIDTH } from "../_BASIC/screen/screen"
import { BOTTOM_TAB_BAR_HEIGHT } from "../_BOTTOM_TAB_BAR/custom-tab-bar/custom-tab-bar"

export interface FooterProps {
  /**
   * 추가적인 padding, margin 을 줌으로써, 위치를 조정할 수 있습니다.
   */
  style?: StyleProp<ViewStyle>

  mt?: FlexStyle["marginTop"]
}

export const FOOTER_CONTENT_GAP = 100

export const Footer = observer(function Footer(props: FooterProps) {
  const { style, mt } = props
  const allStyles = Object.assign({}, styles.root, { marginTop: mt }, style)

  return (
    <View style={allStyles}>
      <View style={styles.topRow}>
        <PreMed14 text="Care Giver" color={SUB_HEAD_LINE} style={styles.col1} />
        <PreReg12 text="케어기버" color={SUB_HEAD_LINE} style={styles.col2} />
      </View>
      <View style={styles.row}>
        <PreMed12 text="대표자명" color={SUB_HEAD_LINE} style={styles.col1} />
        <PreReg10 text="김지우" color={SUB_HEAD_LINE} style={styles.col2} />
      </View>
      <View style={styles.row}>
        <PreMed12 text="사업자등록번호" color={SUB_HEAD_LINE} style={styles.col1} />
        <PreReg10 text="268-12-02005" color={SUB_HEAD_LINE} style={styles.col2} />
      </View>
      <View style={styles.row}>
        <PreMed12 text="전화번호" color={SUB_HEAD_LINE} style={styles.col1} />
        <PreReg10 text="0507-0177-5778" color={SUB_HEAD_LINE} style={styles.col2} />
      </View>
      <View style={styles.row}>
        <PreMed12 text="사업장 주소지" color={SUB_HEAD_LINE} style={styles.col1} />
        <PreReg10
          text="경기도 남양주시 진접읍 금강로 1530-14"
          color={SUB_HEAD_LINE}
          style={styles.col2}
        />
      </View>
    </View>
  )
})

const CONDITIONAL_BUTTON_HEIGHT = 56
const styles = StyleSheet.create({
  root: {
    rowGap: 10,
    width: "100%",
    height: 190 + BOTTOM_TAB_BAR_HEIGHT + CONDITIONAL_BUTTON_HEIGHT,
    backgroundColor: "#F1F1F4",
    paddingHorizontal: BASIC_BACKGROUND_PADDING_WIDTH,
    paddingTop: 20,
  },
  topRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  col1: {
    flex: 1,
    width: "auto",
  },
  col2: {
    flex: 3,
    width: "auto",
    paddingLeft: 12,
  },
})
