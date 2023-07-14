import { visitingAvailableTime } from "../../services/axios/visiting-available-time"
import { ServiceType } from "#screens"
export interface CgCalendarProps {
  dates: visitingAvailableTime[]
  serviceType: ServiceType
}
