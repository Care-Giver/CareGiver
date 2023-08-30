import axios from "axios"
import { BASE_URL, CONFIG, GeneralResponse } from "./axios-config"

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
