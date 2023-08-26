import React from "react"
import { StyleSheet, View, Image, ViewStyle, Pressable } from "react-native"
import { observer } from "mobx-react-lite"
import { Calendar, DateData } from "react-native-calendars"
import { images } from "#images"
import "./localeConfig"
import { ClientCalendarDay } from "./client-calendar-day/client-calendar-day"
import { GIVER_CASUAL_NAVY, GIVER_CASUAL_NAVY_40, SHADOW_1 } from "#theme"
import { POPPINS_REGULAR } from "#fonts"

interface ClientCalendarProps {
  style: ViewStyle
  selectedDate: string
  onDayPress: (date: any) => void
  dateRange: DateData[]
}

export const ClientCalendar = observer(function CgCalendar(props: ClientCalendarProps) {
  const { style, selectedDate, onDayPress: onDayPressProp, dateRange } = props

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
              dateRange={dateRange}
            />
          </Pressable>
        )}
        style={[styles.calendar, SHADOW_1]}
      />
    </View>
  )
})

const styles = StyleSheet.create({
  arrow: {
    width: 18,
    height: 18,
  },

  calendar: {
    borderColor: GIVER_CASUAL_NAVY_40,
    borderWidth: 2,
    borderRadius: 10,
    width: 358,
    height: "auto",
    paddingBottom: 6,
    zIndex: 1,
  },
})
