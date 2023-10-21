import axios from "axios"
import { BASE_URL, GeneralResponse } from "./axios-config"

export interface GroupedVisitingAvailableTimesByDate {
  date: string
  fee: number
}

interface VisitingAvailableTimesResponse extends GeneralResponse {
  groupedVisitingAvailableTimesByDate: GroupedVisitingAvailableTimesByDate[]
}

/**
 * 로그인한 유저의 모든 방문 예약을 읽어온다.
 * @returns {Promise<visitingAvailableTimes>}
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
      // @ts-ignore
      return error
    }

    // console.log("response", response)
    //console.log("response.data", response.data)
    // console.log("response.data.visitingAvailableTimes", response.data.visitingAvailableTimes)
    return response.data.groupedVisitingAvailableTimesByDate
  } catch (error) {
    console.error("catch 에러!!!", error)
    return []
  }
}
