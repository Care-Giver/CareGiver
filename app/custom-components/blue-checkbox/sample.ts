import { View, Text, Pressable, Image } from "react-native"
import React from "react"
import { SitterProfileCardProps } from "./sitter-profile-card.props"
import { styles } from "./styles"
import { PreMed16, PreReg12 } from "../custom-texts/custom-texts"
import { HEAD_LINE, MIDDLE_LINE, SUB_HEAD_LINE, DISABLED } from "../../theme/palette"
import IMAGES from "../../../assets/common-images"
import { HEIGHT, WIDTH } from "../../theme"

export const SitterProfileCard = (props: SitterProfileCardProps) => {
  const { style, image, name, rating, review, title, desc, onPress } = props

  return (
    <Pressable style={[styles.container, style]} onPress={onPress}>
      {/* profile image */}
      <Image style={styles.profileImg} source={{ uri: image }} />

      <View style={styles.infoContainer}>
        {/* info box - user name, ratings, descriptions */}
        <View style={styles.infoWrapper}>
          {/* sitter name */}
          <PreMed16 text={name} color={HEAD_LINE} />

          {/* rating, reviews */}
          <View style={styles.reviewContainer}>
            {/* rating */}
            <Image style={styles.star} source={IMAGES.rating_star} />
            {/* reviews */}
            <PreReg12
              text={"(" + rating + ")"}
              color={SUB_HEAD_LINE}
              style={{ marginLeft: WIDTH * 4 }}
            />
            <PreReg12 text="|" color={MIDDLE_LINE} style={{ marginHorizontal: WIDTH * 8 }} />
            <PreReg12 text={"후기 " + review + "개"} color={SUB_HEAD_LINE} />
          </View>

          {/* description title */}
          <PreReg12 text={title} color={SUB_HEAD_LINE} style={{ marginTop: HEIGHT * 12 }} />

          {/* description details */}
          <PreReg12
            text={desc}
            color={DISABLED}
            style={{ marginTop: HEIGHT * 6 }}
            numberOfLines={2}
            ellipsizeMode="tail"
          />
        </View>
        {/* like button */}
        <Image style={styles.likeBtn} source={IMAGES.empty_heart} />
      </View>
    </Pressable>
  )
}
