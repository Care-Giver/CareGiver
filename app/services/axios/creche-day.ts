import axios from "axios"
import { BASE_URL, CONFIG, GeneralResponse } from "./axios-config"

export interface crecheAvailableDates {
  id: number
  createAt: string
  updatedAt: string
  startTime: string
  endTime: string
  fee: number
  totalFee: number
}

interface crecheDaysResponse extends GeneralResponse {
  crecheAvailableDates: crecheAvailableDates[]
}

/**
 * 로그인한 유저의 모든 위탁 예약을 읽어온다.
 * @returns {Promise<crecheAvailableDates>}
 */
export const getCrecheDays = async (crecheId: number): Promise<crecheAvailableDates[]> => {
  try {
    const response = await axios.get<crecheDaysResponse>(
      `${BASE_URL}/creche-day/${crecheId}`,
      CONFIG,
    )

    if (!response.data.ok) {
      const error = response.data.error
      console.error("response.data.error 에러!!!", error)
      // @ts-ignore
      return error
    }

    // console.log("response", response)
    //console.log("response.data", response.data)
    // console.log("response.data.CrecheDays", response.data.CrecheDays)
    return response.data.crecheAvailableDates
  } catch (error) {
    console.error("catch 에러!!!", error)
    return []
  }
}
