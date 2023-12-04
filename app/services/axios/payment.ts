/* eslint-disable camelcase */
import axios from "axios"
import { BASE_URL, GeneralResponse } from "./axios-config"

export interface CreatePaymentInput {
  imp_uid: string // 포트원 고유 결제번호
  merchant_uid: string // 주문번호
  imp_success: boolean // 결제 성공여부
  isRefunded: boolean //결제 환불여부
  totalFee: number
}
export interface CreatePaymentResponse extends GeneralResponse {
  paymentId: number
}
// interface CreatePaymentResult {
//   isSuccess: boolean // 성공여부
//   reason?: string // 실패시, 실패이유
//   paymentId?: number // 성공시, 생성된 결제 객체의 id
// }
type CreatePaymentResult =
  | {
      isSuccess: true // 성공
      paymentId?: number // 성공시, 생성된 결제 객체의 id
    }
  | {
      isSuccess: false // 실패
      reason?: string // 실패시, 실패이유
    }
/**
 * 로그인한 유저의 모든 위탁 예약을 읽어온다.
 * @returns {Promise<CreatePaymentResponse>}
 */
export const createPayment = async (body: CreatePaymentInput): Promise<CreatePaymentResult> => {
  try {
    const response = await axios.post<CreatePaymentResponse>(`${BASE_URL}/payment`, body)

    if (!response.data.ok) {
      return {
        isSuccess: false,
        reason: response.data?.error,
      }
    }

    return {
      isSuccess: true,
      paymentId: response.data.paymentId,
    }
  } catch (error) {
    console.error("catch 에러!!!", error)
    return {
      isSuccess: false,
      reason: error?.message,
    }
  }
}
