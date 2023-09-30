/**
 * DatePicker 는 기본적으로, 디바이스의 시간대를 기준으로 시간을 표시한다.
 * 그러나, 이미 부모 컴포넌트에서 디바이스 시간대를 기준으로 연산하여
 * props 를 넘겨주기 때문에, DatePicker 의 기본 설정은 이중 연산을 하게 된다.
 * 따라서, timeZoneOffsetInMinutes 를 0 으로 설정하여,
 * DatePicker 컴포넌트가 UTC+0 을 기준으로 연산하도록 변경하여, 이중 연산을 방지한다.
 */
import React, { Dispatch, SetStateAction, useEffect, useState } from "react"
import { View, StyleSheet, ViewStyle, StyleProp, Pressable } from "react-native"
import { observer } from "mobx-react-lite"
import { DivisionLine, PreReg14, PreReg16, PreReg32 } from "#components"
import { GIVER_CASUAL_NAVY, MIDDLE_LINE } from "#theme"
import DatePicker from "react-native-date-picker"
import dayjs from "dayjs"
import { addMinutes, setMinutes, endOfToday } from "date-fns"

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

/** Date 시간객체를 "HH:MM" 꼴의 string 으로 변환합니다. */
export const timeText = (time: Date) => {
  const hours = time.getUTCHours()
  const minute = time.getUTCMinutes()
  return `${hours.toString().padStart(2, "0")}:${minute.toString().padStart(2, "0")}`
}

export const TimePicker = observer(function TimePicker(props: TimePickerProps) {
  const { style, beginDate, setBeginDate, endDate, setEndDate } = props
  const allStyles = Object.assign({}, styles.root, style)
  const nowInUTCZero = new Date()
  const localTimeEndOfToday = addMinutes(endOfToday(), -1 * nowInUTCZero.getTimezoneOffset())

  const [mode, setMode] = useState<Mode>("BEGIN")

  console.log("endDate", endDate)

  /** 선택한 시간이 바뀔때마다 핸들링 */
  useEffect(() => {
    const oneHourAfterBeginDate = dayjs(beginDate).clone().add(1, "hour").toDate()

    /** 끝 시간이 오늘을 넘어가면, 끝시간으로 오늘 23:55 를 강제 */
    if (endDate > localTimeEndOfToday) {
      setEndDate(setMinutes(localTimeEndOfToday, 55))
      //
    } else if (
      /**
       * 끝 시간이
       * "시작시간보다 이전" 이거나,
       * "시작시간보다 1시간 이후보다 이전"이면,
       * 끝 시간을 시작시간보다 1시간 이후로 강제
       */
      endDate <= beginDate ||
      (endDate < oneHourAfterBeginDate && endDate.getHours() !== 23 && endDate.getMinutes() !== 55)
    ) {
      setEndDate(oneHourAfterBeginDate)
      //
    }
  }, [beginDate, endDate])

  const differenceInMinutes = (begin: Date, end: Date) => {
    let diff = (end.getTime() - begin.getTime()) / 1000
    diff /= 60
    return Math.abs(Math.round(diff))
  }

  const diff = differenceInMinutes(beginDate, endDate)
  const INTERVAL_HOURS = Math.floor(diff / 60)
  const INTERVAL_MINUTES = diff % 60

  return (
    <View style={allStyles}>
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
            timeZoneOffsetInMinutes={0} // UTC+0 을 기준으로 연산하도록 변경
            date={beginDate}
            onDateChange={setBeginDate}
            mode="time"
            minuteInterval={5}
            textColor="black"
          />
        )}

        {mode === "END" && (
          <DatePicker
            timeZoneOffsetInMinutes={0} // UTC+0 을 기준으로 연산하도록 변경
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
  root: {
    // flex: 1,
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
