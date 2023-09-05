import { View, Pressable, Image, FlexStyle } from "react-native"
import React from "react"
import { styles } from "./styles"
import { PreMed16, PreReg12 } from "../basics/custom-texts/custom-texts"
import { HEAD_LINE, SUB_HEAD_LINE, DISABLED } from "../../theme"
import { images } from "../../../assets/images"
import RatingReviewBox from "../rating-review-box/rating-review-box"
import { Petsitter } from "../../screens/search-stack/search-result-screen/search-result-screen"
import { UserEntity } from "../../services/axios/types/entity.types"
import { CommonData } from "../../services/axios/types/creches.visitings.common.types"
import { profileImageUriHandler } from "../../utils/image-format-validate"

export type PetsitterProfileCardPetsitterData = {
  crecheId?: number
  visitingId?: number
} & Pick<Petsitter, "reviewCount" | "userNickname"> &
  Pick<CommonData, "title" | "desc" | "star"> &
  Pick<UserEntity, "profileImage">



interface SitterProfileCardProps {
  sitterData: PetsitterProfileCardPetsitterData
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

  console.log("profileImage >>>", profileImage)

  return (
    <Pressable style={[styles.container, style]} onPress={onPress}>
      {/* <Pressable style={[styles.container, {}]}> */}

      <View style={styles.infoContainer}>
        {/* profile image */}
        <Image
          style={styles.profileImg}
          source={profileImageUriHandler(images.default_pet_image_60, "medium", image)}
        />
        {/* info box - user name, ratings, descriptions */}
        <View style={styles.infoWrapper}>
          {/* sitter name */}
          <PreMed16 text={userNickname} color={HEAD_LINE} />

          {/* rating, reviews */}
          <RatingReviewBox rating={star} review={reviewCount} style={{ marginTop: 4 }} />

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
