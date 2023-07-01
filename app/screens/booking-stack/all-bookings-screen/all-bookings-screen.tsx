import React, { FC, useCallback, useLayoutEffect, useState } from "react"
import {
  BASIC_BACKGROUND_PADDING_WIDTH,
  InProgressBooking,
  PreBol16,
  PreMed16,
  PreReg16,
  Row,
  ScreenRootView,
  PastBooking,
} from "#components"
import { StackScreenProps } from "@react-navigation/stack"
import { NavigatorParamList, navigate } from "#navigators"
import { observer } from "mobx-react-lite"
import { GIVER_CASUAL_NAVY, DISABLED, BODY, DEVICE_WINDOW_WIDTH } from "#theme"
import { FlatList, Pressable, View, Image, ScrollView } from "react-native"
import { styles } from "./styles"
import { images } from "#images"
import { useShowBottomTab } from "../../../utils/hooks"
import { CurrentBooking, PreviousBooking, getCurrentBookings, getPreviousBookings } from "#axios"

export const AllBookingsScreen: FC<
  StackScreenProps<NavigatorParamList, "all-bookings-screen">
> = observer(function AllBookingsScreen({ navigation }) {
  useShowBottomTab(navigation)

  // * dotsIndicator의 현재 인덱스를 나타내는 state
  const [activeIndex, setActiveIndex] = useState(0)
  // * flatlist에서 viewable item이 바뀌면 할 일 -> activeIndex 변경
  const onViewableChange = useCallback(({ viewableItems }) => {
    // console.log("== viewable items ==")
    // console.log(viewableItems)
    if (viewableItems.length > 0) {
      setActiveIndex(viewableItems[0].index || 0)
    }
  }, [])

  // * 진행중인 예약 내역
  const [currentBookings, setCurrentBookings] = useState<CurrentBooking[]>([])
  // * 지난 예약 내역
  const [previousBookings, setPreviousBookings] = useState<PreviousBooking[]>([])

  useLayoutEffect(() => {
    getCurrentBookings()
      .then((res) => setCurrentBookings(res))
      .catch((err) => console.log("[all bookings screen] get current bookings error >>>", err))

    getPreviousBookings()
      .then((res) => setPreviousBookings(res))
      .catch((err) => console.log("[all bookings screen] get previous bookings error >>>", err))
  }, [])

  // const [bookings, setBookings] = useState([
  //   {
  //     id: 1,
  //     name: "오예성",
  //     ratings: 4.7,
  //     reviews: 12,
  //     introduce: "안녕하세요! 방문 펫시팅을 주로 하고 있는 오예성 펫시터 입니다!",
  //     profileImg:
  //       "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSLE12J5yqz_9IDzhh7J3Efh2t7x_1eKBpz5A&usqp=CAU",
  //     serviceType: "visit",
  //     caregiverType: "petsitter",
  //     startDate: "2022-12-01T09:00:00", //! TODO: Datetime 인데 Date 라고 선언됨. 수정해야함
  //     endDate: "2022-12-02T13:00:00",
  //   },
  //   {
  //     id: 2,
  //     name: "유태서",
  //     ratings: 3.9,
  //     reviews: 2,
  //     introduce: "반갑습니다! 배변훈련을 주로 맡고 있습니다 🙂",
  //     profileImg:
  //       "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ8DSugC2cBHLBU6m92loBTs2sXpxPectTysg&usqp=CAU",
  //     serviceType: "creche",
  //     caregiverType: "trainer",
  //     startDate: "2022-12-03T09:00:00", //! TODO: Datetime 인데 Date 라고 선언됨. 수정해야함
  //     endDate: "2022-12-04T13:00:00",
  //   },
  //   {
  //     id: 3,
  //     name: "이기원",
  //     ratings: 4.9,
  //     reviews: 19,
  //     introduce: "필요하신 시간, 날짜 아무때나 펫시팅 가능합니다 ☺️",
  //     profileImg:
  //       "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTV0nEtscWXxj9CrZY48XcAZas4EhDXWFaLJg&usqp=CAU",
  //     serviceType: "creche",
  //     caregiverType: "petsitter",
  //     startDate: "2022-12-01T09:00:00", //! TODO: Datetime 인데 Date 라고 선언됨. 수정해야함
  //     endDate: "2022-12-19T13:00:00",
  //   },
  // ])

  return (
    <ScreenRootView>
      <ScrollView>
        {/* // * 진행중인 예약 */}
        <PreBol16 text="진행 중인 예약" color={GIVER_CASUAL_NAVY} style={{ marginTop: 20 }} />

        {/* // * 진행중인 예약 리스트 */}
        <FlatList
          style={{ marginTop: 10 }}
          contentContainerStyle={{
            paddingVertical: 10,
          }}
          data={currentBookings}
          renderItem={({ index, item }) => <InProgressBooking currentBooking={item} key={index} />}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          snapToInterval={DEVICE_WINDOW_WIDTH - 2 * BASIC_BACKGROUND_PADDING_WIDTH}
          viewabilityConfig={{
            viewAreaCoveragePercentThreshold: 51,
          }}
          onViewableItemsChanged={onViewableChange}
          decelerationRate={"fast"}
        />

        <Row style={[styles.dotsContainer, { marginTop: 14 }]}>
          {currentBookings.map((item, index) => (
            <View key={index} style={index === activeIndex ? styles.activeDot : styles.dot} />
          ))}
        </Row>

        {/* // * 지난 예약 */}
        <Row style={{ marginTop: 60, justifyContent: "space-between" }}>
          <PreReg16 text="지난 예약" color={DISABLED} />
          {previousBookings.length > 0 && (
            <Pressable
              style={{ flexDirection: "row", alignItems: "center" }}
              onPress={() => navigate("past-bookings-screen", { pastBookings: previousBookings })}
            >
              <PreMed16 text="더보기" color={BODY} />
              <Image source={images.arrow_right} style={{ width: 16, height: 16 }} />
            </Pressable>
          )}
        </Row>

        {previousBookings.length > 0 && (
          <PastBooking
            style={{ marginTop: 13 }}
            profileImage={previousBookings[0].profileImage}
            petsitterName={previousBookings[0].petSitterName}
            desc={previousBookings[0].desc}
            petsitterId={
              previousBookings[0].crecheId
                ? previousBookings[0].crecheId
                : previousBookings[0].visitingId
            }
            bookingId={
              previousBookings[0].crecheId
                ? previousBookings[0].crecheBookingId
                : previousBookings[0].visitingBookingId
            }
            petsitterType={previousBookings[0].crecheBookingId ? "creche" : "visiting"}
            serviceType={previousBookings[0].crecheId ? "creche" : "visiting"}
            startDate={
              previousBookings[0].crecheId
                ? previousBookings[0].startDate
                : previousBookings[0].startTime
            }
            endDate={
              previousBookings[0].crecheId
                ? previousBookings[0].endDate
                : previousBookings[0].endTime
            }
            isCanceled={previousBookings[0].isCanceled}
          />
        )}
      </ScrollView>
    </ScreenRootView>
  )
})
