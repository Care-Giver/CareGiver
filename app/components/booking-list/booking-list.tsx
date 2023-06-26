import * as React from "react"
import { StyleProp, ViewStyle, View, StyleSheet, TouchableOpacity, Text, Image } from "react-native"
import { observer } from "mobx-react-lite"
import { images } from "#images"

import {
  CalendarProvider,
  AgendaList,
  ExpandableCalendar,
  WeekCalendar,
} from "react-native-calendars"
import CalendarHeader from "react-native-calendars/src/calendar/header"
import { color } from "react-native-reanimated"

export interface BookingListProps {
  /**
   * 추가적인 padding, margin 을 줌으로써, 위치를 조정할 수 있습니다.
   */
  style?: StyleProp<ViewStyle>
}

import { Platform } from "react-native"
export const themeColor = "#00AAAF"
export const lightThemeColor = "#f2f7f7"
export function getTheme() {
  const disabledColor = "grey"

  return {
    // arrows
    arrowColor: "black",
    arrowStyle: { padding: 0 },
    // knob
    expandableKnobColor: themeColor,
    // month
    monthTextColor: "black",
    textMonthFontSize: 16,
    textMonthFontFamily: "HelveticaNeue",
    textMonthFontWeight: "bold" as const,
    // day names
    textSectionTitleColor: "black",
    textDayHeaderFontSize: 12,
    textDayHeaderFontFamily: "HelveticaNeue",
    textDayHeaderFontWeight: "normal" as const,
    // dates
    dayTextColor: themeColor,
    todayTextColor: "#af0078",
    textDayFontSize: 15,
    textDayFontFamily: "HelveticaNeue",
    textDayFontWeight: "500" as const,

    //textDayStyle: { marginTop: Platform.OS === "android" ? 2 : 4, },
    // selected date
    selectedDayBackgroundColor: themeColor,
    selectedDayTextColor: "white",
    // disabled date
    textDisabledColor: disabledColor,
    // dot (marked date)
    dotColor: themeColor,
    selectedDotColor: "white",
    disabledDotColor: disabledColor,
    dotStyle: { marginTop: -2 },
  }
}
export const BookingList = observer(function BookingList(props: BookingListProps) {
  const { style } = props

  const sections = [
    {
      title: "2023-06-25",
      data: [{ name: "Meeting", time: "10:00 AM", height: 50, day: "2023-06-25" }],
    },
    {
      title: "2023-06-26",
      data: [{ name: "Lunch", time: "1:00 PM", height: 50, day: "2023-06-26" }],
    },
    {
      title: "2023-06-27",
      data: [{ name: "Gym", time: "5:30 PM", height: 50, day: "2023-06-27" }],
    },
  ]

  const renderItem = ({ item }) => {
    return (
      <View>
        <Text>{item.name}</Text>
        <Text>{item.time}</Text>
      </View>
    )
  }

  const [currentDate, setCurrentDate] = React.useState(new Date().toISOString().split("T")[0]) // 현재 날짜를 문자열로 변환
  const [month, setMonth] = React.useState(new Date().getMonth())
  const onPressArrowLeft = () => {
    console.log(new Date().getMonth())

    console.log(currentDate[5])
    console.log(currentDate[6])

    const newMonth = [...currentDate]
    newMonth[6] = String(Number(newMonth[6]) - 1)

    setCurrentDate(String(newMonth))
    setMonth(month - 1)

    //setCurrentDate(newMonth)
  }
  const onPressArrowRight = () => {
    console.log(new Date())
    console.log(currentDate[5])
    console.log(currentDate[6])

    const newMonth = [...currentDate]
    newMonth[6] = String(Number(newMonth[6]) + 1)

    setCurrentDate(String(newMonth))
    setMonth(month + 1)
    //setCurrentDate(newMonth)
  }
  const CustomDayComponent = ({ date, state }) => (
    <View style={{ width: 48, height: 48 }}>
      <Text style={{ fontSize: 10 }}>{new Date(date.timestamp).getDay()}</Text>
      <Text style={{ fontSize: 20 }}>{date.day}</Text>
    </View>
  )
  const onMonthChange = () => {
    setCurrentDate("2023-" + month + "-01")
    console.log(currentDate)
  }
  return (
    <View style={{ flex: 1 }}>
      <CalendarProvider
        date={currentDate}
        // onDateChanged={onDateChanged}
        // onMonthChange={onMonthChange}
        showTodayButton

        // disabledOpacity={0.6}
        //theme={todayBtnTheme.current}
        // todayBottomMargin={16}
      >
        <View style={{ backgroundColor: "red" }}>
          <ExpandableCalendar
            //testID={testIDs.expandableCalendar.CONTAINER}
            // horizontal={false}
            // hideArrows
            // disablePan
            // hideKnob
            // initialPosition={ExpandableCalendar.positions.OPEN}
            // calendarStyle={styles.calendar}
            // headerStyle={styles.header} // for horizontal only
            // disableWeekScroll
            //theme={React.useRef(getTheme()).current}
            theme={{
              textDayFontWeight: "600",
              textDayHeaderFontWeight: "600",
              dayTextColor: "white",
              textDayStyle: {
                backgroundColor: "blue",
                width: 20,
                height: 20,
                textAlign: "center",
              },
            }}
            scrollToOverflowEnabled={false}
            scrollEnabled={false}
            style={{
              alignSelf: "center",
              width: "109%",
              borderStyle: "solid",
              borderWidth: 1,
              borderColor: "red",
            }}
            renderArrow={(direction) =>
              direction === "left" ? (
                <Image
                  source={images.arrow_left_navy}
                  style={{ width: 18, height: 18, marginLeft: 40 }}
                />
              ) : (
                <Image
                  source={images.arrow_right_navy}
                  style={{ width: 18, height: 18, marginRight: 40 }}
                />
              )
            } //disableAllTouchEventsForDisabledDays
            //markedDates={marked.current}
            //leftArrowImageSource={leftArrowIcon}
            //rightArrowImageSource={rightArrowIcon}
            // animateScroll
          />

          <AgendaList
            sections={sections}
            renderItem={renderItem}
            // scrollToNextEvent
            //sectionStyle={styles.section}
            // dayFormat={'yyyy-MM-d'}
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
