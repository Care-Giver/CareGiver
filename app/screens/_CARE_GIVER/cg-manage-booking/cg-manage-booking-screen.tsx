import React, { FC, useEffect } from "react"
import { observer } from "mobx-react-lite"
import { StackScreenProps } from "@react-navigation/stack"
import { NavigatorParamList, navigate } from "#navigators"
import { BookingCheckButton, BookingInfoCardProps, BookingList, Screen } from "#components"
import { useShowBottomTab } from "../../../utils/hooks"
import { getAllBookings, getConfirmedBookings } from "#api"
import { useQuery } from "@tanstack/react-query"
import { useStores } from "#models"
import _ from "lodash"
import CalendarComponent from "./cal"

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
      rejectedBookings,
      hasWaitingBookings,
    },
  } = useStores()

  const { status, data, error, isFetching } = useQuery({
    queryKey: ["getAllBookings"],
    queryFn: getAllBookings,
    // Refetch 주기 (milliseconds)
    refetchInterval: INTERVAL,
  })

  //console.log("cgManageBookingScreen >>> ", status, data, error, isFetching)
  //console.log("cgManageBookingScreen allBookings >>> ", allBookings)
  console.log("cgManageBookingScreen confirmedBookings >>> ", confirmedBookings)

  useEffect(() => {
    if (!isFetching) {
      setBookings(data?.receivedBookings)
    }
  }, [isFetching, data, setBookings])

  return (
    <Screen testID="ManageBooking" style={{ paddingHorizontal: 0 }}>
      <CalendarComponent />

      <BookingCheckButton
        style={{ zIndex: 1, marginVertical: 16 }}
        bookingCount={waitingBookings?.length}
        onPress={() => navigate("cg-booking-list-screen")}
      />

      {/* 모든 예약 목록 */}
      <BookingList bookings={_.orderBy(confirmedBookings, "createAt", "desc")} />

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
