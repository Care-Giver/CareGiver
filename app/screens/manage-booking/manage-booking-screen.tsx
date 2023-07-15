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
import { useShowBottomTab } from "../../utils/hooks"
import { getconfirmedBookings } from "#axios"
import { images } from "#images"
import { Image, View } from "react-native"
import { BODY } from "#theme"

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

  // 필요시, useNavigation 훅을 사용할 수 있습니다.
  // const navigation = useNavigation()
  const [bookings, setBookins] = useState([])

  const hasBookings = bookings?.length > 0

  useEffect(() => {
    //* axios 사용하여 바로 bookings 초기화.
    getconfirmedBookings().then((res) => setBookins(res))
  }, [])

  return (
    <Screen testID="ManageBooking">
      <BookingCheckButton style={{ zIndex: 1 }} bookingCount={2} />
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
