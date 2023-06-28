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

interface VisitingBooking {
  id: number
  createAt: string
  updatedAt: string
  status: string
  reviewStatus: string
  visitingId: number
  request: string
}

interface CrecheBookingsResponse extends GeneralResponse {
  crecheBookings: CrecheBooking[]
}

interface VisitingBookingResponse extends GeneralResponse {
  visitingBookings: VisitingBooking[]
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

/**
 * 로그인한 유저의 모든 위탁 예약을 읽어온다.
 * @returns {Promise<VisitingBooking[]>}
 */
export const getVisitingPetsitters = async (userId: number): Promise<VisitingBooking[]> => {
  try {
    const response = await axios.get<VisitingBookingResponse>(
      `${BASE_URL}/booking/visiting?userId=${userId}`,
      CONFIG,
    )

    if (!response.data.ok) {
      const error = response.data.error
      console.error("[getVisitingPetsitters]", error)
      return null
    }

    console.log("[getVisitingPetsitters] response.data >>> ", response.data)
    return response.data.visitingBookings
  } catch (error) {
    console.error("[getVisitingPetsitters]", error)
    return null
  }
}

/**
 * 로그인한 유저의 모든 예약(위탁|방문)을 읽어온다.
 */
// export const getPetsitters = async (): Promise<
