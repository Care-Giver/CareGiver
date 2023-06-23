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

  placeholdertext: string

  boxheight: number
}

export const PlaceHolderInputBox = observer(function PlaceHolderInputBox(
  props: PlaceHolderInputBoxProps,
) {
  const { style, placeholdertext = "예시입니다.", boxheight = 78 } = props
  const allStyles = Object.assign({}, styles.root, style)
  return (
    <View style={allStyles}>
      <TextInput
        style={[styles.input, { height: boxheight }]}
        placeholder={placeholdertext}
        multiline
        maxLength={1000}
        //1) 요청사항에 따라 maxLength도 따로 예외처리를 해줘야할지 고민이 된다.
        autoFocus={true}
      />
    </View>
  )
})

// paddingBottom 바텀은 해줄 필요가 없어 보인다. 오히려 방해될 것 같은 기분.
// width는 기본적으로 100%로해서 Input값을 받을 필요가 없어 보임.

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
    textAlignVertical: "top",
    fontFamily: PRETENDARD_REGULAR,
    fontSize: 14,
    //lineHeight: 20,
  },
})
