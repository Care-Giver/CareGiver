import { DateData } from "react-native-calendars"
import { DayState } from "react-native-calendars/src/types"
import { groupedVisitingAvailableTimesByDate } from "../../../services/axios/visiting-available-time"
import { crecheAvailableDates } from "../../../services/axios/creche-day"
import { ViewProps } from "react-native"

//interface Solution1 extends groupedVisitingAvailableTimesByDate, crecheAvailableDates {}

export type CgCalendarDayProps = {
  date: string & DateData
  state: DayState
  selected: string
  // dates: groupedVisitingAvailableTimesByDate[] | crecheAvailableDates[]
  //dates: Solution1[]
  month: Date
  startDate: Date
  endDate: Date
} & (VisitingProp | CrecheProp)
type VisitingProp = {
  serviceType: "방문"
  visitingAvailableDates?: groupedVisitingAvailableTimesByDate[]
}
type CrecheProp = { serviceType: "위탁"; crecheAvailableDates?: crecheAvailableDates[] }
