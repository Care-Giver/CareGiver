import { ImageBackground, Pressable, View } from "react-native"
import React, { useLayoutEffect, useState } from "react"
import { HEIGHT, WIDTH } from "#theme"
import { InProgressBookingProfile } from "./in-progress-booking-profile/in-progress-booking-profile"
import { DivisionLine } from "../division-line/division-line"
import { LBG } from "#theme"
import { ReserveDateBox } from "./reserve-date-box/reserve-date-box"
import { styles } from "./styles"
import { images } from "#images"
import { InProgressBookingProps } from "./in-progress-booking.props"

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

  const handlePress = () => {}

  return (
    // <Pressable style={styles.root}>
    //   </Pressable>
    <Pressable style={style} onPress={handlePress}>
      <ImageBackground
        source={images.in_progress_booking_background}
        resizeMode="stretch"
        style={styles.background}
      >
        <InProgressBookingProfile
          // userData={serviceType === "방문" ? reserveData.petsitter : reserveData.crecheId}
          caregiverData={caregiverData}
        />

        <ReserveDateBox
          //TODO: 방문 -> startTime, endTime / 위탁 -> startDay, endDay :: 어떻게 구분할 것인지
          startDateTime={new Date(reserveData.startDate)}
          endDateTime={new Date(reserveData.endDate)}
          serviceType={reserveData.serviceType}
          style={{ marginTop: HEIGHT * 44 }}
        />
      </ImageBackground>
    </Pressable>
  )
}
