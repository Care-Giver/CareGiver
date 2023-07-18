import axios from "axios"
import { BASE_URL, CONFIG, GeneralResponse } from "./axios-config"

export interface CreatePaymentInput {
  imp_uid: string
  merchant_uid: string
  imp_success: boolean
  isRefunded: boolean
  totalFee: number
}
export interface CreatePaymentResponse extends GeneralResponse {
  ok: boolean
  paymentId: number
}
/**
 * 로그인한 유저의 모든 위탁 예약을 읽어온다.
 * @returns {Promise<CreatePaymentResponse>}
 */
export const postPayment = async (post: CreatePaymentInput): Promise<CreatePaymentResponse> => {
  try {
    const response = await axios.post<CreatePaymentResponse>(`${BASE_URL}/payment`, post, CONFIG)

    if (!response.data.ok) {
      const error = response.data
      console.log("response >>> ", response)
      console.log("response.data >>> ", response.data)
      console.error("response.data.error 에러!!!?", error)
      // @ts-ignore
      return error
    }

    // console.log("response", response)
    console.log("response.data", response.data)
    return response.data
  } catch (error) {
    console.error("catchㅁ 에러!!!", error)
    return null
  }
}
