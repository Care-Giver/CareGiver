import axios from "axios"
import { BASE_URL, CONFIG, GeneralResponse } from "./axios-config"

interface CrecheBooking {
  status: string
  services: string
  crecheId: string
  startDate: string
  endDate: string
  totalFee: string
  defalutFee: string
  reviewStatus: string
  request: string
}

interface CrecheBookingsResponse extends GeneralResponse {
  crecheBookings: CrecheBooking[]
}

/**
 * 로그인한 유저의 모든 위탁 예약을 읽어온다.
 * @returns {Promise<CrecheBooking[]>}
 */
export const getCrechePetsitters = async (userId: number): Promise<CrecheBooking[]> => {
  try {
    const response = await axios.get<CrecheBookingsResponse>(
      `${BASE_URL}/booking/creche?userId=${userId}`,
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
    console.log("response.data.crecheBookings", response.data.crecheBookings)
    return response.data.crecheBookings
  } catch (error) {
    console.error("catch 에러!!!", error)
    return []
  }
}
