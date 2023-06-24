import React from "react"
import { StyleProp, ViewStyle, View, TextInput, StyleSheet } from "react-native"
import { observer } from "mobx-react-lite"
import { DISABLED, LBG } from "#theme"
import { PRETENDARD_REGULAR } from "#fonts"

export interface PlaceHolderInputBoxProps {
  /**
   * 추가적인 padding, margin 을 줌으로써, 위치를 조정할 수 있습니다.
   */
  style?: StyleProp<ViewStyle>

  /* 입력하기 전에 연하게 적혀져 있는 텍스트를 props로 추가하여 사용할 수 있습니다. */
  placeholderText: string

  /* 기본적으로 Width는 100%이며 Height는 값을 추가하여 사용할 수 있습니다. */
  boxHeight: number
}

export const PlaceHolderInputBox = observer(function PlaceHolderInputBox(
  props: PlaceHolderInputBoxProps,
) {
  const { style, placeholderText = "예시입니다.", boxHeight = 78 } = props
  const allStyles = Object.assign({}, styles.root, style)
  return (
    <View style={allStyles}>
      <TextInput
        style={[styles.input, { height: boxHeight }]}
        placeholder={placeholderText}
        multiline
        maxLength={300}
        autoFocus={true}
      />
    </View>
  )
})

const styles = StyleSheet.create({
  root: {},
  input: {
    placeholderTextColor: DISABLED,
    width: "100%",
    borderRadius: 8,
    paddingTop: 15,
    paddingHorizontal: 18,
    borderWidth: 1,
    opacity: 1,
    borderColor: LBG,
    backgroundColor: LBG,
    color: "black",
    fontFamily: PRETENDARD_REGULAR,
    fontSize: 14,
    //textAlignVertical: "top",
  },
})
