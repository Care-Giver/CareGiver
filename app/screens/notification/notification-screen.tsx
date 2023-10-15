import React, { FC, useEffect, useState } from "react"
import { StyleSheet } from "react-native"
import { observer } from "mobx-react-lite"
import { StackScreenProps } from "@react-navigation/stack"
import { NavigatorParamList } from "#navigators"
import { CustomModal, NotificationCard, Screen } from "#components"
import { useStores } from "#models"
import { useFocusEffect } from "@react-navigation/native"
import { alertModal } from "../../utils/alert-modal"
import { NotificationColumns, getNotifications } from "../../services/axios/notification"
import { images } from "#images"

export const NotificationScreen: FC<
  StackScreenProps<NavigatorParamList, "notification-screen">
> = observer(({ navigation, route }) => {
  //* 삭제하기 버튼 관련
  const [modalOpenn, setModalOpen] = useState<boolean>(false)
  const removeAllToggle: boolean = route.params?.removeAllToggle

  const removeAllHandler = () => {
    // @ts-ignore
    navigation.setParams({ removeAllToggle: !removeToggle })
  }

  useEffect(() => {
    console.log("removeToggle >>> ", removeAllToggle)
    if (removeAllToggle === true) {
      setModalOpen(true)
    }
  }, [removeAllToggle])

  //* MST
  const {
    notificationStore: {
      notifications,
      addNotification,
      setNotifications,
      setIsChecked,
      isEmpty,
      unreadNotificationCount,
    },
  } = useStores()

  //* 알림 관련
  useEffect(() => {
    // notifications 생성 및 핸들링 함수
    const initNotifications = async () => {
      const { isSuccess, notifications: notificationsFromServer } = await getNotifications()
      if (!isSuccess) {
        alertModal("실패", "알림 불러오기에 실패했습니다!")
        return
      }
      if (isEmpty) {
        //? MST 가 비어있다면 setNotifications() 호출
        setNotifications(notificationsFromServer)
      } else if (notificationsFromServer.length !== notifications.length) {
        //? MST 가 비어있지 않다면, 서버에서 받아온 데이터를 핸들링
        // MST내의 notifications와 서버내의 notifications 비교하여 없는 것 추가
        notificationsFromServer.forEach((notification) => {
          if (!notifications.find((item) => item.id === notification.id)) {
            addNotification(notification)
          }
        })
      }
    }

    // 읽지않은 알림이 "존재"할 때 확인 상태로 바꾸는 함수 호출
    if (unreadNotificationCount > 0) {
      setIsChecked()
    }
    // notifications 무조건적 생성 및 핸들링(initNotifications 내에서 상태에 따른 함수의 동작 결정)
    initNotifications()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Screen testID="Notification">
      {notifications &&
        notifications.map((item) => {
          console.log("item >>>", item.isChecked)
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
      <CustomModal
        image={images.error_profile_medium}
        imageWidth={100}
        imageHeight={85}
        title="알림을 모두 삭제하시겠어요?"
        yesBtnText="예"
        noBtnText="아니오"
        handleYesPress={() => {
          setModalOpen(!modalOpenn)
          removeAllHandler()
        }}
        handleNoPress={() => {
          setModalOpen(!modalOpenn)
          removeAllHandler()
        }}
        visibleState={modalOpenn}
      />
    </Screen>
  )
})

const styles = StyleSheet.create({
  root: {},
})
