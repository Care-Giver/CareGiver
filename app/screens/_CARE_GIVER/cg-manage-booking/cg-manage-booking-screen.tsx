import React, { FC, useEffect, useState } from "react"
import { observer } from "mobx-react-lite"
import { StackScreenProps } from "@react-navigation/stack"
import { NavigatorParamList, navigate } from "#navigators"
import {
  BookingCheckButton,
  BookingInfoCardProps,
  BookingList,
  PreBol12,
  PreBol14,
  PreBol18,
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
import EventSource, { EventSourceListener } from "react-native-sse"

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
  //console.log("cgManageBookingScreen confirmedBookings >>> ", confirmedBookings)

  useEffect(() => {
    if (!isFetching) {
      setBookings(data?.receivedBookings)
    }
  }, [isFetching, data, setBookings])

  useEffect(() => {
    // const url = new URL("https://your-sse-server.com/.well-known/mercure");
    // url.searchParams.append("topic", "/book/{bookId}");
    const url = "https://realtime.ably.io/sse"
    const es = new EventSource(url)

    const listener: EventSourceListener = (event) => {
      if (event.type === "open") {
        console.log("Open SSE connection.")
      } else if (event.type === "message") {
        const book = JSON.parse(event.data) as any

        // setBooks((prevBooks) => [...prevBooks, book]);
        console.log(`Received book ${book.title}, ISBN: ${book.isbn}`)
      } else if (event.type === "error") {
        console.error("Connection error:", event.message)
      } else if (event.type === "exception") {
        console.error("Error:", event.message, event.error)
      } else {
        console.error("else:", event)
      }
    }

    es.addEventListener("open", listener)
    es.addEventListener("message", listener)
    es.addEventListener("error", listener)

    return () => {
      es.removeAllEventListeners()
      es.close()
    }
  }, [])

  return (
    <Screen testID="ManageBooking">
      <BookingCheckButton
        style={{ zIndex: 1, marginTop: 16 }}
        bookingCount={waitingBookings?.length}
        onPress={() => navigate("cg-booking-list-screen")}
      />

      <View
        style={{
          width: "90%",
          height: 200,
          backgroundColor: "rgba(255, 0, 0, 0.2);",
          position: "absolute",
          alignSelf: "center",
          bottom: 80,
          zIndex: 5,
          //
          padding: 16,
        }}
      >
        <PreBol14
          text={`⬆️ 이곳은 '진행예정, '진행중' 그리고 '완료된'\n예약이 표출되는 영역입니다.`}
          mv={12}
        />
        <PreBol14 text="현재 개발중인 영역입니다. 🏗️" />
        <PreReg14
          text={`'모든' 예약 개수: ${allBookings.length}\n'응답을 기다리는' 예약 개수: ${waitingBookings.length}\n'거절'한 예약 개수: ${rejectedBookings.length}\n'수락'하거나 '진행중'인 예약 개수: ${confirmedBookings.length}`}
        />
      </View>

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
