import axios from "axios"
import { BASE_URL, GeneralResponse } from "./axios-config"
import { StreamChat } from "stream-chat"
import Config from "react-native-config"
import { alertModal } from "../../utils/alert-modal"

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

type PostNotionReportResult = {
  isSuccess: true // 성공
} | void

export const postNotionReport = async (
  input: PostNotionReportInput,
): Promise<PostNotionReportResult> => {
  try {
    const response = await axios.post<PostNotionReportResponse>(`${BASE_URL}/chats/report`, input)

    if (!response?.data.ok) {
      console.error("/notions-report API 에러!!! ♦️", response?.data?.error)
      return alertModal("신고 실패", "신고 내역 작성에 실패했습니다.")
    }

    alertModal(
      "신고 완료",
      "성공적으로 접수되었습니다. 이메일을 통해 빠른 시일 내로 연락드리겠습니다.",
    )
    return {
      isSuccess: true,
    }
  } catch (error) {
    console.error("catch 에러!!! - postNotionReport", error)
    return alertModal("신고 실패", "신고 내역 작성에 실패했습니다.")
  }
}
