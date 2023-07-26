import React, { useEffect, useState } from "react"
import { StyleProp, View, Image, Text, ViewStyle, Pressable } from "react-native"
import { observer } from "mobx-react-lite"
import { Calendar, DateData, LocaleConfig } from "react-native-calendars"
import { images } from "#images"
import { styles } from "./styles"
import { CgCalendarProps } from "./cg-calendar.props"
import "./localeConfig"
import { CgCalendarDay } from "./cg-calendar-day/cg-calendar-day"
import { GIVER_CASUAL_NAVY, SHADOW_1 } from "#theme"
import { POPPINS_REGULAR } from "#fonts"
import { CgCalendarEditButton } from "../buttons/cg-calendar-edit-button/cg-calendar-edit-button"

export const CgCalendar = observer(function CgCalendar(props: CgCalendarProps) {
  const { dates, serviceType, selected, setSelected } = props
  const hasDates = dates?.length !== 0

  //* serviceType == "위탁"일 때 startDate와 endDate 관리
  const [crecheStartToggle, setCrecheStartToggle] = useState(false)
  const [crecheEndToggle, setCrecheEndToggle] = useState(false)
  const [startDate, setStartDate] = useState(null)
  const [endDate, setEndDate] = useState(null)
  const [currentMonth, setCurrentMonth] = useState(new Date()) //calendar-day component를 rerendering하기 위해 전달하는 param

  useEffect(() => {
    if (serviceType == "위탁") {
      if (crecheStartToggle == true && crecheEndToggle == false) {
        const newStartDate = new Date(selected)
        //? 다른 주기를 선택해야할 때 endDate가 남아있어서 null처리
        if (endDate != null) {
          setEndDate(null)
        }
        setStartDate(newStartDate)
      }
      if (crecheStartToggle == false && crecheEndToggle == true) {
        const newEndDate = new Date(selected)
        setEndDate(newEndDate)
      }
    }
  }, [crecheStartToggle, crecheEndToggle])

  //console.log("serviceType in CgCalendar >>>", serviceType)
  //console.log("dates in CgCalendar >>>", dates)
  //console.log("♦️")

  const onDayPress = ({ date }) => {
    setSelected(date.dateString)
    if (crecheStartToggle == false) {
      setCrecheStartToggle(!crecheStartToggle)
      if (crecheEndToggle == true) {
        setCrecheEndToggle(false)
      }
    } else {
      setCrecheEndToggle(!crecheEndToggle)
      setCrecheStartToggle(!crecheStartToggle)
    }

    //console.log(currentMonth)
  }

  return (
    <View>
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
          <Pressable onPress={(e) => onDayPress({ date })}>
            {hasDates && (
              <CgCalendarDay
                date={date}
                state={state}
                selected={selected}
                dates={dates}
                month={currentMonth}
                serviceType={serviceType}
                startDate={startDate}
                endDate={endDate}
              />
            )}
          </Pressable>
        )}
        style={[styles.calendar, SHADOW_1]}
      />
    </View>
  )
})
