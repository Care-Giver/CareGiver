import { View, Text, Pressable, Image } from "react-native"
import React from "react"
import { styles } from "./styles"
import { SHADOW_2, WIDTH, HEIGHT } from "../../../theme"
import { PreReg12, PreReg14 } from "../../custom-texts/custom-texts"
import {
  CARE_NATURAL_BLUE,
  GIVER_CASUAL_NAVY,
  HEAD_LINE,
  SUB_HEAD_LINE,
} from "../../../theme/palette"

export const DotsIndicator = (props) => {
  const { items, activeIndex, style: viewStyle } = props

  return (
    <View style={[styles.dotsContainer, viewStyle]}>
      {items.map((item, index) => (
        <View
          key={index} //? Key Warning 에러 해결.
          style={index === activeIndex ? styles.activeDot : styles.dot}
        />
      ))}
    </View>
  )
}
