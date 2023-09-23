import axios from "axios"
import { BASE_URL, CONFIG, GeneralResponse } from "./axios-config"
import { AuthProvider } from "#models"
import { alertModal } from "../../utils/alert-modal"

export enum Sex {
  MALE = "MALE",
  FEMALE = "FEMALE",
}

interface UserColumns {
  id: number // 25,
  createAt: string // "2023-09-19T19:05:07.019Z",
  updatedAt: string // "2023-09-19T19:05:07.019Z",
  provider: AuthProvider // "naver",
  email: string // "blah3@test.com",
  nickname: string // "테스트9",
  phoneNumber: string // "01024562858",
  sex: Sex //"MALE",
  birthday: string // "2023-09-19",
  address: string // null,
  profileImage: string // null,
  desc: string // null,
  maxDistance: number // 10,
  pushToken: string // null,
  role: string // "CLIENT",
  clientStreamToken: string // null,
  marketingConsent: boolean // true,
  locationBasedServiceConsent: boolean // true,
  privacyPolicyConsent: boolean // true,
  termsOfServiceConsent: boolean // true,
}

export type User = Omit<UserColumns, "createAt" | "updatedAt">

interface SendSMSRequestBody {
  phoneNumber: string //01012341234 주의: '-' 없이 번호들만 있어야 합니다.
}

/**
 * 핸드폰번호 인증을 위한 인증번호를 요청한다
 * @returns {Promise<boolean>} 성공여부
 */
export const sendSMS = async (post: SendSMSRequestBody): Promise<boolean> => {
  try {
    const response = await axios.post<GeneralResponse>(`${BASE_URL}/user/sms`, post, CONFIG)

    if (!response?.data || !response?.data?.ok) {
      console.error("response.data.error 에러!!!", response.data.error)
      console.error("response?.data?.ok", response?.data?.ok)
      // @ts-ignore
      return false
    }

    // console.log("response", response)
    console.log("response.data", response.data)
    return true
  } catch (error) {
    console.error("catch 에러!!! - sendSMS", error.toJSON())
    return false
  }
}

interface VerifySMSRequestBody {
  phoneNumber: string //"01012341234"
  inputCode: string //"123456" //! 6자리 입니다.
}

/**
 * SMS 수신한 인증번호를 검증한다
 * @returns {Promise<boolean>} 성공여부
 */
export const verifySMS = async (post: VerifySMSRequestBody): Promise<boolean> => {
  try {
    const response = await axios.patch<GeneralResponse>(
      `${BASE_URL}/user/sms/confirm`,
      post,
      CONFIG,
    )
    console.log("post", post)

    if (!response.data) {
      console.error("response.data.error 에러!!!", response.data.error)
      // @ts-ignore
      return false
    }

    return response.data.ok
  } catch (error) {
    console.error("catch 에러!!! - verifySMS", error.toJSON())
    return false
  }
}

interface SignUpRequestBody {
  nickname: string // "일론 머스크",
  birthday: string // "2001-03-13",
  provider: AuthProvider // "google",
  idToken: string // "aaa",
  email: string // "example@google.com"
  phoneNumber: string //"01012341234",
  sex: string //"MALE",

  privacyPolicyConsent: boolean // true,
  termsOfServiceConsent: boolean //true,
  marketingConsent: boolean //true,
  locationBasedServiceConsent: boolean //true,
}

interface SignUpResponse {
  id: 1
  createAt: "2023-01-01T11:00:00"
  updatedAt: "2023-01-01T11:00:00"
  email: "example@google.com"
  password: "abcdefg123!"
  role: "CLIENT"
  nickname: "일론 머스크"
  phoneNumber: "010-1234-1234"
  sex: "MALE"
  birthday: "2001-03-13"
  provider: "google"
  address: "경기도 안산시 사동 한양대학로 55 제5공학관 지하1층 창업3실"
  desc: "안녕하세요."
  profileImage: "imagelink"
  isCertified: true
  pushToken: "pushToken"
  clientStreamToken: "clientStreamToken"
  maxDistance: 10
  privacyPolicyConsent: true
  termsOfServiceConsent: true
  marketingConsent: true
  locationBasedServiceConsent: true
}

interface SignUpResult {
  isSuccess: boolean
  reason?: string
}

/**
 * 입력한 정보로 회원가입을 진행한다.
 * @returns {Promise<SignUpResult>}
 */
export const signUp = async (post: SignUpRequestBody): Promise<SignUpResult> => {
  try {
    const response = await axios.post(`${BASE_URL}/user/signup`, post, {
      headers: { Accept: "Application/json" },
    })
    console.log("response ♦️", response)
    console.log("response.headers ♦️", response.headers)
    console.log("response.config.data ♦️", response?.config?.data)
    console.log("response?.data ♦️", response?.data)

    // if (!response.data || !response?.data?.ok) {
    if (!response.data) {
      console.error("response.data.error 에러!!! ♦️", response.data.error)
      // @ts-ignore
      return { isSuccess: false, reason: response.data.error }
    }

    const responseSuccess: SignUpResponse = response.config.data

    return { isSuccess: true }
  } catch (error) {
    console.error("catch 에러!!! - signUp", error.toJSON())
    return { isSuccess: false, reason: error.toJSON() }
  }
}

export interface LoginRequestBody {
  email: string // "example@google.com",
  nickname: string //"일론 머스크",
  provider: AuthProvider // "kakao",
  OAuthId: string //"string"
}

interface LoginResponse extends GeneralResponse {
  token: string // x-jwt 토큰
}

interface LoginResult {
  isSuccess: boolean // 성공여부
  token?: string // 성공시, x-jwt 토큰
  reason?: string // 실패시, 실패이유
}

/**
 * 로그인을 진행한다.
 * 성공시, x-jwt 토큰값을 반환한다.
 * @returns {Promise<LoginResult>}
 */
export const login = async (post: LoginRequestBody): Promise<LoginResult> => {
  try {
    const response = await axios.post<LoginResponse>(`${BASE_URL}/user/login`, post, {
      headers: { Accept: "Application/json" },
    })
    console.log("response ♦️", response)
    console.log("response.headers ♦️", response.headers)
    console.log("response.config.data ♦️", response?.config?.data)
    console.log("response?.data ♦️", response?.data)

    if (!response.data || !response?.data?.ok) {
      // if (!response.data) {
      console.error("/login API 에러!!! ♦️", response?.data?.error)
      return { isSuccess: false, reason: response.data.error }
    }

    return { isSuccess: true, token: response.data.token }
  } catch (error) {
    console.error("catch 에러!!! - login", error.toJSON())
    return { isSuccess: false, reason: error.toJSON() }
  }
}

interface UserMeResponse extends GeneralResponse {
  user: User
}

export type UserDetail = Pick<
  User,
  "nickname" | "phoneNumber" | "sex" | "birthday" | "address" | "profileImage" | "pushToken"
>

interface GetMeResult {
  isSuccess: boolean // 성공여부
  userDetail?: UserDetail // 성공시, 유저 상세정보
  reason?: string // 실패시, 실패이유
}

/**
 * me API의 목적은 x-jwt값을 유저 데이터로 변환하는 것에 있습니다.
 * login API 를 통해 얻어낸 x-jwt 토큰값을 사용하여,
 * 로그인한 유저의 유저정보를 가져옵니다.
 * @returns {Promise<any>}
 *
 *
 */
export const getMe = async (token: string): Promise<GetMeResult> => {
  try {
    console.log("token", token)
    if (!token) {
      alertModal("로그인이 필요합니다.", "토큰 값이 존재하지 않음")
      return { isSuccess: false, reason: "토큰 값이 존재하지 않음" }
    }

    const response = await axios.get<UserMeResponse>(`${BASE_URL}/user/me`, {
      headers: {
        "x-jwt": token,
        Accept: "Application/json",
      },
    })

    if (!response?.data.ok) {
      console.error("/user/me API 에러!!! ♦️", response?.data?.error)
      return { isSuccess: false, reason: response?.data?.error }
    }

    console.log("response >>>", response)
    console.log("response.data >>>", response.data)
    console.log("➡️", {
      nickname: response.data.user.nickname,
      phoneNumber: response.data.user.phoneNumber,
      sex: response.data.user.sex,
      birthday: response.data.user.birthday,
      address: response.data.user.address,
      profileImage: response.data.user.profileImage,
      pushToken: response.data.user.pushToken,
    })

    return {
      isSuccess: true,
      userDetail: {
        nickname: response.data.user.nickname,
        phoneNumber: response.data.user.phoneNumber,
        sex: response.data.user.sex,
        birthday: response.data.user.birthday,
        address: response.data.user.address,
        profileImage: response.data.user.profileImage,
        pushToken: response.data.user.pushToken,
      },
    }
  } catch (error) {
    console.error("catch 에러!!! - getMe", error.toJSON())
    return { isSuccess: false, reason: error.toJSON() }
  }
}
