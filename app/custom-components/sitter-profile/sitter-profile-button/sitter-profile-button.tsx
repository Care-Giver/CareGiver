import { View, Text, Pressable, Image } from "react-native"
import React from "react"
import { ProfileButtonProps } from "./sitter-profile-button.props"
import { styles } from "./styles"
import { SHADOW_2, WIDTH, HEIGHT } from "../../../theme"
import { PreReg12, PreReg14 } from "../../custom-texts/custom-texts"
import { HEAD_LINE, SUB_HEAD_LINE } from "../../../theme/palette"

export const SitterProfileButton = (props: ProfileButtonProps) => {
  const { name, rating, desc, image, style, onPress } = props

  return (
    <Pressable style={[styles.container, SHADOW_2, style]} onPress={onPress}>
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
        <Image style={styles.star} source={require("../images/rating-star.png")} />
        <PreReg12 style={{ marginLeft: WIDTH * 4 }} color={SUB_HEAD_LINE}>
          ({rating})
        </PreReg12>
      </View>

      {/* description */}
      <PreReg12 style={{ marginTop: HEIGHT * 8 }} color={SUB_HEAD_LINE} numberOfLines={2}>
        {desc}
      </PreReg12>

      {/* profile image */}
      <Image style={styles.image} source={{ uri: image }} />
    </Pressable>
  )
}
