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
import { GIVER_CASUAL_NAVY, DISABLED, BODY } from "#theme"
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
  ScrollView,
} from "react-native"
import { BookingStoreModel } from "../../../models"
// import BottomSheet, { BottomSheetBackdrop, BottomSheetBackdropProps } from "@gorhom/bottom-sheet"
import { styles } from "./styles"
import { images } from "#images"
import { useShowBottomTab } from "../../../utils/hooks"

// * 예약 정보를 읽어올 유저 id
const USER_ID = 7

export const AllBookingsScreen: FC<
  StackScreenProps<NavigatorParamList, "all-bookings-screen">
> = observer(function AllBookingsScreen({ navigation }) {
  useShowBottomTab(navigation)

  const windowWidth = useWindowDimensions().width

  // ? dotsIndicator의 현재 인덱스를 나타내는 state
  const [activeIndex, setActiveIndex] = useState(0)
  // ? flatlist에서 viewable item이 바뀌면 할 일 -> activeIndex 변경
  const onViewableChange = useCallback(({ viewableItems }) => {
    // console.log("== viewable items ==")
    // console.log(viewableItems)
    if (viewableItems.length > 0) {
      setActiveIndex(viewableItems[0].index || 0)
    }
  }, [])

  const bookingStore = BookingStoreModel.create({
    bookings: [],
  })
  const [bookings, setBookings] = useState([
    {
      id: 1,
      name: "오예성",
      ratings: 4.7,
      reviews: 12,
      introduce: "안녕하세요! 방문 펫시팅을 주로 하고 있는 오예성 펫시터 입니다!",
      profileImg:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSLE12J5yqz_9IDzhh7J3Efh2t7x_1eKBpz5A&usqp=CAU",
      serviceType: "visit",
      caregiverType: "petsitter",
      startDate: "2022-12-01T09:00:00", //! TODO: Datetime 인데 Date 라고 선언됨. 수정해야함
      endDate: "2022-12-02T13:00:00",
    },
    {
      id: 2,
      name: "유태서",
      ratings: 3.9,
      reviews: 2,
      introduce: "반갑습니다! 배변훈련을 주로 맡고 있습니다 🙂",
      profileImg:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ8DSugC2cBHLBU6m92loBTs2sXpxPectTysg&usqp=CAU",
      serviceType: "creche",
      caregiverType: "trainer",
      startDate: "2022-12-03T09:00:00", //! TODO: Datetime 인데 Date 라고 선언됨. 수정해야함
      endDate: "2022-12-04T13:00:00",
    },
    {
      id: 3,
      name: "이기원",
      ratings: 4.9,
      reviews: 19,
      introduce: "필요하신 시간, 날짜 아무때나 펫시팅 가능합니다 ☺️",
      profileImg:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTV0nEtscWXxj9CrZY48XcAZas4EhDXWFaLJg&usqp=CAU",
      serviceType: "creche",
      caregiverType: "petsitter",
      startDate: "2022-12-01T09:00:00", //! TODO: Datetime 인데 Date 라고 선언됨. 수정해야함
      endDate: "2022-12-19T13:00:00",
    },
  ])

  // useLayoutEffect(() => {
  //   // ? 현재 유저의 예약 정보를 bookingStore의 bookings에 저장하기
  //   async function fetchData() {
  //     await bookingStore.setBookings(USER_ID)
  //     setBookings(bookingStore.bookings)
  //   }
  //   fetchData()
  //   // console.log("=== bookings ===")
  //   // console.log(bookings)
  // }, [])

  //   const handlePress = (id: number) => {
  //     // TODO: BookingCaregiverStore(가제)에서 caregiverData(케어기버 정보) 반환해서 넘기기
  //     // -> 단, 필요한 props만 뽑아서(formatter) : in-progress-booking-profile.props.ts -> UserDataProps 참고
  //   }

  // const bottomSheetRef = useRef<BottomSheet>(null)

  return (
    <ScreenRootView>
      <ScrollView>
        {/* <Pressable
        onPress={() => {
          // bottomSheetRef.current.expand()
        }}
        style={{ backgroundColor: "lime" }}
      >
        <Text>바텀시트 열기</Text>
      </Pressable> */}

        {/* // * 진행중인 예약 */}
        <PreBol16 text="진행 중인 예약" color={GIVER_CASUAL_NAVY} style={{ marginTop: 20 }} />

        {/* // * 진행중인 예약 리스트 */}
        <FlatList
          style={{ marginTop: 10 }}
          data={bookings}
          renderItem={({ index, item }) => <InProgressBooking reserveData={item} />}
          horizontal
          showsHorizontalScrollIndicator={false}
          snapToInterval={windowWidth - 2 * BASIC_BACKGROUND_PADDING_WIDTH}
          viewabilityConfig={{
            viewAreaCoveragePercentThreshold: 50,
          }}
          onViewableItemsChanged={onViewableChange}
          decelerationRate={"fast"}
        />

        <Row style={[styles.dotsContainer, { marginTop: 14 }]}>
          {bookings.map((item, index) => (
            <View key={index} style={index === activeIndex ? styles.activeDot : styles.dot} />
          ))}
        </Row>

        {/* // * 지난 예약 */}
        <Row style={{ marginTop: 60, justifyContent: "space-between" }}>
          <PreReg16 text="지난 예약" color={DISABLED} />
          <Pressable style={{ flexDirection: "row", alignItems: "center" }}>
            <PreMed16 text="더보기" color={BODY} />
            <Image source={images.arrow_right} style={{ width: 16, height: 16 }} />
          </Pressable>
        </Row>

        <PastBooking style={{ marginTop: 13 }} />
      </ScrollView>

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
