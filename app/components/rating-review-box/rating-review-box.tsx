import React from "react"
import { View, Image, StyleProp, ViewStyle } from "react-native"
import { styles } from "./styles"
import { PreReg12 } from "../_BASIC/custom-texts/custom-texts"
import { MIDDLE_LINE, SUB_HEAD_LINE } from "../../theme"
import { images } from "../../../assets/images"

interface RatingReviewBoxProps {
  rating: number
  review: number
  style?: StyleProp<ViewStyle>
}

export const RatingReviewBox = ({ rating, review, style }: RatingReviewBoxProps) => {
  const roundedRating = rating
  return (
    <View style={[styles.reviewContainer, style]}>
      {/* rating */}
      <Image style={styles.star} source={images.rating_star} />
      {/* reviews */}
      <PreReg12 text={"(" + roundedRating + ")"} color={SUB_HEAD_LINE} style={{ marginLeft: 4 }} />
      <PreReg12 text="|" color={MIDDLE_LINE} style={{ marginHorizontal: 8 }} />
      <PreReg12 text={"후기 " + review + "개"} color={SUB_HEAD_LINE} />
    </View>
  )
}
