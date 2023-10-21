import React, { useEffect, useState } from "react"
import { StyleProp, View, Image, Text, ViewStyle, Pressable } from "react-native"
import { observer } from "mobx-react-lite"
import { Calendar, DateData, LocaleConfig } from "react-native-calendars"
import { images } from "#images"
import { styles } from "./styles"
import { CgCalendarProps } from "./cg-calendar.props"
import "./localeConfig"
import { CgCalendarDay } from "./cg-calendar-day/cg-calendar-day"
import { GIVER_CASUAL_NAVY, SHADOW_1 } from "#theme"
import { POPPINS_REGULAR } from "#fonts"
import { CgCalendarEditButton } from "../buttons/cg-calendar-edit-button/cg-calendar-edit-button"

export const CgCalendar = observer(function CgCalendar(props: CgCalendarProps) {
  const { availableDates, serviceType, selected, setSelected } = props
  //? 가장 최근에 선택한 날짜가 이용가능한 날짜인지 판단하기 위한 state
  const [availableCheck, setAvailableCheck] = useState<boolean>(true)
  const hasDates = availableDates?.length !== 0

  //console.log("serviceType in CgCalendar >>>", serviceType)
  //console.log("dates in CgCalendar >>>", dates)
  //console.log("♦️")
  const checkDate = ({ date }) => {
    // console.log("dates in checkDate >>>", dates)
    // console.log("serviceType in checkDate >>>", serviceType)
    console.log("date.dateString>>>", date?.dateString)
    let isAvailableDate: boolean = false
    if (serviceType === "방문") {
      availableDates.forEach((availableDate) => {
        if (date?.dateString === availableDate?.date.substring(0, 10)) {
          isAvailableDate = true
        }
      })
    } else if (serviceType === "위탁") {
      availableDates.forEach((availableDate) => {
        if (date?.dateString === availableDate?.startDate.substring(0, 10)) {
          isAvailableDate = true
        }
      })
    }
    return isAvailableDate
  }
  const onDayPress = ({ date }) => {
    console.log(selected)
    //? 중복클릭 선택해제
    if (selected.includes(date.dateString)) {
      setSelected(selected.filter((selected) => selected !== date.dateString))
    } else {
      //? 클린한 날짜가 이용 가능한 날짜라면
      if (checkDate({ date })) {
        //? 복수선택이 불가능하기 때문에 해당 날짜만 선택
        setSelected([date.dateString])
        setAvailableCheck(true)
      } else {
        //? 선택한 날짜가 이용가능한 날짜가 아닐 때, 직전에 선택한 날짜에 따라서 동작 판단
        const newSelected = availableCheck ? [] : [...selected]
        newSelected.push(date.dateString)
        setSelected(newSelected)
        setAvailableCheck(false)
      }
    }

    //console.log(currentMonth)
  }

  return (
    <View>
      <Calendar
        headerStyle={{ height: 94, marginBottom: 0, marginTop: -5 }}
        renderArrow={(direction) =>
          direction === "left" ? (
            <Image source={images.arrow_left_navy} style={[styles.arrow, { marginLeft: 40 }]} />
          ) : (
            <Image source={images.arrow_right_navy} style={[styles.arrow, { marginRight: 40 }]} />
          )
        }
        monthFormat={"MMMM"}
        theme={{
          textMonthFontFamily: POPPINS_REGULAR,
          textMonthFontWeight: "bold",
          monthTextColor: GIVER_CASUAL_NAVY,
          textMonthFontSize: 20,
        }}
        dayComponent={({ date, state }) => (
          <Pressable onPress={(e) => onDayPress({ date })}>
            <CgCalendarDay //? 왜 안되는지,
              date={date}
              state={state}
              selected={selected}
              availableDates={availableDates}
              serviceType={serviceType}
            />
          </Pressable>
        )}
        style={[styles.calendar, SHADOW_1]}
      />
    </View>
  )
})
