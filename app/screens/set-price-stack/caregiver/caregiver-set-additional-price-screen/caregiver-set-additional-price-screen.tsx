import React, { FC, useCallback, useLayoutEffect, useState } from "react"
import { NavigatorParamList } from "#navigators"
import { StackScreenProps } from "@react-navigation/stack"
import { observer } from "mobx-react-lite"
import {
  DivisionLine,
  PreBol18,
  PreMed14,
  RegisterSubmitButton,
  ScreenRootView,
  UnderlineText,
} from "#components"
import { KeyboardAvoidingView, View } from "react-native"
import { BODY, HEAD_LINE, MIDDLE_LINE, SUB_HEAD_LINE } from "#theme"
import { styles } from "./styles"
import { TextInput } from "react-native-gesture-handler"
import { price } from "../../../../utils/format"

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
    <ScreenRootView>
      {/* // * title container */}
      <View style={styles.titleContainer}>
        {/* // ? first line */}
        <PreBol18 color={HEAD_LINE} text={`강아지 크기 별로`} />
        {/* // ? second line */}
        <View style={styles.secondTitleContainer}>
          <UnderlineText text={`추가할 요금`} />
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
        <View style={styles.textInput}>
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
        <View style={styles.textInput}>
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
        <View style={styles.textInput}>
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

      {/* // * 다음 button */}
      {/* // TODO: onPress */}
      <RegisterSubmitButton text="다음" isActive={isSubmitActive} onPress={handlePress} />
    </ScreenRootView>
  )
})
