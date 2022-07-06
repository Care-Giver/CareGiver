import { View, Text } from "react-native"
import React from "react"
import { HEIGHT, WIDTH, palette } from "../../theme"
import { PreMed14 } from "../custom-texts/custom-texts"
import { BODY } from "../../theme/palette"
import { styles } from "./styles"
import { LIGHT_LINE } from "../../theme/palette"

export const HiredTimesAndPetYears = () => {
  return (
    <View style={styles.ROW_ROUNDED_LARGE_BOX}>
      {
        <>
          <PreMed14 color={BODY}>고용된 횟수</PreMed14>
          <PreMed14 color={BODY} text={"고용된 횟수"} />
        </>
      }
    </View>
  )
}
