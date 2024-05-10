import React, { FC, useEffect, useState } from "react"
import { observer } from "mobx-react-lite"
import { StackScreenProps } from "@react-navigation/stack"
import { NavigatorParamList, navigate } from "#navigators"
import {
  BASIC_BACKGROUND_PADDING_WIDTH,
  BookingCheckButton,
  CgBookingList,
  DateInfo,
  PreBol20,
  Screen,
  SimpleCalendar,
} from "#components"
import { useShowBottomTab } from "../../../utils/hooks"
import { getAllBookings, getConfirmedBookings } from "#api"
import { useQuery } from "@tanstack/react-query"
import { useStores } from "#models"
import _ from "lodash"
import { View } from "react-native"

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

  const [selectedDate, setSelectedDate] = useState<DateInfo>(null)
  const [month, setMonth] = useState<Date>(new Date())

  const { status, data, error, isFetching } = useQuery({
    queryKey: ["getAllBookings"],
    queryFn: getAllBookings,
    // Refetch 주기 (milliseconds)
    refetchInterval: INTERVAL,
  })

  //console.log("cgManageBookingScreen >>> ", status, data, error, isFetching)
  //console.log("cgManageBookingScreen allBookings >>> ", allBookings)
  // console.log("cgManageBookingScreen confirmedBookings >>> ", confirmedBookings)

  const [filteredBookings, setFilteredBookings] = useState(confirmedBookings)

  // CgBooking 갱신
  useEffect(() => {
    if (!isFetching) {
      setBookings(data?.receivedBookings)
    }
  }, [isFetching, data, setBookings])

  // 월 변경 시, 해당 월에 해당하는 예약만 필터링
  useEffect(() => {
    const _filteredBookings = confirmedBookings.filter(
      (booking) => new Date(booking.startTime).getMonth() === month.getMonth(),
    )
    setFilteredBookings(_filteredBookings)
  }, [confirmedBookings, month])

  return (
    <Screen testID="ManageBooking" style={{ paddingHorizontal: 0 }}>
      <View style={{ paddingHorizontal: BASIC_BACKGROUND_PADDING_WIDTH }}>
        <PreBol20 text="펫시팅 예약 관리" mv={20} />

        {waitingBookings?.length !== 0 && (
          <BookingCheckButton
            style={{ zIndex: 1, marginBottom: 10 }}
            bookingCount={waitingBookings?.length}
            onPress={() => navigate("cg-booking-list-screen")}
          />
        )}
      </View>

      <SimpleCalendar
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
        month={month}
        setMonth={setMonth}
        showDates={false}
        style={{ marginBottom: 16 }}
      />

      {/* 모든 예약 목록 */}
      <CgBookingList bookings={_.orderBy(filteredBookings, "startTime", "asc")} />

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
