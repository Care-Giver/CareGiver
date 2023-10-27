import { GIVER_CASUAL_NAVY } from "#theme"
import * as Device from "expo-device"
import * as Notifications from "expo-notifications"
import { Platform } from "react-native"
import { alertModal } from "./alert-modal"

export async function registerForPushNotificationsAsync(): Promise<string> {
  let token: string

  if (Platform.OS === "android") {
    await Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: GIVER_CASUAL_NAVY,
    })
  }

  // 실제 디바이스인 경우
  if (Device.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync()
    let finalStatus = existingStatus
    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync()
      finalStatus = status
    }
    if (finalStatus !== "granted") {
      alertModal("푸시토큰 발급 실패", "푸시토큰을 발급받는데 실패했습니다.")
      return null
    }
    token = (await Notifications.getExpoPushTokenAsync()).data
    // console.log("🔷 registerForPushNotificationsAsync - token:", token)
    return token
  }
  // 시뮬레이터인 경우
  else {
    alert("Push Notifications 을 테스트 하기위해서는, 반드시 실제 기기를 사용해주세요!")
    return null
  }
}
