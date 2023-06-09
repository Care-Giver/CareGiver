import React from "react"
import { StyleProp, View, ViewStyle, StyleSheet } from "react-native"
import { observer } from "mobx-react-lite"
import { PreBol12, PreBol14, PreReg12 } from "../basics/custom-texts/custom-texts"
import { GIVER_CASUAL_NAVY, BODY, SUB_HEAD_LINE } from "#theme"

export interface PhotoRegistrationNoteProps {
  /**
   * 추가적인 padding, margin 을 줌으로써, 위치를 조정할 수 있습니다.
   */
  style?: StyleProp<ViewStyle>
}

export const PhotoRegistrationNote = observer(function PhotoRegistrationNote(
  props: PhotoRegistrationNoteProps,
) {
  const { style } = props
  const allStyles = Object.assign({}, styles.root, style)

  return (
    <View style={allStyles}>
      <PreBol14 text="사진 등록 전, 잠깐!" color={GIVER_CASUAL_NAVY} mb={8} />
      <PreReg12 color={BODY} style={{ lineHeight: 18 }}>
        사진은 최대
        <PreBol12 text=" 10장" color={SUB_HEAD_LINE} />
        까지 등록 가능합니다.
      </PreReg12>
      <PreReg12
        color={BODY}
        style={{ lineHeight: 18 }}
        text={`위탁 장소의 여러 공간을 보여줄수록, 사진의 화질이 좋을 수록 매칭\n확률이 올라갑니다!`}
      />
    </View>
  )
})

const styles = StyleSheet.create({
  root: {
    width: 358,
    height: 100,
    backgroundColor: "#F8F8FA",
    paddingVertical: 16,
    paddingHorizontal: 12,
    justifyContent: "center",
  },
})
