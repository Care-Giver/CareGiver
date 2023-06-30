import { View, Text, Pressable, Image, ImageBackground } from "react-native"
import React from "react"
import { styles } from "./styles"
import { Row } from "../basics/row/row"

import { PreMed14, PreReg10, PreReg12, PreReg14 } from "../basics/custom-texts/custom-texts"
import { images } from "#images"
import { DISABLED, GIVER_CASUAL_NAVY, HEAD_LINE, MIDDLE_LINE } from "#theme"
import { pastBooking } from "./dummy-data"
import { CaregiverTypeButton } from "#components"
import { navigate } from "#navigators"
import { PastBookingProps } from "./past-booking.props"

type ServiceType = "visiting" | "creche"

const ONPRESS_LIKED_BTN = () => {
  alert("준비중인 서비스입니다.")
}

const handleAgainPress = () => {
  console.log("다시 예약하기 클릭")
}

const handleReviewPress = () => {
  navigate("write-review-screen")
}

const handlePress = () => {
  alert("아직 개발중인 기능입니다 😉")
}

const setDateText = (dateTime: Date, serviceType: ServiceType): string => {
  const month = dateTime.getMonth() + 1
  const day = dateTime.getDate()

  if (serviceType === "creche") {
    return `${month}월 ${day}일`
  } else {
    const hours = dateTime.getHours()
    const minutes = dateTime.getMinutes() === 0 ? "00" : dateTime.getMinutes()
    return `${month}월 ${day}일 ${hours}:${minutes}`
  }
}

export const PastBooking = (props: PastBookingProps) => {
  const { profileImage, serviceType, petSitterName, startDate, endDate, isCanceled, style } = props
  return (
    <Pressable style={[styles.root, style]} onPress={handlePress}>
      {/* //* 케어기버 프로필 사진 */}
      {/* // TODO default profile image 수정 */}
      <ImageBackground
        source={
          profileImage
            ? {
                uri:
                  // "https://mblogthumb-phinf.pstatic.net/MjAxOTA4MjJfMjE3/MDAxNTY2NDY1NjQ0Njc3.HlKJUXi4rPFNs92rbdwegwH7JAzyM-6kWfy_UZDBxfEg.I6Jy9AhcKKWmNr6ZeKKotQSdq3pLX6v4nYH8XXqmlh8g.PNG.misomktblog/%EB%8C%80%EC%A7%80_1.png?type=w800",
                  profileImage,
              }
            : images.default_pet_image_60
        }
        style={styles.profileImg}
      >
        <Row style={{ backgroundColor: null }}>
          <CaregiverTypeButton
            text={serviceType === "creche" ? "위탁" : "방문"}
            style={styles.typeBtn}
          />
          <CaregiverTypeButton text={"펫시터"} style={[styles.typeBtn, { marginLeft: 6 }]} />
        </Row>
      </ImageBackground>

      {/* //* 예약 정보 */}
      <View style={styles.bookingInfo}>
        {/* //? 케어기버 이름 (*** 펫시터) */}
        <Row style={{ justifyContent: "space-between" }}>
          <PreReg14 text={`${petSitterName} 펫시터`} color={DISABLED} />
          {/* //? 찜 버튼 */}
          <Pressable onPress={ONPRESS_LIKED_BTN}>
            <Image style={styles.likeBtn} source={images.empty_heart} />
          </Pressable>
        </Row>

        {/* //* 체크인, 체크아웃 */}
        <Row style={{ alignItems: "baseline" }}>
          {/* //? 체크인 */}
          <View>
            <PreReg10 text={"체크인"} color={DISABLED} />
            {/* // TODO: date string 변환 함수 - 참고: reserve-date-box.tsx */}
            <PreReg12
              text={setDateText(new Date(startDate), serviceType)}
              color={DISABLED}
              style={{ marginTop: 4 }}
            />
          </View>

          {/* //? division line */}
          <PreReg12 text={"|"} color={MIDDLE_LINE} style={{ marginLeft: 3, marginRight: 8 }} />

          {/* //? 체크아웃 */}
          <View>
            <PreReg10 text={"체크아웃"} color={DISABLED} />
            {/* // TODO: date string 변환 함수 - 참고: reserve-date-box.tsx */}
            <PreReg12
              text={setDateText(new Date(endDate), serviceType)}
              color={DISABLED}
              style={{ marginTop: 4 }}
            />
          </View>
        </Row>

        {/* //* 다시 예약하기 | 후기 작성하기 */}
        <Row style={{}}>
          {/* //? 다시 예약하기 버튼 */}
          <Pressable onPress={handleAgainPress}>
            <PreMed14 text={"다시 예약하기"} color={HEAD_LINE} />
          </Pressable>

          {/* //? division line */}
          <PreReg12 text={"|"} color={MIDDLE_LINE} style={styles.divisionLine} />

          {/* //? 후기 작성하기 버튼 */}
          {!isCanceled ? (
            <Pressable onPress={handleReviewPress}>
              <PreMed14 text={"후기 작성하기"} color={GIVER_CASUAL_NAVY} />
            </Pressable>
          ) : (
            <Pressable disabled>
              <PreMed14 text={"후기 작성하기"} color={DISABLED} />
            </Pressable>
          )}
        </Row>
      </View>
    </Pressable>
  )
}
