import React from "react"
import { StyleProp, ViewStyle, View, StyleSheet } from "react-native"
import { observer } from "mobx-react-lite"

export interface FindConsecutiveDaysProps {
  /**
   * 추가적인 padding, margin 을 줌으로써, 위치를 조정할 수 있습니다.
   */
  style?: StyleProp<ViewStyle>
  date: string[]
}

export const FindConsecutiveDays = observer(function FindConsecutiveDays(
  props: FindConsecutiveDaysProps,
) {
  const { style, date } = props
  const allStyles = Object.assign({}, styles.root, style)

  if (date.length <= 1) {
    return []
  }

  const sortedDates = date.slice().sort()
  const consecutiveDays = []
  let currentConsecutive = [sortedDates[0]]

  for (let index = 1; index < sortedDates.length; index++) {
    const current = new Date(sortedDates[index])
    const previous = new Date(sortedDates[index - 1])
    const oneDay = 1000 * 60 * 60 * 24

    if (current - previous === oneDay) {
      currentConsecutive.push(sortedDates[index])
    } else {
      consecutiveDays.push(currentConsecutive)
      currentConsecutive = [sortedDates[index]]
    }
  }

  consecutiveDays.push(currentConsecutive)

  return consecutiveDays.filter((arr) => arr.length > 1)
})

const styles = StyleSheet.create({
  root: {},
})
