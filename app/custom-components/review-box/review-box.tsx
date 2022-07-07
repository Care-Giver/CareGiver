import { View, Text, Pressable, Image, FlatList } from "react-native"
import React, { useLayoutEffect, useState } from "react"
import { Row } from "../boxes/basics/row"
import { HEIGHT, WIDTH } from "../../theme"
import { PreReg12, PreReg14 } from "../custom-texts/custom-texts"
import IMAGES from "../../../assets/common-images"
import RatingStars from "../rating-stars/rating-stars"
import { MIDDLE_LINE, DISABLED } from "../../theme/palette"
import { ReviewBoxProps } from "./review-box.props"
import { PetProfileCard } from "../pet-profile-card/pet-profile-card"
import { PetInfoDropdownBox } from "../dropdown-boxes/pet-info-dropdown-box/pet-info-dropdown-box"
import { styles } from "./styles"

export const ReviewBox = (props: ReviewBoxProps) => {
  // const profileImg = props.profileImg
  // const userName = props.userName
  // const ratings = props.ratings
  // const createdAt = props.createdAt
  // const images = props.images
  // const review = props.review
  // const pets = props.pets
  // ? 리뷰 정보
  const { profileImg, userName, ratings, createdAt, images, review, pets } = props
  // ? 스타일
  const style = props.style
  // ? 날짜 표기를 YY.MM.DD 형태로 변환
  const formatDate = (date: Date) => {
    let formatted =
      date.getFullYear().toString().slice(2) +
      "." +
      (date.getMonth() < 10 ? "0" : "") +
      date.getMonth().toString() +
      "." +
      (date.getDate() < 10 ? "0" : "") +
      date.getDate().toString()
    return formatted
  }
  const date = formatDate(createdAt)

  const [dropdownIsOpen, setDropdownIsOpen] = useState(false)

  const handlePress = () => {
    setDropdownIsOpen(!dropdownIsOpen)
  }

  return (
    <View style={({}, style)}>
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
              marginLeft: WIDTH * 8,
            }}
          />
        </Pressable>

        {/* //? 더보기 버튼 */}
        <Pressable>
          <Image source={IMAGES.three_dots} style={styles.moreBtn} />
        </Pressable>
      </Row>

      {/* //* 평점 | 날짜 */}
      <Row
        style={{
          marginTop: HEIGHT * 8,

          // ? 리뷰 이미지가 있는 경우 -> 별점 박스 ~ 이미지 사이 거리 == 12
          // ? 리뷰 이미지가 없는 경우 -> 별점 박스 ~ 리뷰 내용 사이 거리 == 12
          // ? --> 이미지, 리뷰 내용의 Top에 마진을 주지 않고, 별점 박스의 Bottom에만 마진 값을 줌
          marginBottom: HEIGHT * 12,
        }}
      >
        {/* //? 평점 */}
        <RatingStars ratings={ratings} />
        {/* //? vertical divider */}
        <PreReg12 text="|" color={MIDDLE_LINE} style={{ marginHorizontal: WIDTH * 4 }} />
        {/* //? 날짜 */}
        <PreReg12 text={date} color={DISABLED} />
      </Row>

      {/* //* 리뷰 이미지 */}
      {images.length > 0 && (
        <FlatList
          data={images}
          renderItem={({ item, index }) => (
            <Pressable
              style={{
                width: WIDTH * 160,
                height: HEIGHT * 160,
                backgroundColor: "#F1F1F4",
                marginLeft: index > 0 ? WIDTH * 8 : null,
              }}
            />
          )}
          horizontal
          showsHorizontalScrollIndicator={false}
          style={{
            marginBottom: HEIGHT * 8,
          }}
        />
      )}

      {/* //* 리뷰 내용 */}
      <PreReg14 text={review} />

      {/* //* 펫 정보 */}
      <PetInfoDropdownBox
        isOpen={dropdownIsOpen}
        handlePress={handlePress}
        pets={pets}
        style={{ marginTop: HEIGHT * 20 }}
      />
    </View>
  )
}
