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

export interface NotificationMessage {
  title: string
  content: string
  senderName: string
  needToPush: boolean
  adAtNight: boolean
  careGiverReceiverId?: number
  clientReceiverId?: number
}

/**
 * 로그인한 유저의 모든 반려동물 정보를 읽어온다.
 * @returns {Promise<GetNotificationsResult>}
 */
// export const getNotifications = async (): Promise<GetNotificationsResult> => {
//   try {
//     const response = await axios.get<NotificationResponse>(`${BASE_URL}/notification/client`)

//     if (!response?.data.ok) {
//       console.error("/pets API 에러!!! ♦️", response?.data?.error)
//       return { isSuccess: false, reason: response?.data?.error }
//     }
//     return {
//       isSuccess: true,
//       notifications: response.data.clientNotifications,
//     }
//   } catch (error) {
//     console.error("catch 에러!!! - getNotifications", error)
//     return { isSuccess: false, reason: error }
//   }
// }

/**
 * 로그인 유저의 알림 푸시를 구독시킨다.
 * @param addNotification - notification store 메서드
 * @returns
 */
export const subscribeNotification = (addNotification: (value: NotificationMessage) => void) => {
  const token = axios.defaults.headers.common["x-jwt"]

  console.log("token >>>", token)

  if (!token) {
    alert("유저 정보가 존재하지 않습니다. \n로그인 후 다시 시도해주세요.")
    return
  }

  const eventSource = new EventSource(`${BASE_URL}/notification/subscribe`, {
    headers: {
      "x-jwt": token,
    },
    debug: true,
  })

  eventSource.addEventListener("open", () => {
    console.log("event open")
    alert("알림 설정이 완료되었습니다.")
  })

  eventSource.addEventListener("message", (event) => {
    console.log("New message event:", event.data)
    // const SSEMessage: {
    //   message: NotificationMessage
    // } = JSON.parse(event.data)

    const SSEMessage: {
      message: string
    } = JSON.parse(event.data)

    console.log("JSONed message >>>", SSEMessage.message)

    // 공지 알림이 새로 들어올 때마다 store에 추가
    addNotification({
      title: SSEMessage.message,
      content: "test",
      senderName: "test",
      needToPush: false,
      adAtNight: false,
    })
  })

  eventSource.addEventListener("error", (event) => {
    if (event.type === "error") {
      console.error("Connection error:", event.message)
    } else if (event.type === "exception") {
      console.error("Error:", event.message, event.error)
    }
  })

  eventSource.addEventListener("close", () => {
    alert("알림 설정이 취소되었습니다.")
  })
}
