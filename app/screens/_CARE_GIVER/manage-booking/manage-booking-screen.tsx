import React, { FC, useEffect, useState } from "react"
import { observer } from "mobx-react-lite"
import { StackScreenProps } from "@react-navigation/stack"
import { NavigatorParamList } from "#navigators"
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

const INTERVAL = 30 * 1000

export const ManageBookingScreen: FC<
  StackScreenProps<NavigatorParamList, "manage-booking-screen">
> = observer(function ManageBookingScreen({ navigation }) {
  useShowBottomTab(navigation)

  const [bookings, setBookings] = useState([])

  const hasBookings = bookings?.length > 0

  // useEffect(() => {
  //   getAllBookings().then((res) => setBookings(res.receivedBookings))
  // }, [])

  const { status, data, error, isFetching } = useQuery({
    queryKey: ["todos"],
    queryFn: getAllBookings,
    // Refetch the data every milliseconds
    refetchInterval: INTERVAL,
  })
  console.log(status, data, error, isFetching)

  return (
    <Screen testID="ManageBooking">
      {hasBookings ? (
        <BookingCheckButton style={{ zIndex: 1 }} bookingCount={bookings?.length} />
      ) : null}

      {hasBookings ? (
        <BookingList bookings={bookings} />
      ) : (
        <View style={{ alignItems: "center", top: "25%" }}>
          <Image
            source={images.dog_illustration}
            style={{
              width: 151,
              height: 156,
              opacity: 0.5,
            }}
          />
          <PreReg14 text="예약이 존재하지 않습니다" color={BODY} />
        </View>
      )}
    </Screen>
  )
})
