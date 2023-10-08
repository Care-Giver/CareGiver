import React from "react"
import { StyleProp, ViewStyle, View, StyleSheet, KeyboardAvoidingView, Text } from "react-native"
import { observer } from "mobx-react-lite"
import { commonStyles } from "../caregiver-set-price/set-price-style"
import {
  PreBol12,
  PreBol14,
  PreBol18,
  PreMed14,
  PreReg12,
} from "../basics/custom-texts/custom-texts"
import { UnderlineText } from "../underline-text/underline-text"
import { BODY, HEAD_LINE, MIDDLE_LINE, SUB_HEAD_LINE, WIDTH } from "#theme"
import { TextInput } from "react-native-gesture-handler"
import { price as priceFormatter } from "../../utils/format"
import { DivisionLine } from "../division-line/division-line"
import { POPPINS_REGULAR } from "#fonts"

export type AdditionalPrice = {
  small: string
  medium: string
  large: string
}

export interface CaregiverSetAdditionalPriceProps {
  /**
   * 추가적인 padding, margin 을 줌으로써, 위치를 조정할 수 있습니다.
   */
  style?: StyleProp<ViewStyle>

  additionalPrice: AdditionalPrice
  setAdditionalPrice: (additionalPrice: AdditionalPrice) => void
}

export const CaregiverSetAdditionalPrice = observer(function CaregiverSetAdditionalPrice(
  props: CaregiverSetAdditionalPriceProps,
) {
  const { style, additionalPrice, setAdditionalPrice } = props
  const allStyles = Object.assign({}, styles.root, style)

  return (
    <View style={allStyles}>
      {/* // * title container */}
      <View style={commonStyles.titleContainer}>
        {/* // ? first line */}
        <PreBol18 color={HEAD_LINE} text={`강아지 크기 별로`} />
        {/* // ? second line */}
        <View style={commonStyles.secondTitleContainer}>
          <UnderlineText>
            <PreBol18 text="추가할 요금" />
          </UnderlineText>
          <PreBol18 color={HEAD_LINE} text="을 설정해주세요!" />
        </View>
      </View>

      {/* // * description container */}
      <View style={commonStyles.descriptionContainer}>
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
          text={`예) 대형견 추가 요금이 적용되는 경우\n(기본 가격: 시간 당 10,000원) + (대형견 가격: 시간 당 2,000원) = (최종 예약 요금: 시간 당 12,000원)`}
          color={BODY}
        />
      </View>

      {/* // * price input container */}
      <KeyboardAvoidingView
        style={{
          marginTop: 4,
        }}
      >
        {/* // ? 소형견 추가 요금 */}
        <PreMed14 color={SUB_HEAD_LINE} text="소형견 추가 요금(원)" style={styles.inputTitle} />
        <View style={commonStyles.textInput}>
          <TextInput
            keyboardType="numeric"
            placeholder="소형견 추가 요금을 입력해주세요."
            value={priceFormatter(additionalPrice.small)}
            onChangeText={(text) => {
              setAdditionalPrice({
                ...additionalPrice,
                small: text,
              })
            }}
            placeholderTextColor={BODY}
            style={{ fontFamily: POPPINS_REGULAR }}
          />
        </View>
        <DivisionLine color={MIDDLE_LINE} />

        {/* // ? 중형견 추가 요금 */}
        <PreMed14 color={SUB_HEAD_LINE} text="중형견 추가 요금(원)" style={styles.inputTitle} />
        <View style={commonStyles.textInput}>
          <TextInput
            keyboardType="numeric"
            placeholder="중형견 추가 요금을 입력해주세요."
            value={priceFormatter(additionalPrice.medium)}
            onChangeText={(text) => {
              setAdditionalPrice({
                ...additionalPrice,
                medium: text,
              })
            }}
            placeholderTextColor={BODY}
            style={{ fontFamily: POPPINS_REGULAR }}
          />
        </View>
        <DivisionLine color={MIDDLE_LINE} />

        {/* // ? 대형견 추가 요금 */}
        <PreMed14 color={SUB_HEAD_LINE} text="대형견 추가 요금(원)" style={styles.inputTitle} />
        <View style={commonStyles.textInput}>
          <TextInput
            keyboardType="numeric"
            placeholder="대형견 추가 요금을 입력해주세요."
            value={priceFormatter(additionalPrice.large)}
            onChangeText={(text) => {
              setAdditionalPrice({
                ...additionalPrice,
                large: text,
              })
            }}
            placeholderTextColor={BODY}
            style={{ fontFamily: POPPINS_REGULAR }}
          />
        </View>
        <DivisionLine color={MIDDLE_LINE} />
      </KeyboardAvoidingView>
    </View>
  )
})

const styles = StyleSheet.create({
  root: {},
  inputTitle: {
    marginTop: 28,
  },
})
