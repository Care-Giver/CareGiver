import { DateData } from "react-native-calendars"
import { DayState } from "react-native-calendars/src/types"
import { GroupedVisitingAvailableTimesByDate } from "../../../services/axios/visiting-available-time"
import { CrecheAvailableDates } from "../../../services/axios/creche-day"
import { ServiceType } from "#screens"

interface AvailableDate extends GroupedVisitingAvailableTimesByDate, CrecheAvailableDates {}

export type CgCalendarDayProps = {
  date: string & DateData
  state: DayState
  selected: string
  serviceType: ServiceType
  availableDates: AvailableDate[]
  month: Date
  startDate: Date
  endDate: Date
}
