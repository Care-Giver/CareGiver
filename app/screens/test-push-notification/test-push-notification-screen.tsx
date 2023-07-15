import React, { FC, useEffect, useRef, useState } from "react"
import { Button, Platform, View, Text } from "react-native"
import { observer } from "mobx-react-lite"
import { StackScreenProps } from "@react-navigation/stack"
import { NavigatorParamList } from "#navigators"
import { Screen } from "#components"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "../../models"
import * as Device from "expo-device"
import * as Notifications from "expo-notifications"

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
})

export const TestPushNotificationScreen: FC<
  StackScreenProps<NavigatorParamList, "test-push-notification-screen">
> = observer(function TestPushNotificationScreen() {
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()

  // Pull in navigation via hook
  // const navigation = useNavigation()

  const [expoPushToken, setExpoPushToken] = useState("")
  const [notification, setNotification] = useState(false)
  const notificationListener = useRef()
  const responseListener = useRef()

  useEffect(() => {
    registerForPushNotificationsAsync().then((token) => setExpoPushToken(token))

    //@ts-ignore
    notificationListener.current = Notifications.addNotificationReceivedListener((notification) => {
      //@ts-ignore
      //@ts-ignore
      setNotification(notification)
    })

    //@ts-ignore
    responseListener.current = Notifications.addNotificationResponseReceivedListener((response) => {
      console.log(response)
    })

    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current)
      Notifications.removeNotificationSubscription(responseListener.current)
    }
  }, [])

  async function schedulePushNotification() {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "You've got mail! 📬",
        body: "Here is the notification body",
        data: { data: "goes here" },
      },
      trigger: { seconds: 2 },
    })
  }

  async function registerForPushNotificationsAsync() {
    let token

    if (Platform.OS === "android") {
      await Notifications.setNotificationChannelAsync("default", {
        name: "default",
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: "#FF231F7C",
      })
    }

    if (Device.isDevice) {
      const { status: existingStatus } = await Notifications.getPermissionsAsync()
      let finalStatus = existingStatus
      if (existingStatus !== "granted") {
        const { status } = await Notifications.requestPermissionsAsync()
        finalStatus = status
      }
      if (finalStatus !== "granted") {
        alert("Failed to get push token for push notification!")
        return
      }
      token = (await Notifications.getExpoPushTokenAsync()).data
      console.log(token)
    } else {
      alert("Push Notifications 을 테스트 하기위해서는, 반드시 실제 기기를 사용해주세요!")
    }

    return token
  }

  return (
    <Screen testID="TestPushNotification" preset="fixed">
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "space-around",
        }}
      >
        <Text>Your expo push token: {expoPushToken}</Text>
        {/* @ts-ignore */}
        <View style={{ alignItems: "center", justifyContent: "center" }}>
          {/* @ts-ignore */}
          <Text>Title: {notification && notification.request.content.title} </Text>
          {/* @ts-ignore */}
          <Text>Body: {notification && notification.request.content.body}</Text>
          {/* @ts-ignore */}
          <Text>Data: {notification && JSON.stringify(notification.request.content.data)}</Text>
        </View>
        <Button
          title="Press to schedule a notification"
          onPress={async () => {
            await schedulePushNotification()
          }}
        />
      </View>
    </Screen>
  )
})
