import { DateData } from "react-native-calendars"
import { DayState } from "react-native-calendars/src/types"

export type ClientCalendarDayProps = {
  date: string & DateData
  state: DayState
  selected: string
  month: Date
  startDate?: Date
  endDate?: Date
}
