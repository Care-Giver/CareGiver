import axios from "axios"
import { BASE_URL, GeneralResponse } from "./axios-config"
import EventSource from "react-native-sse"
import { Type } from "#models"
import { Alert } from "react-native"
import { UserDetail } from "#api"
import { navigate } from "#navigators"

export interface NotificationMessage {
  id: number
  createAt: string
  updatedAt: string
  title: string
  content: string
  senderName: string
  needToPush: boolean
  adAtNight: boolean
  careGiverReceiverId?: number // 존재하면, 수신자는 펫시터
  clientReceiverId?: number // 존재하면, 수신자는 보호자. 두개가 동시에 존재할 수 없음.
}

interface GetNotificationsByResponse extends GeneralResponse {
  clientNotifications?: NotificationMessage[]
  careGiverNotifications?: NotificationMessage[]
}
/**
 * 로그인한 유저의 알림 정보를 읽어온다.
 * type 에 따라, 보호자 혹은 펫시터 알림 정보를 읽어온다.
 * @param {Type} type
 * @returns {Promise<NotificationMessage[]>}
 */
export const getNotificationsBy = async (type: Type): Promise<NotificationMessage[]> => {
  try {
    let path = ""
    switch (type) {
      case Type.CLIENT:
        path = "client"
        break
      case Type.CARE_GIVER:
        path = "careGiver"
        break
    }

    const response = await axios.get<GetNotificationsByResponse>(`${BASE_URL}/notification/${path}`)
    const notifications =
      response?.data?.clientNotifications || response?.data?.careGiverNotifications

    if (!response?.data.ok || !notifications) {
      console.warn(`${type} 알림 불러오기에 실패했습니다!`, `${response?.data?.error}`)
      return []
    }

    return notifications
  } catch (error) {
    console.warn(`${type} 알림 불러오기에 실패했습니다!`, `catch: ${error?.message}`)
    return []
  }
}

/**
 * SSE Notification 구독 클래스
 * - 펫시터와 클라이언트의 알림을 구독한다.
 * - 알림이 들어오면, Alert로 알림을 띄운다.
 * - 알림을 누르면, 해당 화면으로 이동한다.
 * - 모드 전환 혹은, 로그아웃 시, SSE 연결을 종료한다.
 */
export class NotiSSE {
  static notiSSE: EventSource | null = null

  static connect(
    userDetail: UserDetail,
    type: Type,
    addNotification: (noti: NotificationMessage) => void,
  ) {
    if (!axios.defaults.headers.common["x-jwt"]) return

    this.notiSSE = new EventSource(`${BASE_URL}/notification/subscribe`, {
      headers: { "x-jwt": axios.defaults.headers.common["x-jwt"] },
      debug: true,
    })

    // SSE 연결
    this.notiSSE.addEventListener("open", () => {
      console.debug(`🤖DEBUG ${userDetail.nickname} (${type}):`, "SSE 연결 시작")
    })

    // SSE 수신
    this.notiSSE.addEventListener("message", (event) => {
      const SSEMessage = JSON.parse(event.data)

      if (SSEMessage.message === "Heartbeat") {
        console.debug(`🤖DEBUG ${userDetail.nickname} (${type}):`, SSEMessage.message)
        return
      }

      if (SSEMessage.message === "Notification connection established") {
        console.debug(`🤖DEBUG ${userDetail.nickname} (${type}):`, SSEMessage.message)
        return
      }

      const noti: NotificationMessage = SSEMessage?.message
      // 수신자: 펫시터
      if (noti?.careGiverReceiverId && type === Type.CARE_GIVER) {
        console.debug(`🤖DEBUG ${userDetail.nickname} (${type}):`, noti)

        // MST 에 추가
        addNotification(noti)

        Alert.alert(
          `${noti?.title}`,
          `${noti?.content}`,
          [
            { text: "닫기", style: "cancel" },
            {
              text: "확인하기",
              onPress: () => {
                //@ts-ignore
                navigate("CgBookings", { screen: "cg-booking-list-screen" })
              },
            },
          ],
          { cancelable: true },
        )

        return
      }

      // 수산자: 보호자
      if (noti?.clientReceiverId && type === Type.CLIENT) {
        console.debug(`🤖DEBUG ${userDetail.nickname} (${type}):`, noti)

        // MST 에 추가
        addNotification(noti)

        Alert.alert(
          `${noti?.title}`,
          `${noti?.content}`,
          [
            { text: "닫기", style: "cancel" },
            {
              text: "확인하기",
              onPress: () => {
                //@ts-ignore
                navigate("Bookings")
              },
            },
          ],
          { cancelable: true },
        )

        return
      }

      if (!noti?.careGiverReceiverId && !noti?.clientReceiverId) {
        console.debug(`🤖DEBUG ${userDetail.nickname} (${type}):`, "🐞")
        console.debug(`🤖DEBUG ${userDetail.nickname} (${type}):`, noti)
      }
    })
  }

  // 로그아웃 시 (= AllTabs 컴포넌트가 unmount 될 때)
  // eventSource.close() 호출 (= SSE 연결 종료)
  static disconnect(userDetail, type) {
    // SSE 연결 종료
    if (this.notiSSE) {
      this.notiSSE.close()
      this.notiSSE = null
      console.debug(`🤖DEBUG ${userDetail.nickname} (${type}):`, "SSE 연결 종료")
    }

    //! 이걸로하면 연결 종료가 안됨. 왜지?
    // this.notiSSE.addEventListener("close", () => {
    //   console.log(`[SSE Close event] ${type}`)
    // })
  }
}
