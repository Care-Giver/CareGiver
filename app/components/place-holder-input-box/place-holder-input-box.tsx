import React, { Dispatch, SetStateAction, useState } from "react"
import { StyleProp, ViewStyle, TextInput, StyleSheet, View } from "react-native"
import { observer } from "mobx-react-lite"
import { DISABLED, LBG } from "#theme"
import { PRETENDARD_REGULAR } from "#fonts"
import { Text } from "../basics/ignite-basics"

export interface PlaceHolderInputBoxProps {
  /**
   * 추가적인 padding, margin 을 줌으로써, 위치를 조정할 수 있습니다.
   */
  style?: StyleProp<ViewStyle>

  /**
   * 입력하기 전에 연하게 적혀져 있는 Text를 props로 추가하여 사용할 수 있습니다.
   */
  placeholderText: string

  /**
   * 기본적으로 Width는 100%이며 Height는 값을 추가하여 사용할 수 있습니다.
   */
  boxHeight: number

  /**
   * 기본적으로 Width는 100%이며 Height는 값을 추가하여 사용할 수 있습니다.
   */
  onPressIn?: () => void

  /**
   * 상위 컴포넌트(make-booking-screen) 에서 받아오는 text, setText
   */
  text: string
  setText: Dispatch<SetStateAction<any>>
}

export const PlaceHolderInputBox = observer(function PlaceHolderInputBox(
  props: PlaceHolderInputBoxProps,
) {
  const { style, placeholderText = "예시입니다.", boxHeight = 78, onPressIn } = props
  const text = props.text
  const setText = props.setText
  const allStyles = Object.assign({}, styles.root, style)

  const handleFocus = () => {
    if (onPressIn) {
      onPressIn()
    }
    console.log("focus")
  }

  //* text update
  const onChange = (e) => {
    setText(e.nativeEvent.text)
    //console.log(text)
    //console.log(e.nativeEvent.text)
  }

  return (
    <View style={allStyles}>
      <TextInput
        style={[styles.input, { height: boxHeight }]}
        placeholder={placeholderText}
        multiline
        maxLength={300}
        autoFocus={true}
        onPressIn={handleFocus}
        //value={text}
        onChange={onChange}
        //*scrollEnabled={false}
      />
    </View>
  )
})

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
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
    textAlignVertical: "top",
  },
})
