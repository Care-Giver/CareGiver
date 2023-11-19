import React, { useMemo } from "react"
import { View, Pressable, Text } from "react-native"
import { observer } from "mobx-react-lite"
import { styles } from "./styles"
import {
  DISABLED,
  GIVER_CASUAL_NAVY,
  GIVER_CASUAL_NAVY_80,
  LBG,
  MIDDLE_LINE,
  SUB_HEAD_LINE,
} from "#theme"
import { DateData } from "react-native-calendars"
import { DayState } from "react-native-calendars/src/types"
import { price as priceFormatter } from "../../../utils/format"
import { TODAY_YEAR_MONTH_DATE } from "../cg-calendar"
import { POPPINS_REGULAR, POPPINS_SEMIBOLD } from "#fonts"

type CgCalendarDayProps = {
  date: string & DateData
  state: DayState
  selected: string[]
  onPress: () => void
  textDecorationLine: "none" | "line-through"
  isAvailableDate: boolean
  totalFee?: number
}

export const CgCalendarDay = observer(function CgCalendarDay(props: CgCalendarDayProps) {
  const {
    date,
    state,
    selected,
    onPress,
    textDecorationLine = "line-through",
    isAvailableDate,
    totalFee,
  } = props
  const isPastDate = new Date(date.dateString) < TODAY_YEAR_MONTH_DATE

  const dayViewBorderColor = useMemo(() => {
    if (selected.includes(date.dateString)) return GIVER_CASUAL_NAVY
    if (state === "today") return LBG

    return "white"
  }, [selected, date, state])
  const dayViewBackgroundColor = dayViewBorderColor

  const dayTextColor = useMemo(() => {
    if (isPastDate) return MIDDLE_LINE
    if (state === "disabled") return MIDDLE_LINE
    if (isAvailableDate) return selected.includes(date.dateString) ? "white" : "black"
    if (selected.includes(date.dateString)) return "white"
    if (state === "today") return GIVER_CASUAL_NAVY

    return DISABLED
  }, [isAvailableDate, selected, date, state, isPastDate])

  const feeTextColor = useMemo(() => {
    if (isPastDate) return MIDDLE_LINE
    if (selected.includes(date.dateString)) return GIVER_CASUAL_NAVY_80
    if (state === "today") return GIVER_CASUAL_NAVY

    return SUB_HEAD_LINE
  }, [selected, date, state, isPastDate])

  return (
    <Pressable
      disabled={isPastDate}
      onPress={onPress}
      style={[
        styles.dayContainer,
        {
          backgroundColor: state === "today" ? LBG : null,
          alignItems: "center",
        },
      ]}
    >
      {/* 날짜 */}
      <View //text를 view로 감싸고 backgroundcolor와 borderradius를 줘야한다.
        style={[
          styles.dayTextContainer,
          {
            borderWidth: 1,
            borderColor: dayViewBorderColor,
            backgroundColor: dayViewBackgroundColor,
          },
        ]}
      >
        <Text
          style={[
            styles.dayText,
            {
              fontFamily: selected.includes(date.dateString) ? POPPINS_SEMIBOLD : POPPINS_REGULAR,
              color: dayTextColor,
              textDecorationLine: textDecorationLine,
            },
          ]}
        >
          {date.day}
        </Text>
      </View>

      {/* 가격 */}
      <View style={{ marginTop: 6 }}>
        <Text
          style={[
            styles.feeText,
            {
              fontFamily: selected.includes(date.dateString) ? POPPINS_SEMIBOLD : POPPINS_REGULAR,
              color: feeTextColor,
            },
          ]}
        >
          {!!totalFee && priceFormatter(totalFee?.toString())}
        </Text>
      </View>
    </Pressable>
  )
})
