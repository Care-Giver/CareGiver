import * as React from "react"
import { StyleProp, View, ViewStyle, StyleSheet, Pressable } from "react-native"
import { observer } from "mobx-react-lite"
import { GIVER_CASUAL_NAVY, white } from "#theme"
import { PreBol16 } from "#components"

const ROOT: ViewStyle = {
  justifyContent: "center",
  flexDirection: "row",
  paddingHorizontal: 16,
  paddingVertical: 8,
}

export interface GoBackSaveNextProps {
  /**
   * 추가적인 padding, margin 을 줌으로써, 위치를 조정할 수 있습니다.
   */
  style?: StyleProp<ViewStyle>
}

export const GoBackSaveNext = observer(function GoBackSaveNext(props: GoBackSaveNextProps) {
  const { style } = props
  const styles = Object.assign({}, ROOT, style)

  return (
    <View style={styles}>
      {/* 이전 버튼 */}
      <Pressable
        style={_styles.prebutton}
        onPress={() => {
          alert("이전 버튼이 눌렸습니다.")
        }}
      >
        <PreBol16 text={"이전"} color={"white"} />
      </Pressable>
      {/* 저장 후 다음단계 버튼 */}
      <Pressable
        style={_styles.nextbutton}
        onPress={() => {
          alert("저장 후 다음단계 버튼이 눌렸습니다.")
        }}
      >
        <PreBol16 text={"저장 후 다음단계"} color={"white"} />
      </Pressable>
    </View>
  )
})
const _styles = StyleSheet.create({
  prebutton: {
    width: 101,
    height: 56,
    backgroundColor: "#F1F1F4",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  nextbutton: {
    width: 250,
    hegiht: 56,
    backgroundColor: GIVER_CASUAL_NAVY,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 7,
  },
})
