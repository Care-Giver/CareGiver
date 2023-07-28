import { DateData } from "react-native-calendars"
import { DayState } from "react-native-calendars/src/types"
import { GroupedVisitingAvailableTimesByDate } from "../../../services/axios/visiting-available-time"
import { CrecheAvailableDates } from "../../../services/axios/creche-day"
import { ServiceType } from "#screens"

interface Solution1 extends GroupedVisitingAvailableTimesByDate, CrecheAvailableDates {}

export type CgCalendarDayProps = {
  date: string & DateData
  state: DayState
  selected: string
  // dates: groupedVisitingAvailableTimesByDate[] | crecheAvailableDates[]
  serviceType: ServiceType
  availableDates: Solution1[]
  month: Date
  startDate: Date
  endDate: Date
}

{
  /**
interface CrecheProp {
  serviceType: "위탁"
  crecheAvailableDates?: crecheAvailableDates[]
}

interface VisitingProp {
  serviceType: "방문"
  visitingAvailableDates?: groupedVisitingAvailableTimesByDate[]
}
 */
}
