import { DateData } from "react-native-calendars"
import { DayState } from "react-native-calendars/src/types"

export interface CgCalendarDayProps {
  date: string & DateData
  state: DayState
  selected: string
}
