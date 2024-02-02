import axios from "axios"
import { BASE_URL, GeneralResponse } from "./axios-config"
import EventSource from "react-native-sse"
import { getAccessToken } from "@react-native-seoul/kakao-login"
import { useStores } from "#models"

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

/**
 * 로그인 유저의 알림 푸시를 구독시킨다.
 */
export const subscribeNotification = () => {
  const token = axios.defaults.headers.common["x-jwt"]

  if (!token) {
    alert("유저 정보가 잘못되었습니다. \n재로그인 후 다시 시도해주세요.")
    return
  }

  const eventSource = new EventSource(`${BASE_URL}/notification/subscribe`, {
    headers: {
      "x-jwt": token,
    },
  })

  eventSource.addEventListener("open", () => {
    alert("알림이 구독되었습니다.")
  })

  //TODO: notificationStore에 알림 저장
  eventSource.addEventListener("message", (event) => {
    // console.log("New message event:", event.data)
  })

  eventSource.addEventListener("error", (event) => {
    if (event.type === "error") {
      console.error("Connection error:", event.message)
    } else if (event.type === "exception") {
      console.error("Error:", event.message, event.error)
    }
  })

  eventSource.addEventListener("close", () => {
    alert("알림 구독이 취소되었습니다.")
  })
}
