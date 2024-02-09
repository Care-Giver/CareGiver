import React, { useState, useEffect, useRef } from "react"
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Dimensions } from "react-native"
import {
  format,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isToday,
  subMonths,
  addMonths,
  getMonth,
} from "date-fns"
import { ko } from "date-fns/locale"
import { GIVER_CASUAL_NAVY_20 } from "#theme"

const MULTIPLY_5_PADDING = 30
const screenWidth = Math.floor((Dimensions.get("window").width - MULTIPLY_5_PADDING) / 5) * 5
const itemWidth = screenWidth / 5
const itemHeight = itemWidth // Assuming square items for simplicity

const CalendarComponent = () => {
  const [month, setMonth] = useState<Date>(new Date())
  const [dates, setDates] = useState([])
  const [todayIndex, setTodayIndex] = useState<number>(null)
  const [currentMonthNumber, setCurrentMonthNumber] = useState<number>(null)
  const [selectedDate, setSelectedDate] = useState()
  const flatListRef = useRef<FlatList>(null)

  useEffect(() => {
    const generateDatesForMonth = (month) => {
      const start = startOfMonth(month)
      const end = endOfMonth(month)
      const allDates = eachDayOfInterval({ start, end }).map((day) => ({
        date: format(day, "d", { locale: ko }),
        dayName: format(day, "EEE", { locale: ko }),
        isToday: isToday(day),
        fullDate: day,
      }))
      setDates(allDates)

      // Automatically select today's date on month generation if it exists
      const todayIndex = allDates.findIndex((date) => date.isToday)
      if (todayIndex >= 0) {
        //@ts-ignore
        setSelectedDate(allDates[todayIndex])
        setTodayIndex(todayIndex)
        setCurrentMonthNumber(getMonth(month))
      }
    }

    generateDatesForMonth(month)
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
  }, [dates, todayIndex]) // Depend on dates and todayIndex

  const handlePrevMonth = () => {
    setMonth((prevMonth) => startOfMonth(subMonths(prevMonth, 1)))
    // setTodayIndex(getDate(lastDayOfMonth(subMonths(currentMonth, 1))) - 1)
  }

  const handleNextMonth = () => {
    setMonth((prevMonth) => startOfMonth(addMonths(prevMonth, 1)))
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

  return (
    <View style={styles.root}>
      <View style={styles.monthRow}>
        <TouchableOpacity onPress={handlePrevMonth}>
          <Text style={styles.monthText}>{format(subMonths(month, 1), "MMM", { locale: ko })}</Text>
        </TouchableOpacity>
        <Text style={styles.monthText}>{format(month, "MMM", { locale: ko })}</Text>
        <TouchableOpacity onPress={handleNextMonth}>
          <Text style={styles.monthText}>{format(addMonths(month, 1), "MMM", { locale: ko })}</Text>
        </TouchableOpacity>
      </View>

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
        renderItem={({ item, index }) => (
          <View
            style={[styles.dateContainer, { backgroundColor: index % 2 === 0 ? "coral" : "pink" }]}
          >
            <TouchableOpacity
              style={styles.dateBox}
              onPress={() => handleDateSelect(item, index)}
              hitSlop={8}
            >
              <Text style={styles.dateText}>{item.date}</Text>
              <Text style={styles.dayText}>{item.dayName}</Text>
            </TouchableOpacity>
          </View>
        )}
        contentContainerStyle={{
          paddingHorizontal: (screenWidth - itemWidth) / 2, // Center the initial and final items
        }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  root: {
    width: screenWidth,
    alignSelf: "center",
    paddingTop: 50,
    backgroundColor: GIVER_CASUAL_NAVY_20,
  },
  monthRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  monthText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  dateContainer: {
    width: itemWidth,
    height: itemHeight,
    alignItems: "center",
    justifyContent: "center",
    padding: 2,
  },
  dateBox: {
    borderWidth: 1,
    borderRadius: 10,
    width: 50,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  dateText: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
  },
  dayText: {
    fontSize: 14,
  },
})

export default CalendarComponent
