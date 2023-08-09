import { DateData } from "react-native-calendars"
import { DayState } from "react-native-calendars/src/types"
import { GroupedVisitingAvailableTimesByDate } from "../../../services/axios/visiting-available-time"
import { CrecheAvailableDates } from "../../../services/axios/creche-day"
import { ServiceType } from "#screens"

interface Solution1 extends GroupedVisitingAvailableTimesByDate, CrecheAvailableDates {}

export type CgCalendarDayProps = {
  date: string & DateData
  state: DayState
  serviceType: ServiceType
  selected: string[]
  // dates: groupedVisitingAvailableTimesByDate[] | crecheAvailableDates[]
  availableDates: Solution1[]
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
