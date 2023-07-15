import { ImageBackground, Pressable, StyleSheet } from "react-native"
import React, { useLayoutEffect, useState } from "react"
import { InProgressBookingProfile } from "./in-progress-booking-profile/in-progress-booking-profile"
import { DEVICE_WINDOW_WIDTH } from "#theme"
import { ReserveDateBox } from "./reserve-date-box/reserve-date-box"
import { images } from "#images"
import { InProgressBookingProps } from "./in-progress-booking.props"
import { navigate } from "#navigators"
import { BASIC_BACKGROUND_PADDING_WIDTH } from "../screen/screen"

export const InProgressBooking = (props: InProgressBookingProps) => {
  const { currentBooking, style } = props

  const handlePress = () => {
    navigate("booking-detail-screen")
  }

  return (
    <Pressable style={style} onPress={handlePress}>
      <ImageBackground
        source={images.in_progress_booking_background}
        resizeMode="stretch"
        style={styles.background}
      >
        <InProgressBookingProfile caregiverData={currentBooking} />

        <ReserveDateBox
          startDateTime={
            new Date(currentBooking.startDate ? currentBooking.startDate : currentBooking.startTime)
          }
          endDateTime={
            new Date(currentBooking.endDate ? currentBooking.endDate : currentBooking.endTime)
          }
          serviceType={currentBooking.crecheId ? "creche" : "visiting"}
          style={{ marginTop: 44 }}
        />
      </ImageBackground>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  background: {
    width: DEVICE_WINDOW_WIDTH - 2 * BASIC_BACKGROUND_PADDING_WIDTH - 5,
    height: 241,

    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 25,
  },
})
