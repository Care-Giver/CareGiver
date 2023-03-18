import React, { FC, useCallback, useEffect, useMemo, useRef, useState } from "react"
import { View, Text, StyleSheet, Platform, Pressable } from "react-native"
import { observer } from "mobx-react-lite"
import { StackScreenProps } from "@react-navigation/stack"
import { NavigatorParamList } from "#navigators"
import { DivisionLine, PreReg14, PreReg16, PreReg32, ScreenRootView, TimePicker } from "#components"
import BottomSheet from "@gorhom/bottom-sheet"
import RNDateTimePicker from "@react-native-community/datetimepicker"
import { GIVER_CASUAL_NAVY, MIDDLE_LINE } from "#theme"

export const TestBottomSheetScreen: FC<
  StackScreenProps<NavigatorParamList, "test-bottom-sheet">
> = observer(function TestBottomSheetScreen() {
  // const month = _month < 10 ? "0" + (_month + 1).toString() : "0" + _month.toString()
  const NOW = new Date()
  const YEAR = NOW.getFullYear()
  const MONTH = NOW.getMonth()
  const DATE = NOW.getDate()
  const NOW_TIME = NOW
  const NOW_TIME_5MINUTE_INTERVAL = new Date(
    YEAR,
    MONTH,
    DATE,
    NOW.getHours(),
    parseInt(NOW.getMinutes() / 5) * 5,
    0,
  )

  const LAST_TIME_OF_THE_DAY = new Date(YEAR, MONTH, DATE, 23, 50, 0)
  // const END_TIME = new Date(YEAR, MONTH, date, 23, 50, 0)

  const [mode, setMode] = useState<"BEGIN" | "END">("BEGIN")

  const [beginTime, setBeginTime] = useState<Date>(NOW_TIME)
  const [endTime, setEndTime] = useState<Date>(LAST_TIME_OF_THE_DAY)
  const [selectedTimes, setSelectedTimes] = useState({ beginTime: beginTime, toTime: endTime })

  useEffect(() => {
    setBeginTime(beginTime < NOW_TIME ? NOW_TIME : beginTime)
  }, [beginTime])

  useEffect(() => {
    setEndTime(beginTime < endTime ? endTime : beginTime)
  }, [endTime])

  console.log("NOW", NOW)
  // ref
  const bottomSheetRef = useRef<BottomSheet>(null)

  // variables
  const snapPoints = useMemo(() => ["25%", "50%"], [])

  // callbacks
  const handleSheetChanges = useCallback((index: number) => {
    console.log("handleSheetChanges", index)
  }, [])

  const isIOS = Platform.OS === "ios"
  const diffInMs = Math.abs(endTime - beginTime)
  const diffInMinutes = diffInMs / (1000 * 60)

  const INTERVAL_HOURS = Math.floor(diffInMinutes / 60)
  const INTERVAL_MINUTES = Math.floor(diffInMinutes % 60)
  const diffInHours = diffInMs / (1000 * 60 * 60)

  console.log("NOW", NOW)
  console.log("NOW_TIME_5MINUTE_INTERVAL", NOW_TIME_5MINUTE_INTERVAL)

  console.log(
    "🚀 ~ file: test-bottom-sheet-screen.tsx:64 ~ TestBottomSheetScreen ~ diffInMinutes:",
    diffInMinutes,
  )

  console.log("diffInMs", diffInMs)
  console.log("diffInHours", diffInHours)
  console.log("diffInMinutes", diffInMinutes)

  const addZeroString = (time: number) => (time < 10 ? "0" + +time : +time)

  const BEGIN_TIME_TEXT: string = beginTime
    ? `${addZeroString(beginTime.getHours())}:${addZeroString(beginTime.getMinutes())}`
    : "00:00"
  const END_TIME_TEXT: string = endTime
    ? `${addZeroString(endTime.getHours())}:${addZeroString(endTime.getMinutes())}`
    : "00:00"

  return (
    <ScreenRootView
      testID="TestBottomSheet"
      preset="fixed"
      style={{ backgroundColor: "lightgrey" }}
    >
      <TimePicker />
      {/* <BottomSheet
        ref={bottomSheetRef}
        index={0}
        // snapPoints={snapPoints}
        snapPoints={["60%"]}
        // onChange={handleSheetChanges}
      >
        <View style={{ flex: 1, backgroundColor: "orange" }}>
          <View
            style={{
              paddingHorizontal: 50,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                backgroundColor: "yellow",
              }}
            >
              <Pressable onPress={() => setMode("BEGIN")}>
                <PreReg14
                  text="시작"
                  color={mode === "BEGIN" ? GIVER_CASUAL_NAVY : MIDDLE_LINE}
                  mb={10}
                />
                <PreReg32
                  text={BEGIN_TIME_TEXT}
                  color={mode === "BEGIN" ? GIVER_CASUAL_NAVY : MIDDLE_LINE}
                />
                <DivisionLine
                  color={mode === "BEGIN" ? GIVER_CASUAL_NAVY : MIDDLE_LINE}
                  height={mode === "BEGIN" ? 2 : 1}
                  style={{ width: "130%" }}
                />
              </Pressable>

              <Pressable onPress={() => setMode("END")}>
                <PreReg14
                  text="끝"
                  color={mode === "END" ? GIVER_CASUAL_NAVY : MIDDLE_LINE}
                  mb={10}
                />
                <PreReg32
                  text={END_TIME_TEXT}
                  color={mode === "END" ? GIVER_CASUAL_NAVY : MIDDLE_LINE}
                />
                <DivisionLine
                  color={mode === "END" ? GIVER_CASUAL_NAVY : MIDDLE_LINE}
                  height={mode === "END" ? 2 : 1}
                  style={{ width: "130%" }}
                />
              </Pressable>
            </View>

            <PreReg16 text={`▶ 총 ${INTERVAL_HOURS}시간 ${INTERVAL_MINUTES}분`} mv={20} />
          </View>

          {isIOS ? (
            //* iOS
            <View style={styles.contentContainer}>
              {mode === "BEGIN" ? (
                <RNDateTimePicker
                  display="spinner"
                  mode="time"
                  is24Hour
                  //? 선택한 시작시간(beginTime)이 현재시간(NOW_TIME) 보다 이전이면, 현재시간을 시작시간으로 강제한다
                  value={beginTime}
                  minuteInterval={5}
                  onChange={(event, time) => setBeginTime(time)}
                  style={{ width: "100%", height: "100%", backgroundColor: "pink" }}
                />
              ) : (
                <RNDateTimePicker
                  display="spinner"
                  mode="time"
                  is24Hour
                  value={endTime}
                  minuteInterval={5}
                  onChange={(event, time) => setEndTime(time)}
                  style={{ width: "100%", height: "100%", backgroundColor: "pink" }}
                />
              )}
            </View>
          ) : (
            //* Android
            <View style={styles.contentContainer}>
              <RNDateTimePicker
                display="spinner"
                mode="time"
                is24Hour
                //? 선택한 시작시간(beginTime)이 현재시간(NOW_TIME) 보다 이전이면, 현재시간을 시작시간으로 강제한다
                value={beginTime ? (beginTime < NOW_TIME ? NOW_TIME : beginTime) : NOW_TIME}
                minuteInterval={5}
                onChange={(event, date) => setBeginTime(date)}
              />
            </View>
          )}
        </View>
      </BottomSheet> */}
    </ScreenRootView>
  )
})

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "tomato",
  },
})
