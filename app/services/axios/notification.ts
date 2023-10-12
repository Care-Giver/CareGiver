import axios from "axios"
import { BASE_URL, GeneralResponse } from "./axios-config"

export interface Notification {
  id: number
  createAt: Date
  updatedAt: Date
  title: string
  content: string
  senderName: string
  needToPush: boolean
  adAtNight: boolean
}

interface NotificationResponse extends GeneralResponse {
  notificationResult: Notification[]
}

interface GetNotificationsResult {
  isSuccess: boolean // 성공여부
  notifications?: Notification[] // 성공시, 펫 상세정보 리스트
  reason?: string // 실패시, 실패이유
}

/**
 * 로그인한 유저의 모든 반려동물 정보를 읽어온다.
 * @returns {Promise<GetPetsResult>}
 */
export const getNotifications = async (clientId: number): Promise<GetNotificationsResult> => {
  try {
    const response = await axios.get<NotificationResponse>(
      `${BASE_URL}/notification/client/${clientId}`,
    )

    if (!response?.data.ok) {
      console.error("/pets API 에러!!! ♦️", response?.data?.error)
      return { isSuccess: false, reason: response?.data?.error }
    }
    response.data.notificationResult &&
      response.data.notificationResult.map((item) => console.log(item))
    return {
      isSuccess: true,
      notifications: response.data.notificationResult,
    }
  } catch (error) {
    console.error("catch 에러!!! - getNotifications", error)
    return { isSuccess: false, reason: error }
  }
}
