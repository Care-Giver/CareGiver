import React from "react"
import { StyleProp, ViewStyle, View, StyleSheet, TextInput, TextInputProps } from "react-native"
import { observer } from "mobx-react-lite"
import { BlueCheckbox } from "../../blue-checkbox/blue-checkbox"
import { PreMed16 } from "../../_BASIC/custom-texts/custom-texts"
import { DivisionLine } from "../../_BASIC/division-line/division-line"
import { PRETENDARD_REGULAR } from "#fonts"
import { BottomSheetTextInput } from "@gorhom/bottom-sheet"

export interface CheckerInputProps {
  /**
   * 추가적인 padding, margin 을 줌으로써, 위치를 조정할 수 있습니다.
   */
  style?: StyleProp<ViewStyle>
  onCheckPress: (boolean) => void
  isChecked: boolean
  label: string
  input: string
  setInput: (text: string) => void
  textInputProps?: TextInputProps
  inBottomSheet?: boolean
}

/**
 * 체크박스와 텍스트인풋이 결합된 컴포넌트 입니다.
 * 체트박스가 눌리면 ( isChecked={true} ), 텍스트인풋 컴포넌트가 표출됩니다.
 * BottomSheet 혹은 BottomSheetModal 내부에서 쓰는 경우, 반드시 inBottomSheet={true} 으로 설정하세요.
 */
export const CheckerInput = observer(function CheckerInput(props: CheckerInputProps) {
  const {
    style,
    onCheckPress,
    isChecked,
    label = "",
    input,
    setInput,
    textInputProps,
    inBottomSheet = false,
  } = props
  const allStyles = Object.assign({}, styles.root, style)
  const Input = inBottomSheet ? BottomSheetTextInput : TextInput
  return (
    <View style={allStyles}>
      <View style={{ width: "100%", height: 22, flexDirection: "row" }}>
        <BlueCheckbox onPress={onCheckPress} value={isChecked} />
        <PreMed16 text={label} ml={8} />
      </View>

      {isChecked && (
        <View style={{ paddingLeft: 26 }}>
          <Input
            style={styles.input}
            multiline={false}
            maxLength={20}
            value={input}
            onChangeText={setInput}
            {...textInputProps}
          />
          <DivisionLine style={{ marginTop: 4 }} />
        </View>
      )}
    </View>
  )
})

const styles = StyleSheet.create({
  root: {
    width: "100%",
  },

  input: {
    width: "100%",
    paddingTop: 14,
    color: "black",
    fontFamily: PRETENDARD_REGULAR,
    fontSize: 16,
  },
})
