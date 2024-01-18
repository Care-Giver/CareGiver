import React, { forwardRef, useCallback, useEffect, useMemo, useRef, useState } from "react"
import { StyleProp, ViewStyle, View, Image, Pressable } from "react-native"
import { observer, useLocalObservable, useObserver } from "mobx-react-lite"
import { images } from "#images"
import { CalendarProvider, AgendaList, ExpandableCalendar } from "react-native-calendars"
import { GIVER_CASUAL_NAVY } from "#theme"
import { BookingInfoCard } from "../booking-info-card/booking-info-card"
import { PreBol16, PreMed18, PreReg12, PreReg14 } from "../_BASIC/custom-texts/custom-texts"
import { ConfirmedBooking } from "#axios"
import { DateData, DayState } from "react-native-calendars/src/types"
import { UpdateSources } from "react-native-calendars/src/expandableCalendar/commons"
import { autorun, observable } from "mobx"

export interface BookingListProps {
  /**
   * 추가적인 padding, margin 을 줌으로써, 위치를 조정할 수 있습니다.
   */

  /**
   * 예약 객체 배열
   */
  sections: any[]

  style?: StyleProp<ViewStyle>
}

interface CustomDayComponentProps {
  date: string & DateData
  state: DayState
  selected: any
}
export const CustomDayComponent = observer(
  function BookingList(props: CustomDayComponentProps) {
    const { date, state, selected } = props

    //* test
    // const myObservableRef = observable({
    //   value: selected.current,
    // })

    // useEffect(() => {
    //   const dispose = autorun(() => {
    //     console.log("Value changed:", myObservableRef.value)
    //   })

    //   return () => {
    //     dispose()
    //   }
    // }, [myObservableRef])

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

    // const textBgBdSelectior = () => {
    //   if (date.dateString === selected) return GIVER_CASUAL_NAVY
    //   return "#FFFFFF"
    // }
    // const textColorSelectior = () => {
    //   if (date.dateString === selected) return GIVER_CASUAL_NAVY
    //   return "#FFFFFF"
    // }
    // const translateWeekText = () => {
    //   return week[new Date(date.timestamp).getDay()]
    // }

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

export const BookingList = observer(function BookingList(props: BookingListProps) {
  const { sections } = props

  //* 선택된 날짜
  const selected = useRef<string>("")
  //const [selected, setSelected] = useState("")

  const onDayPress = ({ date }) => {
    console.log("PRESSED 🔷", date)

    selected.current = date.dateString
    console.log("SELECTED 🔷", selected)

    //setSelected(date.dateString)
  }

  //* AgendaList컴포넌트에서 렌더링을 위한 부분
  const renderItem = useCallback(
    ({ item }) => {
      console.log("renderItem")
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
      if (dateOrTime.substring(0, 10) === selected.current) {
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
    },
    [selected],
  )

  return (
    <View style={{ flex: 1, marginTop: -20 }}>
      <CalendarProvider numberOfDays={5} date={new Date().toISOString().split("T")[0]}>
        <View style={{ display: "flex", alignItems: "flex-end" }}>
          <ExpandableCalendar
            // // Initially visible month. Default = now
            // initialDate={"2024-01-16"}
            // // Minimum date that can be selected, dates before minDate will be grayed out. Default = undefined
            // minDate={"2024-01-15"}
            // // Maximum date that can be selected, dates after maxDate will be grayed out. Default = undefined
            // maxDate={"2024-01-21"}
            monthFormat={"MMMM"}
            disablePan={true}
            theme={{
              monthTextColor: GIVER_CASUAL_NAVY,
              textMonthFontSize: 20,
              textMonthFontWeight: "bold",
            }}
            dayComponent={({ date, state }) => (
              <Pressable onPress={(e) => onDayPress({ date })}>
                {/**
                 //* observer로 감싼 CustomDayComponent가 리렌더링되지 않음.
                 //* selected는 분명 바뀜
                 //? BookingList자체가 리렌더링 되어야 CustomDayComponent가 리렌더링 될지 기회가 생기는 것 아닌가?
                 */}
                <CustomDayComponent date={date} state={state} selected={selected} />
              </Pressable>
            )}
            //? 이걸 선언하지 않으면 CustomDayComponent가 정상적인 렌더링이 안됨,,,
            //onDayPress={(date) => onDayPress({ date })}
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

          {!!sections && sections.length > 0 && (
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
          )}
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
