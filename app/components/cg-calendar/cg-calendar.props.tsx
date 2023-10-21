import { GroupedVisitingAvailableTimesByDate } from "../../services/axios/visiting-available-time"
import { CrecheAvailableDates } from "../../services/axios/creche-day"
import { Dispatch, SetStateAction } from "react"
import { ServiceTypeKorean } from "#models"

interface Solution1 extends GroupedVisitingAvailableTimesByDate, CrecheAvailableDates {}

export interface CgCalendarProps {
  serviceType: ServiceTypeKorean
  selected: string[] // 임시 type, TODO: 선택된 날짜(들)을 담을 수 있는 적절한 타입으로 변경해야 함
  setSelected: Dispatch<SetStateAction<string[]>> // 임시 type
  // availableDates: Solution1[]
  availableDates: GroupedVisitingAvailableTimesByDate[] | CrecheAvailableDates[]
}
