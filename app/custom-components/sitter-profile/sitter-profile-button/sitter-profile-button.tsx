import { View, Text, Pressable, Image } from "react-native"
import React from "react"
import { ProfileButtonProps } from "./sitter-profile-button.props"
import { styles } from "./styles"
import { SHADOW_2, WIDTH, HEIGHT } from "../../../theme"
import { PreReg12, PreReg14 } from "../../custom-texts/custom-texts"
import { HEAD_LINE, SUB_HEAD_LINE } from "../../../theme/palette"

export const SitterProfileButton = (props: ProfileButtonProps) => {
  const { name, ratings, intro, uri, style } = props

  return (
    <Pressable style={[styles.container, SHADOW_2, style]}>
      {/* name */}
      <PreReg14 color={HEAD_LINE}>{name}</PreReg14>

      {/* ratings */}
      <View style={styles.ratingsContainer}>
        {new Array(5).fill("").map((value, index) => (
          <Image
            key={index} //? Key Warning 에러 해결.
            style={[styles.star, index > 0 ? styles.starMargin : null]}
            source={
              index < Math.floor(ratings)
                ? require("../images/rating-star.png")
                : index === Math.floor(ratings)
                ? (ratings % 1) * 10 >= 5
                  ? require("../images/rating-star-half.png")
                  : require("../images/left-arrow.png")
                : require("../images/left-arrow.png")
            }
          />
        ))}
        <PreReg12 style={{ marginLeft: WIDTH * 4 }} color={SUB_HEAD_LINE}>
          ({ratings})
        </PreReg12>
      </View>

      {/* introduction */}
      <PreReg12 style={{ marginTop: HEIGHT * 8 }} color={SUB_HEAD_LINE}>
        {intro}
      </PreReg12>

      {/* profile image */}
      {/* <Image style={styles.image} source={require("")} /> */}
    </Pressable>
  )
}
