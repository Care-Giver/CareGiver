import React, { FC, useCallback, useLayoutEffect, useMemo, useRef, useState } from "react"
import {
  BASIC_BACKGROUND_PADDING_WIDTH,
  DotsIndicator,
  InProgressBooking,
  PreBol16,
  PreMed16,
  PreReg16,
  Row,
  ScreenRootView,
  TimeSelector,
  PastBooking,
} from "#components"
import { StackScreenProps } from "@react-navigation/stack"
import { NavigatorParamList } from "#navigators"
import { observer } from "mobx-react-lite"
import { HEIGHT, WIDTH } from "#theme/device-size-constant"
import { bookingsDummy } from "./dummy-data"
import {
  FlatList,
  Pressable,
  TextStyle,
  useWindowDimensions,
  View,
  ViewStyle,
  Text,
  Image,
} from "react-native"
import { GIVER_CASUAL_NAVY, DISABLED, BODY } from "#theme/palette"
import { BookingStoreModel } from "../../../models"
// import BottomSheet, { BottomSheetBackdrop, BottomSheetBackdropProps } from "@gorhom/bottom-sheet"
import { styles } from "./styles"
import IMAGES from "#images"

// * 예약 정보를 읽어올 유저 id
const USER_ID = 7

export const AllBookingsScreen: FC<
  StackScreenProps<NavigatorParamList, "all-bookings-screen">
> = observer(({ navigation, route }) => {
  const windowWidth = useWindowDimensions().width

  // ? dotsIndicator의 현재 인덱스를 나타내는 state
  const [activeIndex, setActiveIndex] = useState(0)
  // ? flatlist에서 viewable item이 바뀌면 할 일 -> activeIndex 변경
  const onViewableChange = useCallback(({ viewableItems }) => {
    console.log("== viewable items ==")
    console.log(viewableItems)
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
      await bookingStore.setBookings(USER_ID)
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

  // const bottomSheetRef = useRef<BottomSheet>(null)

  return (
    <ScreenRootView preset={"scroll"}>
      <Pressable
        onPress={() => {
          // bottomSheetRef.current.expand()
        }}
        style={{ backgroundColor: "lime" }}
      >
        <Text>바텀시트 열기</Text>
      </Pressable>

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
        snapToInterval={windowWidth - 2 * BASIC_BACKGROUND_PADDING_WIDTH}
        viewabilityConfig={{
          viewAreaCoveragePercentThreshold: 50,
        }}
        onViewableItemsChanged={onViewableChange}
        decelerationRate={"fast"}
      />
      <Row style={[styles.dotsContainer, { marginTop: HEIGHT * 14 }]}>
        {bookings.map((item, index) => (
          <View key={index} style={index === activeIndex ? styles.activeDot : styles.dot} />
        ))}
      </Row>

      {/* // * 지난 예약 */}
      <Row style={{ marginTop: HEIGHT * 60, justifyContent: "space-between" }}>
        <PreReg16 text="지난 예약" color={DISABLED} />
        <Pressable style={{ flexDirection: "row", alignItems: "center" }}>
          <PreMed16 text="더보기" color={BODY} />
          <Image source={IMAGES.arrow_left} style={{ width: WIDTH * 16, height: HEIGHT * 16 }} />
        </Pressable>
      </Row>

      <PastBooking style={{ marginTop: HEIGHT * 13 }} />

      {/* <TimeSelector bottomSheetRef={bottomSheetRef} /> */}
    </ScreenRootView>
  )
})

const $bottomSheetBackgroundStyle: ViewStyle = {
  backgroundColor: "white",
  borderRadius: 32,
  elevation: 8,
  shadowColor: "black",
  shadowOffset: {
    width: 10,
    height: 2,
  },
  shadowOpacity: 0.2,
  shadowRadius: 12,
}

const $bottomSheetContentRoot: ViewStyle = {
  backgroundColor: "white",
  flex: 1,
  paddingHorizontal: 30,
  borderRadius: 32,
}

const $categoryBox: ViewStyle = {
  backgroundColor: "white",
  paddingVertical: 6,
}

const $categoryTitle: TextStyle = {
  fontSize: 20,
  paddingBottom: 20,
  // alignSelf: "center",
}

const $categoryBody: TextStyle = {
  fontSize: 18,
  alignSelf: "center",
}

const $numberOfProducts: TextStyle = {
  fontSize: 13,
  alignSelf: "center",
}
