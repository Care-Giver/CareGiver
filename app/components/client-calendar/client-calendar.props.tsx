import { GroupedVisitingAvailableTimesByDate, CrecheAvailableDate } from "../../services/api"
// import { ServiceType } from "#screens"
type ServiceType = any

interface Solution1 extends GroupedVisitingAvailableTimesByDate, CrecheAvailableDate {}

export interface CgCalendarProps {
  serviceType: ServiceType
  dates: Solution1[]
}
