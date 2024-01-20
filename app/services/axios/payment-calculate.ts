import axios from "axios"
import { BASE_URL, GeneralResponse } from "./axios-config"
import { HandleType } from "./types/creches.visitings.common.types"

interface PetTypeExtraFee {
  petId: number
  petName: string
  petType: HandleType
  extraFee: number
}

export interface FeeResponse {
  subTotalFee: number // 수수료 포함 이전, 원가
  totalFee: number // 수수료 포함 가격
  petTypeExtraFee: PetTypeExtraFee[]
}

//* 방문 totalFee
export interface CalculateVisitingBookingRequestBody {
  visitingId: number
  startTime: string
  endTime: string
  petIds: number[]
}
interface CalculateVisitingBookingResponse extends GeneralResponse, FeeResponse {}
/**
 * @returns {Promise<CalculateVisitingBookingResponse>}
 */
//TODO 이런 식으로 response 잡아도 되는지??? 우선 test해보기
export const calculateVisitingBooking = async (
  body: CalculateVisitingBookingRequestBody,
): Promise<FeeResponse> => {
  try {
    const response = await axios.post<CalculateVisitingBookingResponse>(
      `${BASE_URL}/payment/visiting-booking/calculate`,
      body,
    )

    if (!response.data.ok) {
      const error = response.data.error
      console.error("response.data.error 에러!!!???", error)
      console.log(response.data)
      // @ts-ignore
      return error
    }

    return response.data
  } catch (error) {
    console.error("catch 에러!!!", error)
    return null
  }
}

//* 위탁 totalFee
export interface CalculateCrecheBookingRequestBody {
  crecheId: number
  startDate: string
  endDate: string
  petIds: number[]
}
interface CalculateCrecheBookingResponse extends GeneralResponse, FeeResponse {}
/**
 * @returns {Promise<CalculateCrecheBookingRequestBody>}
 */
export const calculateCrecheBooking = async (
  body: CalculateCrecheBookingRequestBody,
): Promise<FeeResponse> => {
  try {
    const response = await axios.post<CalculateCrecheBookingResponse>(
      `${BASE_URL}/payment/creche-booking/calculate`,
      body,
    )

    if (!response.data.ok) {
      const error = response.data.error
      console.log("response.data", response.data)
      console.error("postCrecheTotalFee response.data.error 에러!!!", error)
      // @ts-ignore
      return error
    }

    return response.data
  } catch (error) {
    console.error("catch 에러!!!", error)
    return null
  }
}
