import { View, Pressable, Image, ImageBackground } from "react-native"
import React, { useCallback, useState } from "react"
import { styles } from "./styles"
import { Row } from "../basics/row/row"

import {
  PreBol14,
  PreMed14,
  PreReg10,
  PreReg12,
  PreReg14,
} from "../basics/custom-texts/custom-texts"
import { images } from "../../../assets/images"
import { DISABLED, GIVER_CASUAL_NAVY, HEAD_LINE, MIDDLE_LINE } from "../../theme"
import { CaregiverTypeButton } from "../../components"
import { navigate } from "../../navigators"
import { PastBookingProps } from "./past-booking.props"
import { UpdateFavoriteBody, createFavorite, deleteFavorite } from "../../services/axios/favorite"

type ServiceType = "visiting" | "creche"

const handleAgainPress = () => {
  console.log("다시 예약하기 클릭")
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
  const {
    profileImage,
    serviceType,
    petsitterType,
    petsitterId,
    bookingId,
    petsitterName,
    desc,
    startDate,
    endDate,
    isCanceled,
    isFavorite,
    reviewStatus,
    style,
  } = props

  const [isFavoriteState, setIsFavoriteState] = useState<boolean>(isFavorite)

  // * 찜 버튼 handler
  const handleLikeButton = useCallback(async () => {
    // ? 서비스 타입에 따른 api body 생성 - 위탁("crecheId"), 방문("visitingId")
    const updateFavoriteBody: UpdateFavoriteBody = {}
    switch (serviceType) {
      case "creche":
        updateFavoriteBody["crecheId"] = petsitterId
        break
      case "visiting":
        updateFavoriteBody["visitingId"] = petsitterId
        break
      default:
        console.debug("[handleLikeButton] >>> 잘못된 serviceType")
        return
    }

    // ? 이미 찜한 펫시터인 경우 - 찜 해제
    if (isFavoriteState) {
      const response = await deleteFavorite(updateFavoriteBody)
      if (response.ok) {
        setIsFavoriteState(false)
      }
    }
    // ? 찜을 하지 않은 펫시터인 경우 - 찜 설정
    else {
      const response = await createFavorite(updateFavoriteBody)
      if (response.ok) {
        setIsFavoriteState(true)
      }
    }
  }, [isFavoriteState])

  // * 리뷰 작성 버튼
  const ReviewButton = useCallback(() => {
    // ? 취소된 예약인 경우 - 리뷰 작성 불가능
    if (isCanceled) {
      return (
        <Pressable disabled>
          <PreMed14 text={"후기 작성하기"} color={DISABLED} />
        </Pressable>
      )
    }

    // ? 이미 작성 완료된 경우 - 후기 보기 페이지로
    if (reviewStatus === "Complete") {
      return (
        <Pressable>
          <PreBol14 text={"나의 후기 보기"} color={HEAD_LINE} />
        </Pressable>
      )
    }

    // ? 완료된 예약이면서 후기를 아직 작성하지 않은 경우
    return (
      <Pressable
        onPress={() =>
          navigate("write-review-screen", {
            profileImage,
            petsitterName,
            petsitterType,
            petsitterId,
            bookingId,
            serviceType,
            desc,
          })
        }
      >
        <PreBol14 text={"후기 작성하기"} color={GIVER_CASUAL_NAVY} />
      </Pressable>
    )
  }, [])

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
        imageStyle={{ borderRadius: 9 }}
      >
        <Row style={{ backgroundColor: "" }}>
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
          <PreReg14 text={`${petsitterName} 펫시터`} color={DISABLED} />
          {/* //? 찜 버튼 */}
          <Pressable onPress={handleLikeButton}>
            <Image
              style={styles.likeBtn}
              source={isFavoriteState ? images.filled_heart : images.empty_heart}
            />
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
          <ReviewButton />
        </Row>
      </View>
    </Pressable>
  )
}
