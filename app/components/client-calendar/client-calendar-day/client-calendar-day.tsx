import React, { useMemo } from "react"
import { View, StyleSheet, Text, Pressable } from "react-native"
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
import { POPPINS_REGULAR, POPPINS_SEMIBOLD } from "#fonts"
import { TODAY_YEAR_MONTH_DATE } from "../../../components/cg-calendar/cg-calendar"

type ClientCalendarDayProps = {
  date: string & DateData
  state: DayState
  selected: string // "방문" 캘린더에서 사용되는, 선택된 날짜 입니다.
  dateRange: DateData[] // "위탁" 캘린더에서 사용되는, 선택된 날짜 범위 입니다.
  onPress: () => void
}

export const ClientCalendarDay = observer(function CgCalendarDay(props: ClientCalendarDayProps) {
  const { date, state, selected, dateRange, onPress } = props
  const isPastDate = new Date(date.dateString) < TODAY_YEAR_MONTH_DATE
  /** 달력상의 날짜가 선택된 날짜와 같은지 확인합니다. "방문" 전용 변수입니다.  */
  const isSameWithSelectedDate = date.dateString === selected
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

  const backgroundColor = useMemo(() => {
    if (state === "today") return LBG
    if (isStartDate || isEndDate) return "white"
    if (isSameWithSelectedDate) return "white"
    if (isInTheRange) return "white"

    return null
  }, [isEndDate, isInTheRange, isStartDate, isSameWithSelectedDate, state])

  const textBackgroundColor = useMemo(() => {
    if (isStartDate || isEndDate) return GIVER_CASUAL_NAVY
    if (isSameWithSelectedDate) return GIVER_CASUAL_NAVY
    if (isInTheRange) return GIVER_CASUAL_NAVY
    if (state === "today") return LBG

    return "white"
  }, [isEndDate, isInTheRange, isSameWithSelectedDate, isStartDate, state])

  const textColor = useMemo(() => {
    if (isPastDate) return MIDDLE_LINE
    if (isStartDate || isEndDate) return "white"
    if (isSameWithSelectedDate) return "white"
    if (isInTheRange) return "white"
    if (state === "today") return GIVER_CASUAL_NAVY
    if (state === "disabled") return MIDDLE_LINE

    return DISABLED
  }, [isPastDate, isStartDate, isEndDate, isSameWithSelectedDate, isInTheRange, state])

  return (
    <Pressable
      disabled={isPastDate}
      onPress={onPress}
      style={[
        styles.dayContainer,
        {
          backgroundColor: backgroundColor,
          alignItems: "center",
        },
      ]}
    >
      <View //text를 view로 감싸고 backgroundcolor와 borderradius를 줘야한다.
        style={styles.rootView}
      >
        <Text
          style={[
            styles.dayText,
            {
              fontFamily:
                state === "today" ||
                isSameWithSelectedDate ||
                isStartDate ||
                isEndDate ||
                isInTheRange
                  ? POPPINS_SEMIBOLD
                  : POPPINS_REGULAR,
              color: textColor,
              backgroundColor: textBackgroundColor,
              borderRadius: 4,
              overflow: "hidden", //! iOS 에서 Text 컴포넌트의 borderRadius 가 적용되지 않는 이슈 해결: https://eloquence-developers.tistory.com/147
            },
          ]}
        >
          {date.day}
        </Text>

        {/* 방문 시나리오 */}
        {isSameWithSelectedDate && (
          <View style={{ marginTop: 6 }}>
            <Text style={{ fontSize: 10, color: GIVER_CASUAL_NAVY, fontFamily: POPPINS_SEMIBOLD }}>
              방문일
            </Text>
          </View>
        )}

        {/* 위탁 시나리오 */}
        {(isStartDate || isEndDate) && (
          <View style={{ marginTop: 6 }}>
            <Text style={{ fontSize: 10, color: GIVER_CASUAL_NAVY, fontFamily: POPPINS_SEMIBOLD }}>
              {isStartAndEndDate
                ? "하루 예약"
                : (isStartDate && "시작일") || (isEndDate && "종료일")}
            </Text>
          </View>
        )}
      </View>
    </Pressable>
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

  rootView: {
    borderColor: GIVER_CASUAL_NAVY,
    borderRadius: 4,
    marginTop: 8,
    alignItems: "center",
  },

  dayText: {
    width: 24,
    height: 24,
    textAlign: "center",
    paddingTop: 2,
  },
})
