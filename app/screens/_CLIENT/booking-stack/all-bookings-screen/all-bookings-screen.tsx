import React, { FC, useCallback, useEffect, useState } from "react"
import {
  BASIC_BACKGROUND_PADDING_WIDTH,
  InProgressBooking,
  PreBol16,
  PreMed16,
  PreReg16,
  Row,
  Screen,
  BookingInfoCard,
  DivisionLine,
  PreMed18,
  PreMed14,
  BOTTOM_TAB_BAR_HEIGHT,
} from "../../../../components"
import { StackScreenProps } from "@react-navigation/stack"
import { NavigatorParamList, navigate } from "../../../../navigators"
import { observer } from "mobx-react-lite"
import { DISABLED, BODY, DEVICE_WINDOW_WIDTH, HEAD_LINE, BOTTOM_HEIGHT } from "../../../../theme"
import { FlatList, Pressable, View, Image, ScrollView } from "react-native"
import { styles } from "./styles"
import { images } from "../../../../../assets/images"
import { useShowBottomTab } from "../../../../utils/hooks"
import {
  BookingStatus,
  CurrentBooking,
  PreviousBooking,
  getCurrentBookings,
  getFirstPreviousBooking,
  getMyWaitingBookings,
} from "../../../../services/api"
import { useQuery } from "@tanstack/react-query"
import _ from "lodash"
import { useFocusEffect } from "@react-navigation/native"

// Define the refetch interval (30 seconds)
const REFETCH_INTERVAL = 30 * 1000

export const AllBookingsScreen: FC<
  StackScreenProps<NavigatorParamList, "all-bookings-screen">
> = observer(function AllBookingsScreen({ navigation }) {
  useShowBottomTab(navigation)

  // * dotsIndicator의 현재 인덱스를 나타내는 state
  const [activeIndexInProgress, setActiveIndexInProgress] = useState(0)
  // * flatlist에서 viewable item이 바뀌면 할 일 -> activeIndex 변경
  const onViewableChangeInProgress = useCallback(({ viewableItems }) => {
    if (viewableItems.length > 0) {
      setActiveIndexInProgress(viewableItems[0].index || 0)
    }
  }, [])

  const [activeIndexPast, setActiveIndexPast] = useState(0)
  const onViewableChangePast = useCallback(({ viewableItems }) => {
    if (viewableItems.length > 0) {
      setActiveIndexPast(viewableItems[0].index || 0)
    }
  }, [])

  /**
   * [확정된 예약내역]
   *  PENDING = "Pending", // 승인 허가 이후 서비스 전까지
   *  PROCEEDING = "Proceeding", // 서비스 진행중
   */
  const [currentBookings, setCurrentBookings] = useState<CurrentBooking[]>([])
  /**
   * [신청한 예약내역]
   *  WAITING = "Waiting", // 승인 대기
   */
  const [waitingBookings, setWaitingBookings] = useState<CurrentBooking[]>([])
  /**
   * [지난 예약내역]
   *  COMPLETE = "Complete", // 서비스 완료
   *  CANCEL = "Cancel", // 유저가 예약 승낙 이후 취소한 경우
   *  REJECT = "Reject", // 예약을 거절한 경우
   */
  const [firstPreviousBooking, setFirstPreviousBooking] = useState<PreviousBooking | null>(null)

  // 확정된 예약 내역 Polling
  const { data: currentBookingsData } = useQuery({
    queryKey: ["currentBookings"],
    queryFn: getCurrentBookings,
    refetchInterval: REFETCH_INTERVAL,
  })

  // 신청한 예약 내역 Polling
  const { data: waitingBookingsData } = useQuery({
    queryKey: ["waitingBookings"],
    queryFn: getMyWaitingBookings,
    refetchInterval: REFETCH_INTERVAL,
  })

  // 지난 예약 내역 Polling
  const { data: firstPreviousBookingData } = useQuery({
    queryKey: ["firstPreviousBooking"],
    queryFn: getFirstPreviousBooking,
    refetchInterval: REFETCH_INTERVAL,
  })

  useFocusEffect(
    useCallback(() => {
      Promise.all([getCurrentBookings(), getMyWaitingBookings(), getFirstPreviousBooking()]).then(
        ([currentBookings, waitingBookingsData, firstPreviousBooking]) => {
          setCurrentBookings(currentBookings)
          setWaitingBookings(waitingBookingsData.waitingBookings)
          setFirstPreviousBooking(firstPreviousBooking)
        },
      )
    }, []),
  )

  useEffect(() => {
    if (currentBookingsData) {
      setCurrentBookings(currentBookingsData)
    }
    if (firstPreviousBookingData) {
      setFirstPreviousBooking(firstPreviousBookingData)
    }
    // ! For testing
    // if (true) {
    //   setFirstPreviousBooking({
    //     visitingBookingId: 1,
    //     visitingId: 1,
    //     paymentId: 16,
    //     startTime: "2022-09-15T04:00:00.000Z",
    //     endTime: "2022-09-15T06:00:00.000Z",
    //     petSitterName: "지우",
    //     desc: "강아지 3년 기른 경력으로 보살핍니다.",
    //     profileImage: null,
    //     isCanceled: false,
    //     isFavorite: true,
    //     reviewStatus: "Waiting",
    //   })
    // }
    if (waitingBookingsData) {
      setWaitingBookings(waitingBookingsData.waitingBookings)
    }
    // ! For testing
    // if (true) {
    //   setWaitingBookings([
    //     {
    //       desc: "지치지 않는 체력을 가진 강아지 환영합니다!",
    //       endTime: "2024-03-23T15:00:00.000Z",
    //       paymentId: 206,
    //       petSitterName: "이영민",
    //       profileImage:
    //         "https://caregiverbucket.s3.ap-northeast-2.amazonaws.com/1708278430560petsitter_lee.jpg",
    //       ratings: 3.6666666666666665,
    //       reviewCount: 3,
    //       startTime: "2024-03-23T16:00:00.000Z",
    //       status: "Waiting",
    //       visitingBookingId: 52,
    //       visitingId: 33,
    //     },
    //   ])
    // }
  }, [
    currentBookingsData,
    //
    firstPreviousBookingData,
    waitingBookingsData,
  ])

  return (
    <Screen style={{ paddingHorizontal: 0 }}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: BOTTOM_HEIGHT + BOTTOM_TAB_BAR_HEIGHT }}
      >
        <View style={{ paddingHorizontal: BASIC_BACKGROUND_PADDING_WIDTH }}>
          {/* // * 확정된 예약*/}
          <PreBol16 text="확정된 예약" color={HEAD_LINE} style={{ marginTop: 20 }} />

          {/* // * 확정된 예약리스트 */}
          {currentBookings.length > 0 ? (
            <View>
              <FlatList
                style={{ marginTop: 10 }}
                contentContainerStyle={{
                  paddingVertical: 10,
                }}
                data={_.orderBy(currentBookings, ["startTime"], ["asc"])}
                renderItem={({ index, item }) => (
                  <InProgressBooking
                    currentBooking={item}
                    key={index}
                    onPress={() => {
                      navigate("booking-detail-screen", {
                        crecheBookingId: item?.crecheBookingId,
                        visitingBookingId: item?.visitingBookingId,
                        paymentId: item?.paymentId,
                        serviceType: item?.crecheBookingId ? "creche" : "visiting",
                      })
                    }}
                  />
                )}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                snapToInterval={DEVICE_WINDOW_WIDTH - 2 * BASIC_BACKGROUND_PADDING_WIDTH}
                viewabilityConfig={{
                  viewAreaCoveragePercentThreshold: 51,
                }}
                onViewableItemsChanged={onViewableChangeInProgress}
                decelerationRate={"fast"}
              />
              <Row style={[styles.dotsContainer, { marginTop: 14 }]}>
                {currentBookings.map((item, index) => (
                  <View
                    key={index}
                    style={index === activeIndexInProgress ? styles.activeDot : styles.dot}
                  />
                ))}
              </Row>
            </View>
          ) : (
            <View
              style={{
                height: 220,
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <PreMed18 text="아직 확정된 예약이 없어요." color={BODY} />
            </View>
          )}

          {/* // * 신청한 예약*/}

          <PreBol16 text="신청한 예약" color={HEAD_LINE} style={{ marginTop: 20 }} />

          {/* // * 신청한 예약리스트 */}
          {waitingBookings.length > 0 ? (
            <View>
              <FlatList
                style={{ marginTop: 10 }}
                contentContainerStyle={{
                  paddingVertical: 10,
                }}
                data={_.orderBy(waitingBookings, ["startTime"], ["asc"])}
                renderItem={({ index, item }) => (
                  <BookingInfoCard
                    key={index}
                    style={{ width: DEVICE_WINDOW_WIDTH - 2 * BASIC_BACKGROUND_PADDING_WIDTH }}
                    type={BookingStatus.WAITING}
                    profileImage={item?.profileImage}
                    serviceType={"visiting"}
                    petsitterId={item?.visitingId}
                    bookingId={item?.visitingBookingId}
                    petsitterName={item?.petSitterName}
                    desc={item?.desc}
                    startTime={item?.startTime}
                    endTime={item?.endTime}
                    isFavorite={false}
                    onPress={() => {
                      navigate("booking-detail-screen", {
                        crecheBookingId: item?.crecheBookingId,
                        visitingBookingId: item?.visitingBookingId,
                        paymentId: item?.paymentId,
                        serviceType: item?.crecheBookingId ? "creche" : "visiting",
                      })
                    }}
                    onPressCancelBooking={() => {
                      // TODO: 스크린 이동하지 않고, 이 곳에서 바로 예약 취소
                      navigate("booking-detail-screen", {
                        crecheBookingId: item?.crecheBookingId,
                        visitingBookingId: item?.visitingBookingId,
                        paymentId: item?.paymentId,
                        serviceType: item?.crecheBookingId ? "creche" : "visiting",
                      })
                    }}
                  />
                )}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                snapToInterval={DEVICE_WINDOW_WIDTH - 2 * BASIC_BACKGROUND_PADDING_WIDTH}
                viewabilityConfig={{
                  viewAreaCoveragePercentThreshold: 51,
                }}
                onViewableItemsChanged={onViewableChangePast}
                decelerationRate={"fast"}
              />
              <Row style={[styles.dotsContainer, { marginBottom: 14 }]}>
                {waitingBookings.map((item, index) => (
                  <View
                    key={index}
                    style={index === activeIndexPast ? styles.activeDot : styles.dot}
                  />
                ))}
              </Row>
            </View>
          ) : (
            <View
              style={{
                paddingTop: 20,
                paddingBottom: 48,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Image source={images.dog_question} style={{ width: 179, height: 192 }} />
              <PreMed18 text="아직 신청한 예약이 없어요." color={BODY} />
              <PreMed14 text="검색으로 원하는 펫시터를 찾아서 신청해보세요!" color={BODY} mt={6} />
            </View>
          )}
        </View>

        <DivisionLine height={8} />

        {/* // * 지난 예약 */}
        <View style={{ paddingHorizontal: BASIC_BACKGROUND_PADDING_WIDTH }}>
          <Row style={{ marginTop: 16, justifyContent: "space-between" }}>
            <PreReg16 text="지난 예약" color={DISABLED} />
            {firstPreviousBooking ? (
              <Pressable
                style={{ flexDirection: "row", alignItems: "center" }}
                onPress={() => navigate("past-bookings-screen")}
              >
                <PreMed16 text="더보기" color={BODY} />
                <Image source={images.arrow_right} style={{ width: 16, height: 16 }} />
              </Pressable>
            ) : null}
          </Row>

          {firstPreviousBooking ? (
            <BookingInfoCard
              style={{ marginTop: 13 }}
              type={BookingStatus.COMPLETE}
              serviceType={"visiting"}
              profileImage={firstPreviousBooking?.profileImage}
              petsitterId={firstPreviousBooking?.visitingId}
              bookingId={firstPreviousBooking?.visitingBookingId}
              petsitterName={firstPreviousBooking?.petSitterName}
              desc={firstPreviousBooking?.desc}
              startTime={firstPreviousBooking?.startTime}
              endTime={firstPreviousBooking?.endTime}
              isCanceled={firstPreviousBooking?.isCanceled}
              isFavorite={false}
              onPressReview={() => {
                // 이미 후기 작성 완료된 경우 - 후기 보기 페이지로
                if (firstPreviousBooking?.reviewStatus === "Complete") {
                  navigate("view-review-screen", {
                    serviceType: "visiting",
                    bookingId: firstPreviousBooking?.visitingBookingId,
                    profileImage: firstPreviousBooking?.profileImage,
                    petsitterName: firstPreviousBooking?.petSitterName,
                    desc: firstPreviousBooking?.desc,
                  })
                }
                // 후기를 아직 작성하지 않은 경우
                else {
                  navigate("write-review-screen", {
                    profileImage: firstPreviousBooking?.profileImage,
                    petsitterName: firstPreviousBooking?.petSitterName,
                    serviceType: "visiting",
                    petsitterType: "visiting",
                    petsitterId: firstPreviousBooking?.visitingId,
                    bookingId: firstPreviousBooking?.visitingBookingId,
                    desc: firstPreviousBooking?.desc,
                  })
                }
              }}
            />
          ) : (
            <View
              style={{
                height: 220,
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <PreMed18 text="지난 예약이 없어요." color={BODY} />
            </View>
          )}
        </View>
      </ScrollView>
    </Screen>
  )
})
