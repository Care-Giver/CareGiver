import React, { FC, useEffect, useState } from "react"
import { StyleSheet } from "react-native"
import { observer } from "mobx-react-lite"
import { StackScreenProps } from "@react-navigation/stack"
import { NavigatorParamList } from "#navigators"
import { NotificationCard, Screen } from "#components"
import { useStores } from "#models"
import { useFocusEffect } from "@react-navigation/native"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "#models"

// [주의] app/navigators/app-navigator.tsx 에 위치한, NavigatorParamList 변수에 새로운 값 "xxxx-screen": undefined 을 추가해주세요.
// 그 뒤에는 아래에 있는 @ts-ignore 를 제거해도, 빨간줄이 뜨지 않습니다 :)
// @ts-ignore
export const NotificationScreen: FC<
  StackScreenProps<NavigatorParamList, "notification-screen">
> = observer(function NotificationScreen() {
  // MST store 를 가져옵니다.
  // const { someStore, anotherStore } = useStores()

  // 필요시, useNavigation 훅을 사용할 수 있습니다.
  // const navigation = useNavigation()
  const {
    notificationStore: { notifications, notificationsHandler, isCheckedHandler },
  } = useStores()
  useEffect(() => {
    //? 계속 다시 api를 불러오는 것을 방지
    if (notifications.length === 0) notificationsHandler()
  }, [])
  useFocusEffect(() => {
    isCheckedHandler()
  })
  return (
    <Screen testID="Notification">
      {notifications &&
        notifications.map((item) => {
          return (
            <NotificationCard
              key={item.id}
              title={item.title}
              subtitle={item.content}
              time={item.title}
              isChecked={item.isChecked}
            />
          )
        })}
    </Screen>
  )
})

const styles = StyleSheet.create({
  root: {},
})
