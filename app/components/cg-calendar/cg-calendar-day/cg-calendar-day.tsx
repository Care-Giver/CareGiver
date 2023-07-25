import React, { useEffect, useState } from "react"
import { View, Pressable, Text } from "react-native"
import { observer } from "mobx-react-lite"
import { styles } from "./styles"
import { CgCalendarDayProps } from "./cg-calendar-day.props"
import { DISABLED, GIVER_CASUAL_NAVY, LBG, MIDDLE_LINE, SUB_HEAD_LINE } from "#theme"

export const CgCalendarDay = observer(function CgCalendarDay(props: CgCalendarDayProps) {
  const { date, state, selected, dates, month, serviceType, startDate, endDate } = props
  const [fee, setFee] = useState(null)
  const [availableTime, setAvailableTime] = useState(false)

  useEffect(() => {
    setFee(null)
    //setAvailableTime(false)
    checkDate()
  }, [date, dates])

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
    if (availableTime) {
      if (date.dateString == selected) {
        return "white"
      }
      if (state == "disabled") {
        return MIDDLE_LINE
      }
      return "black"
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
      return "#324C89"
    }
    if (date.dateString == selected) {
      return "#324C89"
    }
    if (state == "today") {
      return GIVER_CASUAL_NAVY
    }
    if (state == "disabled") {
      return "white"
    }
    return SUB_HEAD_LINE
  }

  const checkDate = () => {
    // console.log("dates in checkDate >>>", dates)
    // console.log("serviceType in checkDate >>>", serviceType)

    if (serviceType == "방문") {
      for (let i = 0; i < dates?.length; i++) {
        if (date.dateString == dates[i].date.substring(0, 10)) {
          setFee(dates[i].fee)
          setAvailableTime(true)
          return true
        } else continue
      }
    } else if (serviceType == "위탁") {
      for (let i = 0; i < dates?.length; i++) {
        if (date.dateString == dates[i].startDate.substring(0, 10)) {
          setFee(dates[i].fee)
          setAvailableTime(true)
          return true
        } else continue
      }
    }
    return null
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
              fontWeight: availableTime ? "600" : "400",
              backgroundColor: textBgBdSelectior({ date, state }),
              color: textColorSelector({ date, state }),
            },
          ]}
        >
          {date.day}
        </Text>
      </View>
      <View style={{ marginTop: 6 }}>
        <Text
          style={[
            styles.feeText,
            {
              color: feeTextColorSelector({ date, state }),
              fontWeight: date.dateString == selected ? "600" : "400",
            },
          ]}
        >
          {fee}
        </Text>
      </View>
    </View>
  )
})
