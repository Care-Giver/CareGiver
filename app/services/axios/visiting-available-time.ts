import axios from "axios"
import { BASE_URL, GeneralResponse } from "./axios-config"

export interface GroupedVisitingAvailableTimesByDate {
  id: number
  createAt: string // "2023-01-01T11:00:00",
  updatedAt: string // "2023-01-01T11:00:00",
  date: string // "2023-06-05",
  fee: number
}

interface VisitingAvailableTimesResponse extends GeneralResponse {
  groupedVisitingAvailableTimesByDate: GroupedVisitingAvailableTimesByDate[]
}

/**
 * 로그인한 유저의 모든 방문서비스 가능 날짜들으 불러온다.
 */
export const getVisitingAvailableTimes = async (
  visitingId: number,
): Promise<GroupedVisitingAvailableTimesByDate[]> => {
  try {
    const response = await axios.get<VisitingAvailableTimesResponse>(
      `${BASE_URL}/visiting-available-time/${visitingId}`,
    )

    if (!response.data.ok) {
      const error = response.data.error
      console.error("response.data.error 에러!!!", error)
      return []
    }

    // console.log("response", response)
    //console.log("response.data", response.data)
    // console.log("response.data.visitingAvailableTimes", response.data.visitingAvailableTimes)
    return response.data.groupedVisitingAvailableTimesByDate.map((item) => ({
      ...item,
      date: item.date.substring(0, 10),
    }))
  } catch (error) {
    console.error("catch 에러!!!", error)
    return []
  }
}
