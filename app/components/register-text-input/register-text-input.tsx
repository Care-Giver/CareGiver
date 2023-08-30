import React, { useEffect, useState } from "react"
import { View, StyleSheet, KeyboardTypeOptions, TouchableOpacity } from "react-native"
import { observer } from "mobx-react-lite"
import { PreMed14, PreReg12 } from "../basics/custom-texts/custom-texts"
import { DivisionLine } from "../division-line/division-line"
import { TextInput } from "react-native-gesture-handler"
import { DISABLED, BODY, GIVER_CASUAL_NAVY } from "#theme"
import { sendSMS } from "#axios"
export interface RegisterTextInputProps {
  /**
   * 추가적인 padding, margin 을 줌으로써, 위치를 조정할 수 있습니다.
   */
  title: "휴대폰 번호" | "닉네임(필수)" | "생년월일(필수)" | "인증번호"
  placeholder: string
  value: string
  setValue: (value: any) => void
  keyboardType?: KeyboardTypeOptions
}

export const RegisterTextInput = observer(function RegisterTextInput(
  props: RegisterTextInputProps,
) {
  const { title, placeholder, value, setValue, keyboardType = "default" } = props
  const [timer, setTimer] = useState(0)
  const [isSendingSMS, setIsSendingSMS] = useState(false)

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
      case "생년월일(필수)": {
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

  const isValidPhoneNumber = title === "휴대폰 번호" && value?.length === 13

  const sendVerificationButton = () => {
    console.log("인증요청")

    if (!isSendingSMS) {
      console.log("- 제거된 phonenumber", value.replace(/-/g, ""))
      sendSMS({ phoneNumber: value.replace(/-/g, "") })
      // setIsSendingSMS(true)
      // 3분 제한
      // TODO: react-timer-hook 설치하기 - https://github.com/amrlabib/react-timer-hook
      // setTimeout(() => {
      //   setTimer(180)
      //   const interval = setInterval(() => {
      //     setTimer((prevTimer) => prevTimer - 1)
      //   }, 1000)
      //   setTimeout(() => {
      //     clearInterval(interval)
      //     setIsSendingSMS(false)
      //   }, 180000)
      // }, 1000)
    }
  }

  useEffect(() => {
    switch (title) {
      case "휴대폰 번호":
        if (value.length === 11) {
          setValue(value.replace(/-/g, "").replace(/(\d{3})(\d{4})(\d{4})/, "$1-$2-$3"))
        }
        break
      case "생년월일(필수)":
        if (value.length === 8) {
          setValue(value.replace(/-/g, "").replace(/(\d{4})(\d{2})(\d{2})/, "$1-$2-$3"))
        }
        break
    }
  }, [value])

  return (
    <View>
      <PreMed14 text={title} color={BODY} style={{ marginBottom: 10 }} />

      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <TextInput
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          placeholderTextColor={DISABLED}
          keyboardType={keyboardType}
        />
        {title === "휴대폰 번호" && isValidPhoneNumber && (
          <TouchableOpacity
            style={[styles.sendVerificationButton, isSendingSMS && { borderColor: DISABLED }]}
            onPress={sendVerificationButton}
            disabled={isSendingSMS}
          >
            {timer > 0 ? (
              <PreReg12 text={`${timer} 초`} color={DISABLED} />
            ) : (
              <PreReg12
                text={isSendingSMS ? "대기중" : "인증요청"}
                color={isSendingSMS ? DISABLED : GIVER_CASUAL_NAVY}
              />
            )}
          </TouchableOpacity>
        )}
      </View>

      <DivisionLine style={{ marginTop: 4, marginBottom: 36 }} />
    </View>
  )
})

const styles = StyleSheet.create({
  sendVerificationButton: {
    width: 60,
    padding: 4,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 4,
    borderColor: GIVER_CASUAL_NAVY,
  },
})
