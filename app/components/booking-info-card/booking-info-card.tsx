import { View, Pressable, ImageBackground, StyleSheet, StyleProp, ViewStyle } from "react-native"
import React, { useCallback, useEffect, useState } from "react"
import { Row } from "../_BASIC/row/row"
import {
  PreBol14,
  PreMed14,
  PreReg10,
  PreReg12,
  PreReg14,
} from "../_BASIC/custom-texts/custom-texts"
import { images } from "../../../assets/images"
import {
  DISABLED,
  GIVER_CASUAL_NAVY,
  HEAD_LINE,
  HEIGHT,
  LIGHT_LINE,
  MIDDLE_LINE,
  WIDTH,
  palette,
} from "../../theme"
import { CaregiverTypeButton } from ".."
import { UpdateFavoriteBody, createFavorite, deleteFavorite } from "../../services/api/favorite"
import { profileImageUriHandler } from "../../utils/image-format-validate"
import { BookingStatus, ReviewStatus } from "../../services/api"

type ServiceType = "visiting" | "creche"

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

type BookingInfoCardProps = {
  style?: StyleProp<ViewStyle>
  onPress?: () => void // 카드 전체 클릭시
  onPressCancelBooking?: () => void // "예약 취소" 클릭시
  onPressReview?: () => void // 후기 버튼 ("후기 작성하기" | "나의 후기 보기") 클릭시
  startDate?: string
  endDate?: string
  startTime?: string
  endTime?: string
  profileImage: string | null
  serviceType: ServiceType
  petsitterId: number
  bookingId: number
  petsitterName: string
  desc: string
  forceUpdate?: () => any
  isFavorite: false // TODO: 즐겨찾기 기능 추가시, boolean 으로 변경하기
} & (
  | {
      // 승인대기(=신청한 예약)
      type: BookingStatus.WAITING
    }
  | {
      // 서비스 완료(=지난 예약)
      type: BookingStatus.COMPLETE
      isCanceled?: boolean
      reviewStatus?: ReviewStatus
    }
)

export const BookingInfoCard = (props: BookingInfoCardProps) => {
  const {
    profileImage,
    serviceType,
    petsitterId,
    bookingId,
    petsitterName,
    desc,
    startDate,
    endDate,
    startTime,
    endTime,
    isFavorite,
    style,
    forceUpdate,
    onPress,
    onPressCancelBooking,
    onPressReview,
    type,
  } = props

  // const [isFavoriteState, setIsFavoriteState] = useState<boolean>(isFavorite)

  // // * 찜 버튼 handler
  // const handleLikeButton = useCallback(async () => {
  //   // ? 서비스 타입에 따른 api body 생성 - 위탁("crecheId"), 방문("visitingId")
  //   const updateFavoriteBody: UpdateFavoriteBody = {}
  //   switch (serviceType) {
  //     case "creche":
  //       updateFavoriteBody.crecheId = petsitterId
  //       break
  //     case "visiting":
  //       updateFavoriteBody.visitingId = petsitterId
  //       break
  //     default:
  //       console.debug("[handleLikeButton] >>> 잘못된 serviceType")
  //       return
  //   }

  //   // ? 이미 찜한 펫시터인 경우 - 찜 해제
  //   if (isFavoriteState) {
  //     const response = await deleteFavorite(updateFavoriteBody)
  //     if (response.ok) {
  //       setIsFavoriteState(false)
  //       forceUpdate && forceUpdate()
  //     }
  //   }
  //   // ? 찜을 하지 않은 펫시터인 경우 - 찜 설정
  //   else {
  //     const response = await createFavorite(updateFavoriteBody)
  //     if (response.ok) {
  //       setIsFavoriteState(true)
  //       forceUpdate && forceUpdate()
  //     }
  //   }
  // }, [isFavoriteState])

  return (
    <Pressable
      style={[styles.root, style]}
      // 상세내역 보기
      onPress={onPress}
    >
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
              text={setDateText(
                new Date(serviceType === "visiting" ? startTime : startDate),
                serviceType,
              )}
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
              text={setDateText(
                new Date(serviceType === "visiting" ? endTime : endDate),
                serviceType,
              )}
              color={DISABLED}
              style={{ marginTop: 4 }}
            />
          </View>
        </Row>
        {/* 신청한 예약 */}
        {type === BookingStatus.WAITING ? (
          <Row>
            <Pressable onPress={onPressCancelBooking}>
              <PreMed14 text={"예약 취소하기"} color={HEAD_LINE} />
            </Pressable>
            <PreReg12 text={"|"} color={MIDDLE_LINE} style={styles.divisionLine} />
            <PreMed14 text={"승인 대기중"} color={DISABLED} />
          </Row>
        ) : null}

        {/* 지난 예약 */}
        {type === BookingStatus.COMPLETE ? (
          <Row>
            {/* //? 다시 예약하기 버튼 */}
            {/* // FIXME: "다시 예약하기"는 유저 플로우가 어떻게 되는 건가? */}
            {/* //TODO: 다시 예약하기 재정립 이후 다시 활성화 할 것. */}
            {/* <Pressable onPress={handleAgainPress}>
                  <PreMed14 text={"다시 예약하기"} color={HEAD_LINE} />
                </Pressable> 
            */}
            {/* <PreReg12 text={"|"} color={MIDDLE_LINE} style={styles.divisionLine} /> */}

            {/* //? 후기 버튼 */}
            {props.type === BookingStatus.COMPLETE && props?.isCanceled ? (
              // 취소한 경우
              <Pressable disabled>
                <PreMed14
                  text={"후기 작성하기"}
                  color={DISABLED}
                  style={{ textDecorationLine: "line-through" }}
                />
                <PreReg10
                  text={"취소한 예약은 후기를 작성할 수 없습니다."}
                  color={DISABLED}
                  mt={4 * HEIGHT}
                  adjustsFontSizeToFit
                />
              </Pressable>
            ) : (
              // 이미 후기를 작성한 경우 | 아직 후기를 작성하지 않은 경우
              <Pressable onPress={onPressReview}>
                <PreBol14
                  text={
                    props.type === BookingStatus.COMPLETE && props?.reviewStatus === "Complete"
                      ? "나의 후기 보기"
                      : "후기 작성하기"
                  }
                  color={
                    props.type === BookingStatus.COMPLETE && props?.reviewStatus === "Complete"
                      ? HEAD_LINE
                      : GIVER_CASUAL_NAVY
                  }
                />
              </Pressable>
            )}
          </Row>
        ) : null}
      </View>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  root: {
    width: "100%",
    paddingHorizontal: 16,
    paddingVertical: 16,

    flexDirection: "row",
    borderRadius: 8,
    borderColor: LIGHT_LINE,
    borderWidth: 1,

    backgroundColor: palette.white,

    // TODO: 그림자 부분 코드 정확하게 기입
    shadowColor: GIVER_CASUAL_NAVY,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.1,
    shadowRadius: 1,
    // ! 바텀시트 열릴 때 바텀시트 위를 덮음
    elevation: 1,
  },

  profileImg: {
    // width: 12 * WIDTH,
    // width: "auto",
    height: 108,
    flex: 1,
    padding: 8,
  },

  typeBtn: {
    backgroundColor: "rgba(17, 17, 17, 0.5)",
    borderWidth: 0,
  },

  bookingInfo: {
    width: "auto",
    flex: 2,
    marginLeft: 16 * WIDTH,
    flexDirection: "column",
    justifyContent: "space-between",
    paddingVertical: 7.5,
  },

  divisionLine: {
    marginHorizontal: 8,
  },
})
