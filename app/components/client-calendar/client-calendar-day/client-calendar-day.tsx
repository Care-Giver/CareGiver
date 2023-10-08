import React from "react"
import { View, StyleSheet, Text } from "react-native"
import { observer } from "mobx-react-lite"
import { DateData } from "react-native-calendars"
import { DayState } from "react-native-calendars/src/types"
import {
  DISABLED,
  GIVER_CASUAL_NAVY,
  GIVER_CASUAL_NAVY_20,
  GIVER_CASUAL_NAVY_40,
  LBG,
  LIGHT_LINE,
  MIDDLE_LINE,
} from "#theme"
import { POPPINS_REGULAR } from "#fonts"

type BgColor = typeof GIVER_CASUAL_NAVY_40 | typeof GIVER_CASUAL_NAVY_20 | typeof LBG

type TextBgColor = "white" | typeof GIVER_CASUAL_NAVY | typeof LBG

type TextColor = "white" | typeof GIVER_CASUAL_NAVY | typeof MIDDLE_LINE | typeof DISABLED

type ClientCalendarDayProps = {
  date: string & DateData
  state: DayState
  selected?: string
  dateRange: DateData[]
}

export const ClientCalendarDay = observer(function CgCalendarDay(props: ClientCalendarDayProps) {
  const { date, state, selected, dateRange } = props

  const isStartDate = dateRange.length >= 1 && date.dateString === dateRange[0].dateString
  const isEndDate = dateRange.length >= 2 && date.dateString === dateRange[1].dateString
  const isInTheRange =
    dateRange.length === 2 &&
    date.dateString > dateRange[0].dateString &&
    date.dateString < dateRange[1].dateString
  const isStartAndEndDate =
    dateRange.length === 2 &&
    date.dateString === dateRange[0].dateString &&
    date.dateString === dateRange[1].dateString

  const bgColorSelectior = (): BgColor => {
    if (isStartDate || isEndDate) {
      return GIVER_CASUAL_NAVY_40
    }

    if (date.dateString === selected) {
      return GIVER_CASUAL_NAVY_40
    }

    if (isInTheRange) {
      return GIVER_CASUAL_NAVY_20
    }

    if (state === "today") {
      return LBG
    }

    return null
  }

  const textBgSelector = (): TextBgColor => {
    if (isStartDate || isEndDate) {
      return GIVER_CASUAL_NAVY
    }

    if (date.dateString === selected) {
      return GIVER_CASUAL_NAVY
    }

    if (state === "today") {
      return LBG
    }

    return "white"
  }

  const textColorSelector = (): TextColor => {
    if (isStartDate || isEndDate) {
      return "white"
    }

    if (date.dateString === selected) {
      return "white"
    }

    if (state === "today") {
      return GIVER_CASUAL_NAVY
    }

    if (state === "disabled") {
      return MIDDLE_LINE
    }

    return DISABLED
  }

  return (
    <View
      style={[
        styles.dayContainer,
        {
          backgroundColor: bgColorSelectior(),
          alignItems: "center",
        },
      ]}
    >
      <View //text를 view로 감싸고 backgroundcolor와 borderradius를 줘야한다.
        style={styles.dayTextContainer}
      >
        <Text
          style={[
            styles.dayText,
            {
              fontWeight: "400",
              backgroundColor: textBgSelector(),
              color: textColorSelector(),
            },
          ]}
        >
          {date.day}
        </Text>

        {/* 방문 시나리오 */}
        {date.dateString === selected && (
          <View style={{ marginTop: 6 }}>
            <Text style={{ fontSize: 10, color: GIVER_CASUAL_NAVY, fontWeight: "600" }}>
              방문일
            </Text>
          </View>
        )}

        {/* 위탁 시나리오 */}
        {(isStartDate || isEndDate) && (
          <View style={{ marginTop: 6 }}>
            <Text style={{ fontSize: 10, color: GIVER_CASUAL_NAVY, fontWeight: "600" }}>
              {isStartAndEndDate
                ? "하루 예약"
                : (isStartDate && "시작일") || (isEndDate && "종료일")}
            </Text>
          </View>
        )}
      </View>
    </View>
  )
})

const styles = StyleSheet.create({
  dayContainer: {
    color: DISABLED,
    marginVertical: -8,
    borderColor: LIGHT_LINE,
    borderWidth: 1,
    width: 51.14,
    height: 72,
    zIndex: -1,
  },

  dayTextContainer: {
    borderColor: GIVER_CASUAL_NAVY,
    borderRadius: 4,
    marginTop: 8,
    alignItems: "center",
  },

  dayText: {
    fontFamily: POPPINS_REGULAR,
    width: 24,
    height: 24,
    textAlign: "center",
    paddingTop: 2,
  },
})
