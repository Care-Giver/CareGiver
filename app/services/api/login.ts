import axios from "axios"
import { BASE_URL, GeneralResponse } from "./axios-config"
import { alertModal } from "../../utils/alert-modal"
import { AuthProvider } from "#models"

const SAME_EMAIL_ERROR_MESSAGE = "There is a user using the same email in server" as const
const USER_NOT_EXISTS_ERROR_MESSAGE = "Could not find user" as const

type SocialLoginRequestBody = {
  idToken: string
}

interface SocialLoginResponse extends GeneralResponse {
  token?: string
}

/**
 * DB 내 유저정보가 있는지 여부.
 * 이미 존재할 경우, true
 * 존재하지 않을경우, false 입니다.
 *
 * - 유저정보가 존재할 경우, 이미 이전에 회원가입을 한 유저임.
 * - token 값 리턴함. 소셜 로그인 플로우 진행
 */
type SocialLoginReturn =
  | // DB에 유저가 존재하는 경우
  {
      ok: true
      token: string
      isUserExists: true
    }
  // DB에 유저가 존재하지 않는 경우
  | {
      ok: true
      isUserExists: false
    }
  // 예외 상황
  | {
      ok: false
    }

/**
 * token 값을 서버에 전송하여,
 * email 과 provider="kakao" 정보를 대조하여 DB 에 유저 객체가 존재하는지 확인한다.
 */
export const checkUserExists = async (
  post: SocialLoginRequestBody,
  provider: Exclude<AuthProvider, "google">,
  // provider: AuthProvider,
): Promise<SocialLoginReturn> => {
  try {
    const response = await axios.post<SocialLoginResponse>(
      `${BASE_URL}/user/login/${provider}`,
      post,
      {
        headers: {
          Accept: "Application/json",
        },
      },
    )

    if (!response.data.ok) {
      switch (response.data.error?.message) {
        case SAME_EMAIL_ERROR_MESSAGE:
          alertModal("유저 확인 실패", `동일한 이메일주소로 회원가입한 유저정보가 있습니다.`)
          return { ok: false }
        case USER_NOT_EXISTS_ERROR_MESSAGE:
          return { ok: true, isUserExists: false }
        default:
          alertModal("유저 확인 실패", `${response.data.error?.message}`)
          return { ok: false }
      }
    }

    if (!response.data.token) {
      alertModal("유저 확인 실패", `토큰값을 얻어내지 못했습니다. ${response.data.error?.message}`)
      return { ok: false }
    }

    //! 중요: axios 기본 설정에 토큰을 넣어줘야 한다.
    axios.defaults.headers.common["x-jwt"] = response.data.token
    axios.defaults.headers.common.Accept = "Application/json"
    return {
      ok: true,
      token: response.data.token,
      isUserExists: true,
    }
  } catch (error) {
    alertModal("유저 확인 실패", `catch: ${error?.message}`)
    return { ok: false }
  }
}
