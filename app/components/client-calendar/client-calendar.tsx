import React, { useEffect, useState } from "react"
import { StyleProp, View, Image, Text, ViewStyle, Pressable } from "react-native"
import { observer } from "mobx-react-lite"
import { Calendar, DateData, LocaleConfig } from "react-native-calendars"
import { images } from "#images"
import { styles } from "./styles"
import "./localeConfig"
import { ClientCalendarDay } from "./client-calendar-day/client-calendar-day"
import { GIVER_CASUAL_NAVY, SHADOW_1 } from "#theme"
import { POPPINS_REGULAR } from "#fonts"
import { CgCalendarEditButton } from "../buttons/cg-calendar-edit-button/cg-calendar-edit-button"

type ServiceType = "방문" | "위탁"

interface ClientCalendarProps {
  style: ViewStyle
  serviceType: ServiceType
  selectedDate: string
  onDayPress: (date: any) => void
}

export const ClientCalendar = observer(function CgCalendar(props: ClientCalendarProps) {
  const { style, serviceType, selectedDate, onDayPress: onDayPressProp } = props

  const [startDate, setStartDate] = useState(null)
  const [endDate, setEndDate] = useState(null)
  const [currentMonth, setCurrentMonth] = useState(new Date()) //calendar-day component를 rerendering하기 위해 전달하는 param

  return (
    <View style={style}>
      <Calendar
        headerStyle={{ height: 94, marginBottom: 0, marginTop: -5 }}
        renderArrow={(direction) =>
          direction === "left" ? (
            <Image source={images.arrow_left_navy} style={[styles.arrow, { marginLeft: 40 }]} />
          ) : (
            <Image source={images.arrow_right_navy} style={[styles.arrow, { marginRight: 40 }]} />
          )
        }
        onMonthChange={(month) => setCurrentMonth(new Date(month.timestamp))}
        monthFormat={"MMMM"}
        theme={{
          textMonthFontFamily: POPPINS_REGULAR,
          textMonthFontWeight: "bold",
          monthTextColor: GIVER_CASUAL_NAVY,
          textMonthFontSize: 20,
        }}
        dayComponent={({ date, state }) => (
          <Pressable
            onPress={() => {
              onDayPressProp(date)
            }}
          >
            <ClientCalendarDay //? 왜 안되는지,
              date={date}
              state={state}
              selected={selectedDate}
              month={currentMonth}
              startDate={startDate}
              serviceType={serviceType}
              endDate={endDate}
            />
          </Pressable>
        )}
        style={[styles.calendar, SHADOW_1]}
      />
    </View>
  )
})
