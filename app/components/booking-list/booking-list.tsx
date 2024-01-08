import React from "react"
import { StyleProp, ViewStyle, View, Image, Pressable } from "react-native"
import { observer } from "mobx-react-lite"
import { images } from "#images"
import { CalendarProvider, AgendaList, ExpandableCalendar } from "react-native-calendars"
import { GIVER_CASUAL_NAVY } from "#theme"
import { BookingInfoCard } from "../booking-info-card/booking-info-card"
import { PreBol16, PreReg12, PreReg14 } from "../_BASIC/custom-texts/custom-texts"
import { ConfirmedBooking } from "#axios"

export interface BookingListProps {
  /**
   * 추가적인 padding, margin 을 줌으로써, 위치를 조정할 수 있습니다.
   */

  /**
   * 예약 객체 배열
   */
  bookings: ConfirmedBooking[]

  style?: StyleProp<ViewStyle>
}

export const CustomDayComponent = ({ date, state, selected }) => {
  const translateWeekText = ({ date }) => {
    const week = ["일", "월", "화", "수", "목", "금", "토"]

    return week[new Date(date.timestamp).getDay()]
  }
  const textBgBdSelectior = ({ date, state }) => {
    if (date.dateString === selected) {
      return GIVER_CASUAL_NAVY
    }
    if (state === "today") {
      return "#F8F8FA"
    }
    return "white"
  }

  const textColorSelectior = ({ date, state }) => {
    if (date.dateString === selected) {
      return GIVER_CASUAL_NAVY
    }

    return "#999999"
  }

  return (
    <View
      style={{
        width: 48,
        height: 48,
        marginRight: 80,
        borderColor: textBgBdSelectior({ date, state }),
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
        color={textColorSelectior({ date, state })}
      >
        {date.day}
      </PreReg14>
      <PreReg12
        style={{
          alignSelf: "center",
          fontWeight: "600",
        }}
        color={textColorSelectior({ date, state })}
      >
        {translateWeekText({ date })}
      </PreReg12>
    </View>
  )
}

export const BookingList = observer(function BookingList(props: BookingListProps) {
  const { bookings } = props

  const sections = [
    {
      /**default */
      title: "2023-01-06",
      data: [
        {
          name: "호중",
          services: [],
          pets: [],
          address: "한양대학 1길",
          status: "Pending",
          crecheBookingId: 1,
          startDate: "2024-01-06T17:00:00.000Z",
          endDate: "2024-01-06T17:00:00.000Z",
        },
      ],
    },
  ]

  //* AgendaList컴포넌트의 데이터 형식인 sections을 위한 처리
  bookings.forEach((item, idx) => {
    const newData = { title: String(idx), data: [item] }
    sections.push(newData)
  })

  //* AgendaList컴포넌트에서 렌더링을 위한 부분
  const renderItem = (prop) => {
    const { item } = prop
    const visOrCre = item?.crecheBookingId ? "위탁" : item?.visitingBookingId ? "방문" : "ERR"
    console.log("item>>>", item)
    const dateOrTime =
      visOrCre === "방문" ? item.startTime : visOrCre === "위탁" ? item.startDate : null
    //console.log("item >>>", item)
    if (dateOrTime.substring(0, 10) === selected) {
      return (
        <View
          style={{
            display: "flex",
            flexDirection: "row",
          }}
        >
          <View
            style={{
              marginVertical: 16,
              marginRight: 8,
              paddingRight: 5,
              justifyContent: "space-between",
              borderRightWidth: 2,
              borderColor: "#F8F8FA",
            }}
          >
            <PreBol16 color={GIVER_CASUAL_NAVY}>{item.startTime.substring(11, 16)}</PreBol16>
            <PreBol16 color={GIVER_CASUAL_NAVY}>{item.endTime.substring(11, 16)}</PreBol16>
          </View>
          <BookingInfoCard
            style={{ marginVertical: 8, marginHorizontal: 6 }}
            booking={item}
            //TODO 방문 or 위탁 판단필요
            visOrCre={visOrCre}
          />
        </View>
      )
    } else {
      return null
    }
  }

  const [currentDate, setCurrentDate] = React.useState(new Date().toISOString().split("T")[0]) // 현재 날짜를 문자열로 변환
  const [selected, setSelected] = React.useState("")
  const onDayPress = (date) => {
    setSelected(date.date.dateString)
    console.log(date.date.dateString)
  }
  return (
    <View style={{ flex: 1, marginTop: -20 }}>
      <CalendarProvider numberOfDays={5} date={currentDate}>
        <View style={{ display: "flex", alignItems: "flex-end" }}>
          <ExpandableCalendar
            monthFormat={"MMMM"}
            theme={{
              monthTextColor: GIVER_CASUAL_NAVY,
              textMonthFontSize: 20,
              textMonthFontWeight: "bold",
            }}
            dayComponent={({ date, state }) => (
              <Pressable onPress={(e) => onDayPress({ date })}>
                <CustomDayComponent date={date} state={state} selected={selected} />
              </Pressable>
            )}
            onDayPress={onDayPress}
            headerStyle={{
              marginTop: 25, // default headertitle(week)을 지우기 위함
            }}
            calendarStyle={{
              paddingBottom: 8,
              borderStyle: "solid",
              borderBottomWidth: 2,
              borderBottomColor: "#F8F8FA",
            }}
            style={{
              alignSelf: "center",
              width: "109%",
            }}
            renderArrow={(direction) =>
              direction === "left" ? (
                <Image
                  source={images.arrow_left_navy}
                  style={{ width: 18, height: 18, marginLeft: 90 }}
                />
              ) : (
                <Image
                  source={images.arrow_right_navy}
                  style={{ width: 18, height: 18, marginRight: 90 }}
                />
              )
            }
          />

          <AgendaList
            sectionStyle={{ display: "none" }}
            style={{
              marginTop: 32,
              marginHorizontal: -6,
            }}
            sections={sections}
            renderItem={renderItem}
            scrollToNextEvent={true}
          />
        </View>
      </CalendarProvider>

      {/**test components */}
      {/*<CalendarProvider date={"2023-06-26"} showTodayButton>
        <CalendarHeader
          renderArrow={(direction) =>
            direction === "left" ? (
              <Image
                source={images.arrow_left_navy}
                style={{ marginLeft: 40, width: 18, height: 18 }}
              />
            ) : (
              <Image
                source={images.arrow_right_navy}
                style={{ marginRight: 40, width: 18, height: 18 }}
              />
            )
          }
          onPressArrowLeft={onPressArrowLeft}
          onPressArrowRight={onPressArrowRight}
          style={{ backgroundColor: "#FFFFFF" }}
          hideDayNames
          customHeaderTitle={
            // headerMonth
            <View>
              <Text>{month + "월"}</Text>
            </View>
          }
        />
        <WeekCalendar
          current={currentDate}
          month={month}
          allowShadow={false}
          style={{ backgroundColor: "#FFFFFF", marginVertical: 0 }}
          hideDayNames
          onMonthChange={onMonthChange}
          numberOfDays={5}
          staticHeader={true}
          dayComponent={CustomDayComponent}
        />

        <AgendaList sections={sections} renderItem={renderItem} />
        </CalendarProvider>*/}
    </View>
  )
})
