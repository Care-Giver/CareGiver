/* eslint-disable camelcase */
import axios from "axios"
import { PORTONE_API_KEY, PORTONE_SERCRET_KEY } from "@env"

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
