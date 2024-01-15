import React, { useEffect } from "react"
import { StyleProp, ViewStyle, View, Image, Pressable } from "react-native"
import { observer } from "mobx-react-lite"
import { images } from "#images"
import { CalendarProvider, AgendaList, ExpandableCalendar } from "react-native-calendars"
import { GIVER_CASUAL_NAVY } from "#theme"
import { BookingInfoCard } from "../booking-info-card/booking-info-card"
import { PreBol16, PreMed18, PreReg12, PreReg14 } from "../_BASIC/custom-texts/custom-texts"
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
  console.log("date >>>", date)
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
  let sections = [
    {
      //* default
      title: "ID",
      data: [
        {
          name: "호중",
          services: [],
          pets: [],
          address: "주소",
          status: "예약상태",
          crecheBookingId: 0,
          startDate: "시작 날짜 또는 시간",
          endDate: "끝 날짜 또는 시간",
          startTime: "시작 날짜 또는 시간",
          endTime: "끝 날짜 또는 시간",
        },
      ],
    },
  ]

  //* API를 통해 받아온 예약내역으로 sections 업데이트
  sections = bookings.map((item, idx) => {
    const newData = { title: String(idx), data: [item] }
    //console.log("newData >>>", newData)
    return newData
  })

  //* AgendaList컴포넌트에서 렌더링을 위한 부분
  const renderItem = (prop) => {
    console.log("prop >>>", prop)
    const { item } = prop
    //console.log("item>>>", item)

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

    // 선택된 날짜에 예약 객체 존재
    if (dateOrTime.substring(0, 10) === selected) {
      return (
        <View style={{ display: "flex", flexDirection: "row" }}>
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
            <PreBol16 color={GIVER_CASUAL_NAVY}>{item[startProp].substring(11, 16)}</PreBol16>
            <PreBol16 color={GIVER_CASUAL_NAVY}>{item[endProp].substring(11, 16)}</PreBol16>
          </View>
          <BookingInfoCard
            style={{ marginVertical: 8, marginHorizontal: 6 }}
            booking={item}
            visOrCre={visOrCre}
          />
        </View>
      )
    }
    // 선택된 날짜에 예약 객체 존재하지 않음
    else {
      // TODO - FIXME: 한 개만 렌더링.
      return (
        <View style={{ alignSelf: "center", alignItems: "center" }}>
          <Image source={images.dog_question} style={{ width: 179, height: 192 }} />
          <PreMed18 text={`해당 날짜에는 예약이 없습니다`} />
        </View>
      )
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
            maxDate="2024-01-15"
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
