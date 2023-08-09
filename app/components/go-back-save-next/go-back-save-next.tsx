import * as React from "react"
import { StyleProp, View, ViewStyle, StyleSheet, Pressable } from "react-native"
import { observer } from "mobx-react-lite"
import { GIVER_CASUAL_NAVY } from "#theme"
import { PreBol16 } from "#components"

const ROOT: ViewStyle = {
  justifyContent: "center",
  flexDirection: "row",
}

export interface GoBackSaveNextProps {
  /**
   * 추가적인 padding, margin 을 줌으로써, 위치를 조정할 수 있습니다.
   */
  style?: StyleProp<ViewStyle>

  onPressGoback?: () => void
  onPressSaveNext?: () => void
}

export const GoBackSaveNext = observer(function GoBackSaveNext(props: GoBackSaveNextProps) {
  const { style, onPressGoback, onPressSaveNext } = props
  const allStyles = Object.assign({}, ROOT, style)

  return (
    <View style={allStyles}>
      {/* 이전 버튼 */}
      <Pressable style={styles.prebutton} onPress={onPressGoback}>
        <PreBol16 text={"이전"} color={"white"} />
      </Pressable>
      {/* 저장 후 다음단계 버튼 */}
      <Pressable style={styles.nextbutton} onPress={onPressSaveNext}>
        <PreBol16 text={"저장 후 다음단계"} color={"white"} />
      </Pressable>
    </View>
  )
})

const styles = StyleSheet.create({
  prebutton: {
    flex: 1,
    height: 56,
    backgroundColor: "#F1F1F4",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  nextbutton: {
    flex: 2.5,
    hegiht: 56,
    backgroundColor: GIVER_CASUAL_NAVY,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 7,
  },
})
