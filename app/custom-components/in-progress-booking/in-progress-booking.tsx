import { ImageBackground, Pressable, View } from "react-native"
import React from "react"
import { HEIGHT, WIDTH } from "~/app/theme"
import { InProgressBookingProfile } from "./in-progress-booking-profile/in-progress-booking-profile"
import { DivisionLine } from "../division-line/division-line"
import { LBG } from "~/app/theme/palette"
import { ReserveDateBox } from "./reserve-date-box/reserve-date-box"
import { styles } from "./styles"
import IMAGES from "~/assets/common-images"

export const InProgressBooking = (props) => {
  const { reserveData } = props
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
  return (
    // <Pressable style={styles.root}>
    //   </Pressable>
    <Pressable>
      <ImageBackground
        source={IMAGES.in_progress_booking_background}
        resizeMode="stretch"
        style={styles.background}
      >
        <InProgressBookingProfile
          // userData={serviceType === "방문" ? reserveData.petsitter : reserveData.crecheId}
          userData={reserveData.petSitter}
        />

        <ReserveDateBox
          //TODO: 방문 -> startTime, endTime / 위탁 -> startDay, endDay :: 어떻게 구분할 것인지
          startDateTime={new Date(reserveData.startDateTime)}
          endDateTime={new Date(reserveData.endDateTime)}
          style={{ marginTop: HEIGHT * 44 }}
        />
      </ImageBackground>
    </Pressable>
  )
}
