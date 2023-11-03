import { GroupedVisitingAvailableTimesByDate } from "../../services/axios/visiting-available-time"
import { CrecheAvailableDates } from "../../services/axios/creche-date"
import { ServiceType } from "#screens"

interface Solution1 extends GroupedVisitingAvailableTimesByDate, CrecheAvailableDates {}

export interface CgCalendarProps {
  serviceType: ServiceType
  dates: Solution1[]
}
