import React, { useEffect, useState } from "react"
import { View, Pressable, Text } from "react-native"
import { observer } from "mobx-react-lite"
import { styles } from "./styles"
import { ClientCalendarDayProps } from "./client-calendar-day.props"
import { DISABLED, GIVER_CASUAL_NAVY, LBG, MIDDLE_LINE } from "#theme"

export const ClientCalendarDay = observer(function CgCalendarDay(props: ClientCalendarDayProps) {
  const { date, state, selected, startDate, endDate } = props

  const textBgBdSelectior = ({ date, state }) => {
    if (date.dateString === selected) {
      return GIVER_CASUAL_NAVY
    }
    if (state === "today") {
      return LBG
    }
    return "white"
  }
  const textColorSelector = ({ date, state }) => {
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
