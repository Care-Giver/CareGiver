import React, { FC, useLayoutEffect, useState } from "react"
import { observer } from "mobx-react-lite"
import { StackScreenProps } from "@react-navigation/stack"
import { NavigatorParamList } from "#navigators"
import {
  BookingCheckButton,
  BookingInfoCard,
  BookingInfoCardProps,
  BookingList,
  PreBol16,
  ScreenRootView,
} from "#components"
import { useStores } from "#models"
import { useShowBottomTab } from "../../utils/hooks"

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

export const ManageBookingScreen: FC<
  StackScreenProps<NavigatorParamList, "manage-booking-screen">
> = observer(function ManageBookingScreen({ navigation }) {
  useShowBottomTab(navigation)

  // MST store 를 가져옵니다.
  const {
    ConfirmedBookingsModel: { setAllconfirmedBookings, confirmedBookings },
  } = useStores()

  const [bookings, setBookins] = useState([])

  const hasBookings = bookings?.length > 0

  useLayoutEffect(() => {
    setAllconfirmedBookings()
    setBookins(confirmedBookings)
    //console.log(bookings[0])
  }, [])
  return (
    <ScreenRootView testID="ManageBooking">
      <BookingCheckButton style={{ zIndex: 1, marginTop: 16 }} bookingCount={2} />

      {hasBookings ? (
        <BookingList bookings={bookings} />
      ) : (
        <PreBol16 text="예약 내역이 없습니다" mv={10} />
      )}

      <BookingInfoCard
        id={CareGiverReserveDummy.id}
        name={CareGiverReserveDummy.name}
        serviceType={CareGiverReserveDummy.serviceType}
        caregiverType={CareGiverReserveDummy.caregiverType}
        petname={CareGiverReserveDummy.petname}
        species={CareGiverReserveDummy.species}
        petservices={CareGiverReserveDummy.petservices}
        address={CareGiverReserveDummy.address}
      />
    </ScreenRootView>
  )
})
