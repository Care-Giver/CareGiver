import React, { useState, useEffect, useRef, useMemo, Dispatch, SetStateAction } from "react"
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Image,
  StyleProp,
  ViewStyle,
} from "react-native"
import {
  format,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isToday,
  subMonths,
  addMonths,
  getMonth,
  isEqual,
} from "date-fns"
import { ko } from "date-fns/locale"
import { DISABLED, GIVER_CASUAL_NAVY, LBG, WIDTH } from "#theme"
import { images } from "#images"
import { PopSem14, PreBol20, PreMed18, PreReg12, PreBol14, PopReg14 } from "#components"
import { alertModal } from "../../../utils/alert-modal"
import { observer } from "mobx-react-lite"

const MULTIPLY_5_PADDING = 30
const screenWidth = Math.floor((Dimensions.get("window").width - MULTIPLY_5_PADDING) / 5) * 5
const itemWidth = screenWidth / 5
const itemHeight = itemWidth

export type DateInfo = {
  date: string //  "12";
  dayName: string // "화";
  fullDate: string //  "2024-02-12T11:00:00.000Z";
  isToday: boolean // true
}

interface CalendarComponentProps {
  /**
   * @description 현재 선택된 날짜 정보. `DateInfo` 타입을 가지며, 날짜, 요일명, 전체 날짜 문자열, 오늘이면 true 값을 포함한다.
   */
  selectedDate: DateInfo

  /**
   * @description 선택된 날짜를 설정하는 함수. `DateInfo` 타입의 상태를 업데이트한다.
   */
  setSelectedDate: Dispatch<SetStateAction<DateInfo>>

  /**
   * @description 현재 보여지는 달력의 월. `Date` 타입을 사용한다.
   */
  month: Date

  /**
   * @description 달력에서 보여질 월을 설정하는 함수. `Date` 타입의 상태를 업데이트한다.
   */
  setMonth: Dispatch<SetStateAction<Date>>

  /**
   * @description 현재로부터 최대 몇 개월 전까지 달력을 조회할 수 있는지 지정한다. 기본값은 6개월이다.
   * @default 6
   */
  maxMonthsAgo?: number

  /**
   * @description 현재로부터 최대 몇 개월 후까지 달력을 조회할 수 있는지 지정한다. 기본값은 6개월이다.
   * @default 6
   */
  maxMonthsAhead?: number

  /**
   * @description 연도를 표시할지 여부를 결정한다. 기본값은 true이다.
   * @default true
   */
  showYear?: boolean

  /**
   * @description 날짜를 표시할지 여부를 결정한다. 기본값은 true이다.
   * @default true
   */
  showDates?: boolean

  /**
   * @description 달력 컴포넌트에 적용할 스타일. `ViewStyle` 타입을 사용한다.
   */
  style?: StyleProp<ViewStyle>
}
const CalendarComponent = observer(function CalendarComponent(props: CalendarComponentProps) {
  const {
    selectedDate,
    setSelectedDate,
    month,
    setMonth,
    maxMonthsAgo = 6,
    maxMonthsAhead = 6,
    showYear = true,
    showDates = true,
    style,
  } = props

  const [dates, setDates] = useState([])
  const [todayIndex, setTodayIndex] = useState<number>(null)
  const [currentMonthNumber, setCurrentMonthNumber] = useState<number>(null)

  const flatListRef = useRef<FlatList>(null)

  useEffect(() => {
    const generateDatesForMonth = (month) => {
      const start = startOfMonth(month)
      const end = endOfMonth(month)
      const allDates = eachDayOfInterval({ start, end }).map<DateInfo>((day) => ({
        date: format(day, "d", { locale: ko }),
        dayName: format(day, "EEE", { locale: ko }),
        isToday: isToday(day),
        //@ts-ignore
        fullDate: day,
      }))
      setDates(allDates)

      // Automatically select today's date on month generation if it exists
      const todayIndex = allDates.findIndex((date) => date.isToday)
      if (todayIndex >= 0) {
        setSelectedDate(allDates[todayIndex])
        setTodayIndex(todayIndex)
        setCurrentMonthNumber(getMonth(month))
      }
    }

    generateDatesForMonth(month)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [month])

  useEffect(() => {
    // Check if dates array is populated and todayIndex is set
    if (dates.length > 0 && todayIndex !== null && getMonth(month) === currentMonthNumber) {
      setTimeout(() => {
        scrollToIndex(todayIndex)
      }, 1000)
    }
    // // When the month changes, scroll to the first item
    // else if (dates.length > 0) {
    //   scrollToIndex(0)
    // }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentMonthNumber, dates, month, todayIndex]) // Depend on dates and todayIndex

  const isWithinRange = (date, currentDate = new Date()) => {
    const nMonthsAgo = subMonths(currentDate, maxMonthsAgo)
    const nMonthsAhead = addMonths(currentDate, maxMonthsAhead)
    return date >= nMonthsAgo && date <= nMonthsAhead
  }

  const handlePrevMonth = () => {
    setMonth((prevMonth) => {
      const newMonth = startOfMonth(subMonths(prevMonth, 1))
      if (isWithinRange(newMonth)) {
        return newMonth
      }
      alertModal(`과거 ${maxMonthsAgo}개월까지 조회 가능합니다.`, "")
      return prevMonth // Return current month if new month is out of range
    })
  }

  const handleNextMonth = () => {
    setMonth((prevMonth) => {
      const newMonth = startOfMonth(addMonths(prevMonth, 1))
      if (isWithinRange(newMonth)) {
        return newMonth
      }
      alertModal(`앞으로 ${maxMonthsAhead}개월까지 조회 가능합니다.`, "")
      return prevMonth // Return current month if new month is out of range
    })
  }

  const handleDateSelect = (date, index) => {
    setSelectedDate(date)
    scrollToIndex(index)
  }

  const scrollToIndex = (index) => {
    // Ensure the index is within the bounds of the dates array
    if (index >= 0 && index < dates.length) {
      flatListRef.current?.scrollToIndex({
        animated: true,
        index: index,
        viewPosition: 0.5, // Centers the item in the view
      })
    }
  }

  const allStyles = Object.assign({}, styles.root, style)

  return (
    <View style={allStyles}>
      {/* 연도 */}
      {showYear && (
        <PopSem14
          text={format(month, "yyyy", { locale: ko })}
          style={{ alignSelf: "center" }}
          color={GIVER_CASUAL_NAVY}
        />
      )}
      {/* 월 */}
      <View style={styles.monthRow}>
        <View style={{ ...styles.monthBox, alignItems: "flex-start" }}>
          <PreMed18 text={format(subMonths(month, 1), "MMM", { locale: ko })} color={DISABLED} />
        </View>
        <View
          style={{
            ...styles.monthBox,
            flexDirection: "row",
            zIndex: 2,
          }}
        >
          <TouchableOpacity onPress={handlePrevMonth} hitSlop={4}>
            <Image source={images.arrow_left_navy} style={{ width: 18, height: 18 }} />
          </TouchableOpacity>
          <PreBol20
            text={format(month, "MMM", { locale: ko })}
            color={GIVER_CASUAL_NAVY}
            style={{ paddingHorizontal: 24 * WIDTH }}
          />
          <TouchableOpacity onPress={handleNextMonth} hitSlop={4}>
            <Image source={images.arrow_right_navy} style={{ width: 18, height: 18 }} />
          </TouchableOpacity>
        </View>
        <View style={{ ...styles.monthBox, alignItems: "flex-end" }}>
          <PreMed18 text={format(addMonths(month, 1), "MMM", { locale: ko })} color={DISABLED} />
        </View>
      </View>
      {/* 일 */}
      {showDates && (
        <FlatList
          ref={flatListRef}
          data={dates}
          horizontal
          showsHorizontalScrollIndicator={false}
          onScrollToIndexFailed={(e) => {
            console.log("♦️♦️♦️ FAILED:", e)
            flatListRef.current?.scrollToIndex({
              animated: true,
              index: 0,
              viewPosition: 0.5,
            })
          }}
          snapToInterval={itemWidth}
          decelerationRate="fast"
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={{
            paddingHorizontal: (screenWidth - itemWidth) / 2, // Center the initial and final items
          }}
          renderItem={({ item, index }) => (
            <DayComponent
              date={item.date}
              dayName={item.dayName}
              isToday={item.isToday}
              //@ts-ignore
              isSelected={isEqual(item.fullDate, selectedDate.fullDate)}
              onPress={() => handleDateSelect(item, index)}
            />
          )}
        />
      )}
    </View>
  )
})

const styles = StyleSheet.create({
  root: {
    width: screenWidth,
    alignSelf: "center",
  },
  monthRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 40 * WIDTH,
    marginTop: 10,
    marginBottom: 4,
  },
  monthBox: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  dateContainer: {
    width: itemWidth,
    height: itemHeight,
    alignItems: "center",
    justifyContent: "center",
    padding: 2,
    backgroundColor: "white",
  },
  dateBox: {
    borderWidth: 1,
    borderRadius: 10,
    width: 50,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
  },
})

type DayComponentProps = Omit<DateInfo, "fullDate"> & {
  isSelected: boolean
  onPress: () => void
}
const DayComponent = observer(
  function DayComponent(props: DayComponentProps) {
    const { date, dayName, isToday, isSelected, onPress } = props

    const { borderColor, textColor } = useMemo(() => {
      const res = {
        borderColor: "white",
        textColor: DISABLED,
      }
      if (isToday) {
        res.borderColor = LBG
      }
      if (isSelected) {
        res.borderColor = GIVER_CASUAL_NAVY
        res.textColor = GIVER_CASUAL_NAVY
      }
      return res
    }, [isSelected, isToday])

    const DateText = isSelected ? PopSem14 : PopReg14
    const DayNameText = isSelected ? PreBol14 : PreReg12

    return (
      <View style={styles.dateContainer}>
        <TouchableOpacity
          style={{
            ...styles.dateBox,
            borderRadius: 8,
            borderColor: borderColor,
            borderWidth: 2,
            borderStyle: "solid",
            backgroundColor: isToday ? LBG : "white",
          }}
          onPress={onPress}
          hitSlop={8}
        >
          <DateText text={date} style={{ marginBottom: 2 }} color={textColor} />
          <DayNameText text={dayName} color={textColor} />
        </TouchableOpacity>
      </View>
    )
  },
  { forwardRef: true },
)

export default CalendarComponent
