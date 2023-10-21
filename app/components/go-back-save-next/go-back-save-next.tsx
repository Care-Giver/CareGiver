import React from "react"
import { StyleProp, View, ViewStyle, StyleSheet, TouchableOpacity } from "react-native"
import { observer } from "mobx-react-lite"
import { CARE_NATURAL_BLUE, DBG, GIVER_CASUAL_NAVY } from "#theme"
import { PreBol16 } from "#components"

export interface GoBackSaveNextProps {
  /**
   * 추가적인 padding, margin 을 줌으로써, 위치를 조정할 수 있습니다.
   */
  style?: StyleProp<ViewStyle>

  onPressGoback: () => void
  onPressSaveNext: () => void

  isLastStep?: boolean
}

export const GoBackSaveNext = observer(function GoBackSaveNext(props: GoBackSaveNextProps) {
  const { style, onPressGoback, onPressSaveNext, isLastStep } = props
  const allStyles = Object.assign({}, styles.root, style)

  return (
    <View style={allStyles}>
      {/* 이전 버튼 */}
      <TouchableOpacity style={styles.goBack} onPress={onPressGoback}>
        <PreBol16 text={"이전"} color={"white"} />
      </TouchableOpacity>
      {/* 다음단계 버튼 */}
      <TouchableOpacity style={styles.saveNext} onPress={onPressSaveNext}>
        <PreBol16 text={isLastStep ? "완료하기" : "저장 후 다음단계"} color={"white"} />
      </TouchableOpacity>
    </View>
  )
})

const styles = StyleSheet.create({
  root: {
    justifyContent: "center",
    flexDirection: "row",
  },

  goBack: {
    flex: 1,
    height: 56,
    // backgroundColor: "#F1F1F4",
    // backgroundColor: DBG,
    backgroundColor: CARE_NATURAL_BLUE,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },

  saveNext: {
    flex: 2.5,
    hegiht: 56,
    backgroundColor: GIVER_CASUAL_NAVY,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 7,
  },
})
