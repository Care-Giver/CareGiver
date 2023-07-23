import axios from "axios"
import { BASE_URL, CONFIG, GeneralResponse } from "./axios-config"

interface Fee {
  subTotalFee: number
  totalFee: number
}

//* 방문 totalFee
export interface CalculateVisitingTotalFeeInput {
  visitingId: number
  startTime: string
  endTime: string
  petIds: number[]
}

interface CalculateVisitingTotalFeeInputResponse extends GeneralResponse {
  FeeResponse: Fee
}
/**
 * @returns {Promise<CalculateVisitingTotalFeeInputResponse>}
 */
//TODO 이런 식으로 response 잡아도 되는지??? 우선 test해보기
export const postVisitingTotalFee = async (post: CalculateVisitingTotalFeeInput): Promise<Fee> => {
  try {
    const response = await axios.post<CalculateVisitingTotalFeeInputResponse>(
      `${BASE_URL}/payment/visiting-booking/calculate`,
      post,
      CONFIG,
    )

    if (!response.data.ok) {
      const error = response.data.error
      console.error("response.data.error 에러!!!???", error)
      console.log(response.data)
      // @ts-ignore
      return error
    }

    // console.log("response", response)
    console.log("response.data", response.data)
    console.log("response.data.CalculateVisitingTotalFeeInputs", response.data.FeeResponse)
    return response.data
  } catch (error) {
    console.error("catch 에러!!!", error)
    return null
  }
}

//* 위탁 totalFee
export interface CalculateCrecheTotalFeeInput {
  crecheId: number
  startDate: string
  endDate: string
  petIds: number[]
}

interface CalculateCrecheTotalFeeInputResponse extends GeneralResponse {
  CalculateCrecheTotalFeeInputResponse: Fee
}
/**
 * @returns {Promise<CalculateCrecheTotalFeeInput>}
 */
export const postCrecheTotalFee = async (post: CalculateCrecheTotalFeeInput): Promise<Fee> => {
  try {
    const response = await axios.post<CalculateCrecheTotalFeeInputResponse>(
      `${BASE_URL}/payment/creche-booking/calculate`,
      post,
      CONFIG,
    )

    if (!response.data.ok) {
      const error = response.data.error
      console.log("response.data", response.data)
      console.error("postCrecheTotalFee response.data.error 에러!!!", error)
      // @ts-ignore
      return error
    }

    // console.log("response", response)
    console.log("response.data", response.data)
    console.log("response.data.CalculateCrecheTotalFeeInputs", response.data.totalFee)
    return response.data
  } catch (error) {
    console.error("catch 에러!!!", error)
    return null
  }
}
