import React, { FC, useState } from "react"
import { Pressable, StyleSheet, Image, Linking } from "react-native"
import { observer } from "mobx-react-lite"
import { StackScreenProps } from "@react-navigation/stack"
import { NavigatorParamList, navigate } from "#navigators"
import {
  BlueCheckbox,
  ConditionalButton,
  DivisionLine,
  PreBol20,
  PreMed16,
  PreMed18,
  PreReg14,
  Row,
  Screen,
} from "#components"
import { images } from "#images"
import { BODY, BOTTOM_HEIGHT } from "#theme"
import { 외부링크 } from "../../../services/external-web-link"

export type ConsentList = {
  privacyPolicyConsent: boolean
  termsOfServiceConsent: boolean
  locationBasedServiceConsent: boolean
  marketingConsent: boolean
}

export const TermsOfServiceScreen: FC<
  StackScreenProps<NavigatorParamList, "terms-of-service-screen">
> = observer(function TermsOfServiceScreen({ route }) {
  const { email, provider, idToken } = route.params

  //* checkbox states
  const [requiredToggle, setRequiredToggle] = useState<boolean>(false)
  const [optionalToggle, setOptionalToggle] = useState<boolean>(false)
  const [allToggle, setAllToggle] = useState<boolean>(false)
  //* 필수 약관 동의시, "다음" 버튼 활성화
  const isActivated = requiredToggle

  //* checkbox handlers
  const onPressRequired = () => setRequiredToggle(!requiredToggle)
  const onPressOptional = () => setOptionalToggle(!optionalToggle)
  const onPressAll = () => {
    setRequiredToggle(!allToggle)
    setOptionalToggle(!allToggle)
    setAllToggle(!allToggle)
  }

  const openLink = (link: string) => {
    Linking.openURL(link)
  }

  const consentList: ConsentList = {
    privacyPolicyConsent: true,
    termsOfServiceConsent: true,
    locationBasedServiceConsent: true,
    marketingConsent: false,
  }

  if (optionalToggle) {
    consentList.marketingConsent = true
  }

  return (
    <Screen testID="TermsOfService">
      <PreBol20 text={"아래 약관에 동의하시고\n케어기버 서비스를 이용해보세요!"} mt={20} mb={40} />
      {/**
       * 필수 약관
       */}
      <Row mb={16}>
        <BlueCheckbox value={requiredToggle} onPress={onPressRequired}></BlueCheckbox>
        <PreMed16 text="필수 약관 모두 동의" ml={8} />
      </Row>
      <Row mb={12}>
        <PreReg14 text="서비스 이용 약관 동의" color={BODY} ml={28} />
        <Pressable
          style={{ marginLeft: "auto" }}
          onPress={() => openLink(외부링크.서비스_이용_약관_동의)}
        >
          <Image source={images.arrow_right} style={{ width: 16, height: 16 }} />
        </Pressable>
      </Row>
      <Row mb={12}>
        <PreReg14 text="개인정보 수집 및 이용 동의" color={BODY} ml={28} />
        <Pressable
          style={{ marginLeft: "auto" }}
          onPress={() => openLink(외부링크.개인정보_수집_이용_동의)}
        >
          <Image source={images.arrow_right} style={{ width: 16, height: 16 }} />
        </Pressable>
      </Row>
      {/**
       * 위치기반 약관
       */}
      <Row>
        <PreReg14 text="위치기반서비스 이용 약관 동의" color={BODY} ml={28} />
        <Pressable
          style={{ marginLeft: "auto" }}
          onPress={() => openLink(외부링크.위치기반서비스_이용_약관_동의)}
        >
          <Image source={images.arrow_right} style={{ width: 16, height: 16 }} />
        </Pressable>
      </Row>
      <Row mt={36} mb={20}>
        <BlueCheckbox value={optionalToggle} onPress={onPressOptional}></BlueCheckbox>
        <PreMed16 text="이벤트 및 마케팅 정보 수신 동의(선택)" ml={8} />
      </Row>
      <DivisionLine />
      {/**
       * 모든 약관
       */}
      <Row mt={20}>
        <BlueCheckbox value={allToggle} onPress={onPressAll}></BlueCheckbox>
        <PreMed18 text="모두 확인 및 동의합니다." ml={8} />
      </Row>
      {/**
       * 이동 버튼
       */}
      <ConditionalButton
        label="다음"
        isActivated={isActivated}
        style={{ position: "absolute", bottom: BOTTOM_HEIGHT, alignSelf: "center" }}
        //TODO navigation추가 필요
        onPress={() => {
          navigate("sign-up-screen", { consentList, email, provider, idToken })
        }}
      />
    </Screen>
  )
})

const styles = StyleSheet.create({
  root: {},
})
