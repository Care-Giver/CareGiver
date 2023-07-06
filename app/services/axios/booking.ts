import axios from "axios"
import { BASE_URL, CONFIG, GeneralResponse } from "./axios-config"

//* 위탁예얘약 생성
export interface CreateCrecheBookingInput {
  crecheId: number
  userId: number
  request: string
  services: string[]
  startDate: string
  endDate: string
  totalFee: number
  defalutFee: number
  petIds: number[]
  paymentId: number
  petToolsLocInfo: string
  avoidFoodInfo: string
  bondingTipsInfo: string
}
interface CreateCrecheBookingInputResponse extends GeneralResponse {
  CreateCrecheBookingInput: CreateCrecheBookingInput
}
/**
 * @returns {Promise<CreateCrecheBookingInput>}
 */
export const postCrecheBooking = async (
  post: CreateCrecheBookingInput,
): Promise<CreateCrecheBookingInput> => {
  try {
    const response = await axios.post<CreateCrecheBookingInputResponse>(
      `${BASE_URL}/booking/creche`,
      post,
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
    console.log("response.data.CreateCrecheBookingInputs", response.data.CreateCrecheBookingInput)
    return response.data.CreateCrecheBookingInput
  } catch (error) {
    console.error("catch 에러!!!", error)
    return null
  }
}

//* 방문 예약 생성
export interface CreateVisitingBookingInput {
  visitingId: number
  userId: number
  request: string
  services: string[]
  destination: string
  startTime: string[]
  endTime: string[]
  petIds: number[]
  paymentId: number
  petToolsLocInfo: string
  avoidFoodInfo: string
  bondingTipsInfo: string
}

interface CreateVisitingBookingInputResponse extends GeneralResponse {
  CreateVisitingBookingInput: CreateVisitingBookingInput
}
/**
 * @returns {Promise<CreateVisitingBookingInput>}
 */
export const postVisitingBooking = async (
  post: CreateVisitingBookingInput,
): Promise<CreateVisitingBookingInput> => {
  try {
    const response = await axios.post<CreateVisitingBookingInputResponse>(
      `${BASE_URL}/booking/Visiting`,
      post,
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
    console.log(
      "response.data.CreateVisitingBookingInputs",
      response.data.CreateVisitingBookingInput,
    )
    return response.data.CreateVisitingBookingInput
  } catch (error) {
    console.error("catch 에러!!!", error)
    return null
  }
}

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
