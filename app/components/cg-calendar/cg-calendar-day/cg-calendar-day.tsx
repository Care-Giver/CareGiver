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

  const textBgBdColor = useMemo(() => {
    if (selected.includes(date.dateString)) {
      return GIVER_CASUAL_NAVY
    }
    if (state === "today") {
      return LBG
    }
    return "white"
  }, [selected, date, state])

  const textColor = useMemo(() => {
    if (isAvailableDate) {
      if (selected.includes(date.dateString)) {
        return "white"
      }
      if (state === "disabled") {
        return MIDDLE_LINE
      }
      return "black"
    }
    if (selected.includes(date.dateString)) {
      return "white"
    }
    if (state === "today") {
      return GIVER_CASUAL_NAVY
    }
    if (state === "disabled") {
      return MIDDLE_LINE
    }
    return DISABLED
  }, [isAvailableDate, selected, date, state])

  const feeTextColor = useMemo(() => {
    if (selected.includes(date.dateString)) {
      return GIVER_CASUAL_NAVY_80
    }
    if (state === "today") {
      return GIVER_CASUAL_NAVY
    }
    if (state === "disabled") {
      return "white"
    }
    return SUB_HEAD_LINE
  }, [selected, date, state])

  return (
    <Pressable
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
            borderColor: textBgBdColor,
          },
        ]}
      >
        <Text
          style={[
            styles.dayText,
            {
              fontWeight: isAvailableDate ? "600" : "400",
              backgroundColor: textBgBdColor,
              color: textColor,
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
              color: feeTextColor,
              fontWeight: selected.includes(date.dateString) ? "600" : "400",
            },
          ]}
        >
          {!!totalFee && priceFormatter(totalFee?.toString())}
        </Text>
      </View>
    </Pressable>
  )
})
