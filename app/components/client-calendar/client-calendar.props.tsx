import { GroupedVisitingAvailableTimesByDate } from "../../services/api/visiting-available-time"
import { CrecheAvailableDate } from "../../services/api/creche-date"
import { ServiceType } from "#screens"

interface Solution1 extends GroupedVisitingAvailableTimesByDate, CrecheAvailableDate {}

export interface CgCalendarProps {
  serviceType: ServiceType
  dates: Solution1[]
}
