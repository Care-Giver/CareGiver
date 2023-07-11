import { View, Pressable, Image, FlexStyle } from "react-native"
import React, { createFactory, useCallback, useEffect, useMemo, useState } from "react"
import { styles } from "./styles"
import { PreMed16, PreReg12 } from "../basics/custom-texts/custom-texts"
import { HEAD_LINE, MIDDLE_LINE, SUB_HEAD_LINE, DISABLED } from "../../theme"
import { images } from "../../../assets/images"

import RatingReviewBox from "../rating-review-box/rating-review-box"
import {
  ProfileCardInfo,
  createFavorite,
  deleteFavorite,
  getFavorites,
} from "../../services/axios/favorite"
import { useStores } from "../../models"
import { ratingRound } from "../../utils/format"

const ONPRESS_LIKED_BTN = () => {
  alert("준비중인 서비스입니다.")
}

interface ExampleProps {
  sitterData: ProfileCardInfo
  style?: FlexStyle
  isFavorite: boolean
  onPress: () => void //! 함수 props 의 type 으로써 적절치 못하나, 임시로 이렇게 처리한다
  onLikePress: () => void //! 임시 지정
}

export const SitterProfileCard = ({
  sitterData,
  style,
  onPress,
  isFavorite,
  onLikePress,
}: ExampleProps) => {
  const { crecheId, visitingId, userNickname, image, rating, reviewCount, title, desc } = sitterData
  const roundedRating = ratingRound(rating)

  return (
    <Pressable style={[styles.container, style]} onPress={onPress}>
      {/* <Pressable style={[styles.container, {}]}> */}
      {/* profile image */}
      {image ? (
        <Image style={styles.profileImg} source={{ uri: image }} />
      ) : (
        <Image style={styles.profileImg} source={images.default_pet_image_60} />
      )}

      <View style={styles.infoContainer}>
        {/* info box - user name, ratings, descriptions */}
        <View style={styles.infoWrapper}>
          {/* sitter name */}
          <PreMed16 text={userNickname} color={HEAD_LINE} />

          {/* rating, reviews */}
          <RatingReviewBox rating={roundedRating} review={reviewCount} style={{ marginTop: 4 }} />

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
        {/* like button */}
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
