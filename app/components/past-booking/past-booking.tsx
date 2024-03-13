import { View, Pressable, Image, ImageBackground, ImageSourcePropType } from "react-native"
import React, { useCallback, useEffect, useLayoutEffect, useState } from "react"
import { styles } from "./styles"
import { Row } from "../_BASIC/row/row"

import {
  PreBol14,
  PreMed14,
  PreReg10,
  PreReg12,
  PreReg14,
} from "../_BASIC/custom-texts/custom-texts"
import { images } from "../../../assets/images"
import { DISABLED, GIVER_CASUAL_NAVY, HEAD_LINE, MIDDLE_LINE, palette } from "../../theme"
import { CaregiverTypeButton } from "../../components"
import { navigate } from "../../navigators"
import { PastBookingProps } from "./past-booking.props"
import { UpdateFavoriteBody, createFavorite, deleteFavorite } from "../../services/api/favorite"
import { profileImageUriHandler } from "../../utils/image-format-validate"

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
    forceUpdate,
  } = props

  const [isFavoriteState, setIsFavoriteState] = useState<boolean>(isFavorite)

  // * 찜 버튼 handler
  const handleLikeButton = useCallback(async () => {
    // ? 서비스 타입에 따른 api body 생성 - 위탁("crecheId"), 방문("visitingId")
    const updateFavoriteBody: UpdateFavoriteBody = {}
    switch (serviceType) {
      case "creche":
        updateFavoriteBody.crecheId = petsitterId
        break
      case "visiting":
        updateFavoriteBody.visitingId = petsitterId
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
        forceUpdate && forceUpdate()
      }
    }
    // ? 찜을 하지 않은 펫시터인 경우 - 찜 설정
    else {
      const response = await createFavorite(updateFavoriteBody)
      if (response.ok) {
        setIsFavoriteState(true)
        forceUpdate && forceUpdate()
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
        <Pressable
          onPress={() =>
            navigate("view-review-screen", {
              serviceType,
              bookingId,
              profileImage,
              petsitterName,
              desc,
            })
          }
        >
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
        source={profileImageUriHandler(images.default_pet_image_60, "medium", profileImage)}
        style={styles.profileImg}
        imageStyle={{ borderRadius: 9 }}
      >
        <Row style={{ backgroundColor: "" }}>
          <CaregiverTypeButton
            text={serviceType === "creche" ? "위탁" : "방문"}
            style={styles.typeBtn}
          />
          <CaregiverTypeButton
            text={"펫시터"}
            textColor={palette.white}
            style={{ ...styles.typeBtn, marginLeft: 6 }}
          />
        </Row>
      </ImageBackground>

      {/* //* 예약 정보 */}
      <View style={styles.bookingInfo}>
        {/* //? 케어기버 이름 */}
        <Row style={{ justifyContent: "space-between" }}>
          <PreReg14 text={`${petsitterName}`} color={DISABLED} />
          {/* //? 찜 버튼 */}
          {/* //TODO: 즐겨찾기 기능 재정립 이후 다시 활성화 할 것. */}
          {/* <Pressable onPress={handleLikeButton}>
            <Image
              style={styles.likeBtn}
              source={
                // ! force update 함수가 있는 경우, isFavorite param 값으로 (서버에 저장된 값으로) 직접 판별하고
                // ! force update 함수가 없는 경우, isFavoriteState 값으로 간접적으로 판별한다.
                (forceUpdate && isFavorite) || (!forceUpdate && isFavoriteState)
                  ? images.filled_heart
                  : images.empty_heart
              }
            />
          </Pressable> */}
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
        {/* // TODO: "후기 작성" 기능 테스트 완료 후 다시 표출하기 */}
        {/* // FIXME: "다시 예약하기"는 유저 플로우가 어떻게 되는 건가? */}
        <Row>
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
