import axios from "axios"
import { BASE_URL, CONFIG, GeneralResponse } from "./axios-config"

interface AppleLoginInput {
  idToken: string
}

interface NaverLoginInput {
  idToken: string
}

interface KakaoServerLoginRequestBody {
  idToken: string
}

export interface AppleLoginOutput extends GeneralResponse {
  token?: string
}

export interface NaverLoginOutput extends GeneralResponse {
  token?: string
}

export interface KakaoLoginOutput extends GeneralResponse {
  token?: string
}

/**
 * 애플 로그인 요청을 서버에 보낸다.
 * @returns {Promise<string>} token
 */
export const appleServerLogin = async (idToken: string): Promise<string> => {
  try {
    const response = await axios.post<AppleLoginOutput>(`${BASE_URL}/user/login/apple`, {
      idToken,
    } as AppleLoginInput)

    if (!response.data.ok) {
      const error = response.data.error
      console.error("response.data.error 에러!!!", error)
      // @ts-ignore
      return error
    }

    return response.data.token
  } catch (error) {
    console.error("catch 에러!!!", error)
    return ""
  }
}

/**
 * 네이버 로그인 요청을 서버에 보낸다.
 * @returns {Promise<string>} token
 */
export const naverServiceLogin = async (idToken: string): Promise<string> => {
  try {
    const response = await axios.post<NaverLoginOutput>(`${BASE_URL}/user/login/naver`, {
      idToken,
    } as NaverLoginInput)

    if (!response.data.ok) {
      const error = response.data.error
      console.error("response.data.error 에러!!!", error)
      // @ts-ignore
      return error
    }

    return response.data.token
  } catch (error) {
    console.error("catch 에러!!!", error)
    return ""
  }
}

interface KakaoSercerLoginReturn {
  /**
   * DB 내 유저정보가 있는지 여부.
   * 유저정보가 존재할 경우, 이미 이전에 회원가입을 한 유저임.
   * token 값 리턴함. 카카오 로그인 플로우 진행
   */
  isAlreadySignedUp: boolean
  reason?: string
  token?: string
}

/**
 * 카카오 로그인 요청을 서버에 보낸다.
 * - 성공(true): DB 내 유저정보가 있음. token 값 리턴함. 카카오 로그인 플로우 진행
 * - 실퍠(false): DB 내 유저정보가 없음. 회원가입 플로우 진행
 * @returns {Promise<boolean>} 성공여부
 */
export const kakaoServerLogin = async (
  post: KakaoServerLoginRequestBody,
): Promise<KakaoSercerLoginReturn> => {
  try {
    const response = await axios.post<KakaoLoginOutput>(`${BASE_URL}/user/login/kakao`, post, {
      headers: {
        Accept: "Application/json",
      },
    })

    if (!response.data.ok) {
      const error = response.data.error
      console.error("response.data.error - kakaoServerLogin 에러!!!", error)
      return {
        isAlreadySignedUp: false,
        reason: "유저정보 없음",
      }
    }

    console.log("response.data - kakaoServerLogin ", response.data)
    return {
      isAlreadySignedUp: true,
      token: response.data.token,
    }
  } catch (error) {
    console.error("catch 에러!!!", error)
    return {
      isAlreadySignedUp: false,
      reason: "catch 에러",
    }
  }
}
