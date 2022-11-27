import { View, Text, Image } from "react-native"
import React from "react"
import { styles } from "./styles"
import { Row } from "../../basics/row/row"
import { PreReg12, PreReg14 } from "../../basics/custom-texts/custom-texts"
import { WIDTH, palette, HEIGHT } from "#theme"
import RatingReviewBox from "../../rating-review-box/rating-review-box"
import { InProgressBookingProfileProps } from "./in-progress-booking-profile.props"
import { CaregiverTypeButton } from "#components"

export const InProgressBookingProfile = ({
  caregiverData,
  style,
}: InProgressBookingProfileProps) => {
  // const { petsitterData, style } = props
  return (
    <Row style={style}>
      {/* //* 프로필 사진 */}
      <Image
        // source={require(caregiverData.profileImg)}
        source={{
          uri:
            "https://mblogthumb-phinf.pstatic.net/MjAxOTA4MjJfNzYg/MDAxNTY2NDY1NzE3MDc0.EHhOw8ePIuBroKd9I63E5qwK_R6qQxFtc8fLZRTbRRQg.4EfInp9YmGDKDc1QqMbBKW331-3Djwtv2Xl4oAgbqn8g.PNG.misomktblog/%EB%8C%80%EC%A7%80_4.png?type=w800",
        }}
        style={styles.profileImg}
      />

      {/* //? 케어기버 정보 컨테이너 */}
      <View style={{ marginLeft: WIDTH * 18 }}>
        {/* //* 예약 유형 - 방문or위탁 / 펫시터or훈련사 */}
        <Row>
          {/* //TODO: 방문or위탁 / 펫시터or훈련사 데이터 구분 어떻게 할건지 */}
          <CaregiverTypeButton
            text={
              caregiverData.serviceType === "visit"
                ? "방문"
                : caregiverData.serviceType === "creche"
                ? "위탁"
                : ""
            }
          />
          <CaregiverTypeButton
            text={
              caregiverData.caregiverType === "petsitter"
                ? "펫시터"
                : caregiverData.caregiverType === "trainer"
                ? "훈련사"
                : ""
            }
            style={{ marginLeft: WIDTH * 4 }}
          />
        </Row>

        {/* //? 케어기버 정보 박스 - 이름, 별점, 후기, 자기소개 */}
        <View style={[styles.infoBox, { marginTop: HEIGHT * 10 }]}>
          {/* //* 케어기버 이름 */}
          <PreReg14 text={caregiverData.name} />
          {/* //* 별점 & 리뷰 박스 */}
          <RatingReviewBox
            rating={caregiverData.ratings}
            review={caregiverData.reviews}
            style={{ marginVertical: HEIGHT * 8 }}
          />
          {/* //* 케어기버 자기소개 */}
          <PreReg12
            text={caregiverData.introduce}
            numberOfLines={1}
            ellipsizeMode="tail"
            // TODO: width(글 길이 제한) 몇으로 할 건지?
            style={{ width: WIDTH * 168 }}
          />
        </View>
      </View>
    </Row>
  )
}
