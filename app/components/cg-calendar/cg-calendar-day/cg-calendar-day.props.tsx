import { DateData } from "react-native-calendars"
import { DayState } from "react-native-calendars/src/types"
import { visitingAvailableTime } from "../../../services/axios/visiting-available-time"
import { ServiceType } from "#screens"
export interface CgCalendarDayProps {
  date: string & DateData
  state: DayState
  selected: string
  dates: visitingAvailableTime[]
  month: Date
  serviceType: ServiceType
}
