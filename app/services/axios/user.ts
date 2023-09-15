import axios from "axios"
import { BASE_URL, CONFIG, GeneralResponse } from "./axios-config"
import { AuthProvider } from "#models"

export enum Sex {
  MALE = "MALE",
  FEMALE = "FEMALE",
}

export interface User {
  id: number
  createAt: string
  updatedAt: string
  email: string
  role: string
  nickname: string
  kakaoIdToken: string
  naverIdToken: string
  appleIdToken: string
  phoneNumber: string
  sex: Sex
  birthday: string
  provider: string
  address: string
  desc: string
  profileImage: string
  isCertified: boolean
  pushToken: string
  clientStreamToken: string
  maxDistance: number
  privacyPolicyConsent: number
  termsOfServiceConsent: number
  marketingConsent: number
  locationBasedServiceConsent: number
}

interface UsersResponse extends GeneralResponse {
  Users: User
}

/**
 * 로그인한 유저의 모든 위탁 예약을 읽어온다.
 * @returns {Promise<Users>}
 */
export const getUsers = async (): Promise<User> => {
  try {
    const response = await axios.get<UsersResponse>(`${BASE_URL}/user/me`, CONFIG)

    if (!response.data) {
      const error = response.data.error
      console.error("response.data.error 에러!!!", response.data.ok)
      // @ts-ignore
      return error
    }

    // console.log("response", response)
    console.log("response.data", response.data)
    console.log("response.data.Users", response.data.Users)
    return response.data
  } catch (error) {
    console.error("catchㅁㅁ 에러!!!", error.toJSON())
    //console.dir(error)
    return null
  }
}

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

    if (!response.data) {
      console.error("response.data.error 에러!!!", response.data.error)
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
 * TODO: 회원가입 성공시, MST 내에 회원정보 저장해야 함
 * @returns {Promise<SignUpResult>}
 */
export const signUp = async (post: SignUpRequestBody): Promise<SignUpResult> => {
  try {
    const response = await axios.post(`${BASE_URL}/user/signup`, post, CONFIG)
    console.log("response -->", response)
    console.log("response.config.data -->")

    if (!response.data) {
      console.error("response.data.error 에러!!!", response.data.error)
      // @ts-ignore
      return { isSuccess: false, reason: response.data.error }
    }
    // console.log("response.data >>>", response.data)

    const responseSuccess: SignUpResponse = response.config.data

    return { isSuccess: true }
  } catch (error) {
    console.error("catch 에러!!! - signUp", error.toJSON())
    return { isSuccess: false, reason: error.toJSON() }
  }
}
