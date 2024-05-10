import React, { FC, useCallback } from "react"
import { FlatList, View, Image } from "react-native"
import { Observer, observer } from "mobx-react-lite"
import { StackScreenProps } from "@react-navigation/stack"
import { NavigatorParamList } from "#navigators"
import { CustomModal, NotificationCard, PreMed18, Screen } from "#components"
import { Type, useStores } from "#models"
import { useFocusEffect } from "@react-navigation/native"
import { images } from "#images"
import { BOTTOM_HEIGHT } from "#theme"
import { getNotificationsBy } from "#api"

//! TODO: NotificationScreen 스크린은, 모드에 상관없이 공통적으로 어떤 스크린에서든 진입 할 수 있다.
//!       이러한 특성을 고려해 보았을때, Screen 이 아닌 Bottom Sheet Modal 로 제작하여 어떤 스크린에서든 펼쳐서 사용할 수 있도록 하는 것이 좋을 것 같다.
//!       현재는 React Navigation Screen 으로 제작되어 있어, 다양한 곳에서 화면 전환시 동작이 조금 어색하다.
export const NotificationScreen: FC<
  StackScreenProps<NavigatorParamList, "notification-screen" | "cg-notification-screen">
> = observer(({ navigation, route }) => {
  //* MST
  const {
    notificationStore: {
      notifications,
      notificationsByTypeWithoutDeleted,
      addNotification,
      deleteAllNotifications,
      initNotifications,
      isClientNotiEmpty,
      isCareGiverNotiEmpty,
    },
    userStore: { type },
  } = useStores()

  //* 서버 알림 확인 후, MST 에 없는 알림은 추가
  useFocusEffect(
    useCallback(() => {
      // notifications 생성 및 핸들링 함수
      const handleNotifications = async () => {
        const fetchedNotifications = await getNotificationsBy(type)
        const checkEmpty = type === Type.CLIENT ? isClientNotiEmpty : isCareGiverNotiEmpty
        // MST 비어있는 경우: 초기화
        if (checkEmpty) {
          // 서버에서 받아온 notifications을 MST에 저장
          initNotifications(fetchedNotifications)
        }
        // 비어있지 않는 경우: 새로운 알림 추가
        else {
          fetchedNotifications.forEach((item) => {
            addNotification(item)
          })
        }
      }

      handleNotifications()
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [type]),
  )

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
        data={notificationsByTypeWithoutDeleted || []}
        renderItem={({ item }) => (
          // MST 와 FlatList 를 같이 사용할 때는 Reactivity 가 깨질 수 있음을 주의해줘야 한다.
          // 참고: https://github.com/mobxjs/mobx/issues/476#issuecomment-264692648
          <Observer>
            {() => (
              <NotificationCard
                key={item.id}
                title={item.title}
                subtitle={item.content}
                time={item.createAtText}
                isChecked={item.isChecked}
                check={item.check} // 카드 클릭시, "알림 확인"으로상태 변경
              />
            )}
          </Observer>
        )}
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
        image={images.caution}
        imageWidth={90}
        imageHeight={79}
        title="알림을 모두 삭제하시겠어요?"
        subtitle="삭제한 알림을 복구하려면, 로그아웃 후 다시 로그인 해주세요 :)"
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
