import React, { FC, useCallback, useLayoutEffect, useState } from "react"
import { NavigatorParamList } from "#navigators"
import { StackScreenProps } from "@react-navigation/stack"
import { observer } from "mobx-react-lite"
import {
  DivisionLine,
  PreBol12,
  PreBol14,
  PreBol18,
  PreMed14,
  PreReg12,
  RegisterSubmitButton,
  Screen,
  UnderlineText,
} from "#components"
import { KeyboardAvoidingView, Text, View } from "react-native"
import { BODY, HEAD_LINE, MIDDLE_LINE, SUB_HEAD_LINE } from "#theme"
import { styles } from "./styles"
import { TextInput } from "react-native-gesture-handler"
import { price } from "../../../../utils/format"
import { common_styles } from "../../common_styles"

export const CaregiverSetAdditionalPriceScreen: FC<
  StackScreenProps<NavigatorParamList, "caregiver-set-additional-price-screen">
> = observer(() => {
  const [smallPrice, setSmallPrice] = useState<string>("")
  const [mediumPrice, setMediumPrice] = useState<string>("")
  const [largePrice, setLargePrice] = useState<string>("")

  const [isSubmitActive, setIsSubmitActive] = useState<boolean>(false)

  useLayoutEffect(() => {
    if (smallPrice && mediumPrice && largePrice) {
      setIsSubmitActive(true)
    } else {
      setIsSubmitActive(false)
    }
  }, [smallPrice, mediumPrice, largePrice])

  const handlePress = useCallback(() => {
    console.log(smallPrice)
    console.log(mediumPrice)
    console.log(largePrice)
  }, [smallPrice, mediumPrice, largePrice])

  return (
    <Screen>
      {/* // * title container */}
      <View style={common_styles.titleContainer}>
        {/* // ? first line */}
        <PreBol18 color={HEAD_LINE} text={`강아지 크기 별로`} />
        {/* // ? second line */}
        <View style={common_styles.secondTitleContainer}>
          <UnderlineText>
            <PreBol18 text="추가할 요금" />
          </UnderlineText>
          <PreBol18 color={HEAD_LINE} text="을 설정해주세요!" />
        </View>
      </View>

      {/* // * price input container */}
      <KeyboardAvoidingView
        style={{
          marginTop: 4,
        }}
      >
        {/* // ? 소형견 추가 요금 */}
        <PreMed14 color={SUB_HEAD_LINE} text="소형견 추가 요금(원)" style={styles.inputTitle} />
        <View style={common_styles.textInput}>
          <TextInput
            keyboardType="numeric"
            placeholder="소형견 추가 요금을 입력해주세요."
            value={price(smallPrice)}
            onChangeText={setSmallPrice}
            placeholderTextColor={BODY}
          />
        </View>
        <DivisionLine color={MIDDLE_LINE} />

        {/* // ? 중형견 추가 요금 */}
        <PreMed14 color={SUB_HEAD_LINE} text="중형견 추가 요금(원)" style={styles.inputTitle} />
        <View style={common_styles.textInput}>
          <TextInput
            keyboardType="numeric"
            placeholder="중형견 추가 요금을 입력해주세요."
            value={price(mediumPrice)}
            onChangeText={setMediumPrice}
            placeholderTextColor={BODY}
          />
        </View>
        <DivisionLine color={MIDDLE_LINE} />

        {/* // ? 대형견 추가 요금 */}
        <PreMed14 color={SUB_HEAD_LINE} text="대형견 추가 요금(원)" style={styles.inputTitle} />
        <View style={common_styles.textInput}>
          <TextInput
            keyboardType="numeric"
            placeholder="대형견 추가 요금을 입력해주세요."
            value={price(largePrice)}
            onChangeText={setLargePrice}
            placeholderTextColor={BODY}
          />
        </View>
        <DivisionLine color={MIDDLE_LINE} />
      </KeyboardAvoidingView>

      {/* // * description container */}
      <View style={common_styles.descriptionContainer}>
        <PreBol14 text={`강아지 크기 별 추가 요금이란?`} color={SUB_HEAD_LINE} />

        {/* // ? 서로 다른 굵기의 텍스트를 자동으로 줄바꿈 되도록 배치 */}
        {/* // - https://stackoverflow.com/questions/34624100/simulate-display-inline-in-react-native */}
        <View style={{ marginTop: 8 }}>
          <Text style={{ lineHeight: 18 }}>
            <PreReg12 text={`케어기버께서 예약을 진행하실 때 `} color={BODY} />
            <PreBol12 text="강아지의 크기에 따라 추가적으로 받게 되는 금액" color={BODY} />
            <PreReg12 text="입니다. 앞서 설정하신 " color={BODY} />
            <PreBol12 text="기본 예약 요금에 더해져서 계산" color={BODY} />
            <PreReg12
              text="됩니다. 추가 요금을 받지 않으시는 경우 0인 채로 남겨두시면 추가 요금 없이 예약이 진행됩니다."
              color={BODY}
            />
          </Text>
        </View>

        <PreReg12
          style={{ marginTop: 12, lineHeight: 18 }}
          text={`예) 대형견 추가 요금이 적용되는 경우
(기본 가격: 시간 당 10,000원) + (대형견 가격: 시간 당 2,000원) = (최종 예약 요금: 시간 당 12,000원)`}
          color={BODY}
        />
      </View>

      {/* // * 다음 button */}
      {/* // TODO: onPress */}
      {/* // ! 키보드가 올라올 때 안드로이드 -> 다음 버튼도 같이 올라옴, ios -> 키보드만 올라와서 다음 버튼은 가려짐 */}
      <RegisterSubmitButton text="다음" isActive={isSubmitActive} onPress={handlePress} />
    </Screen>
  )
})
