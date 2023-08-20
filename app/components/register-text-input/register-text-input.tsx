import React, { useEffect } from "react"
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
}

export const RegisterTextInput = observer(function RegisterTextInput(
  props: RegisterTextInputProps,
) {
  const { style, title, placeholder, value, setValue } = props
  const allStyles = Object.assign({}, styles.root, style)
  const onChange = (e) => {
    switch (title) {
      case "휴대폰 번호":
        const phoneRegex = /^[0-9\b -]{0,13}$/
        if (phoneRegex.test(e.nativeEvent.text)) {
          setValue(e.nativeEvent.text)
        }
      case "닉네임(필수)":
        const nicknameRegex = /^[0-9a-zA-Zㄱ-ㅎ가-힣-_]{0,10}$/
        if (nicknameRegex.test(e.nativeEvent.text)) {
          setValue(e.nativeEvent.text)
        }
      case "생년월일":
        const birthRegex = /^[0-9\b -]{0,10}$/
        if (birthRegex.test(e.nativeEvent.text)) {
          setValue(e.nativeEvent.text)
        }
      case "인증번호":
        const certificationRegex = /^[0-9]{0,10}$/
        if (certificationRegex.test(e.nativeEvent.text)) {
          setValue(e.nativeEvent.text)
        }
    }
  }
  useEffect(() => {
    switch (title) {
      case "휴대폰 번호":
        if (value.length === 10) {
          setValue(value.replace(/(\d{3})(\d{3})(\d{4})/, "$1-$2-$3"))
        }
        if (value.length === 13) {
          setValue(value.replace(/-/g, "").replace(/(\d{3})(\d{4})(\d{4})/, "$1-$2-$3"))
        }
      case "생년월일":
        if (value.length === 8) {
          setValue(value.replace(/(\d{4})(\d{2})(\d{2})/, "$1-$2-$3"))
        }
    }
  }, [value])
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
