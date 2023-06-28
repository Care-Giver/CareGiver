import React, { FC, useLayoutEffect, useState } from "react"
import { observer } from "mobx-react-lite"
import { StackScreenProps } from "@react-navigation/stack"
import { NavigatorParamList } from "#navigators"
import { BookingCheckButton, BookingList, ScreenRootView } from "#components"
import { useStores } from "../../models"

// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "#models"

// [주의] app/navigators/app-navigator.tsx 에 위치한, NavigatorParamList 변수에 새로운 값 "xxxx-screen": undefined 을 추가해주세요.
// 그 뒤에는 아래에 있는 @ts-ignore 를 제거해도, 빨간줄이 뜨지 않습니다 :)
// @ts-ignore
export const ManageBookingScreen: FC<
  StackScreenProps<NavigatorParamList, "manage-booking-screen">
> = observer(function ManageBookingScreen() {
  // MST store 를 가져옵니다.
  // const { someStore, anotherStore } = useStores()

  // 필요시, useNavigation 훅을 사용할 수 있습니다.
  // const navigation = useNavigation()
  const [bookings, setBookins] = useState([])
  const {
    ConfirmedBookingsModel: { setAllconfirmedBookings, confirmedBookings },
  } = useStores()
  useLayoutEffect(() => {
    setAllconfirmedBookings()
    setBookins(confirmedBookings)
    //console.log(bookings[0])
  }, [])
  return (
    <ScreenRootView testID="ManageBooking">
      <BookingCheckButton style={{ zIndex: 1 }} bookingCount={2}></BookingCheckButton>
      <BookingList bookings={bookings} />
    </ScreenRootView>
  )
})
