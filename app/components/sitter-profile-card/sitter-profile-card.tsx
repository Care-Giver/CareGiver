import { View, Text, Pressable, Image, FlexStyle } from "react-native"
import React from "react"
import { SitterProfileCardProps } from "./sitter-profile-card.props"
import { styles } from "./styles"
import { PreMed16, PreReg12 } from "../basics/custom-texts/custom-texts"
import { HEAD_LINE, MIDDLE_LINE, SUB_HEAD_LINE, DISABLED } from "#theme/palette"
import IMAGES from "#images"
import { HEIGHT, WIDTH } from "#theme/index"
import RatingReviewBox from "../rating-review-box/rating-review-box"

const ONPRESS_LIKED_BTN = () => {
  alert("준비중인 서비스입니다.")
}

interface ExampleProps {
  sitterData: {
    id: string
    image: string
    name: string
    rating: number
    review: number
    title: string
    desc: string
  }
  style?: FlexStyle
  onPress: () => void //! 함수 props 의 type 으로써 적절치 못하나, 임시로 이렇게 처리한다
}

export const SitterProfileCard = ({ sitterData, style, onPress }: ExampleProps) => {
  const { id, name, image, rating, review, title, desc } = sitterData

  return (
    <Pressable style={[styles.container, style]} onPress={onPress}>
      {/* <Pressable style={[styles.container, {}]}> */}
      {/* profile image */}
      <Image style={styles.profileImg} source={{ uri: image }} />

      <View style={styles.infoContainer}>
        {/* info box - user name, ratings, descriptions */}
        <View style={styles.infoWrapper}>
          {/* sitter name */}
          <PreMed16 text={name} color={HEAD_LINE} />

          {/* rating, reviews */}
          <RatingReviewBox rating={rating} review={review} style={{ marginTop: HEIGHT * 4 }} />

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
        {/* // TODO: alert로 변경 */}
        <Pressable onPress={ONPRESS_LIKED_BTN}>
          <Image style={styles.likeBtn} source={IMAGES.empty_heart} />
        </Pressable>
      </View>
    </Pressable>
  )
}
