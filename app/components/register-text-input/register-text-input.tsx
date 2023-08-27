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
  title: "휴대폰 번호" | "닉네임(필수)" | "생년월일" | "인증번호"
  placeholder: string
  value: string
  setValue: (value: any) => void
}

export const RegisterTextInput = observer(function RegisterTextInput(
  props: RegisterTextInputProps,
) {
  const { title, placeholder, value, setValue } = props
  const onChange = (e) => {
    switch (title) {
      case "휴대폰 번호": {
        const phoneRegex = /^[0-9\b -]{0,13}$/
        if (phoneRegex.test(e.nativeEvent.text)) {
          setValue(e.nativeEvent.text)
        }
        break
      }
      case "닉네임(필수)": {
        const nicknameRegex = /^[0-9a-zA-Zㄱ-ㅎ가-힣-_]{0,10}$/
        if (nicknameRegex.test(e.nativeEvent.text)) {
          setValue(e.nativeEvent.text)
        }
        break
      }
      case "생년월일": {
        const birthRegex = /^[0-9\b -]{0,10}$/
        if (birthRegex.test(e.nativeEvent.text)) {
          setValue(e.nativeEvent.text)
        }
        break
      }
      case "인증번호": {
        const certificationRegex = /^[0-9]{0,10}$/
        if (certificationRegex.test(e.nativeEvent.text)) {
          setValue(e.nativeEvent.text)
        }
        break
      }
    }
  }
  useEffect(() => {
    switch (title) {
      case "휴대폰 번호":
        if (value.length === 11) {
          setValue(value.replace(/-/g, "").replace(/(\d{3})(\d{4})(\d{4})/, "$1-$2-$3"))
        }
        break
      case "생년월일":
        if (value.length === 8) {
          setValue(value.replace(/-/g, "").replace(/(\d{4})(\d{2})(\d{2})/, "$1-$2-$3"))
        }
        break
    }
  }, [value])
  return (
    <View>
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
