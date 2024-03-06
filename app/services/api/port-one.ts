/* eslint-disable camelcase */
import axios from "axios"
import { PORTONE_API_KEY, PORTONE_SERCRET_KEY } from "@env"
import { BASE_URL, GeneralResponse } from "./axios-config"
import { alertModal } from "../../utils/alert-modal"

const PORTONE_BASE_URL = "https://api.iamport.kr"

export interface AuthAnnotation {
  access_token: string

  // token 만료시각
  expired_at: number
  // 현재시각
  now: number
}

type GetTokenResponse = {
  code: number
  message: string
  response: AuthAnnotation
}

type GetAccessTokenResult =
  | {
      isSuccess: true // 성공
      response?: AuthAnnotation // 성공시, 생성된 결제 객체의 id
    }
  | {
      isSuccess: false // 실패
      reason?: string // 실패시, 실패이유
    }

export const getAccessToken = async (): Promise<GetAccessTokenResult> => {
  try {
    const response = await axios.post<GetTokenResponse>(`${PORTONE_BASE_URL}/users/getToken`, {
      imp_key: PORTONE_API_KEY,
      imp_secret: PORTONE_SERCRET_KEY,
    })

    if (response.data.code !== 0) {
      return {
        isSuccess: false,
        reason: response.data.message,
      }
    }

    return {
      isSuccess: true,
      response: response.data.response,
    }
  } catch (error) {
    return {
      isSuccess: false,
      reason: error.message,
    }
  }
}

type QueryType = {
  bank_code: string
  bank_num: string
}

type GetBanksHolderResponse = {
  code: number
  message: string
  response: {
    // 예금주 이름
    bank_holder: string
  }
}

type GetBanksHolderResult =
  | {
      isSuccess: true // 성공
      response?: {
        // 예금주 이름
        bank_holder: string
      } // 성공시, 생성된 결제 객체의 id
    }
  | {
      isSuccess: false // 실패
      reason?: string // 실패시, 실패이유
    }

export const getBanksHolder = async (params: QueryType): Promise<GetBanksHolderResult> => {
  try {
    const accessToken = await getAccessToken()

    if (accessToken.isSuccess) {
      console.log(accessToken.response.access_token)
      const response = await axios.get<GetBanksHolderResponse>(
        `${PORTONE_BASE_URL}/vbanks/holder?bank_code=${params.bank_code}&bank_num=${params.bank_num}`,
        {
          headers: { Authorization: accessToken.response.access_token },
        },
      )

      if (response.data.code !== 0) {
        return {
          isSuccess: false,
          reason: response.data.message,
        }
      }
      console.log("response >>>>>>", response.data)
      return {
        isSuccess: true,
        response: response.data.response,
      }
    }

    return {
      isSuccess: false,
      reason: "accessToken 발급 실패",
    }
  } catch (error) {
    console.log("ERR!!", error.header)
    return {
      isSuccess: false,
      reason: error.message,
    }
  }
}

interface VerifyBankHolderRequestBody {
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
interface VerifyBankHolderResponse extends GeneralResponse {
  // ok: true 이면 유효한 계좌입니다.
}
/**
 * 계좌번호와 예금주명을 검증합니다.
 * 실제 존재하는 계좌일 경우, true 를 반환합니다.
 * // TODO: verifyBankHolder 관련 코드 전부 payment.ts 로 이전
 */
export const verifyBankHolder = async (body: VerifyBankHolderRequestBody): Promise<boolean> => {
  try {
    const response = await axios.post<VerifyBankHolderResponse>(
      `${BASE_URL}/payment/bank-verification`,
      body,
    )
    console.log("🔷 response", JSON.stringify(response.data))
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
