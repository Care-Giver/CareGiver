import { Dimensions, ImageBackground, Pressable, StyleSheet } from "react-native"
import React, { useLayoutEffect, useState } from "react"
import { InProgressBookingProfile } from "./in-progress-booking-profile/in-progress-booking-profile"
import { DivisionLine } from "../division-line/division-line"
import { DEVICE_WINDOW_WIDTH, LBG } from "#theme"
import { ReserveDateBox } from "./reserve-date-box/reserve-date-box"
import { images } from "#images"
import { InProgressBookingProps } from "./in-progress-booking.props"
import { navigate } from "#navigators"
import { BASIC_BACKGROUND_PADDING_WIDTH } from "../basics/view-component/view-component"

export const InProgressBooking = (props: InProgressBookingProps) => {
  const { reserveData, style } = props

  const [caregiverData, setCaregiverData] = useState({
    id: reserveData.id,
    name: "",
    ratings: 0,
    reviews: 0,
    introduce: "",
    profileImg: "",
    serviceType: reserveData.serviceType,
    caregiverType: reserveData.caregiverType,
  })
  console.log("=== in-progress-booking.tsx ===")
  console.log(reserveData)
  //   let serviceType = "방문"
  //   if (reserveData.crecheId) {
  //     serviceType = "위탁"
  //   }
  //   try {
  //     reserveData.petsitter
  //   } catch {
  //     serviceType = "위탁"
  //   }

  useLayoutEffect(() => {
    // TODO: reserveData.petsitterId 를 통해 펫시터 프로필 정보를 서버에 요청
    // - 요청받은 펫시터 정보를 통해 아래와 같이 PetsitterDataProps 형태로 가공하기
    // const petsitter = await (펫시터 정보 요청 맟 데이터 가공 함수)
    // :: petsitterId를 넘겨주면 PetsitterDataProps 형태로 가공된 데이터 전달
    const caregiverProfile = {
      name: "유혜린",
      ratings: 4.7,
      reviews: 12,
      introduce: "어느덧 펫시터 3년차 입니다!",
      profileImg: "",
    }
    setCaregiverData({
      ...caregiverData,
      ...caregiverProfile,
    })
  }, [])

  const handlePress = () => {
    navigate("booking-detail-screen")
  }
  console.log("DEVICE_WINDOW_WIDTH", DEVICE_WINDOW_WIDTH)

  return (
    // <Pressable style={styles.root}>
    //   </Pressable>
    <Pressable style={{ backgroundColor: "oragne" }} onPress={handlePress}>
      <ImageBackground
        source={images.in_progress_booking_background}
        // resizeMode="stretch"
        style={styles.background}
      >
        <InProgressBookingProfile
          // userData={serviceType === "방문" ? reserveData.petsitter : reserveData.crecheId}
          caregiverData={reserveData}
        />

        <ReserveDateBox
          //TODO: 방문 -> startTime, endTime / 위탁 -> startDay, endDay :: 어떻게 구분할 것인지
          startDateTime={new Date(reserveData.startDate)}
          endDateTime={new Date(reserveData.endDate)}
          serviceType={reserveData.serviceType}
          style={{ marginTop: 44 }}
        />
      </ImageBackground>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  background: {
    // width: 358,
    width: DEVICE_WINDOW_WIDTH - 2 * BASIC_BACKGROUND_PADDING_WIDTH,
    height: 241,
    // backgroundColor: "yellow",

    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 25,
  },
})
