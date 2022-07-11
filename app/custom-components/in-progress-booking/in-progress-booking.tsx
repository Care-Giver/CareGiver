import { View, Text, StyleSheet } from "react-native"
import React from "react"
import { HEIGHT, WIDTH } from "../../theme"
import { InProgressBookingProfile } from "./in-progress-booking-profile/in-progress-booking-profile"
import { DivisionLine } from "../division-line/division-line"
import { LBG } from "../../theme/palette"
import { ReserveDateBox } from "./reserve-date-box/reserve-date-box"

export const InProgressBooking = (props) => {
  const { reserveData } = props
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
    <View>
      <InProgressBookingProfile
        // userData={serviceType === "방문" ? reserveData.petsitter : reserveData.crecheId}
        userData={reserveData.petsitter}
      />
      <DivisionLine
        color={LBG}
        style={{ width: WIDTH * 340, height: HEIGHT * 1, marginVertical: HEIGHT * 17 }}
      />
      <ReserveDateBox
        //TODO: 방문 -> startTime, endTime / 위탁 -> startDay, endDay :: 어떻게 구분할 것인지
        startDate={new Date(reserveData.startTime)}
        endDate={new Date(reserveData.endTime)}
      />
    </View>
  )
}
