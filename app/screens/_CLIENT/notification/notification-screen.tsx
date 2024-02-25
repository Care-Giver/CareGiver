import React, { FC, useEffect, useState } from "react"
import { FlatList, View, StyleSheet, Image } from "react-native"
import { observer } from "mobx-react-lite"
import { StackScreenProps } from "@react-navigation/stack"
import { NavigatorParamList } from "#navigators"
import { CustomModal, NotificationCard, PreMed18, Screen } from "#components"
import { useStores } from "#models"
import { useFocusEffect } from "@react-navigation/native"
import { alertModal } from "../../../utils/alert-modal"
import { images } from "#images"
import { BOTTOM_HEIGHT } from "#theme"

export const NotificationScreen: FC<
  StackScreenProps<NavigatorParamList, "notification-screen">
> = observer(({ navigation, route }) => {
  //* MST
  const {
    notificationStore: { notifications, deleteAllNotifications, setIsChecked },
  } = useStores()

  useEffect(() => {
    return () => {
      setIsChecked()
    }
  }, [])

  //* 알림 관련
  // useEffect(() => {
  //   // notifications 생성 및 핸들링 함수
  //   const initNotifications = async () => {
  //     const { isSuccess, notifications: notificationsFromServer } = await getNotifications()
  //     if (!isSuccess) {
  //       alertModal("실패", "알림 불러오기에 실패했습니다!")
  //       return
  //     }
  //     if (isEmpty) {
  //       //? MST 가 비어있다면 setNotifications() 호출
  //       setNotifications(notificationsFromServer)
  //     } else if (notificationsFromServer.length !== notifications.length) {
  //       //? MST 가 비어있지 않다면, 서버에서 받아온 데이터를 핸들링
  //       // MST내의 notifications와 서버내의 notifications 비교하여 없는 것 추가
  //       notificationsFromServer.forEach((notification) => {
  //         if (!notifications.find((item) => item.id === notification.id)) {
  //           addNotification(notification)
  //         }
  //       })
  //     }
  //   }

  //   // 읽지않은 알림이 "존재"할 때 확인 상태로 바꾸는 함수 호출
  //   if (unreadNotificationCount > 0) {
  //     setIsChecked()
  //   }
  //   // notifications 무조건적 생성 및 핸들링(initNotifications 내에서 상태에 따른 함수의 동작 결정)
  //   initNotifications()

  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [])

  //* 삭제하기 버튼 관련
  const removeAllToggle: boolean = route.params?.removeAllToggle
  const removeAllHandler = () => {
    // @ts-ignore
    navigation.setParams({ removeAllToggle: false })
  }

  return (
    <Screen testID="Notification">
      {/* <Button
        onPress={() => {
          console.log("🔻초기화 전 self", self)
          reset()
          console.log("🔺초기화 후self", self)
        }}
        text="notificationStore 초기화"
      /> */}

      <FlatList
        showsVerticalScrollIndicator={false}
        style={{ flex: 1, width: "100%", height: "100%" }}
        contentContainerStyle={{
          flex: 1,
          width: "100%",
          height: "100%",
          paddingBottom: BOTTOM_HEIGHT,
        }}
        data={notifications || []}
        renderItem={({ item }) => {
          return (
            !item.isDeleted && (
              <NotificationCard
                key={item.id}
                title={item.title}
                subtitle={item.content}
                time={item.title}
                isChecked={item.isChecked}
              />
            )
          )
        }}
        ListEmptyComponent={() => (
          <View
            style={{
              flex: 1,
              height: "100%",
              alignSelf: "center",
              alignItems: "center",
              marginTop: 200,
            }}
          >
            <Image source={images.dog_question} style={{ width: 179, height: 192 }} />
            <PreMed18 text={`알림이 없습니다`} />
          </View>
        )}
      />

      <CustomModal
        image={images.error_profile_medium}
        imageWidth={100}
        imageHeight={85}
        title="알림을 모두 삭제하시겠어요?"
        yesBtnText="예"
        noBtnText="아니오"
        handleYesPress={() => {
          removeAllHandler()
          deleteAllNotifications()
        }}
        handleNoPress={() => {
          removeAllHandler()
        }}
        visibleState={removeAllToggle === undefined ? false : removeAllToggle}
      />
    </Screen>
  )
})

const styles = StyleSheet.create({
  // root: {},
})
