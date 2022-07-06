import { View, Text } from "react-native"
import React from "react"
import { HEIGHT, WIDTH, palette } from "../../theme"
import { PreMed14, PreBol16 } from "../custom-texts/custom-texts"
import { BODY } from "../../theme/palette"
import { styles } from "./styles"
import { LIGHT_LINE, STRONG_LINE } from "../../theme/palette"

export const HiredTimesAndPetYears = () => {
  return (
    <View style={styles.ROW_ROUNDED_LARGE_BOX}>
      {
        <>
          <View style={styles.TEXT_ALIGNMENT}>
            <PreMed14 color={BODY}>고용된 횟수</PreMed14>
            <PreBol16 color={STRONG_LINE} text={"99회"} style={{ marginTop: 8 }} />
            {/*//?margin을 어떻게 줘야할지? 픽셀상으론 25.04차이 */}
          </View>
          <View style={styles.VERTICAL_LINE}></View>
          <View style={styles.TEXT_ALIGNMENT}>
            <PreMed14 color={BODY}>반려동물과 함께한 시간</PreMed14>
            <PreBol16 color={STRONG_LINE} text={"12년 04개월"} style={{ marginTop: 8 }} />
          </View>
        </>
      }
    </View>
  )
}
