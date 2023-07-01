import React, { Dispatch, SetStateAction, useEffect, useState } from "react"
import { View, StyleSheet, ViewStyle, StyleProp, Pressable } from "react-native"
import { observer } from "mobx-react-lite"
import { DivisionLine, PreReg14, PreReg16, PreReg32 } from "#components"
import { GIVER_CASUAL_NAVY, MIDDLE_LINE } from "#theme"
import DatePicker from "react-native-date-picker"

const MODE_PRESSABLE_WIDTH = 114

type Mode = "BEGIN" | "END"

interface TimePickerProps {
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

  // 선택한 시간이 바뀔때마다 핸들링
  useEffect(() => {
    const oneHourLaterFromBegin = new Date(beginDate.getTime() + 60 * 60 * 1000)

    // 끝 시간이 시작시간보다 이전이면, 무조건 시작시간보다 1시간뒤로 강제
    if (endDate <= beginDate) {
      setEndDate(oneHourLaterFromBegin)
    }
    // 끝 시간이 "시작시간보다 1시간 후" 보다 이전이면, 무조건 시작시간보다 1시간뒤로 강제
    else if (endDate < oneHourLaterFromBegin) {
      setEndDate(oneHourLaterFromBegin)
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
