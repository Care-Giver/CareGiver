import React from "react"
import { StyleProp, ViewStyle, View, StyleSheet, TouchableOpacity, Image } from "react-native"
import { observer } from "mobx-react-lite"
import { images } from "#images"
import { PreMed16 } from "../basics/custom-texts/custom-texts"

export const BookingCancelReasons = [
  "예약이 필요없어졌어요.",
  "실수로 예약했어요.",
  "펫시터가 마음에 들지 않아요.",
  "기타(직접 입력 / 최대 30자)",
]

export type ReasonType = typeof BookingCancelReasons[number]

export interface SelectReasonProps {
  /**
   * 추가적인 padding, margin 을 줌으로써, 위치를 조정할 수 있습니다.
   */
  style?: StyleProp<ViewStyle>

  /**
   * 취소 사유
   */
  reason: ReasonType

  /**
   * 선택된 취소 사유
   */
  selected: ReasonType

  setSelected: (reason: ReasonType) => void
}

/**
 * 거절 사유를 선택하는 바텀 시트에 들어가는 컴포넌트 입니다.
 */
export const SelectReason = observer(function SelectReason(props: SelectReasonProps) {
  const { style, reason, selected, setSelected } = props
  const allStyles = Object.assign({}, styles.root, style)

  return (
    <View style={allStyles}>
      <TouchableOpacity style={styles.reason} onPress={() => setSelected(reason)}>
        <Image
          style={styles.radio}
          source={selected === reason ? images.radio_active : images.radio_inactive}
        />
        <PreMed16 text={reason} />
      </TouchableOpacity>
    </View>
  )
})

const styles = StyleSheet.create({
  root: {
    paddingLeft: 16,
  },
  reason: {
    flexDirection: "row",
    marginBottom: 20,
    alignItems: "center",
  },
  radio: {
    width: 16,
    height: 16,
    marginRight: 8,
  },
})
