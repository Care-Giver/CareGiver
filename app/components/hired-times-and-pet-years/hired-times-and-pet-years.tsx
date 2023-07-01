import { View, Text, StyleProp, FlexStyle } from "react-native"
import React from "react"
import { PreMed14, PreBol16 } from "../basics/custom-texts/custom-texts"
import { BODY, LIGHT_LINE, STRONG_LINE } from "#theme"
import { styles } from "./styles"

import { DivisionLineVertical } from "../division-line-vertical/division-line-vertical"

export const HiredTimesAndPetYears = (props) => {
  // const hiredTimes = 99
  // const petYearsYears = 12
  // const petYearsMonths = 4

  // const hiredTimes = props.hiredTimes
  // const petYearsYears = props.petYearsYears
  // const petYearsMonths = props.petYearsMonths

  const { style: viewStyle } = props
  const { hiredTimes, petYearsYears, petYearsMonths } = props

  return (
    // * 전체 박스 컴포넌트
    <View style={[styles.root, viewStyle]}>
      {/*//* divider 기준 왼쪽 텍스트 */}
      <View style={styles.textAlignment}>
        <PreMed14 color={BODY} text={"고용된 횟수"} />
        <PreBol16 color={STRONG_LINE} text={hiredTimes + "회"} style={{ marginTop: 8 }} />
      </View>

      {/*//* 세로 중간 divider*/}
      <DivisionLineVertical color={LIGHT_LINE} height={44} />

      {/*//*  divider 기준 오른쪽 텍스트*/}
      <View style={styles.textAlignment}>
        <PreMed14 color={BODY}>반려동물과 함께한 시간</PreMed14>
        <PreBol16
          color={STRONG_LINE}
          text={`${petYearsYears}년 ${petYearsMonths}개월`}
          style={{ marginTop: 8 }}
        />
      </View>
    </View>
  )
}
