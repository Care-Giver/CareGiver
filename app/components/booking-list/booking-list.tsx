import React from "react"
import { StyleProp, ViewStyle, View, Image, Pressable } from "react-native"
import { observer } from "mobx-react-lite"
import { images } from "#images"
import { CalendarProvider, AgendaList, ExpandableCalendar } from "react-native-calendars"
import { GIVER_CASUAL_NAVY } from "#theme"
import { BookingInfoCard } from "../booking-info-card/booking-info-card"
import { PreBol16, PreReg12, PreReg14 } from "../basics/custom-texts/custom-texts"
import { ConfirmedBookings } from "../../services/axios/confirmed-bookings"

export interface BookingListProps {
  /**
   * 추가적인 padding, margin 을 줌으로써, 위치를 조정할 수 있습니다.
   */

  /**
   * 예약 객체 배열
   */
  bookings: ConfirmedBookings[]

  style?: StyleProp<ViewStyle>
}

export const CustomDayComponent = ({ date, state, selected }) => {
  const translateWeekText = ({ date }) => {
    const week = ["일", "월", "화", "수", "목", "금", "토"]

    return week[new Date(date.timestamp).getDay()]
  }
  const textBgBdSelectior = ({ date, state }) => {
    if (date.dateString == selected) {
      return GIVER_CASUAL_NAVY
    }
    if (state === "today") {
      return "#F8F8FA"
    }
    return "white"
  }

  const textColorSelectior = ({ date, state }) => {
    if (date.dateString == selected) {
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
  const { style, bookings } = props

  const sections = [
    {
      /**default */
      title: "2023-06-25",
      data: [
        {
          name: "Meeting",
          serviceType: "",
          petname: "",
          species: "",
          petservices: ["?"],
          address: "",
          time: "10:00 AM",
          height: 50,
          day: "2023-06-26",
        },
      ],
    },
  ]

  bookings.forEach((item, idx) => {
    console.log(item.services)
    const dataprop = {
      name: item.name,
      serviceType: "creche",
      petname: item.pets[0].name,
      species: item.pets[0].species.name,
      petservices: item.services,
      address: item.address,
      time: item.startTime,
      height: 50,
      day: item.startTime.substring(0, 10),
    }
    const newData = { title: String(idx), data: [dataprop] }
    sections.push(newData)
  })

  const renderItem = ({ item }) => {
    //console.log(item.petservices)
    if (item.day === selected) {
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
            name={item.name}
            petname={item.petname}
            species={item.species}
            serviceType={item.serviceType}
            petservices={item.petservices}
            address={item.address}
            caregiverType="petsitter"
          />
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
