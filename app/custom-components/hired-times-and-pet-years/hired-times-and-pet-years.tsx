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
    // * 전체 박스 컴포넌트
    <View style={styles.rowRoundedLargeBox}>
      {
        <>
          {/*divider 기준 왼쪽 텍스트*/}
          <View style={styles.textAlignment}>
            <PreMed14 color={BODY}>고용된 횟수</PreMed14>
            {/* //FEEDBACK: PreMed14 에서, text props 를 안 쓴 특별한 이유가 있나요? */}
            <PreBol16 color={STRONG_LINE} text={hiredTimes + "회"} style={{ marginTop: 8 }} />
            {/* //FEEDBACK: margin, padding 에도 WIDTH, HEIGHT 를 붙여줘야 합니다 */}
          </View>
          {/*세로 중간 divider*/}
          <View style={styles.verticalDivider}></View>
          {/* divider 기준 오른쪽 텍스트*/}
          <View style={styles.textAlignment}>
            <PreMed14 color={BODY}>반려동물과 함께한 시간</PreMed14>
            <PreBol16
              color={STRONG_LINE}
              text={petYearsYears + "년" + petYearsMonths + "개월"}
              //FEEDBACK: 년개월 -> 백틱(`)을 사용한 Expression interpolation 으로 사용하는게 더 가독성이 좋습니다
              //? 백틱 사용법 레퍼런스: https://mine-it-record.tistory.com/464 , https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Template_literals
              style={{ marginTop: 8 }}
            />
          </View>
        </>
      }
    </View>
  )
}
