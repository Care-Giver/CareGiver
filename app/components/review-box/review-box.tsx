import React, { useState } from "react"
import {
  View,
  Pressable,
  Image,
  FlatList,
  LayoutAnimation,
  StyleProp,
  ViewStyle,
} from "react-native"
import { Row } from "../_BASIC/row/row"
import { PreReg12, PreReg14 } from "../_BASIC/custom-texts/custom-texts"
import { images } from "#images"
import { RatingStars } from "./rating-stars/rating-stars"
import { MIDDLE_LINE, DISABLED } from "../../theme"
import { PetInfoDropdownBox } from "../_DROPDOWN_BOX/pet-info-dropdown-box/pet-info-dropdown-box"
import { styles } from "./styles"
import { Pet } from "#api"
import { alertModal } from "../../utils/alert-modal"
import { formatDate } from "../../utils/format"

interface ReviewBoxProps {
  style?: StyleProp<ViewStyle>
  //TODO: 이미지 url 주소로 넘겨받는 것 맞겠지..?
  profileImg: string
  userName: string
  ratings: number
  createdAt: Date
  images: Array<string>
  review: string
  pets: Array<Pet>

  reviewData: any // TODO
}

export const ReviewBox = (props: ReviewBoxProps) => {
  // const profileImg = profileImg
  // const userName = userName
  // const ratings = ratings
  // const createdAt = createdAt
  // const images = images
  // const review = review
  // const pets = pets
  const { style: viewStyle, reviewData } = props

  // ? 리뷰 정보
  const { user, ratings, createdAt, review, pets } = reviewData
  const userName = user.name
  const profileImg = user.profileImg ? user.profileImg : images.profile_default
  const reviewImages = reviewData?.images || []

  const date = formatDate(createdAt)

  const [dropdownIsOpen, setDropdownIsOpen] = useState(false)

  const handlePress = () => {
    alertModal("개발중 🏗️", "후기 펫정보는 (더미) 데이터에서 제공되지 않습니다.")
    return

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
        <View style={styles.profileContainer}>
          {/* //? 프로필 사진 */}
          <Image source={profileImg} style={styles.profileImg} />
          {/* //? 사용자 이름 */}
          <PreReg14
            text={userName}
            style={{
              marginLeft: 8,
            }}
          />
        </View>

        {/* //? 더보기 버튼 */}
        <Pressable
          onPress={() => {
            alertModal("개발중 🏗️", "후기 편집 기능은 개발 중 입니다.")
          }}
        >
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
        <RatingStars ratings={ratings} key={Math.random()} />
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
