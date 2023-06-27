import React from "react"
import { StyleProp, ViewStyle, View, StyleSheet, Pressable, Image } from "react-native"
import { observer } from "mobx-react-lite"
import { RowRoundedBox } from "../../basics/row-rounded-box/row-rounded-box"
import { PreBol16, PreMed16 } from "../..//basics/custom-texts/custom-texts"
import { GIVER_CASUAL_NAVY } from "#theme"
import { images } from "#images"

export interface BookingCheckButtonProps {
  /**
   * 추가적인 padding, margin 을 줌으로써, 위치를 조정할 수 있습니다.
   */
  style?: StyleProp<ViewStyle>
  bookingCount?: Number
}

export const BookingCheckButton = observer(function BookingCheckButton(
  props: BookingCheckButtonProps,
) {
  const { style } = props
  const allStyles = Object.assign({}, styles.root, style)
  const innerText = () => {
    const onPress = () => {
      alert("클릭됨")
    }
    return (
      <View style={{ flexDirection: "row", display: "flex" }}>
        <PreMed16 style={{ marginLeft: 15, letterSpacing: -0.5 }}>
          {props.bookingCount}개의 새로 들어온 신청이 있어요!
        </PreMed16>
        <Pressable style={{ flexDirection: "row", marginLeft: 55 }} onPress={onPress}>
          <PreBol16 color={GIVER_CASUAL_NAVY}>확인하기</PreBol16>
          <Image
            source={images.arrow_right_navy}
            style={{ width: 16, height: 16, alignSelf: "center", marginLeft: 4 }}
          />
        </Pressable>
      </View>
    )
  }
  return (
    <View style={allStyles}>
      <Pressable>
        <RowRoundedBox
          preset="Pressable"
          style={{ borderColor: "#B1C9DE" }}
          children={innerText}
        ></RowRoundedBox>
      </Pressable>
    </View>
  )
})

const styles = StyleSheet.create({
  root: {},
})
