import axios from "axios"
import { BASE_URL, CONFIG, GeneralResponse } from "./axios-config"

export interface visitingAvailableTimes {
  id: number
  createAt: string
  updatedAt: string
  startTime: string
  endTime: string
  fee: number
}

interface visitingAvailableTimesResponse extends GeneralResponse {
  visitingAvailableTimes: visitingAvailableTimes[]
}

/**
 * 로그인한 유저의 모든 위탁 예약을 읽어온다.
 * @returns {Promise<visitingAvailableTimes>}
 */
export const getvisitingAvailableTimes = async (
  visitingId: number,
): Promise<visitingAvailableTimes[]> => {
  const response = await axios.get<visitingAvailableTimesResponse>(
    `${BASE_URL}/visiting-available-time/${visitingId}`,
  )

  // console.log("calender axios res: ", response)

  if (!response.data.ok) {
    const error = response.data.error
    console.error("response.data.error 에러!!!", error)
    // @ts-ignore
    return error
  }

  // console.log("response", response)
  // console.log("response.data", response.data)
  // console.log("response.data.visitingAvailableTimes", response.data.visitingAvailableTimes)
  return response.data.visitingAvailableTimes
}
