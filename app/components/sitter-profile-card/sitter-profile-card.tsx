import { View, Pressable, Image, ViewStyle, StyleProp } from "react-native"
import React from "react"
import { styles } from "./styles"
import { PreMed16, PreReg12 } from "../_BASIC/custom-texts/custom-texts"
import { HEAD_LINE, SUB_HEAD_LINE, DISABLED } from "../../theme"
import { images } from "../../../assets/images"
import { RatingReviewBox } from "../rating-review-box/rating-review-box"
import { VisitingCreche } from "../../screens/_CLIENT/search-stack/search-result-screen/search-result-screen"
import { UserEntity, CareGiverPetsitter } from "../../services/api"
import { profileImageUriHandler } from "../../utils/image-format-validate"

export type PetsitterProfileCardPetsitterData = {
  crecheId?: number
  visitingId?: number
} & Pick<VisitingCreche, "reviewCount" | "userNickname"> &
  Pick<CareGiverPetsitter, "title" | "desc" | "star" | "defaultFee"> &
  Pick<UserEntity, "profileImage">

interface SitterProfileCardProps {
  sitterData: PetsitterProfileCardPetsitterData
  isFavorite: boolean
  onPress: () => void
  onLikePress: () => void
  style?: StyleProp<ViewStyle>
  likeStyle?: StyleProp<ViewStyle>
}

export const SitterProfileCard = ({
  sitterData,
  style,
  onPress,
  isFavorite,
  onLikePress,
  likeStyle,
}: SitterProfileCardProps) => {
  const {
    crecheId,
    visitingId,
    //
    reviewCount,
    userNickname,
    //
    title,
    desc,
    star,
    //
    profileImage,
  } = sitterData

  return (
    <Pressable style={[styles.root, style]} onPress={onPress}>
      {/* <Pressable style={[styles.container, {}]}> */}

      <View style={styles.infoContainer}>
        {/* profile image */}
        <Image
          style={styles.profileImg}
          source={profileImageUriHandler(images.default_pet_image_60, "medium", profileImage)}
        />
        {/* info box - user name, ratings, descriptions */}
        <View style={styles.infoWrapper}>
          {/* sitter name */}
          <PreMed16 text={userNickname} color={HEAD_LINE} />

          {/* rating, reviews */}
          <RatingReviewBox rating={star} review={reviewCount} style={{ marginTop: 4 }} />

          {/* description title */}
          <PreReg12
            text={title}
            color={SUB_HEAD_LINE}
            style={{ marginTop: 12 }}
            numberOfLines={1}
          />

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
      {/* <View style={[styles.likeContainer, likeStyle]}>
        <Pressable onPress={onLikePress}>
          <Image
            style={styles.likeBtn}
            source={isFavorite ? images.filled_heart : images.empty_heart}
          />
        </Pressable>
      </View> */}
    </Pressable>
  )
}
