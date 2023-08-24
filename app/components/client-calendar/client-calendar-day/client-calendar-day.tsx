import React, { useEffect, useState } from "react"
import { View, Pressable, Text } from "react-native"
import { observer } from "mobx-react-lite"
import { styles } from "./styles"
import { ClientCalendarDayProps } from "./client-calendar-day.props"
import {
  DISABLED,
  GIVER_CASUAL_NAVY,
  GIVER_CASUAL_NAVY_80,
  LBG,
  MIDDLE_LINE,
  SUB_HEAD_LINE,
} from "#theme"

export const ClientCalendarDay = observer(function CgCalendarDay(props: ClientCalendarDayProps) {
  const { date, state, selected, serviceType, startDate, endDate } = props

  //* seviceType == "위탁"일 때 stratDate와 endDate사이의 날짜인지 확인하는 함수
  const checkMiddleDate = ({ date }) => {
    //console.log("s: ", startDate, "e: ", endDate)

    const confirmedDate = new Date(date?.dateString)
    if (startDate <= confirmedDate && confirmedDate <= endDate) {
      // console.log(confirmedDate)
      // console.log("check!")
      return true
    }
    //console.log("no!!!!!!!!")
    return false
  }
  const textBgBdSelectior = ({ date, state }) => {
    if (checkMiddleDate({ date })) {
      return GIVER_CASUAL_NAVY
    }
    if (date.dateString == selected) {
      return GIVER_CASUAL_NAVY
    }
    if (state == "today") {
      return LBG
    }
    return "white"
  }
  const textColorSelector = ({ date, state }) => {
    if (checkMiddleDate({ date })) {
      return "white"
    }
    if (date.dateString == selected) {
      return "white"
    }
    if (state == "today") {
      return GIVER_CASUAL_NAVY
    }
    if (state == "disabled") {
      return MIDDLE_LINE
    }
    return DISABLED
  }
  const feeTextColorSelector = ({ date, state }) => {
    if (checkMiddleDate({ date })) {
      return GIVER_CASUAL_NAVY_80
    }
    if (date.dateString == selected) {
      return GIVER_CASUAL_NAVY_80
    }
    if (state == "today") {
      return GIVER_CASUAL_NAVY
    }
    if (state == "disabled") {
      return "white"
    }
    return SUB_HEAD_LINE
  }

  // console.log("dates in calendar-day >>>", dates)

  return (
    <View
      style={[
        styles.dayContainer,
        {
          backgroundColor: state === "today" ? LBG : null,
          alignItems: "center",
        },
      ]}
    >
      <View //text를 view로 감싸고 backgroundcolor와 borderradius를 줘야한다.
        style={[
          styles.dayTextContainer,
          {
            borderWidth: 1,
            borderColor: textBgBdSelectior({ date, state }),
          },
        ]}
      >
        <Text
          style={[
            styles.dayText,
            {
              fontWeight: "400",
              backgroundColor: textBgBdSelectior({ date, state }),
              color: textColorSelector({ date, state }),
            },
          ]}
        >
          {date.day}
        </Text>
      </View>
    </View>
  )
})
