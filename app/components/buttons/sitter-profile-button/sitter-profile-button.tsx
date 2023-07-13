import { View, Text, Pressable, Image } from "react-native"
import React from "react"
import { ProfileButtonProps } from "./sitter-profile-button.props"
import { styles } from "./styles"
import { PreReg12, PreReg14 } from "../../basics/custom-texts/custom-texts"
import { HEAD_LINE, SUB_HEAD_LINE, SHADOW_1 } from "#theme"
import { images } from "#images"
import { ratingRound } from "../../../utils/format"

export const SitterProfileButton = (props: ProfileButtonProps) => {
  const { name, rating, desc, image, style, onPress } = props
  const roundedRating = ratingRound(rating)

  return (
    <Pressable style={[styles.container, SHADOW_1, style]} onPress={onPress}>
      {/* name */}
      <PreReg14 color={HEAD_LINE}>{name}</PreReg14>

      {/* rating */}
      <View style={styles.ratingContainer}>
        {/* {new Array(Math.ceil(rating)).fill("").map((value, index) => (
            <Image
              key={index} 
              style={[styles.star, index > 0 ? styles.starMargin : null]}
              source={
                index < Math.floor(rating)
                  ? require("../images/rating-star.png")
                  : index === Math.floor(rating)
                  ? (rating % 1) * 10 >= 5
                    ? require("../images/rating-star-half.png")
                    : require("../images/empty-12.png")
                  : require("../images/empty-12.png")
              }
            />
          ))} */}
        <Image style={styles.star} source={images.rating_star} />
        <PreReg12 style={{ marginLeft: 4 }} color={SUB_HEAD_LINE}>
          ({roundedRating})
        </PreReg12>
      </View>

      {/* description */}
      <PreReg12 style={{ marginTop: 8 }} color={SUB_HEAD_LINE} numberOfLines={1}>
        {desc}
      </PreReg12>

      {/* profile image */}
      <Image style={styles.image} source={{ uri: image }} />
    </Pressable>
  )
}
