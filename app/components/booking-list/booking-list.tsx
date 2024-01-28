import React, { useMemo, useRef } from "react"
import { StyleProp, ViewStyle, View, FlatList, Image } from "react-native"
import { observer } from "mobx-react-lite"
import { BOTTOM_HEIGHT, BOTTOM_TAB_NAVIGATOR, GIVER_CASUAL_NAVY } from "#theme"
import { BookingInfoCard } from "../booking-info-card/booking-info-card"
import { PreBol16, PreMed18, PreReg12, PreReg14 } from "../_BASIC/custom-texts/custom-texts"
import { CgBooking, ConfirmedBooking } from "#axios"
import { DateData, DayState } from "react-native-calendars/src/types"
import { BOTTOM_TAB_BAR_HEIGHT } from "../_BOTTOM_TAB_BAR/custom-tab-bar/custom-tab-bar"
import { images } from "#images"

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

  console.log("bookings", bookings)

  const allStyles = Object.assign({}, { flex: 1, width: "100%", height: "100%" }, style)

  return (
    <FlatList
      style={allStyles}
      contentContainerStyle={{ paddingBottom: BOTTOM_TAB_BAR_HEIGHT }}
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
            <BookingInfoCard style={{ marginVertical: 8 }} booking={item} visOrCre={visOrCre} />
          </View>
        )
      }}
      ListEmptyComponent={() => (
        <View style={{ alignSelf: "center", alignItems: "center" }}>
          <Image source={images.dog_question} style={{ width: 179, height: 192 }} />
          <PreMed18 text={`진행 중 이거나 완료한 예약이 없습니다`} />
        </View>
      )}
    />
  )
})

// TODO: 월 일 달력 UI 구현시 CustomDayComponent 를 일 UI 구현때 사용할 것
interface CustomDayComponentProps {
  date: string & DateData
  state: DayState
  selected: any
}
const CustomDayComponent = observer(
  function CustomDayComponent(props: CustomDayComponentProps) {
    const { date, state, selected } = props

    const { translateWeekText, textBgBdSelectior, textColorSelectior } = useMemo(() => {
      const res = {
        translateWeekText: "",
        textBgBdSelectior: "#FFFFFF",
        textColorSelectior: "#999999",
      }

      const week = ["일", "월", "화", "수", "목", "금", "토"]
      res.translateWeekText = week[new Date(date.timestamp).getDay()] //FIXME: 더 나은 방법?

      if (date.dateString === selected.current) {
        res.textBgBdSelectior = GIVER_CASUAL_NAVY
        res.textColorSelectior = GIVER_CASUAL_NAVY
      } else {
        res.textBgBdSelectior = "#FFFFFF"
        res.textColorSelectior = "#999999"
      }
      if (state === "today") {
        res.textBgBdSelectior = "#F8F8FA"
      }

      return res
    }, [date, state, selected])

    return (
      <View
        style={{
          width: 48,
          height: 48,
          marginRight: 80,
          borderColor: textBgBdSelectior,
          backgroundColor: state === "today" ? "#F8F8FA" : "white",
          borderRadius: 8,
          borderWidth: 2,
          borderStyle: "solid",
        }}
      >
        <PreReg14
          style={{
            height: 20,
            alignSelf: "center",
            marginTop: 5,
            fontWeight: "600",
          }}
          color={textColorSelectior}
        >
          {date.day}
        </PreReg14>
        <PreReg12
          style={{
            alignSelf: "center",
            fontWeight: "600",
          }}
          color={textColorSelectior}
        >
          {translateWeekText}
        </PreReg12>
      </View>
    )
  },
  { forwardRef: true },
)
