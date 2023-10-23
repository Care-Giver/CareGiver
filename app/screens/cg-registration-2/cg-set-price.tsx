import React, { Dispatch, SetStateAction } from "react"
import { StyleProp, ViewStyle, View, StyleSheet } from "react-native"
import { observer } from "mobx-react-lite"
import { commonStyles } from "./commonStyles"
import {
  PreBol12,
  PreBol14,
  PreBol18,
  PreMed14,
  PreReg12,
} from "../../components/basics/custom-texts/custom-texts"
import { BODY, HEAD_LINE, MIDDLE_LINE, SUB_HEAD_LINE } from "#theme"
import { UnderlineText } from "../../components/underline-text/underline-text"
import { TextInput } from "react-native-gesture-handler"
import { price as priceFormatter } from "../../utils/format"
import { DivisionLine } from "../../components/division-line/division-line"
import { POPPINS_REGULAR } from "#fonts"
import { ServiceType } from "#models"

export interface CgSetPriceProps {
  /**
   * 추가적인 padding, margin 을 줌으로써, 위치를 조정할 수 있습니다.
   */
  style?: StyleProp<ViewStyle>

  price: number
  setPrice: Dispatch<SetStateAction<number>>

  serviceType: ServiceType
  standardPrice: { min: string; max: string }
}

export const CgSetPrice = observer(function CgSetPrice(props: CgSetPriceProps) {
  const { style, price, setPrice, standardPrice, serviceType } = props
  const allStyles = Object.assign({}, styles.root, style)

  // ? 서비스 타입 문구 - 위탁 | 방문
  const serviceText = serviceType === "creche" ? "위탁" : "방문"
  // ? 서비스 유형에 따른 기준 문구 - 1박(=위탁) | 1시간(=방문)
  const standardText = serviceType === "creche" ? "1박" : "1시간"

  return (
    <View style={allStyles}>
      {/* // * title container */}
      <View style={commonStyles.titleContainer}>
        {/* // ? first line */}
        <PreBol18 color={HEAD_LINE} text={`${serviceText}의 경우 기본 예약 요금을`} />
        {/* // ? second line */}
        <View style={commonStyles.secondTitleContainer}>
          <UnderlineText>
            <PreBol18 text={`${standardText} 기준`} />
          </UnderlineText>
          <PreBol18 color={HEAD_LINE} text="으로 설정해주세요!" />
        </View>
      </View>

      {/* // * description container */}
      <View style={commonStyles.descriptionContainer}>
        <PreBol14
          text={`이 지역 ${serviceText} 케어기버가 받는 평균 요금은?`}
          color={SUB_HEAD_LINE}
        />
        <PreReg12
          style={{ marginTop: 8 }}
          text="이 지역에서 서비스하는 케어기버 분들은 보통"
          color={BODY}
        />
        {/* // ? 적정가 범위 */}
        <PreBol12
          style={{ marginTop: 4 }}
          text={`${standardPrice.min}원 ~ ${standardPrice.max}원`}
          color={SUB_HEAD_LINE}
        />
        <PreReg12 style={{ marginTop: 4 }} text="사이의 요금을 받습니다." color={BODY} />

        <PreReg12
          style={{ marginTop: 12, lineHeight: 18 }}
          text={`- 기본적으로 지역 평균 요금이 적정가로 설정되어있습니다.\n- 적정가는 추천금액일 뿐이며, 원하는 금액으로 직접 설정 가능합니다.\n- 요금은 지역마다, 개인마다 차이가 있을 수 있습니다.`}
          color={BODY}
        />
      </View>

      {/* // * price input container */}
      {/* // TODO: keyboard avoiding view */}
      <View style={commonStyles.priceContainer}>
        <PreMed14 color={SUB_HEAD_LINE} text="요금(원)" />
        <View style={commonStyles.textInput}>
          {/* // TODO: placeholder에 들어갈 가격을 백엔드 서버에 저장해둘 것인지, 하한가 + 상한가 기준으로 프론트에서 직접 계산할 것인지? */}
          <TextInput
            keyboardType="numeric"
            returnKeyType="done"
            placeholder={serviceType === "creche" ? "50,000" : "10,000"}
            value={price === 0 ? null : priceFormatter(price.toString())} //! toLocaleString 사용하지 말 것 - android 이슈 존재
            onChangeText={(text) => {
              setPrice(Number(text.replace(/,/g, "")))
            }}
            placeholderTextColor={BODY}
            style={{ fontFamily: POPPINS_REGULAR }}
          />
        </View>
        <DivisionLine color={MIDDLE_LINE} />
      </View>
    </View>
  )
})

const styles = StyleSheet.create({
  root: {},
})
