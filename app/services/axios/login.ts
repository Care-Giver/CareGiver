import axios from "axios"
import { BASE_URL, CONFIG, GeneralResponse } from "./axios-config"

interface AppleLoginInput {
  idToken: string
}

export interface AppleLoginOutput extends GeneralResponse {
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
