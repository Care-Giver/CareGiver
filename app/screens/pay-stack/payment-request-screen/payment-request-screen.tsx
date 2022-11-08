import { View, Text, useWindowDimensions } from "react-native"
import React, { FC, useLayoutEffect, useState } from "react"
import { StackScreenProps } from "@react-navigation/stack"
import { observer } from "mobx-react-lite"
import { NavigatorParamList } from "#navigators"
import {
  ScreenRootView,
  PreReg12,
  PreBol14,
  UserTextInput,
  PreMed14,
  BASIC_BACKGROUND_PADDING_WIDTH,
} from "#components"
import { DISABLED, STRONG_LINE } from "#theme/palette"
import { HEIGHT, WIDTH } from "#theme/device-size-constant"
import { BorderRadioButton } from "#components"

//* 하나의 라디오 버튼의 가로 크기를 반환하는 함수 - rn에 grid가 없어서 만들었어요 ..
//? 모든 디바이스에서 라디오 버튼의 사이 간격을 모두 일정하게 맞추기 위함
//? -> width값을 고정하면, 너비가 작은 디바이스에서는 사이 간격 margin이 깨질 것 같아서 이렇게 썼습니다 (모든 디바이스에서 버튼 사이 간격이 동일하도록)
const getButtonWidth = (totalWidth: number, numOfCols: number, marginHorizon: number): number => {
  //? 버튼 하나의 width = 마진을 제외한 가로 너비를 버튼 개수만큼 나눈 값
  return (totalWidth - (numOfCols - 1) * marginHorizon) / numOfCols
}

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

  const handleAllergyPress = (value: string) => {
    if (value === "없음") {
      setNoAllergy((prev) => !prev)
      setHasCheeseAllergy(false)
      setHasChikenAllergy(false)
    } else if (value === "치즈") {
      setHasCheeseAllergy((prev) => (!noAllergy ? !prev : prev))
    } else if (value === "닭고기") {
      setHasChikenAllergy((prev) => (!noAllergy ? !prev : prev))
    }
  }

  const ALLERGYS = [
    { name: "없음", value: noAllergy },
    { name: "치즈", value: hasCheeseAllergy },
    { name: "닭고기", value: hasChickenAllergy },
  ]
  //? -----

  return (
    <ScreenRootView preset={"scroll"}>
      {/* //* 안내 문구 */}
      <PreReg12
        style={{ marginLeft: "auto" }}
        text={"상세하게 입력해 주실수록 서비스 품질을 높이는데 도움이 됩니다 :)"}
        color={DISABLED}
      />

      {/* //* 첫 번째 요청사항 - 도구, 사료 위치 */}
      <PreBol14
        style={{ marginTop: HEIGHT * 24 }}
        text={"펫시팅에 도움을 줄 수 있는 도구, 사료는 어디에 위치해있나요?"}
        color={STRONG_LINE}
      />
      <UserTextInput
        style={{ marginTop: HEIGHT * 8 }}
        placeholder={"Ex) 몇 번째 서랍, 몇 번째 칸에 사료가 있고, 신발장 옆에 리드줄이 있어요…"}
        placeholderColor={DISABLED}
        value={toolsLocation}
        handleChange={settoolsLocation}
      />
      {/* //* ---------------- */}

      {/* //* 두 번재 요청사항 - 먹으면 안되는 음식 */}
      <PreBol14
        style={{ marginTop: HEIGHT * 16 }}
        text={"먹으면 안되는 음식을 알려주세요! (알러지 여부)"}
        color={STRONG_LINE}
      />
      {/* //? 버튼 입력 */}
      <View
        style={{ marginTop: HEIGHT * 14, flexDirection: "row", justifyContent: "space-between" }}
      >
        {ALLERGYS.map((allergy) => (
          <BorderRadioButton
            style={{
              width: getButtonWidth(
                windowWidth - 2 * BASIC_BACKGROUND_PADDING_WIDTH,
                ALLERGYS.length,
                WIDTH * 6,
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
        style={{ marginTop: HEIGHT * 11 }}
        placeholder={"주의할 음식을 직접 작성해주세요!"}
        placeholderColor={DISABLED}
        value={allergyText}
        handleChange={setAllergyText}
      />
      {/* //* ---------------- */}

      {/* //* 세 번째 요청사항 - 반려동물과 친해지는 팁 */}
      <PreBol14
        style={{ marginTop: HEIGHT * 16 }}
        text="반려동물과 친해질 수 있는 꿀팁을 알려주세요."
        color={STRONG_LINE}
      />
    </ScreenRootView>
  )
})
