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

export interface CurrentBooking {
  visitingBookingId?: number
  crecheBookingId?: number
  visitingId?: number
  crecheId?: number

  // ? visiting인 경우 time
  startTime?: string
  endTime?: string
  // ? creche인 경우 date
  startDate?: string
  endDate?: string

  petSitterName: string
  ratings: number
  reviewCount: number
  desc: string
  profileImage: string | null
}

export interface PreviousBooking {
  visitingBookingId?: number
  crecheBookingId?: number
  visitingId?: number
  crecheId?: number

  // ? visiting인 경우 time
  startTime?: string
  endTime?: string
  // ? creche인 경우 date
  startDate?: string
  endDate?: string

  petSitterName: string
  desc: string
  profileImage: string | null
  isCanceled: boolean
}

interface CrecheBookingsResponse extends GeneralResponse {
  crecheBookings: CrecheBooking[]
}

interface VisitingBookingResponse extends GeneralResponse {
  visitingBookings: VisitingBooking[]
}

interface CurrentBookingResponse extends GeneralResponse {
  currentBookings: CurrentBooking[]
}

interface PreviousBookingResponse extends GeneralResponse {
  previousBookings: PreviousBooking[]
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
 * 로그인한 유저의 진행중인 예약 내역을 읽어온다.
 * @return {Promise<CurrentBooking[]>}
 */
export const getCurrentBookings = async (): Promise<CurrentBooking[]> => {
  try {
    const response = await axios.get<CurrentBookingResponse>(
      `${BASE_URL}/user/my-current-bookings`,
      CONFIG,
    )

    if (!response.data.ok) {
      const error = response.data.error
      console.error("[getCurrentBookings] error >>>", error)
      // @ts-ignore
      return error
    }

    console.log("[getCurrentBookings] response.data >>> ", response.data)

    return response.data.currentBookings
  } catch (error) {
    console.error("[getCurrentBookings] catch error >>>", error)
    return []
  }
}

/**
 * 로그인한 유저의 지난 예약 내역을 읽어온다.
 * @return {Promise<PreviousBooking[]>}
 */
export const getPreviousBookings = async (): Promise<PreviousBooking[]> => {
  try {
    const response = await axios.get<PreviousBookingResponse>(
      `${BASE_URL}/user/my-previous-bookings`,
      CONFIG,
    )

    if (!response.data.ok) {
      const error = response.data.error
      console.error("[getPreviousBookings] error >>>", error)
      // @ts-ignore
      return error
    }

    console.log("[getPreviousBookings] response.data >>> ", response.data)

    return response.data.previousBookings
  } catch (error) {
    console.error("[getPreviousBookings] catch error >>>", error)
    return []
  }
}
