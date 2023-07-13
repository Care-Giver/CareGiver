import React, { FC, useLayoutEffect, useState } from "react"
import { observer } from "mobx-react-lite"
import { StackScreenProps } from "@react-navigation/stack"
import { NavigatorParamList } from "#navigators"
import { BookingCheckButton, BookingList, PreReg14, ScreenRootView } from "#components"
import { getconfirmedBookings, ConfirmedBookings } from "../../services/axios/confirmed-bookings"
import { images } from "#images"
import { Image, View } from "react-native"
import { BODY } from "#theme"

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

  useLayoutEffect(() => {
    //* axios 사용하여 바로 bookings 초기화.
    getconfirmedBookings().then((res) => setBookins(res))
  }, [])
  const hasBookings = bookings.length > 0
  return (
    <ScreenRootView testID="ManageBooking">
      <BookingCheckButton style={{ zIndex: 1 }} bookingCount={2}></BookingCheckButton>
      {hasBookings ? (
        <BookingList bookings={bookings} />
      ) : (
        <View style={{ alignItems: "center", bottom: "-25%" }}>
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
    </ScreenRootView>
  )
})
