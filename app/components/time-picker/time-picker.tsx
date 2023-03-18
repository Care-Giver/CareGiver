import React, { useEffect, useRef, useState } from "react"
import { View, ScrollView, Text, StyleSheet, ViewStyle, StyleProp, Pressable } from "react-native"
import { observer } from "mobx-react-lite"
import { DivisionLine, PreReg14, PreReg16, PreReg32 } from "#components"
import { PRETENDARD_REGULAR } from "#fonts"
import { GIVER_CASUAL_NAVY, MIDDLE_LINE } from "#theme"

export interface TimePickerProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>
}

const ITEM_HEIGHT = 50

const INTERVAL_HOURS = 5
const INTERVAL_MINUTES = 30

type Mode = "BEGIN" | "END"

export const TimePicker = observer(function TimePicker(props: TimePickerProps) {
  const { style } = props
  const _styles = Object.assign({}, styles.container, style)

  const [selectedHourBegin, setSelectedHourBegin] = useState(0)
  const [selectedMinuteBegin, setSelectedMinuteBegin] = useState(0)
  const [selectedHourEnd, setSelectedHourEnd] = useState(0)
  const [selectedMinuteEnd, setSelectedMinuteEnd] = useState(0)
  const [mode, setMode] = useState<Mode>("BEGIN")
  const hourBeginScrollViewRef = useRef<ScrollView | null>(null)
  const minuteBeginScrollViewRef = useRef<ScrollView | null>(null)
  const hourEndScrollViewRef = useRef<ScrollView | null>(null)
  const minuteEndScrollViewRef = useRef<ScrollView | null>(null)

  const hours = Array.from({ length: 24 }, (_, i) => i)
  const minutes = Array.from({ length: 12 }, (_, i) => i * 5)

  const onHourScroll = (event: any) => {
    const offsetY = event.nativeEvent.contentOffset.y
    const index = Math.round(offsetY / ITEM_HEIGHT)
    mode === "BEGIN"
      ? setSelectedHourBegin(hours[index] || 0)
      : setSelectedHourEnd(hours[index] || 0)
  }

  const onMinuteScroll = (event: any) => {
    const offsetY = event.nativeEvent.contentOffset.y
    const index = Math.round(offsetY / ITEM_HEIGHT)
    mode === "BEGIN"
      ? setSelectedMinuteBegin(minutes[index] || 0)
      : setSelectedMinuteEnd(minutes[index] || 0)
  }

  useEffect(() => {
    if (hourBeginScrollViewRef.current && minuteBeginScrollViewRef.current) {
      hourBeginScrollViewRef.current.scrollTo({ y: selectedHourBegin * ITEM_HEIGHT })
      minuteBeginScrollViewRef.current.scrollTo({ y: (selectedMinuteBegin / 5) * ITEM_HEIGHT })
    }

    if (hourEndScrollViewRef.current && minuteEndScrollViewRef.current) {
      hourEndScrollViewRef.current.scrollTo({ y: selectedHourEnd * ITEM_HEIGHT })
      minuteEndScrollViewRef.current.scrollTo({ y: (selectedMinuteEnd / 5) * ITEM_HEIGHT })
    }
  }, [selectedHourBegin, selectedMinuteBegin, selectedHourEnd, selectedMinuteEnd])

  const selectedTimeBeginText = () =>
    `${selectedHourBegin.toString().padStart(2, "0")}:${selectedMinuteBegin
      .toString()
      .padStart(2, "0")}`

  const selectedTimeEndText = () =>
    `${selectedHourEnd.toString().padStart(2, "0")}:${selectedMinuteEnd
      .toString()
      .padStart(2, "0")}`

  console.log("\n")
  console.log("🚀 selectedMinuteEnd:", selectedMinuteEnd)
  console.log("🚀 selectedHourEnd:", selectedHourEnd)
  console.log("🚀 selectedMinuteBegin:", selectedMinuteBegin)
  console.log("🚀 selectedHourBegin:", selectedHourBegin)

  return (
    <View style={_styles}>
      <View style={{ backgroundColor: "orange" }}>
        <View
          style={{
            paddingHorizontal: 50,
          }}
        >
          <View
            style={{
              width: "100%",
              flexDirection: "row",
              // justifyContent: "space-between",
              backgroundColor: "yellow",
            }}
          >
            <Pressable
              onPress={() => setMode("BEGIN")}
              style={{ width: 114, backgroundColor: "red" }}
            >
              <PreReg14
                text="시작"
                color={mode === "BEGIN" ? GIVER_CASUAL_NAVY : MIDDLE_LINE}
                mb={10}
              />
              <PreReg32
                text={selectedTimeBeginText()}
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
              style={{ width: 114, backgroundColor: "lightblue", marginLeft: "auto" }}
            >
              <PreReg14
                text="끝"
                color={mode === "END" ? GIVER_CASUAL_NAVY : MIDDLE_LINE}
                mb={10}
              />
              <PreReg32
                text={selectedTimeEndText()}
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
      </View>

      {mode === "BEGIN" && (
        <View style={styles.pickerContainer}>
          <ScrollView
            ref={hourBeginScrollViewRef}
            onScroll={onHourScroll}
            scrollEventThrottle={16}
            snapToInterval={ITEM_HEIGHT}
            decelerationRate="fast"
            showsVerticalScrollIndicator={false}
            style={styles.scrollView}
            contentContainerStyle={styles.contentContainerStyle}
          >
            {hours.map((hour) => (
              <Text key={hour} style={[styles.item, hour === selectedHourBegin && styles.selected]}>
                {hour.toString()}
              </Text>
            ))}
          </ScrollView>
          <ScrollView
            ref={minuteBeginScrollViewRef}
            onScroll={onMinuteScroll}
            scrollEventThrottle={16}
            snapToInterval={ITEM_HEIGHT}
            decelerationRate="fast"
            showsVerticalScrollIndicator={false}
            style={styles.scrollView}
            contentContainerStyle={styles.contentContainerStyle}
          >
            {minutes.map((minute) => (
              <Text
                key={minute}
                style={[styles.item, minute === selectedMinuteBegin && styles.selected]}
              >
                {minute.toString().padStart(2, "0")}
              </Text>
            ))}
          </ScrollView>
        </View>
      )}

      {mode === "END" && (
        <View style={[styles.pickerContainer, { backgroundColor: "tomato" }]}>
          <ScrollView
            ref={hourEndScrollViewRef}
            onScroll={onHourScroll}
            scrollEventThrottle={16}
            snapToInterval={ITEM_HEIGHT}
            decelerationRate="fast"
            showsVerticalScrollIndicator={false}
            style={styles.scrollView}
            contentContainerStyle={styles.contentContainerStyle}
          >
            {hours.map((hour) => (
              <Text
                key={hour}
                style={[styles.item, hour === selectedHourEnd ? styles.selected : null]}
              >
                {hour.toString()}
              </Text>
            ))}
          </ScrollView>
          <ScrollView
            ref={minuteEndScrollViewRef}
            onScroll={onMinuteScroll}
            scrollEventThrottle={16}
            snapToInterval={ITEM_HEIGHT}
            decelerationRate="fast"
            showsVerticalScrollIndicator={false}
            style={styles.scrollView}
            contentContainerStyle={styles.contentContainerStyle}
          >
            {minutes.map((minute) => (
              <Text
                key={minute}
                style={[styles.item, minute === selectedMinuteEnd ? styles.selected : null]}
              >
                {minute.toString().padStart(2, "0")}
              </Text>
            ))}
          </ScrollView>
        </View>
      )}
    </View>
  )
})

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  pickerContainer: {
    flexDirection: "row",
    backgroundColor: "pink",
  },
  scrollView: {
    height: 3 * ITEM_HEIGHT,
  },
  contentContainerStyle: {
    paddingTop: ITEM_HEIGHT,
    paddingBottom: ITEM_HEIGHT,
  },
  item: {
    fontSize: 28,
    fontFamily: PRETENDARD_REGULAR,
    textAlign: "center",
    height: ITEM_HEIGHT,
    lineHeight: ITEM_HEIGHT,
  },
  selected: {
    color: "blue",
  },
  timeLabel: {
    fontSize: 24,
    marginBottom: 20,
  },
})
