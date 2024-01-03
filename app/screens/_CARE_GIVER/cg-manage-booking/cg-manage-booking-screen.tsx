import React, { FC, useEffect, useState } from "react"
import { observer } from "mobx-react-lite"
import { StackScreenProps } from "@react-navigation/stack"
import { NavigatorParamList, navigate } from "#navigators"
import {
  BookingCheckButton,
  BookingInfoCardProps,
  BookingList,
  PreReg14,
  Screen,
} from "#components"
import { useShowBottomTab } from "../../../utils/hooks"
import { getAllBookings, getConfirmedBookings } from "#axios"
import { images } from "#images"
import { Image, View } from "react-native"
import { BODY } from "#theme"
import { useQuery } from "@tanstack/react-query"
import { useStores } from "#models"

//테스트용 더미 데이터
const CareGiverReserveDummy: BookingInfoCardProps = {
  id: "1",
  name: "강영묵",
  serviceType: "visit",
  caregiverType: "trainer",
  petname: "봉봉이",
  species: "푸들",
  petservices: ["산책, 목욕, 미용"],
  address: "경기도 성남시 판교동",
}

// 30초마다 Refetch
const INTERVAL = 30 * 1000

export const CgManageBookingScreen: FC<
  StackScreenProps<NavigatorParamList, "cg-manage-booking-screen">
> = observer(function CgManageBookingScreen({ navigation }) {
  useShowBottomTab(navigation)

  const {
    cgBookingStore: {
      setBookings,
      allBookings,
      confirmedBookings,
      waitingBookings,
      hasWaitingBookings,
    },
  } = useStores()

  const { status, data, error, isFetching } = useQuery({
    queryKey: ["getAllBookings"],
    queryFn: getAllBookings,
    // Refetch 주기 (milliseconds)
    refetchInterval: INTERVAL,
  })
  console.log(status, data, error, isFetching)

  useEffect(() => {
    if (!isFetching) {
      setBookings(data?.receivedBookings)
    }
  }, [isFetching, data, setBookings])

  return (
    <Screen testID="ManageBooking">
      {!hasWaitingBookings ? (
        <BookingCheckButton
          style={{ zIndex: 1, marginTop: 16 }}
          bookingCount={waitingBookings?.length}
          onPress={() => navigate("cg-booking-list-screen")}
        />
      ) : null}

      <PreReg14>모든 예약 개수: {allBookings.length}</PreReg14>
      <BookingList bookings={confirmedBookings} />

      {/* // TODO: 날짜별로 확정된 예약 필터링 해야 함 */}
      {/* <View style={{ alignItems: "center", top: "25%" }}>
        <Image
          source={images.dog_illustration}
          style={{
            width: 151,
            height: 156,
            opacity: 0.5,
          }}
        />
        <PreReg14 text="해당 날짜에 확정된 예약이 없습니다" color={BODY} />
      </View> */}
    </Screen>
  )
})
