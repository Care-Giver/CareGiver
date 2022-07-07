import { View, Text } from "react-native"
import React from "react"
import { PreMed14, PreBol16 } from "../custom-texts/custom-texts"
import { BODY, STRONG_LINE } from "../../theme/palette"
import { styles } from "./styles"

export const HiredTimesAndPetYears = () => {
  const hiredTimes = 99
  const petYearsYears = 12
  const petYearsMonths = "04"

  return (
    //*전체 박스 컴포넌트
    <View style={styles.rowRoundedLargeBox}>
      {
        <>
          {/*divider 기준 왼쪽 텍스트*/}
          <View style={styles.textAlignment}>
            <PreMed14 color={BODY}>고용된 횟수</PreMed14>
            <PreBol16 color={STRONG_LINE} text={hiredTimes + "회"} style={{ marginTop: 8 }} />
          </View>
          {/*세로 중간 divider*/}
          <View style={styles.verticalDivider}></View>
          {/* divider 기준 오른쪽 텍스트*/}
          <View style={styles.textAlignment}>
            <PreMed14 color={BODY}>반려동물과 함께한 시간</PreMed14>
            <PreBol16
              color={STRONG_LINE}
              text={petYearsYears + "년" + petYearsMonths + "개월"}
              style={{ marginTop: 8 }}
            />
          </View>
        </>
      }
    </View>
  )
}
