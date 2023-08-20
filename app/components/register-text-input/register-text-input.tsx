import React from "react"
import { StyleProp, ViewStyle, View, StyleSheet } from "react-native"
import { observer } from "mobx-react-lite"
import { PreMed14, PreMed16 } from "../basics/custom-texts/custom-texts"
import { DivisionLine } from "../division-line/division-line"
import { TextInput } from "react-native-gesture-handler"
import { DISABLED, BODY } from "#theme"
export interface RegisterTextInputProps {
  /**
   * 추가적인 padding, margin 을 줌으로써, 위치를 조정할 수 있습니다.
   */
  title: string
  placeholder: string
  value: string
  setValue: (value: any) => void
  style?: StyleProp<ViewStyle>
}

export const RegisterTextInput = observer(function RegisterTextInput(
  props: RegisterTextInputProps,
) {
  const { style, title, placeholder, value, setValue } = props
  const allStyles = Object.assign({}, styles.root, style)
  const onChange = (e) => {
    setValue(e.nativeEvent.text)
  }
  return (
    <View style={allStyles}>
      <PreMed14 text={title} color={BODY} style={{ marginBottom: 10 }} />
      <TextInput
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        placeholderTextColor={DISABLED}
      />
      <DivisionLine style={{ marginTop: 4, marginBottom: 36 }} />
    </View>
  )
})

const styles = StyleSheet.create({
  root: {},
})
