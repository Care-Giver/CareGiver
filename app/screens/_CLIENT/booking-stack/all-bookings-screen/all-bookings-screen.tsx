import React, { FC, useCallback, useEffect, useState } from "react"
import {
  BASIC_BACKGROUND_PADDING_WIDTH,
  InProgressBooking,
  PreBol16,
  PreMed16,
  PreReg16,
  Row,
  Screen,
  PastBooking,
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
  CurrentBooking,
  PreviousBookingParams,
  getCurrentBookings,
  getFirstPreviousBooking,
  getMyWaitingBookings,
} from "../../../../services/api"
import { useQuery } from "@tanstack/react-query"

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
  const [firstPreviousBooking, setFirstPreviousBooking] = useState<PreviousBookingParams | null>(
    null,
  )

  // Use useQuery to fetch current bookings with a refetch interval
  const { data: currentBookingsData } = useQuery({
    queryKey: ["currentBookings"],
    queryFn: getCurrentBookings,
    refetchInterval: REFETCH_INTERVAL,
  })

  // Use useQuery to fetch first previous booking with a refetch interval
  const { data: firstPreviousBookingData } = useQuery({
    queryKey: ["firstPreviousBooking"],
    queryFn: getFirstPreviousBooking,
    refetchInterval: REFETCH_INTERVAL,
  })

  // Use useQuery to fetch waiting bookings with a refetch interval
  const { data: waitingBookingsData } = useQuery({
    queryKey: ["waitingBookings"],
    queryFn: getMyWaitingBookings,
    refetchInterval: REFETCH_INTERVAL,
  })

  useEffect(() => {
    if (currentBookingsData) {
      setCurrentBookings(currentBookingsData)
    }
    if (firstPreviousBookingData) {
      setFirstPreviousBooking(firstPreviousBookingData)
    }
    if (waitingBookingsData) {
      setWaitingBookings(waitingBookingsData.waitingBookings)
    }
  }, [currentBookingsData, firstPreviousBookingData, waitingBookingsData])
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
                data={currentBookings}
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
                data={waitingBookings}
                renderItem={({ index, item }) => (
                  // TODO: waitingBookings 객체를 담을 수 있도록,
                  // TODO: PastBooking 컴포넌트 업데이트 하기.
                  // TODO: 이름도 변경해야 할듯? - WaitingPastBooking ?
                  <PastBooking
                    currentBooking={item}
                    profileImage={item?.profileImage}
                    serviceType={"visiting"}
                    petsitterType={"visiting"}
                    petsitterId={item?.visitingId}
                    bookingId={item?.visitingBookingId}
                    petsitterName={item?.petSitterName}
                    desc={item?.desc}
                    startDate={item?.startTime}
                    endDate={item?.endTime}
                    style={{ width: DEVICE_WINDOW_WIDTH - 2 * BASIC_BACKGROUND_PADDING_WIDTH }}
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
            <PastBooking style={{ marginTop: 13 }} {...firstPreviousBooking} />
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
