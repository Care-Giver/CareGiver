import React, { FC, useEffect, useState } from "react"
import { Pressable, StyleSheet, Image, Linking } from "react-native"
import { observer } from "mobx-react-lite"
import { StackScreenProps } from "@react-navigation/stack"
import { NavigatorParamList, navigate } from "#navigators"
import {
  BlueCheckbox,
  Checkbox,
  ConditionalButton,
  DivisionLine,
  PreBol20,
  PreMed16,
  PreMed18,
  PreReg14,
  PreReg16,
  Row,
  Screen,
} from "#components"
import { images } from "#images"
import { BODY, BOTTOM_HEIGHT } from "#theme"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "#models"

// [주의] app/navigators/app-navigator.tsx 에 위치한, NavigatorParamList 변수에 새로운 값 "xxxx-screen": undefined 을 추가해주세요.
// 그 뒤에는 아래에 있는 @ts-ignore 를 제거해도, 빨간줄이 뜨지 않습니다 :)
// @ts-ignore
export const TermsOfServiceScreen: FC<
  StackScreenProps<NavigatorParamList, "terms-of-service-screen">
> = observer(function TermsOfServiceScreen() {
  // MST store 를 가져옵니다.
  // const { someStore, anotherStore } = useStores()

  // 필요시, useNavigation 훅을 사용할 수 있습니다.
  // const navigation = useNavigation()

  //* checkbox states
  const [requiredToggle, setRequiredToggle] = useState<boolean>(false)
  const [optionalToggle, setOptionalToggle] = useState<boolean>(false)
  const [allToggle, setAllToggle] = useState<boolean>(false)

  //* checkbox handlers
  const onPressRequired = () => setRequiredToggle(!requiredToggle)
  const onPressOptional = () => setOptionalToggle(!optionalToggle)
  const onPressAll = () => {
    if (allToggle === false) {
      setRequiredToggle(true)
      setOptionalToggle(true)
    } else {
      setRequiredToggle(false)
      setOptionalToggle(false)
    }
    setAllToggle(!allToggle)
  }

  //* 약관에 모두 동의했을 때 버튼 활성화
  const [isActivated, setIsActivated] = useState<boolean>(false)

  useEffect(() => {
    //* 약관 모두 동의시 "다음"버튼 활성화
    if (requiredToggle) {
      setIsActivated(true)
    } else if (allToggle) {
      setIsActivated(true)
    } else {
      setIsActivated(false)
    }
  }, [requiredToggle, optionalToggle, allToggle])

  const openLink = (link: string) => {
    Linking.openURL(link)
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
          onPress={() =>
            openLink(
              "https://foregoing-collard-3ea.notion.site/781a774f667e49168ac225a24d10e785?pvs=4",
            )
          }
        >
          <Image source={images.arrow_right} style={{ width: 16, height: 16 }} />
        </Pressable>
      </Row>
      <Row mb={12}>
        <PreReg14 text="개인정보 수집 및 이용 동의" color={BODY} ml={28} />
        <Pressable
          style={{ marginLeft: "auto" }}
          onPress={() =>
            openLink(
              "https://foregoing-collard-3ea.notion.site/584b60a89a6e4ccebe8c5cf112d05843?pvs=4",
            )
          }
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
          onPress={() =>
            openLink(
              "https://foregoing-collard-3ea.notion.site/386832a2945a4430ad1dd2b7f12ef23d?pvs=4",
            )
          }
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
          navigate("register-screen")
        }}
      />
    </Screen>
  )
})

const styles = StyleSheet.create({
  root: {},
})
