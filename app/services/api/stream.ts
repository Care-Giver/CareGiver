import axios from "axios"
import { BASE_URL, GeneralResponse } from "./axios-config"
import { StreamChat } from "stream-chat"

interface streamTokenResponse extends GeneralResponse {
  streamToken: string
}

interface GetNotificationsResult {
  isSuccess: boolean // 성공여부
  streamToken?: string // 성공시, 토큰
  reason?: string // 실패시, 실패이유
}

/**
 * 로그인한 유저의 채팅토큰(stream-token)을 읽어온다.
 * @returns {Promise<GetNotificationsResult>}
 */
export const getStreamToken = async (): Promise<GetNotificationsResult> => {
  try {
    const response = await axios.get<streamTokenResponse>(`${BASE_URL}/user/stream-token`)

    if (!response?.data.ok) {
      console.error("/streamToken API 에러!!! ♦️", response?.data?.error)
      return { isSuccess: false, reason: response?.data?.error }
    }
    return {
      isSuccess: true,
      streamToken: response.data.streamToken,
    }
  } catch (error) {
    console.error("catch 에러!!! - getStreamToken", error)
    return { isSuccess: false, reason: error }
  }
}

const STREAM_API_KEY = "cyt5mvxvratf"
export const streamChatClient = StreamChat.getInstance(STREAM_API_KEY)
