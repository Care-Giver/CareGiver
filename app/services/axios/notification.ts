import axios from "axios"
import { BASE_URL, GeneralResponse } from "./axios-config"

export interface NotificationColumns {
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
  clientNotifications: NotificationColumns[]
}

interface GetNotificationsResult {
  isSuccess: boolean // 성공여부
  notifications?: NotificationColumns[] // 성공시, 펫 상세정보 리스트
  reason?: string // 실패시, 실패이유
}

/**
 * 로그인한 유저의 모든 반려동물 정보를 읽어온다.
 * @returns {Promise<GetNotificationsResult>}
 */
export const getNotifications = async (): Promise<GetNotificationsResult> => {
  try {
    const response = await axios.get<NotificationResponse>(`${BASE_URL}/notification/client`)

    if (!response?.data.ok) {
      console.error("/pets API 에러!!! ♦️", response?.data?.error)
      return { isSuccess: false, reason: response?.data?.error }
    }
    return {
      isSuccess: true,
      notifications: response.data.clientNotifications,
    }
  } catch (error) {
    console.error("catch 에러!!! - getNotifications", error)
    return { isSuccess: false, reason: error }
  }
}
