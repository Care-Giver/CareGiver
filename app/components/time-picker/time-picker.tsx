import React, { Dispatch, SetStateAction, useEffect, useState } from "react"
import { View, StyleSheet, ViewStyle, StyleProp, Pressable } from "react-native"
import { observer } from "mobx-react-lite"
import { DivisionLine, PreReg14, PreReg16, PreReg32 } from "#components"
import { GIVER_CASUAL_NAVY, MIDDLE_LINE } from "#theme"
import DatePicker from "react-native-date-picker"

// Calculate the number of minutes passed since the start of the hour
const now = new Date()
const minutesPassed = now.getMinutes()

// Calculate how many minutes remain to reach the nearest multiple of 5
const remainder = minutesPassed % 5

// Subtract the remainder from the current minutes to get the nearest past time in 5-minute intervals
const nearestPastTime = new Date(now)

// 지금 시간으로 부터 가장 가까운 5분단위 과거 시간
nearestPastTime.setMinutes(minutesPassed - remainder)
// console.log(nearestPastTime)

const MODE_PRESSABLE_WIDTH = 114

type Mode = "BEGIN" | "END"

export interface TimePickerProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>

  beginDate: Date
  setBeginDate: Dispatch<SetStateAction<Date>>
  endDate: Date
  setEndDate: Dispatch<SetStateAction<Date>>
}

export const TimePicker = observer(function TimePicker(props: TimePickerProps) {
  const { style, beginDate, setBeginDate, endDate, setEndDate } = props
  const _styles = Object.assign({}, styles.container, style)

  const [mode, setMode] = useState<Mode>("BEGIN")

  useEffect(() => {
    setBeginDate(nearestPastTime)
    setEndDate(nearestPastTime)
  }, [])

  useEffect(() => {
    // console.log("beginDate >>>", beginDate)
    // console.log("endDate >>>", endDate)
    // console.log("beginDate >>>", timeText(beginDate))
    // console.log("endDate >>>", timeText(endDate))

    if (endDate < beginDate) {
      setEndDate(beginDate)
    }
  }, [beginDate, endDate])

  const timeText = (time: Date) => {
    const hours = time.getHours()
    const minute = time.getMinutes()
    return `${hours.toString().padStart(2, "0")}:${minute.toString().padStart(2, "0")}`
  }

  const differenceInMinutes = (begin: Date, end: Date) => {
    let diff = (end.getTime() - begin.getTime()) / 1000
    diff /= 60
    return Math.abs(Math.round(diff))
  }

  const diff = differenceInMinutes(beginDate, endDate)
  const INTERVAL_HOURS = Math.floor(diff / 60)
  const INTERVAL_MINUTES = diff % 60

  return (
    <View style={_styles}>
      {/* Indicator Text Area */}
      <View
        style={{
          paddingHorizontal: 50,
        }}
      >
        <View
          style={{
            width: "100%",
            flexDirection: "row",
            // backgroundColor: "yellow",
          }}
        >
          <Pressable onPress={() => setMode("BEGIN")} style={{ width: MODE_PRESSABLE_WIDTH }}>
            <PreReg14
              text="시작"
              color={mode === "BEGIN" ? GIVER_CASUAL_NAVY : MIDDLE_LINE}
              mb={10}
            />
            <PreReg32
              text={timeText(beginDate)}
              color={mode === "BEGIN" ? GIVER_CASUAL_NAVY : MIDDLE_LINE}
            />
            <DivisionLine
              color={mode === "BEGIN" ? GIVER_CASUAL_NAVY : MIDDLE_LINE}
              height={mode === "BEGIN" ? 2 : 1}
              style={{ width: "100%" }}
            />
          </Pressable>

          <Pressable
            onPress={() => setMode("END")}
            style={{ width: MODE_PRESSABLE_WIDTH, marginLeft: "auto" }}
          >
            <PreReg14 text="끝" color={mode === "END" ? GIVER_CASUAL_NAVY : MIDDLE_LINE} mb={10} />
            <PreReg32
              text={timeText(endDate)}
              color={mode === "END" ? GIVER_CASUAL_NAVY : MIDDLE_LINE}
            />
            <DivisionLine
              color={mode === "END" ? GIVER_CASUAL_NAVY : MIDDLE_LINE}
              height={mode === "END" ? 2 : 1}
              style={{ width: "100%" }}
            />
          </Pressable>
        </View>
        <PreReg16 text={`▶ 총 ${INTERVAL_HOURS}시간 ${INTERVAL_MINUTES}분`} mv={20} />
      </View>

      {/* Time Picker Area */}
      <View style={styles.pickerContainer}>
        {mode === "BEGIN" && (
          <DatePicker
            date={beginDate}
            onDateChange={setBeginDate}
            mode="time"
            minuteInterval={5}
            textColor="black"
          />
        )}

        {mode === "END" && (
          <DatePicker
            date={endDate}
            onDateChange={setEndDate}
            mode="time"
            minuteInterval={5}
            textColor="black"
          />
        )}
      </View>
    </View>
  )
})

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor: "orange",
  },
  pickerContainer: {
    flexDirection: "row",
    alignSelf: "center",
    backgroundColor: "white",
  },
})
