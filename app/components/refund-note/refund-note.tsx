import React from "react"
import { StyleProp, ViewStyle, View, StyleSheet } from "react-native"
import { observer } from "mobx-react-lite"
import { BASIC_BACKGROUND_PADDING_WIDTH } from "../_BASIC/screen/screen"
import { GIVER_CASUAL_NAVY, HEAD_LINE, LBG, SUB_HEAD_LINE } from "#theme"
import { PreBol14, PreReg14 } from "../_BASIC/custom-texts/custom-texts"

export interface RefundNoteProps {
  /**
   * 추가적인 padding, margin 을 줌으로써, 위치를 조정할 수 있습니다.
   */
  style?: StyleProp<ViewStyle>
}

/**
 * 환불 정보 UI 입니다.
 */
export const RefundNote = observer(function RefundNote(props: RefundNoteProps) {
  const { style } = props
  const allStyles = Object.assign({}, styles.root, style)

  return (
    <View style={allStyles}>
      <PreReg14 color={SUB_HEAD_LINE} style={{ lineHeight: 20 }}>
        - 케어 시작 <PreBol14 color={HEAD_LINE}>72~24시간 전</PreBol14>까지:{" "}
        <PreBol14 color={HEAD_LINE}>70%</PreBol14> 환불
        {"\n"}- 케어 시작 <PreBol14 color={HEAD_LINE}>24~12시간 전</PreBol14>까지:{" "}
        <PreBol14 color={HEAD_LINE}>20%</PreBol14> 환불
        {"\n"}- 케어 시작 <PreBol14 color={HEAD_LINE}>12시간 이내</PreBol14>:{" "}
        <PreBol14 color={GIVER_CASUAL_NAVY}>환불 불가</PreBol14>
        {"\n\n"}※ 펫시터가 예약을 취소한 경우{" "}
        <PreBol14 color={GIVER_CASUAL_NAVY}>100% 환불</PreBol14>을 받으실 수 있습니다.
        {"\n"}※ 펫시터의 돌봄 진행에 문제가 발생한 경우, 케어 종료 후 24시간 이내에 케어기버
        고객센터에 신고를 진행해주셔야 합니다.{"\n"}※ 케어기버 고객센터에서 문제 파악 후, 심사를
        통해 최종적으로 환불 및 보상 방안이 결정됩니다.
      </PreReg14>
    </View>
  )
})

const styles = StyleSheet.create({
  root: {
    width: "100%",
    paddingTop: 8,
    paddingHorizontal: BASIC_BACKGROUND_PADDING_WIDTH,
    paddingBottom: 20,
    backgroundColor: LBG,
    borderRadius: 8,
  },
})
