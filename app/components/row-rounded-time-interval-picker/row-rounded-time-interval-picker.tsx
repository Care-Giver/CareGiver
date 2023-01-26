import React, { useState, useEffect } from "react"
import { Image, Pressable, Text, View, ViewProps } from "react-native"
import { styles } from "./styles"
import { PopReg16, PopSem16, PreReg16 } from "../basics/custom-texts/custom-texts"
import RNDateTimePicker from "@react-native-community/datetimepicker"
import { Row } from "../basics/row/row"

import { RowRoundedBox } from "../basics/row-rounded-box/row-rounded-box"

export const RowRoundedTimeIntervalPicker = (props) => {
  const { style, platform } = props

  const now = new Date()
  const year = now.getFullYear()
  const _month = now.getMonth()
  // const month = _month < 10 ? "0" + (_month + 1).toString() : "0" + _month.toString()
  const date = now.getDate()
  const NOW_TIME = now
  const TO_TIME = new Date(year, _month, date, 23, 50, 0)

  const [fromTime, setFromTime] = useState(false)
  const [toTime, setToTime] = useState(false)
  const [selectedTimes, setSelectedTimes] = useState({ fromTime: fromTime, toTime: toTime })

  useEffect(() => {
    fromTime < toTime
      ? setSelectedTimes({ fromTime: fromTime, toTime: toTime })
      : fromTime && toTime && alert("종료시간이 시작시간보다 나중이어야 합니다")
  }, [fromTime, toTime])

  return (
    <RowRoundedBox style={style}>
      {/* //* ios 인 경우 */}
      {platform === "ios" && (
        <Row style={{ justifyContent: "space-evenly" }}>
          <RNDateTimePicker
            mode="time"
            //? 선택한 시작시간(fromTime)이 현재시간(NOW_TIME) 보다 이전이면, 현재시간을 시작시간으로 강제한다
            value={fromTime ? (fromTime < NOW_TIME ? NOW_TIME : fromTime) : NOW_TIME}
            style={{ width: 90, height: 40 }}
            // display="inline"
            minuteInterval={5}
            onChange={(event, date) => setFromTime(date)}
          />

          <PopSem16 text="﹣" />

          {fromTime === false ? (
            <View
              style={{
                width: 90,
                height: 40,
              }}
            />
          ) : (
            <RNDateTimePicker
              mode="time"
              //? 선택한 종료시간(toTime)이 시작시간(fromTime) 보다 이전이면, 시작시간을 종료시간으로 강제한다
              value={toTime ? (fromTime < toTime ? toTime : fromTime || NOW_TIME) : TO_TIME}
              // value={toTime || TO_TIME}
              style={{
                width: 90,
                height: 40,
              }}
              onChange={(event, date) => setToTime(date)}
              disabled={fromTime === false}
            />
          )}
        </Row>
      )}

      {/* //* android 인 경우 */}
      {platform === "android" && (
        <Row style={{ justifyContent: "space-evenly" }}>
          {/* <RNDateTimePicker
            mode="time"
            //? 선택한 시작시간(fromTime)이 현재시간(NOW_TIME) 보다 이전이면, 현재시간을 시작시간으로 강제한다
            value={fromTime ? (fromTime < NOW_TIME ? NOW_TIME : fromTime) : NOW_TIME}
            style={{ width: 90, height: 40 }}
            // display="inline"
            minuteInterval={5}
            onChange={(event, date) => setFromTime(date)}
            //? 안드로이드만
            is24Hour={false}
            renderToHardwareTextureAndroid={true}
          /> */}

          <PopReg16 text="Time Picker for Android is not ready" />

          {/* <RNDateTimePicker
            mode="time"
            value={toTime || TO_TIME}
            style={{ width: 90, height: 40 }}
            onChange={(event, date) => setToTime(date)}
            //? 안드로이드만
            is24Hour={false}
            renderToHardwareTextureAndroid={true}
          /> */}
        </Row>
      )}
    </RowRoundedBox>
  )
}
