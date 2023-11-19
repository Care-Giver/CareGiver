import React from "react"
import { StyleSheet, View, Image, ViewStyle, Platform } from "react-native"
import { observer } from "mobx-react-lite"
import { Calendar, DateData } from "react-native-calendars"
import { images } from "#images"
import "./localeConfig"
import { ClientCalendarDay } from "./client-calendar-day/client-calendar-day"
import { GIVER_CASUAL_NAVY, GIVER_CASUAL_NAVY_40, SHADOW_1 } from "#theme"
import { POPPINS_SEMIBOLD } from "#fonts"

interface ClientCalendarProps {
  style: ViewStyle
  selectedDate: string
  onDayPress: (date: any) => void
  dateRange: DateData[]
}

export const ClientCalendar = observer(function CgCalendar(props: ClientCalendarProps) {
  const { style, selectedDate, onDayPress: onDayPressProp, dateRange } = props
  const $allStyles = Object.assign({}, styles.root, style)
  return (
    <View style={$allStyles}>
      <Calendar
        headerStyle={{ height: 94, marginBottom: 0, marginTop: -5 }}
        renderArrow={(direction) => (
          <Image
            source={direction === "left" ? images.arrow_left_navy : images.arrow_right_navy}
            style={[styles.arrow, direction === "left" ? { marginLeft: 40 } : { marginRight: 40 }]}
          />
        )}
        monthFormat={"MMMM"}
        theme={{
          textMonthFontFamily: POPPINS_SEMIBOLD,
          textMonthFontWeight: Platform.select({ ios: "bold", android: null }),
          monthTextColor: GIVER_CASUAL_NAVY,
          textMonthFontSize: 20,
        }}
        dayComponent={({ date, state }) => (
          <ClientCalendarDay
            onPress={() => {
              onDayPressProp(date)
            }}
            date={date}
            state={state}
            selected={selectedDate}
            dateRange={dateRange}
          />
        )}
        style={[styles.calendar, SHADOW_1]}
      />
    </View>
  )
})

const styles = StyleSheet.create({
  root: {
    width: "100%",
  },
  arrow: {
    width: 18,
    height: 18,
  },
  calendar: {
    borderColor: GIVER_CASUAL_NAVY_40,
    borderWidth: 2,
    borderRadius: 10,
    width: "100%",
    height: "auto",
    paddingBottom: 6,
    zIndex: 1,
  },
})
