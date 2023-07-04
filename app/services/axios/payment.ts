import axios from "axios"
import { BASE_URL, CONFIG, GeneralResponse } from "./axios-config"

export interface CreatePaymentInput {
  imp_uid: string
  merchant_uid: string
  imp_success: boolean
  isRefunded: boolean
  totalFee: number
}
interface CreatePaymentInputResponse extends GeneralResponse {
  CreatePaymentInput: CreatePaymentInput
}
/**
 * 로그인한 유저의 모든 위탁 예약을 읽어온다.
 * @returns {Promise<CreatePaymentInput>}
 */
export const postPayment = async (post: CreatePaymentInput): Promise<CreatePaymentInput> => {
  try {
    const response = await axios.post<CreatePaymentInputResponse>(
      `${BASE_URL}/payment`,
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
    console.log("response.data.CreatePaymentInputs", response.data.CreatePaymentInput)
    return response.data.CreatePaymentInput
  } catch (error) {
    console.error("catch 에러!!!", error)
    return null
  }
}
