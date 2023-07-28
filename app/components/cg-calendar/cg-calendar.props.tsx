import { groupedVisitingAvailableTimesByDate } from "../../services/axios/visiting-available-time"
import { crecheAvailableDates } from "../../services/axios/creche-day"
import { ServiceType } from "#screens"
export type CgCalendarProps =
  | { serviceType: "방문"; dates: groupedVisitingAvailableTimesByDate[] }
  | {
      serviceType: "위탁"
      dates: crecheAvailableDates[]
    }
