/* eslint-disable camelcase */
import axios from "axios"
import { BASE_URL, GeneralResponse } from "./axios-config"
import { SettlementType } from "#screens"
import { alertModal } from "../../utils/alert-modal"
import { ServiceType } from "#models"

export interface PaymentColumns {
  createAt: string // "2023-12-15T19:39:13.387Z"
  id: number // 114
  imp_success: boolean // true
  imp_uid: string //"111"
  isRefunded: boolean // false
  isSettled: boolean // false
  merchant_uid: string //"111"
  totalFee: number //76320
  updatedAt: string // "2023-12-15T19:39:13.387Z"
}

export interface CreatePaymentInput {
  imp_uid: string // 포트원 고유 결제번호
  merchant_uid: string // 주문번호
  imp_success: boolean // 결제 성공여부
  isRefunded: boolean //결제 환불여부
  totalFee: number
}
export interface CreatePaymentResponse extends GeneralResponse {
  payment: PaymentColumns
}
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
 * 결제 객체를 생성합니다.
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
      paymentId: response.data.payment.id,
    }
  } catch (error) {
    console.error("catch 에러!!!", error)
    return {
      isSuccess: false,
      reason: error?.message,
    }
  }
}

export interface settlementDetail {
  serviceType: ServiceType
  start: string
  end: string
  isCanceled: boolean
  settlementFee: number
}
export interface GetSettlementInput {
  startDate: string
  endDate: string
}
export interface GetSettlementResponse extends GeneralResponse {
  totalSettlementFee: number
  settlementDetails: settlementDetail[]
}
type GetSettlementResult =
  | {
      isSuccess: true // 성공
      totalSettlementFee?: number // 성공시, 생성된 결제 객체의 id
      settlementDetails: SettlementType[]
    }
  | {
      isSuccess: false // 실패
      reason?: string // 실패시, 실패이유
    }

export const getSettlement = async (body: GetSettlementInput): Promise<GetSettlementResult> => {
  try {
    const response = await axios.post<GetSettlementResponse>(`${BASE_URL}/payment/settlement`, body)

    if (!response.data.ok) {
      return {
        isSuccess: false,
        reason: response.data?.error,
      }
    }

    //* 백엔드측 응답 형태 ui에 맞게 변환
    // 정렬
    const sortedSettlemtents = response.data.settlementDetails.sort((a, b) =>
      a.start.localeCompare(b.start),
    )
    // date별로 그룹화
    const groupedSettlements = sortedSettlemtents.reduce((acc, cur) => {
      const categoryIndex = acc.findIndex((item) => item.date === cur.start)
      if (categoryIndex === -1) {
        acc.push({ date: cur.start, settlementDetails: [cur] })
      } else {
        acc[categoryIndex].settlementDetails.push(cur)
      }
      return acc
    }, [])
    //* ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ

    return {
      isSuccess: true,
      totalSettlementFee: response.data.totalSettlementFee,
      settlementDetails: groupedSettlements,
    }
  } catch (error) {
    console.error("catch 에러!!!", error)
    return {
      isSuccess: false,
      reason: error?.message,
    }
  }
}
/**
 * 주어진 id 에 해당하는 결제 객체를 불러옵니다.
 */
interface GetPaymentByIdResponse extends GeneralResponse {
  payment: PaymentColumns
}
export const getPaymentById = async (paymentId: number): Promise<PaymentColumns | null> => {
  try {
    console.log("♦️ CALLED | getPaymentById")
    const response = await axios.get<GetPaymentByIdResponse>(`${BASE_URL}/payment/${paymentId}`)

    if (!response.data.ok) {
      alertModal(
        `해당 결제 객체를 읽어오는데 실패했습니다. getPaymentById: ${paymentId}`,
        `${response.data.error.message}`,
      )
      return null
    }
    return response.data.payment
  } catch (error) {
    alertModal(
      `해당 결제 객체를 읽어오는데 실패했습니다. getPaymentById: ${paymentId}`,
      `catch: ${error?.message}`,
    )
    return null
  }
}
