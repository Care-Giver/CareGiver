import axios from "axios"
import { BASE_URL, CONFIG, GeneralResponse } from "./axios-config"

export interface User {
  id: number
  createAt: string
  upstringdAt: string
  email: string
  password: string
  role: string
  nickname: string
  phoneNumber: string
  sex: string
  birthday: string
  provider: string
  address: string
  desc: string
}

interface UsersResponse extends GeneralResponse {
  Users: User
}

/**
 * 로그인한 유저의 모든 위탁 예약을 읽어온다.
 * @returns {Promise<User>}
 */
export const getUsers = async (): Promise<User> => {
  try {
    const response = await axios.get<UsersResponse>(`${BASE_URL}/user/me`, CONFIG)

    if (!response.data.ok) {
      const error = response.data.error
      console.error("response.data.error 에러!!!", error)
      // @ts-ignore
      return error
    }

    // console.log("response", response)
    console.log("response.data", response.data)
    console.log("response.data.Users", response.data.Users)
    return response.data.Users
  } catch (error) {
    //console.error("catchㅁㅁ 에러!!!", error.toJSON())
    console.dir(error)
    return null
  }
}
