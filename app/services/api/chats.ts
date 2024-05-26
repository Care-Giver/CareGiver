import axios from "axios"
import { BASE_URL, GeneralResponse } from "./axios-config"
import { StreamChat } from "stream-chat"
import Config from "react-native-config"

export interface ReporterInfo {
  email: string
  nickname: string
  phoneNumber: string
  id: number
}

export interface PostNotionReportInput {
  reporter: ReporterInfo
  reportee: string
  desc: string
  reportedAt: string
}
export interface PostNotionReportResponse extends GeneralResponse {}

type PostNotionReportResult =
  | {
      isSuccess: true // 성공
    }
  | {
      isSuccess: false // 실패
      reason?: string // 실패시, 실패이유
    }

/**
 * 로그인한 유저의 채팅토큰(stream-token)을 읽어온다.
 * @returns {Promise<GetNotificationsResult>}
 */
export const postNotionReport = async (
  input: PostNotionReportInput,
): Promise<PostNotionReportResult> => {
  try {
    const response = await axios.post<PostNotionReportResponse>(
      `${BASE_URL}/chats/notions-report`,
      input,
    )

    if (!response?.data.ok) {
      console.error("/notions-report API 에러!!! ♦️", response?.data?.error)
      return { isSuccess: false, reason: response.data.error }
    }
    return {
      isSuccess: true,
    }
  } catch (error) {
    console.error("catch 에러!!! - postNotionReport", error)
    return { isSuccess: false, reason: error }
  }
}

export const streamChatClient = StreamChat.getInstance(Config.STREAM_CHAT_API_KEY)
