import { View, Text, Pressable, Image, FlatList, LayoutAnimation } from "react-native"
import React, { useLayoutEffect, useState } from "react"
import { Row } from "../basics/row/row"

import { PreReg12, PreReg14 } from "../basics/custom-texts/custom-texts"
import { images } from "#images"
import RatingStars from "../rating-stars/rating-stars"
import { MIDDLE_LINE, DISABLED } from "../../theme"
import { ReviewBoxProps } from "./review-box.props"
import { PetProfileCard } from "../pet-profile-card/pet-profile-card"
import { PetInfoDropdownBox } from "../dropdown-boxes/pet-info-dropdown-box/pet-info-dropdown-box"
import { styles } from "./styles"

export const ReviewBox = ({ style: viewStyle, key, reviewData }) => {
  // const profileImg = profileImg
  // const userName = userName
  // const ratings = ratings
  // const createdAt = createdAt
  // const images = images
  // const review = review
  // const pets = pets
  // ? 리뷰 정보
  const { user, ratings, createdAt, review, pets } = reviewData
  const userName = user.name
  const profileImg = user.profileImg ? user.profileImg : images.profile_default
  const reviewImages = reviewData.images ? reviewData.images : []

  // ? 날짜 표기를 YY.MM.DD 형태로 변환
  const formatDate = (date: Date) => {
    let formatted =
      date.getFullYear().toString().slice(2) +
      "." +
      (date.getMonth() + 1 < 10 ? "0" : "") +
      (date.getMonth() + 1).toString() +
      "." +
      (date.getDate() < 10 ? "0" : "") +
      date.getDate().toString()
    return formatted
  }
  const date = formatDate(createdAt)

  const [dropdownIsOpen, setDropdownIsOpen] = useState(false)

  const handlePress = () => {
    setDropdownIsOpen(!dropdownIsOpen)
    LayoutAnimation.configureNext(LayoutAnimation.create(170, "easeInEaseOut", "opacity"))
  }

  return (
    <View style={[styles.root, viewStyle]}>
      {/* //* 유저 프로필 + 더보기 버튼 */}
      <Row
        style={{
          justifyContent: "space-between",
        }}
      >
        <Pressable style={styles.profileContainer}>
          {/* //? 프로필 사진 */}
          <Image source={profileImg} style={styles.profileImg} />
          {/* //? 사용자 이름 */}
          <PreReg14
            text={userName}
            style={{
              marginLeft: 8,
            }}
          />
        </Pressable>

        {/* //? 더보기 버튼 */}
        <Pressable>
          <Image source={images.three_dots} style={styles.moreBtn} />
        </Pressable>
      </Row>

      {/* //* 평점 | 날짜 */}
      <Row
        style={{
          marginTop: 8,

          // ? 리뷰 이미지가 있는 경우 -> 별점 박스 ~ 이미지 사이 거리 == 12
          // ? 리뷰 이미지가 없는 경우 -> 별점 박스 ~ 리뷰 내용 사이 거리 == 12
          // ? --> 이미지, 리뷰 내용의 Top에 마진을 주지 않고, 별점 박스의 Bottom에만 마진 값을 줌
          marginBottom: 12,
        }}
      >
        {/* //? 평점 */}
        <RatingStars ratings={ratings} key={key} />
        {/* //? vertical divider */}
        <PreReg12 text="|" color={MIDDLE_LINE} style={{ marginHorizontal: 4 }} />
        {/* //? 날짜 */}
        <PreReg12 text={date} color={DISABLED} />
      </Row>

      {/* //* 리뷰 이미지 */}
      {reviewImages.length > 0 && (
        <FlatList
          data={reviewImages}
          renderItem={({ item, index }) => (
            <Pressable
              key={index}
              style={{
                width: 160,
                height: 160,
                backgroundColor: "#F1F1F4",
                marginLeft: index > 0 ? 8 : null,
              }}
            />
          )}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          style={{
            marginBottom: 8,
          }}
        />
      )}

      {/* //* 리뷰 내용 */}
      <PreReg14 text={review} />

      {/* //* 펫 정보 */}
      <PetInfoDropdownBox
        isOpen={dropdownIsOpen}
        onPress={handlePress}
        pets={pets}
        style={{ marginTop: 20 }}
      />
    </View>
  )
}
