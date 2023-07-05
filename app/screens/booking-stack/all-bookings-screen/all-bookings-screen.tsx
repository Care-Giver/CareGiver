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
  PreReg14,
} from "../../../components"
import { StackScreenProps } from "@react-navigation/stack"
import { NavigatorParamList, navigate } from "../../../navigators"
import { observer } from "mobx-react-lite"
import { GIVER_CASUAL_NAVY, DISABLED, BODY, DEVICE_WINDOW_WIDTH } from "../../../theme"
import { FlatList, Pressable, View, Image, ScrollView } from "react-native"
import { styles } from "./styles"
import { images } from "../../../../assets/images"
import { useShowBottomTab } from "../../../utils/hooks"
import {
  CurrentBooking,
  PreviousBookingParams,
  ReviewStatus,
  getCurrentBookings,
  getPreviousBookings,
} from "../../../services/axios"
import { PetsitterType, ServiceType } from "../../../models"

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
  const [previousBookings, setPreviousBookings] = useState<PreviousBookingParams[]>([])

  useLayoutEffect(() => {
    getCurrentBookings()
      .then((res) => setCurrentBookings(res))
      .catch((err) => console.log("[all bookings screen] get current bookings error >>>", err))

    getPreviousBookings()
      .then((res) => {
        const previousBookings: PreviousBookingParams[] = []
        res.forEach((booking, index) => {
          const type = booking.crecheId ? "creche" : "visiting"
          previousBookings.push({
            profileImage: booking.profileImage,
            serviceType: type,
            petsitterType: type,
            // @ts-ignore
            petsitterId: type === "creche" ? booking.crecheId : booking.visitingId,
            // @ts-ignore
            bookingId: type === "creche" ? booking.crecheBookingId : booking.visitingBookingId,
            petsitterName: booking.petSitterName,
            desc: booking.desc,
            // ? 여기서는 creche | visiting 모두 Date로 통일한다.
            // @ts-ignore
            startDate: type === "creche" ? booking.startDate : booking.startTime,
            // @ts-ignore
            endDate: type === "creche" ? booking.endDate : booking.endTime,
            isCanceled: booking.isCanceled,
            isFavorite: booking.isFavorite,
            reviewStatus: booking.reviewStatus,
          })
        })
        setPreviousBookings(previousBookings)
      })
      .catch((err) => console.log("[all bookings screen] get previous bookings error >>>", err))
  }, [])

  return (
    <ScreenRootView>
      <ScrollView>
        {/* // * 진행중인 예약 */}
        <PreBol16 text="진행 중인 예약" color={GIVER_CASUAL_NAVY} style={{ marginTop: 20 }} />

        {/* // * 진행중인 예약 리스트 */}
        {currentBookings.length > 0 ? (
          <View>
            <FlatList
              style={{ marginTop: 10 }}
              contentContainerStyle={{
                paddingVertical: 10,
              }}
              data={currentBookings}
              renderItem={({ index, item }) => (
                <InProgressBooking currentBooking={item} key={index} />
              )}
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
          </View>
        ) : (
          // ! 임시 empty view
          // TODO : empty view 디자인 요청 후 수정
          <View
            style={{
              height: 241,
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <PreReg14 text="현재 진행중인 예약이 없습니다." />
          </View>
        )}

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

        {previousBookings.length > 0 ? (
          <PastBooking style={{ marginTop: 13 }} {...previousBookings[0]} />
        ) : (
          // ! 임시 empty view
          // TODO : empty view 디자인 요청 후 수정
          <View
            style={{
              height: 358,
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <PreReg14 text="지난 예약이 없습니다." />
          </View>
        )}
      </ScrollView>
    </ScreenRootView>
  )
})
