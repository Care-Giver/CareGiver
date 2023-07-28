import { DateData } from "react-native-calendars"
import { DayState } from "react-native-calendars/src/types"
import { groupedVisitingAvailableTimesByDate } from "../../../services/axios/visiting-available-time"
import { crecheAvailableDates } from "../../../services/axios/creche-day"
import { ServiceType } from "#screens"
export interface CgCalendarDayProps {
  date: string & DateData
  state: DayState
  selected: string[]
  dates: groupedVisitingAvailableTimesByDate[] | crecheAvailableDates[]
  month: Date
  serviceType: ServiceType
}
