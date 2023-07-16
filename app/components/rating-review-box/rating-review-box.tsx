import { View, Image, StyleProp, ViewStyle } from "react-native"
import React from "react"
import { styles } from "./styles"
import { PreReg12 } from "../basics/custom-texts/custom-texts"
import { MIDDLE_LINE, SUB_HEAD_LINE } from "../../theme"
import { images } from "../../../assets/images"
import { ratingRound } from "../../utils/format"

interface RatingReviewBoxProps {
  rating: number
  review: number
  style?: StyleProp<ViewStyle>
}

const RatingReviewBox = ({ rating, review, style }: RatingReviewBoxProps) => {
  const roundedRating = ratingRound(rating)
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

export default RatingReviewBox
