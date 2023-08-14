import React, { useEffect, useState } from "react"
import { StyleProp, ViewStyle, View, StyleSheet } from "react-native"
import { observer } from "mobx-react-lite"
import { common_styles } from "./set-price-style"
import {
  PreBol12,
  PreBol14,
  PreBol18,
  PreMed14,
  PreReg12,
} from "../basics/custom-texts/custom-texts"
import { BODY, HEAD_LINE, MIDDLE_LINE, SUB_HEAD_LINE } from "#theme"
import { UnderlineText } from "../underline-text/underline-text"
import { TextInput } from "react-native-gesture-handler"
import { price } from "../../utils/format"
import { DivisionLine } from "../division-line/division-line"
import { standardCosts } from "../../screens/set-price-stack/caregiver/caregiver-set-price-screen/dummy-data"

export interface CaregiverSetPriceProps {
  /**
   * 추가적인 padding, margin 을 줌으로써, 위치를 조정할 수 있습니다.
   */
  style?: StyleProp<ViewStyle>
}

export const CaregiverSetPrice = observer(function CaregiverSetPrice(
  props: CaregiverSetPriceProps,
) {
  const { style } = props
  const allStyles = Object.assign({}, styles.root, style)

  // * 사용자가 입력한 비용
  // ? inputCost의 형식은 10,000과 같이 3자릿수 단위로 쉼표 구분하여 저장한다.
  // TODO: toLocaleString은 android에서 적용 안 됨.
  // -> https://github.com/facebook/react-native/issues/19410
  const [inputCost, setInputCost] = useState<string>("")

  // * 서비스 타입 (방문 | 위탁)
  // ? -> 이 스크린으로 이동할 때 params로 전달받아야 한다.
  // const { serviceType } = route.params
  const serviceType = "CRECHE"

  // ? 서비스 타입 문구 - 위탁 | 방문
  const serviceText = serviceType === "CRECHE" ? "위탁" : "방문"
  // ? 서비스 유형에 따른 기준 문구 - 1박(=위탁) | 1시간(=방문)
  const standardText = serviceType === "CRECHE" ? "1박" : "1시간"

  const [standard, setStandard] = useState({
    min: "",
    max: "",
  })

  // * 다음 버튼 활성화 여부
  const [isSubmitActive, setIsSubmitActive] = useState<boolean>(false)

  // * 평균 요금 하한가, 상한가 설정
  // TODO: 백엔드 팀한테 데이터 테이블 추가 요청 (1000원 쉼표 단위 문자열로 저장)
  useEffect(() => {
    if (serviceType === "CRECHE") {
      setStandard({
        min: standardCosts.creche.min,
        max: standardCosts.creche.max,
      })
    } else {
      setStandard({
        min: standardCosts.visit.min,
        max: standardCosts.visit.max,
      })
    }
  }, [standardCosts, serviceType])

  // * 사용자가 값을 입력하면 다음 버튼 활성화
  useEffect(() => {
    if (inputCost.length > 0) {
      setIsSubmitActive(true)
    } else {
      setIsSubmitActive(false)
    }
  }, [inputCost])

  return (
    <View style={allStyles}>
      {/* // * title container */}
      <View style={common_styles.titleContainer}>
        {/* // ? first line */}
        <PreBol18 color={HEAD_LINE} text={`${serviceText}의 경우 기본 예약 요금을`} />
        {/* // ? second line */}
        <View style={common_styles.secondTitleContainer}>
          <UnderlineText>
            <PreBol18 text={`${standardText} 기준`} />
          </UnderlineText>
          <PreBol18 color={HEAD_LINE} text="으로 설정해주세요!" />
        </View>
      </View>

      {/* // * price input container */}
      {/* // TODO: keyboard avoiding view */}
      <View style={common_styles.priceContainer}>
        <PreMed14 color={SUB_HEAD_LINE} text="요금(원)" />
        <View style={common_styles.textInput}>
          {/* // TODO: placeholder에 들어갈 가격을 백엔드 서버에 저장해둘 것인지, 하한가 + 상한가 기준으로 프론트에서 직접 계산할 것인지? */}
          <TextInput
            keyboardType="numeric"
            placeholder="105,000"
            value={price(inputCost)} //! toLocaleString 사용하지 말 것 - android 이슈 존재
            onChangeText={setInputCost}
            placeholderTextColor={BODY}
          />
        </View>
        <DivisionLine color={MIDDLE_LINE} />
      </View>

      {/* // * description container */}
      <View style={common_styles.descriptionContainer}>
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
          text={`${standard.min}원 ~ ${standard.max}원`}
          color={SUB_HEAD_LINE}
        />
        <PreReg12 style={{ marginTop: 4 }} text="사이의 요금을 받습니다." color={BODY} />

        <PreReg12
          style={{ marginTop: 12, lineHeight: 18 }}
          text={`- 기본적으로 지역 평균 요금이 적정가로 설정되어있습니다. 
- 적정가는 추천금액일 뿐이며, 원하는 금액으로 직접 설정 가능합니다.
- 요금은 지역마다, 개인마다 차이가 있을 수 있습니다.`}
          color={BODY}
        />
      </View>
    </View>
  )
})

const styles = StyleSheet.create({
  root: {},
})
