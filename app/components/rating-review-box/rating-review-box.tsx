import { View, Text, Image } from "react-native"
import React from "react"
import { styles } from "./styles"
import { PreReg12 } from "../basics/custom-texts/custom-texts"
import { MIDDLE_LINE, SUB_HEAD_LINE } from "~/app/theme/palette"
import { WIDTH } from "~/app/theme"
import IMAGES from "~/assets/images"

interface RatingReviewBoxProps {
  rating: number
  review: number
  style?: Object
}

const RatingReviewBox = ({ rating, review, style }: RatingReviewBoxProps) => {
  return (
    <View style={[styles.reviewContainer, style]}>
      {/* rating */}
      <Image style={styles.star} source={IMAGES.rating_star} />
      {/* reviews */}
      <PreReg12 text={"(" + rating + ")"} color={SUB_HEAD_LINE} style={{ marginLeft: WIDTH * 4 }} />
      <PreReg12 text="|" color={MIDDLE_LINE} style={{ marginHorizontal: WIDTH * 8 }} />
      <PreReg12 text={"후기 " + review + "개"} color={SUB_HEAD_LINE} />
    </View>
  )
}

export default RatingReviewBox
