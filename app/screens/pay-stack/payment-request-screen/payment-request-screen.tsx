import { View, Text, useWindowDimensions, ScrollView } from "react-native"
import React, { FC, useEffect, useLayoutEffect, useState } from "react"
import { StackScreenProps } from "@react-navigation/stack"
import { observer } from "mobx-react-lite"
import { NavigatorParamList } from "#navigators"
import {
  Screen,
  PreReg12,
  PreBol14,
  UserTextInput,
  PreMed14,
  BASIC_BACKGROUND_PADDING_WIDTH,
} from "#components"
import { DISABLED, STRONG_LINE } from "#theme"

import { BorderRadioButton } from "#components"

// - 알러지 버튼 이름 목록
enum ALLERGY_NAME {
  NONE = "없음",
  CHEESE = "치즈",
  CHICKEN = "닭고기",
}

// - 반려동물과 친해질 수 있는 꿀팁 목록
enum TIPS_TO_CLOSER {
  First = "강아지계의 ENFP! 사람이면 다 좋아해요.",
  Second = "처음엔 낮가릴 수 있어서 조심이 필요해요.",
  Third = "되도록이면 만지지 말고 간식만 챙겨주세요.",
}

// - 스킨십 싫어하는 부위 이름 목록
enum DISLIKED_PART_NAME {
  NONE = "없음",
  HIP = "엉덩이",
  LEG = "다리",
}

type ALLERGY_STRING = typeof ALLERGY_NAME[keyof typeof ALLERGY_NAME] // "없음" | "치즈" | "닭고기"
type DISLIKED_STRING = typeof DISLIKED_PART_NAME[keyof typeof DISLIKED_PART_NAME]
type TIPS_STRING = typeof TIPS_TO_CLOSER[keyof typeof TIPS_TO_CLOSER] // "없음" | "엉덩이" | "다리"

// --- 디자인 관련 ---
//* 하나의 라디오 버튼의 가로 크기를 반환하는 함수 - rn에 grid가 없어서 만들었어요 ..
//? 모든 디바이스에서 라디오 버튼의 사이 간격을 모두 일정하게 맞추기 위함
//? -> width값을 고정하면, 너비가 작은 디바이스에서는 사이 간격 margin이 깨질 것 같아서 이렇게 썼습니다 (모든 디바이스에서 버튼 사이 간격이 동일하도록)
const getButtonWidth = (totalWidth: number, numOfCols: number, marginHorizon: number): number => {
  //? 버튼 하나의 width = 마진을 제외한 가로 너비를 버튼 개수만큼 나눈 값
  return (totalWidth - (numOfCols - 1) * marginHorizon) / numOfCols
}
// ----------------

export const PaymentRequestScreen: FC<
  StackScreenProps<NavigatorParamList, "payment-request-screen">
> = observer(({ navigation, route }) => {
  const windowWidth = useWindowDimensions().width

  //? ----- 도구, 사료 위치
  const [toolsLocation, settoolsLocation] = useState("")
  //? -----

  //? ----- 알러지
  const [noAllergy, setNoAllergy] = useState(false)
  const [hasCheeseAllergy, setHasCheeseAllergy] = useState(false)
  const [hasChickenAllergy, setHasChikenAllergy] = useState(false)
  const [allergyText, setAllergyText] = useState("")

  const handleAllergyPress = (value: ALLERGY_STRING) => {
    switch (value) {
      case ALLERGY_NAME.NONE:
        setNoAllergy((prev) => !prev)
        setHasCheeseAllergy(false)
        setHasChikenAllergy(false)
        break
      case ALLERGY_NAME.CHEESE:
        setHasCheeseAllergy((prev) => (!noAllergy ? !prev : prev))
        break
      case ALLERGY_NAME.CHICKEN:
        setHasChikenAllergy((prev) => (!noAllergy ? !prev : prev))
        break
      default:
        break
    }
  }

  const ALLERGYS: { name: ALLERGY_STRING; value: boolean }[] = [
    { name: ALLERGY_NAME.NONE, value: noAllergy },
    { name: ALLERGY_NAME.CHEESE, value: hasCheeseAllergy },
    { name: ALLERGY_NAME.CHICKEN, value: hasChickenAllergy },
  ]
  //? -----

  //? ----- 친해지는 꿀팁
  const [isActiveFirstTip, setIsActiveFirstTip] = useState(false)
  const [isActiveSecondTip, setIsActiveSecondTip] = useState(false)
  const [isActiveThirdTip, setIsActiveThirdTip] = useState(false)
  const [tipText, setTipText] = useState("")

  const TIPS: { name: TIPS_STRING; value: boolean }[] = [
    { name: TIPS_TO_CLOSER.First, value: isActiveFirstTip },
    { name: TIPS_TO_CLOSER.Second, value: isActiveSecondTip },
    { name: TIPS_TO_CLOSER.Third, value: isActiveThirdTip },
  ]

  const handleTipPress = (value: TIPS_STRING) => {
    switch (value) {
      case TIPS_TO_CLOSER.First:
        setIsActiveFirstTip((prev) => !prev)
        break
      case TIPS_TO_CLOSER.Second:
        setIsActiveSecondTip((prev) => !prev)
        break
      case TIPS_TO_CLOSER.Third:
        setIsActiveThirdTip((prev) => !prev)
        break
      default:
        break
    }
  }
  //? -----

  //? ----- 스킨십
  const [noDisliked, setNoDisliked] = useState(false)
  const [isDislikeHip, setIsDislikeHip] = useState(false)
  const [isDislikeLeg, setIsDislikeLeg] = useState(false)

  const handleDislikePress = (value: DISLIKED_STRING) => {
    switch (value) {
      case DISLIKED_PART_NAME.NONE:
        setNoDisliked((prev) => !prev)
        setIsDislikeHip(false)
        setIsDislikeLeg(false)
        break
      case DISLIKED_PART_NAME.HIP:
        setIsDislikeHip((prev) => (!noDisliked ? !prev : prev))
        break
      case DISLIKED_PART_NAME.LEG:
        setIsDislikeLeg((prev) => (!noDisliked ? !prev : prev))
        break
      default:
        break
    }
  }

  const DISLIKED_PARTS: { name: DISLIKED_STRING; value: boolean }[] = [
    { name: DISLIKED_PART_NAME.NONE, value: noDisliked },
    { name: DISLIKED_PART_NAME.HIP, value: isDislikeHip },
    { name: DISLIKED_PART_NAME.LEG, value: isDislikeLeg },
  ]
  //? -----

  //? ----- 배변 처리 방법
  const [howTreatPoop, setHowTreatPoop] = useState("")
  //? -----

  //? ----- 자율 요청 사항
  const [freeRequest, setFreeRequest] = useState("")
  //? -----

  // ? 전체 데이터 관리
  const [requests, setRequests] = useState({
    toolsLocation,
    allergy: {
      buttons: [],
      text: allergyText,
    },
    tipsToCloser: {
      buttons: [],
      text: tipText,
    },
    howTreatPoop,
    dislike: [],
    freeRequest,
  })

  useEffect(() => {
    setRequests({
      toolsLocation: toolsLocation,
      allergy: {
        buttons: [],
        text: allergyText,
      },
      tipsToCloser: {
        buttons: [],
        text: tipText,
      },
      howTreatPoop: howTreatPoop,
      dislike: [],
      freeRequest,
    })
  }, [toolsLocation, allergyText, tipText, howTreatPoop, freeRequest])

  console.log("=========")
  console.log(requests)
  console.log("=========")
  // ? ------------

  return (
    <Screen>
      <ScrollView>
        {/* //* 안내 문구 */}
        <PreReg12
          style={{ marginLeft: "auto" }}
          text={"상세하게 입력해 주실수록 서비스 품질을 높이는데 도움이 됩니다 :)"}
          color={DISABLED}
        />
        {/* //* 첫 번째 요청사항 - 도구, 사료 위치 */}
        <PreBol14
          style={{ marginTop: 24 }}
          text={"펫시팅에 도움을 줄 수 있는 도구, 사료는 어디에 위치해있나요?"}
          color={STRONG_LINE}
        />
        <UserTextInput
          style={{ marginTop: 8 }}
          placeholder={"Ex) 몇 번째 서랍, 몇 번째 칸에 사료가 있고, 신발장 옆에 리드줄이 있어요…"}
          placeholderColor={DISABLED}
          value={toolsLocation}
          handleChange={settoolsLocation}
        />
        {/* //* ---------------- */}

        {/* //* 두 번재 요청사항 - 먹으면 안되는 음식 */}
        <PreBol14
          style={{ marginTop: 16 }}
          text={"먹으면 안되는 음식을 알려주세요! (알러지 여부)"}
          color={STRONG_LINE}
        />
        {/* //? 버튼 입력 */}
        <View style={{ marginTop: 14, flexDirection: "row", justifyContent: "space-between" }}>
          {ALLERGYS.map((allergy, index) => (
            <BorderRadioButton
              key={index}
              style={{
                width: getButtonWidth(
                  windowWidth - 2 * BASIC_BACKGROUND_PADDING_WIDTH,
                  ALLERGYS.length,
                  6,
                ),
              }}
              active={allergy.value}
              onPress={() => handleAllergyPress(allergy.name)}
            >
              <PreMed14>{allergy.name}</PreMed14>
            </BorderRadioButton>
          ))}
        </View>

        {/* //? 텍스트 입력 */}
        <UserTextInput
          style={{ marginTop: 11 }}
          placeholder={"주의할 음식을 직접 작성해주세요!"}
          placeholderColor={DISABLED}
          value={allergyText}
          handleChange={setAllergyText}
        />
        {/* //* ---------------- */}

        {/* //* 세 번째 요청사항 - 반려동물과 친해지는 팁 */}
        <PreBol14
          style={{ marginTop: 16 }}
          text="반려동물과 친해질 수 있는 꿀팁을 알려주세요."
          color={STRONG_LINE}
        />
        {/* //? 버튼 입력 */}
        <View
          style={{
            marginTop: 14,
            alignItems: "stretch",
          }}
        >
          {TIPS.map((tip, index) => (
            <BorderRadioButton
              key={index}
              style={{ marginTop: index === 0 ? 0 : 8 }}
              active={tip.value}
              onPress={() => handleTipPress(tip.name)}
            >
              <PreMed14 text={tip.name} />
            </BorderRadioButton>
          ))}
        </View>

        {/* //? 텍스트 입력 */}
        <UserTextInput
          style={{ marginTop: 8 }}
          placeholder="꿀팁을 자유롭게 작성해주세요"
          placeholderColor={DISABLED}
          value={tipText}
          handleChange={setTipText}
        />

        {/* //* 네 번째 요청사항 - 배변 처리 방법 */}
        <PreBol14
          style={{ marginTop: 16 }}
          text="배변 처리 방법을 알려주세요"
          color={STRONG_LINE}
        />
        {/* //? 텍스트 입력 */}
        <UserTextInput
          style={{ marginTop: 8 }}
          placeholder="Ex) 몇 번째 서랍, 몇 번째 칸에 사료가 있고, 신발장 옆에 리드줄이 있어요…"
          placeholderColor={DISABLED}
          value={howTreatPoop}
          handleChange={setHowTreatPoop}
        />

        {/* //* 다섯 번째 요청사항 - 스킨십 싫어하는 부위 */}
        <PreBol14
          style={{ marginTop: 16 }}
          text="스킨십할 때 싫어하는 부위를 말씀해주세요"
          color={STRONG_LINE}
        />
        {/* //? 버튼 입력 */}
        <View style={{ marginTop: 14, flexDirection: "row", justifyContent: "space-between" }}>
          {DISLIKED_PARTS.map((part, index) => (
            <BorderRadioButton
              key={index}
              style={{
                width: getButtonWidth(
                  windowWidth - 2 * BASIC_BACKGROUND_PADDING_WIDTH,
                  DISLIKED_PARTS.length,
                  6,
                ),
              }}
              active={part.value}
              onPress={() => handleDislikePress(part.name)}
            >
              <PreMed14>{part.name}</PreMed14>
            </BorderRadioButton>
          ))}
        </View>

        {/* //* 여섯 번째 요청사항 - 자율 작성 */}
        <PreBol14 style={{ marginTop: 72 }} text="자유 요청 사항" color={STRONG_LINE} />
        {/* //? 텍스트 입력 */}
        <UserTextInput
          style={{ marginTop: 8, height: 161 }}
          placeholder="요청 사항을 자유롭게 작성해주세요. (300자 이내)"
          placeholderColor={DISABLED}
          value={freeRequest}
          handleChange={setFreeRequest}
        />
        {/* //? 마진 */}
        <View style={{ height: 290 }} />
      </ScrollView>
    </Screen>
  )
})
