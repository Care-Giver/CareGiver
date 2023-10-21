import { DateData } from "react-native-calendars"
import { DayState } from "react-native-calendars/src/types"
import { GroupedVisitingAvailableTimesByDate } from "../../../services/axios/visiting-available-time"
import { CrecheAvailableDates } from "../../../services/axios/creche-day"
import { ServiceTypeKorean } from "#models"

export type CgCalendarDayProps = {
  date: string & DateData
  state: DayState
  serviceType: ServiceTypeKorean
  availableDates: GroupedVisitingAvailableTimesByDate[] | CrecheAvailableDates[]
  selected: string[]
}
