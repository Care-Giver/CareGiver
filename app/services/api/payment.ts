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
export interface VerifyBankHolderRequestBody {
  // description: '은행 코드 (포트원 API 명세서 참고: https://faq.portone.io/1dae5145-1feb-4ef2-87ef-4b0e8a984945)',
  // example: '001',
  bankCode: string

  // description: '계좌 번호',
  // example: '1234567890',
  bankNum: string

  // description: '예금주 이름',
  // example: '홍길동',
  bankHolder: string

  // description: '은행 이름. 에러 발생시, 에러메시지에 포함됩니다.',
  // example: '국민은행',
  bankName?: string
}
export interface VerifyBankHolderResponse extends GeneralResponse {}
/**
 * 계좌번호와 예금주명을 검증합니다.
 * 실제 존재하는 계좌일 경우, true 를 반환합니다.
 */
export const verifyBankHolder = async (body: VerifyBankHolderRequestBody): Promise<boolean> => {
  try {
    const response = await axios.post<VerifyBankHolderResponse>(
      `${BASE_URL}/payment/bank-verification`,
      body,
    )
    if (!response.data.ok) {
      alertModal(`예금주 인증에 실패했습니다.`, `${response.data.error.message}`)
      return false
    }
    return true
  } catch (error) {
    alertModal(`예금주 인증에 실패했습니다.`, `catch: ${error?.message}`)
    return false
  }
}

interface PreRegisterRequestBody {
  amount: number
}
interface PaymentPreRegister extends PaymentColumns {
  imp_uid: null // imp_uid의 경우, 실제 결제가 진행되어야 등록할 수 있는 값이기에 해당 단계에서는 null로 발급됩니다.
  imp_success: false
  isRefunded: false
  isSettled: false
}
interface PreRegisterRequestBodyResponse extends GeneralResponse {
  payment: PaymentPreRegister
}
/**
 *
 * [포트원 결제 단계 소개]
 * 포트원의 결제 요청은 “클라이언트”에서 이루어지기에, 데이터의 위변조에 취약합니다.
 * 따라서 반드시 다음 과정을 따라 결제를 진행할 수 있도록 합니다.
 *    1. 결제 사전 등록
 *    2. 결제 요청
 *    3. 결제 사후 검증
 *
 * 이 함수는
 *    1. 결제 사전 등록
 * 에 해당하는 함수입니다.
 */
export const preRegister = async (
  body: PreRegisterRequestBody,
): Promise<PaymentPreRegister | null> => {
  try {
    const response = await axios.post<PreRegisterRequestBodyResponse>(
      `${BASE_URL}/payment/pre-register`,
      body,
    )

    if (!response.data.ok) {
      alertModal(`결제 정보 사전 등록에 실패하였습니다.`, `${response.data.error?.message}`)
      return null
    }

    if (!response.data.payment) {
      alertModal(`결제 정보 사전 등록에 실패하였습니다.`, `${response.data.error?.message}`)
      return null
    }

    return response.data.payment
  } catch (error) {
    alertModal(`결제 정보 사전 등록에 실패하였습니다.`, `catch:  ${error?.message}`)
    return null
  }
}
