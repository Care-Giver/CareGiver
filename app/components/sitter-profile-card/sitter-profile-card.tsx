import { View, Pressable, Image, FlexStyle } from "react-native"
import React from "react"
import { styles } from "./styles"
import { PreMed16, PreReg12 } from "../basics/custom-texts/custom-texts"
import { HEAD_LINE, SUB_HEAD_LINE, DISABLED } from "../../theme"
import { images } from "../../../assets/images"
import RatingReviewBox from "../rating-review-box/rating-review-box"
import { ProfileCardInfo } from "../../services/axios/favorite"
import { ratingRound } from "../../utils/format"

interface SitterProfileCardProps {
  sitterData: ProfileCardInfo
  style?: FlexStyle
  isFavorite: boolean
  onPress: () => void
  onLikePress: () => void
}

export const SitterProfileCard = ({
  sitterData,
  style,
  onPress,
  isFavorite,
  onLikePress,
}: SitterProfileCardProps) => {
  const { crecheId, visitingId, userNickname, image, rating, reviewCount, title, desc } = sitterData

  return (
    <Pressable style={[styles.container, style]} onPress={onPress}>
      {/* <Pressable style={[styles.container, {}]}> */}

      <View style={styles.infoContainer}>
        {/* profile image */}
        <Image
          style={styles.profileImg}
          source={image ? { uri: image } : images.default_pet_image_60}
        />
        {/* info box - user name, ratings, descriptions */}
        <View style={styles.infoWrapper}>
          {/* sitter name */}
          <PreMed16 text={userNickname} color={HEAD_LINE} />

          {/* rating, reviews */}
          <RatingReviewBox rating={rating} review={reviewCount} style={{ marginTop: 4 }} />

          {/* description title */}
          <PreReg12 text={title} color={SUB_HEAD_LINE} style={{ marginTop: 12 }} />

          {/* description details */}
          <PreReg12
            text={desc}
            color={DISABLED}
            style={{ marginTop: 6 }}
            numberOfLines={2}
            ellipsizeMode="tail"
          />
        </View>
      </View>
      {/* like button */}
      <View style={styles.likeContainer}>
        <Pressable onPress={onLikePress}>
          {/* // TODO: 유저의 찜상태에 따라 하트 채우기 */}
          <Image
            style={styles.likeBtn}
            source={isFavorite ? images.filled_heart : images.empty_heart}
          />
        </Pressable>
      </View>
    </Pressable>
  )
}
