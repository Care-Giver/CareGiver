import React, { useRef } from "react"
import { StyleProp, ViewStyle, View, FlatList, Image, StyleSheet } from "react-native"
import { observer } from "mobx-react-lite"
import { DEVICE_WINDOW_HEIGHT, HEIGHT } from "#theme"
import { BookingInfoCard } from "../booking-info-card/booking-info-card"
import { PreBol16, PreMed18 } from "../_BASIC/custom-texts/custom-texts"
import { CgBooking } from "#api"
import { BOTTOM_TAB_BAR_HEIGHT } from "../_BOTTOM_TAB_BAR/custom-tab-bar/custom-tab-bar"
import { images } from "#images"
import { BASIC_BACKGROUND_PADDING_WIDTH } from "../_BASIC/screen/screen"

export interface BookingListProps {
  /**
   * 추가적인 padding, margin 을 줌으로써, 위치를 조정할 수 있습니다.
   */
  style?: StyleProp<ViewStyle>

  /**
   * 예약 객체 배열
   */
  bookings: CgBooking[]
}

export const BookingList = observer(function BookingList(props: BookingListProps) {
  const { bookings = [], style } = props

  //* 선택된 날짜
  const selected = useRef<string>("")
  //const [selected, setSelected] = useState("")

  const onDayPress = ({ date }) => {
    console.log("PRESSED 🔷", date)
    selected.current = date.dateString
    console.log("SELECTED 🔷", selected)
    //setSelected(date.dateString)
  }

  // console.log("bookings", bookings)

  const allStyles = Object.assign({}, styles.root, style)

  return (
    <FlatList
      style={allStyles}
      contentContainerStyle={{
        paddingBottom: BOTTOM_TAB_BAR_HEIGHT,
        paddingHorizontal: BASIC_BACKGROUND_PADDING_WIDTH,
      }}
      showsVerticalScrollIndicator={false}
      data={bookings}
      renderItem={({ item, index }) => {
        if (item === null || item === undefined) {
          //TODO: 빈 날짜일 경우 UI 처리
          console.log("item is null or undefined:", `${JSON.stringify(item)}`)
          return <PreBol16 text={JSON.stringify(item)} />
        }
        const visOrCre = item?.crecheBookingId ? "위탁" : item?.visitingBookingId ? "방문" : "ERR"
        const dateOrTime =
          visOrCre === "방문" ? item.startTime : visOrCre === "위탁" ? item.startDate : null
        const startProp = visOrCre === "방문" ? "startTime" : "startDate"
        const endProp = visOrCre === "방문" ? "endTime" : "endDate"

        return (
          <View
            style={{ display: "flex", flexDirection: "row" }}
            key={(item?.crecheBookingId || item?.visitingBookingId) + 100 * index}
          >
            {/* 좌측 시간대 표기 UI */}
            {/* <View
                style={{
                  marginVertical: 16,
                  marginRight: 8,
                  paddingRight: 5,
                  justifyContent: "space-between",
                  borderRightWidth: 2,
                  borderColor: "#F8F8FA",
                }}
              >
                <PreBol16 color={GIVER_CASUAL_NAVY}>{item[startProp].substring(11, 16)}</PreBol16>
                <PreBol16 color={GIVER_CASUAL_NAVY}>{item[endProp].substring(11, 16)}</PreBol16>
              </View> */}

            {/* 예약 요약 카드 */}
            <BookingInfoCard
              style={{ marginVertical: 8, marginTop: index === 0 ? 0 : 8 }}
              booking={item}
              visOrCre={visOrCre}
            />
          </View>
        )
      }}
      ListEmptyComponent={() => (
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            height: (DEVICE_WINDOW_HEIGHT - BOTTOM_TAB_BAR_HEIGHT - 200) * HEIGHT,
          }}
        >
          <Image source={images.dog_question} style={{ width: 179, height: 192 }} />
          <PreMed18 text={`진행 중 이거나 완료한 예약이 없습니다`} />
        </View>
      )}
    />
  )
})

const styles = StyleSheet.create({
  root: { flex: 1, width: "100%", height: "100%" },
})
