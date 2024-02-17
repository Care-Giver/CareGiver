import axios from "axios"
import { BASE_URL, GeneralResponse } from "./axios-config"

export const SAME_EMAIL_ERROR_MESSAGE = "There is a user using the same email in server"

type SocialLoginRequestBody = {
  idToken: string
}
type AppleServerLoginRequestBody = SocialLoginRequestBody
type NaverServiceLoginRequestBody = SocialLoginRequestBody
type KakaoServerLoginRequestBody = SocialLoginRequestBody

interface SocialLoginResponse extends GeneralResponse {
  token?: string
}

type AppleServerLoginResponse = SocialLoginResponse
type NaverServiceLoginResponse = SocialLoginResponse
type KakaoServerLoginResponse = SocialLoginResponse

interface SocialLoginReturn {
  /**
   * DB 내 유저정보가 있는지 여부.
   * 이미 존재할 경우, true
   * 존재하지 않을경우, false 입니다.
   *
   * - 유저정보가 존재할 경우, 이미 이전에 회원가입을 한 유저임.
   * - token 값 리턴함. 소셜 로그인 플로우 진행
   */
  isAlreadySignedUp: boolean
  reason?: string
  token?: string
}

type AppleServerLoginReturn = SocialLoginReturn
type NaverServiceLoginReturn = SocialLoginReturn
type KakaoServerLoginReturn = SocialLoginReturn

/**
 * 애플 로그인 요청을 서버에 보낸다.
 * - 성공(true): DB 내 유저정보가 있음. token 값 리턴함. 애플 로그인 플로우 진행
 * - 실퍠(false): DB 내 유저정보가 없음. 회원가입 플로우 진행
 *
 * @returns AppleServerLoginReturn
 */
export const appleServerLogin = async (
  post: AppleServerLoginRequestBody,
): Promise<AppleServerLoginReturn> => {
  try {
    const response = await axios.post<AppleServerLoginResponse>(
      `${BASE_URL}/user/login/apple`,
      post,
      {
        headers: {
          Accept: "Application/json",
        },
      },
    )

    if (!response.data.ok) {
      if (response.data.error?.message === SAME_EMAIL_ERROR_MESSAGE) {
        return {
          isAlreadySignedUp: true,
          reason: "동일한 이메일주소로 회원가입한 유저정보가 있습니다.",
        }
      }

      console.error("response.data.error - appleServerLogin 에러!!!", response.data.error?.message)
      return {
        isAlreadySignedUp: false,
        reason: response.data.error?.message,
      }
    }

    //! 중요: axios 기본 설정에 토큰을 넣어줘야 한다.
    axios.defaults.headers.common["x-jwt"] = response.data.token
    axios.defaults.headers.common.Accept = "Application/json"
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

/**
 * 네이버 로그인 요청을 서버에 보낸다.
 * - 성공(true): DB 내 유저정보가 있음. token 값 리턴함. 네이버 로그인 플로우 진행
 * - 실퍠(false): DB 내 유저정보가 없음. 회원가입 플로우 진행
 *
 * @returns NaverServiceLoginReturn
 */
export const naverServiceLogin = async (
  post: NaverServiceLoginRequestBody,
): Promise<NaverServiceLoginReturn> => {
  try {
    const response = await axios.post<NaverServiceLoginResponse>(
      `${BASE_URL}/user/login/naver`,
      post,
      {
        headers: {
          Accept: "Application/json",
        },
      },
    )

    if (!response.data.ok) {
      if (response.data.error?.message === SAME_EMAIL_ERROR_MESSAGE) {
        return {
          isAlreadySignedUp: true,
          reason: "동일한 이메일주소로 회원가입한 유저정보가 있습니다.",
        }
      }

      console.error("response.data.error - naverServiceLogin 에러!!!", response.data.error?.message)
      return {
        isAlreadySignedUp: false,
        reason: response.data.error?.message,
      }
    }

    //! 중요: axios 기본 설정에 토큰을 넣어줘야 한다.
    axios.defaults.headers.common["x-jwt"] = response.data.token
    axios.defaults.headers.common.Accept = "Application/json"
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

/**
 * 카카오 로그인 요청을 서버에 보낸다.
 * - 성공(true): DB 내 유저정보가 있음. token 값 리턴함. 카카오 로그인 플로우 진행
 * - 실퍠(false): DB 내 유저정보가 없음. 회원가입 플로우 진행
 *
 * @returns KakaoServerLoginReturn
 */
export const kakaoServerLogin = async (
  post: KakaoServerLoginRequestBody,
): Promise<KakaoServerLoginReturn> => {
  try {
    const response = await axios.post<KakaoServerLoginResponse>(
      `${BASE_URL}/user/login/kakao`,
      post,
      {
        headers: {
          Accept: "Application/json",
        },
      },
    )

    if (!response.data.ok) {
      if (response.data.error?.message === SAME_EMAIL_ERROR_MESSAGE) {
        return {
          isAlreadySignedUp: true,
          reason: "동일한 이메일주소로 회원가입한 유저정보가 있습니다.",
        }
      }

      console.error("response.data.error - kakaoServerLogin 에러!!!", response.data.error?.message)
      return {
        isAlreadySignedUp: false,
        reason: response.data.error?.message,
      }
    }

    //! 중요: axios 기본 설정에 토큰을 넣어줘야 한다.
    axios.defaults.headers.common["x-jwt"] = response.data.token
    axios.defaults.headers.common.Accept = "Application/json"
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
