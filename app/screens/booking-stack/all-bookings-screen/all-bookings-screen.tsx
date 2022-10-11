import React, { FC, useCallback, useLayoutEffect, useState } from "react"
import {
  DotsIndicator,
  InProgressBooking,
  PreBol16,
  PreMed16,
  PreReg16,
  Row,
  ScreenRootView,
} from "#components"
import { StackScreenProps } from "@react-navigation/stack"
import { NavigatorParamList } from "#navigators"
import { observer } from "mobx-react-lite"
import { HEIGHT } from "#theme/device-size-constant"
import { bookingsDummy } from "./dummy-data"
import { FlatList, Pressable, useWindowDimensions } from "react-native"
import { GIVER_CASUAL_NAVY, DISABLED, BODY } from "#theme/palette"
import { BookingStoreModel } from "../../../models"

export const AllBookingsScreen: FC<
  StackScreenProps<NavigatorParamList, "all-bookings-screen">
> = observer(({ navigation, route }) => {
  const windowWidth = useWindowDimensions().width

  // ? dotsIndicator의 현재 인덱스를 나타내는 state
  const [activeIndex, setActiveIndex] = useState(0)
  // ? flatlist에서 viewable item이 바뀌면 할 일 -> activeIndex 변경
  const onViewableChange = useCallback(({ viewableItems }) => {
    if (viewableItems.length > 0) {
      setActiveIndex(viewableItems[0].index || 0)
    }
  }, [])

  const bookingStore = BookingStoreModel.create({
    bookings: [],
  })
  const [bookings, setBookings] = useState([])

  useLayoutEffect(() => {
    // ? 현재 유저의 예약 정보를 bookingStore의 bookings에 저장하기
    async function fetchData() {
      await bookingStore.setBookings(7)
      setBookings(bookingStore.bookings)
    }
    fetchData()
    // console.log("=== bookings ===")
    // console.log(bookings)
  }, [])

  //   const handlePress = (id: number) => {
  //     // TODO: BookingCaregiverStore(가제)에서 caregiverData(케어기버 정보) 반환해서 넘기기
  //     // -> 단, 필요한 props만 뽑아서(formatter) : in-progress-booking-profile.props.ts -> UserDataProps 참고
  //   }
  return (
    <ScreenRootView preset={"scroll"}>
      {/* // * 진행중인 예약 */}
      <PreBol16
        text="진행 중인 예약"
        color={GIVER_CASUAL_NAVY}
        style={{ marginTop: HEIGHT * 20 }}
      />
      {/* // * 진행중인 예약 리스트 */}
      <FlatList
        style={{ marginTop: HEIGHT * 10 }}
        data={bookings}
        renderItem={(currentItem) => (
          <InProgressBooking
            reserveData={{
              ...currentItem.item,
            }}
          />
        )}
        horizontal
        showsHorizontalScrollIndicator={false}
        snapToInterval={windowWidth}
        viewabilityConfig={{
          viewAreaCoveragePercentThreshold: 50,
        }}
        onViewableItemsChanged={onViewableChange}
        decelerationRate={"fast"}
      />
      <DotsIndicator items={bookings} activeIndex={activeIndex} />

      {/* // * 지난 예약 */}
      <Row style={{ marginTop: HEIGHT * 60, justifyContent: "space-between" }}>
        <PreReg16 text="지난 예약" color={DISABLED} />
        <Pressable>
          <PreMed16 text="더보기" color={BODY} />
        </Pressable>
      </Row>
    </ScreenRootView>
  )
})
