import { groupedVisitingAvailableTimesByDate } from "../../services/axios/visiting-available-time"
import { crecheAvailableDates } from "../../services/axios/creche-day"
import { ServiceType } from "#screens"
export interface CgCalendarProps {
  dates: groupedVisitingAvailableTimesByDate[] | crecheAvailableDates[]
  serviceType: ServiceType
}
