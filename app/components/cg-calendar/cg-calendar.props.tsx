import { groupedVisitingAvailableTimesByDate } from "../../services/axios/visiting-available-time"
import { crecheAvailableDates } from "../../services/axios/creche-day"
import { ServiceType } from "#screens"
import { Dispatch, SetStateAction } from "react"
export interface CgCalendarProps {
  dates: groupedVisitingAvailableTimesByDate[] | crecheAvailableDates[]
  serviceType: ServiceType
  selected: string[] // 임시 type, TODO: 선택된 날짜(들)을 담을 수 있는 적절한 타입으로 변경해야 함
  setSelected: Dispatch<SetStateAction<string[]>> // 임시 type
}
