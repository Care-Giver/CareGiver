import React from "react"
import { StyleProp, ViewStyle, View, StyleSheet, Pressable, Image } from "react-native"
import { observer } from "mobx-react-lite"
import { RowRoundedBox } from "../../basics/row-rounded-box/row-rounded-box"
import { PreBol16, PreMed16 } from "../..//basics/custom-texts/custom-texts"
import { CARE_NATURAL_BLUE, GIVER_CASUAL_NAVY } from "#theme"
import { images } from "#images"

export interface BookingCheckButtonProps {
  /**
   * 추가적인 padding, margin 을 줌으로써, 위치를 조정할 수 있습니다.
   */
  style?: StyleProp<ViewStyle>

  /**
   * 새로 들어온 예약의 개수입니다.
   */
  bookingCount?: number
}

export const BookingCheckButton = observer(function BookingCheckButton(
  props: BookingCheckButtonProps,
) {
  const { style, bookingCount } = props
  const allStyles = Object.assign({}, styles.root, style)

  const onPress = () => {
    alert("클릭됨")
  }

  return (
    <RowRoundedBox style={allStyles}>
      <PreMed16
        style={{ marginLeft: 15, letterSpacing: -0.5 }}
        text={`${bookingCount}개의 새로 들어온 신청이 있어요!`}
      />
      <Pressable style={{ flexDirection: "row", marginLeft: 55 }} onPress={onPress}>
        <PreBol16 color={GIVER_CASUAL_NAVY} text="확인하기" />
        <Image
          source={images.arrow_right_navy}
          style={{ width: 16, height: 16, alignSelf: "center", marginLeft: 4 }}
        />
      </Pressable>
    </RowRoundedBox>
  )
})

const styles = StyleSheet.create({
  root: { borderColor: CARE_NATURAL_BLUE, flexDirection: "row", display: "flex" },
})
