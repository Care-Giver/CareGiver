import React, { Dispatch, SetStateAction, useCallback } from "react"
import { StyleProp, View, Image, ViewStyle } from "react-native"
import { observer } from "mobx-react-lite"
import { Calendar } from "react-native-calendars"
import { images } from "#images"
import { styles } from "./styles"
import "./localeConfig"
import { CgCalendarDay } from "./cg-calendar-day/cg-calendar-day"
import { GIVER_CASUAL_NAVY, SHADOW_1 } from "#theme"
import { POPPINS_REGULAR } from "#fonts"
import { CrecheAvailableDate, GroupedVisitingAvailableTimesByDate } from "#axios"
import { ServiceTypeKorean, useStores } from "#models"
import _ from "lodash"
import dayjs from "dayjs"

const now = new Date()
const today = dayjs()
  .year(now.getFullYear())
  .month(now.getMonth())
  .date(now.getDate())
  .hour(0)
  .minute(0)
  .second(0)
  .millisecond(0)
  .toDate()

export interface CgCalendarProps {
  serviceTypeKorean: ServiceTypeKorean
  selectedDates: string[] // 임시 type, TODO: 선택된 날짜(들)을 담을 수 있는 적절한 타입으로 변경해야 함
  setSelectedDates: Dispatch<SetStateAction<string[]>> // 임시 type
  availableDates: Array<GroupedVisitingAvailableTimesByDate | CrecheAvailableDate>
  style?: StyleProp<ViewStyle>
}

export const CgCalendar = observer(function CgCalendar(props: CgCalendarProps) {
  const {
    petsitterStore: { petsitter },
  } = useStores()

  const { availableDates, serviceTypeKorean, selectedDates, setSelectedDates, style } = props
  const hasAvailableDates = availableDates?.length !== 0
  const key = serviceTypeKorean === "방문" ? "date" : "startDate"

  const checkAvailableDate = useCallback(
    (dateString: string) => {
      let isAvailableDate = false
      let fee = null

      availableDates.forEach((availableDate) => {
        if (dateString === availableDate[key].substring(0, 10)) {
          isAvailableDate = true
          fee = availableDate.fee
        }
      })
      return [isAvailableDate, fee]
    },
    [availableDates, key],
  )

  const onDayPress = async (pressedDay: string, isAvailableDate: boolean) => {
    // 중복클릭시, 선택해제
    if (selectedDates.includes(pressedDay)) {
      setSelectedDates(selectedDates.filter((selected) => selected !== pressedDay))
      return
    }

    // 선택한 날짜가 서비스 가능한 날짜라면 복수선택이 불가능 하다.
    if (isAvailableDate) {
      setSelectedDates([pressedDay])
      return
    }

    // 선택한 날짜가 서비스 가능한 날짜가 아니면, 복수선택이 가능하므로 해당 날짜를 추가한다.
    setSelectedDates([
      //! 서비스 가능 날짜를 이전에 선택했다면, 제외시킨다.
      ...selectedDates.filter(
        (selectedDate) => !availableDates.map((item) => item[key]).includes(selectedDate),
      ),
      // 선택한 날짜 추가
      pressedDay,
    ])
  }

  const $allStyles = Object.assign({}, styles.root, style)
  return (
    <View style={$allStyles}>
      <Calendar
        onMonthChange={(props) => {
          // console.log("props", props)
          // TODO : 날짜가 바뀔때마다, availableDates 를 pagination 하여 재 호출 하기
        }}
        style={[styles.calendar, SHADOW_1]}
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
        dayComponent={({ date, state }) => {
          let isAvailableDate = false
          let fee = null
          if (hasAvailableDates) {
            const [_isAvailableDate, _fee] = checkAvailableDate(date.dateString)
            isAvailableDate = _isAvailableDate
            fee = _fee
          }
          const textDecorationLine = isAvailableDate
            ? "none"
            : new Date(date.dateString) >= today
            ? "line-through"
            : "none"
          return (
            <CgCalendarDay
              date={date}
              state={state}
              selected={selectedDates}
              onPress={() => {
                // 이미 지난 날짜들은 수정이 불가능하므로, selectedDates 로직에서 제외시킨다.
                if (new Date(date.dateString) < today) {
                  return
                }

                onDayPress(date.dateString, isAvailableDate)
              }}
              textDecorationLine={textDecorationLine}
              isAvailableDate={isAvailableDate}
              totalFee={isAvailableDate && petsitter.defaultFee + fee}
            />
          )
        }}
      />
    </View>
  )
})
