import React, { useEffect, useState } from "react"
import { View, StyleSheet, KeyboardTypeOptions, TouchableOpacity } from "react-native"
import { observer } from "mobx-react-lite"
import { PreMed14, PreReg12 } from "../../_BASIC/custom-texts/custom-texts"
import { DivisionLine } from "../../_BASIC/division-line/division-line"
import { TextInput } from "react-native-gesture-handler"
import { DISABLED, BODY, GIVER_CASUAL_NAVY } from "#theme"
import { sendSMS, verifySMS } from "#axios"
import { alertModal } from "../../../utils/alert-modal"

export interface SignUpTextInputProps {
  /**
   * 추가적인 padding, margin 을 줌으로써, 위치를 조정할 수 있습니다.
   */

  title: "휴대폰 번호" | "닉네임(필수)" | "생년월일(필수)" | "인증번호"
  placeholder: string
  value: string
  setValue: (value: any) => void
  keyboardType?: KeyboardTypeOptions
  phoneNumber?: string
  isSendingSMS?: boolean
  setIsSendingSMS?: (value: boolean) => void

  leftTime?: number
  isVerified?: boolean
  setIsVerified?: (value: boolean) => void

  marginBottom?: number
}

export const SignUpTextInput = observer(function SignUpTextInput(props: SignUpTextInputProps) {
  const {
    title,
    placeholder,
    value,
    setValue,
    keyboardType = "default",
    phoneNumber,
    isSendingSMS,
    setIsSendingSMS,
    leftTime,
    isVerified,
    setIsVerified,
    marginBottom,
  } = props

  const [onVerifying, setOnVerifying] = useState(false)

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
      case "인증번호":
        if (value.length > 6) {
          setValue(value.slice(0, 6))
        }
        break
    }
  }, [setValue, title, value])

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

  const sendCertification = () => {
    console.log("인증요청")

    if (!isSendingSMS) {
      console.log("대시(-)가 제거된 phonenumber", value.replace(/-/g, ""))
      sendSMS({ phoneNumber: value.replace(/-/g, "") })
      setIsSendingSMS(true)
    }
  }

  const 인증번호_발송버튼_텍스트_및_칼러_핸들러 = () => {
    if (isVerified) return { text: "인증완료", color: DISABLED }

    if (isSendingSMS) return { text: `재발송까지 ${leftTime}초`, color: DISABLED }

    return { text: "인증번호 발송", color: GIVER_CASUAL_NAVY }
  }

  const 인증번호_검증버튼_텍스트_및_칼러_핸들러 = () => {
    if (!onVerifying && !isVerified) return { text: "인증하기", color: GIVER_CASUAL_NAVY }

    if (onVerifying) return { text: "인증중..", color: GIVER_CASUAL_NAVY }

    return { text: "인증완료", color: DISABLED }
  }

  const verifyCertification = async () => {
    console.log("인증번호 확인")
    setOnVerifying(true)

    if (!phoneNumber) {
      alertModal("휴대폰 번호 확인", "휴대폰 번호를 입력해주세요.")
      setIsVerified(false)
      setOnVerifying(false)
      return
    }

    const isVerified = await verifySMS({
      phoneNumber: phoneNumber.replace(/-/g, ""),
      inputCode: value,
    })

    if (!isVerified) {
      alertModal("인증 실패", "인증번호가 일치하지 않습니다.")
      setIsVerified(false)
      setOnVerifying(false)
      return
    }

    // 정상
    setIsVerified(true)
    setOnVerifying(false)
  }

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
          editable={!isVerified}
          style={isVerified && { color: DISABLED }}
        />
        {title === "휴대폰 번호" && isValidPhoneNumber && (
          <TouchableOpacity
            style={[
              styles.sendVerificationButton,
              (isSendingSMS || isVerified) && { borderColor: DISABLED },
            ]}
            onPress={sendCertification}
            disabled={isSendingSMS}
          >
            <PreReg12
              text={인증번호_발송버튼_텍스트_및_칼러_핸들러().text}
              color={인증번호_발송버튼_텍스트_및_칼러_핸들러().color}
            />
          </TouchableOpacity>
        )}

        {title === "인증번호" && value && (
          <TouchableOpacity
            style={[styles.sendVerificationButton, isVerified && { borderColor: DISABLED }]}
            onPress={verifyCertification}
            disabled={isVerified}
          >
            <PreReg12
              text={인증번호_검증버튼_텍스트_및_칼러_핸들러().text}
              color={인증번호_검증버튼_텍스트_및_칼러_핸들러().color}
            />
          </TouchableOpacity>
        )}
      </View>

      <DivisionLine style={{ marginTop: 4, marginBottom: marginBottom }} />
    </View>
  )
})

const styles = StyleSheet.create({
  sendVerificationButton: {
    width: "auto",
    padding: 4,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 4,
    borderColor: GIVER_CASUAL_NAVY,
  },
})
