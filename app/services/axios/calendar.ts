import axios from "axios"
import { BASE_URL, CONFIG, GeneralResponse } from "./axios-config"

interface visitingAvailableTimes {
  startTime: string
  endTime: string
  fee: string
}

interface visitingAvailableTimesResponse extends GeneralResponse {
  visitingAvailableTimes: visitingAvailableTimes
}

/**
 * 로그인한 유저의 모든 위탁 예약을 읽어온다.
 * @returns {Promise<visitingAvailableTimes>}
 */
export const getvisitingAvailableTimes = async (
  visitingId: number,
): Promise<visitingAvailableTimes> => {
  try {
    const response = await axios.get<visitingAvailableTimesResponse>(
      `${BASE_URL}/visiting-available-time/visitingId?=${visitingId}`,
      CONFIG,
    )

    if (!response.data.ok) {
      const error = response.data.error
      console.error("response.data.error 에러!!!", error)
      // @ts-ignore
      return error
    }

    // console.log("response", response)
    console.log("response.data", response.data)
    console.log("response.data.crecheBookings", response.data.visitingAvailableTimes)
    return response.data.visitingAvailableTimes
  } catch (error) {
    console.error("catch 에러!!!", error)
    return null
  }
}
