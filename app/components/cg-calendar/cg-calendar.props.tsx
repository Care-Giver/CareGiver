import { groupedVisitingAvailableTimesByDate } from "../../services/axios/visiting-available-time"
import { crecheAvailableDates } from "../../services/axios/creche-day"
import { ServiceType } from "#screens"

interface Solution1 extends groupedVisitingAvailableTimesByDate, crecheAvailableDates {}

export interface CgCalendarProps {
  serviceType: ServiceType
  dates: Solution1[]
}
