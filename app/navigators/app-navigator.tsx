/* eslint-disable no-case-declarations */
import React, { useEffect } from "react"
import { Alert, AppState, useColorScheme } from "react-native"
import { NavigationContainer, DefaultTheme, DarkTheme } from "@react-navigation/native"
import { BottomTabBarProps, createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { navigate, navigationRef, useBackButtonHandler } from "./navigation-utilities"
import { Loading, CustomTabBar, CautionModal } from "#components"
import { GIVER_CASUAL_NAVY } from "../theme"
import { Type, useStores } from "../models"
import { observer } from "mobx-react-lite"
import {
  BookingsStack,
  CLStackNavigatorParamList,
  ChatsStack,
  // FavoritesStack,
  MypageStack,
  SearchingStack,
} from "./cl-stack-navigator"
import {
  CGStackNavigatorParamList,
  CalendarStack,
  CgBookingsStack,
  CgMypageStack,
  // StatisticsStack,
} from "./cg-stack-navigator"
import {
  LoginSignUpStack,
  LoginSignUpStackNavigatorParamList,
} from "./login-sign-up-stack-navigator"
import axios from "axios"
import { TestStreamChatScreen } from "#screens"
import { alertModal } from "../utils/alert-modal"
import { BASE_URL, SSENotificationEventDataMessage } from "#api"
import EventSource from "react-native-sse"

export type NavigatorParamList = CLStackNavigatorParamList &
  CGStackNavigatorParamList &
  LoginSignUpStackNavigatorParamList

const clBottomTabLabel = {
  favortie: "즐겨찾기",
  schedule: "예약 내역",
  search: "검색",
  chatting: "채팅",
  myinfo: "내정보",
}

const cgBottomTabLabel = {
  statistics: "통계",
  manage_booking: "예약 관리",
  manage_schedule: "일정 관리",
}

export const tabLabel = {
  ...clBottomTabLabel,
  ...cgBottomTabLabel,
}

type CLTabNameList = {
  Favorites: undefined
  Bookings: undefined
  Searching: undefined
  Chats: undefined
  Mypage: undefined
}

type CGTabNameList = {
  Statistics: undefined
  CgBookings: undefined
  Calendar: undefined
  Chats: undefined
  CgMypage: undefined
}

type CLCGTabNavigatorParamList = CLTabNameList & CGTabNameList

const Tab = createBottomTabNavigator<CLCGTabNavigatorParamList>()

/**
 * 클라이언트(반려인) 전용 탭들
 */
const ClientTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        headerStyle: { backgroundColor: "white" },
      }}
      initialRouteName="Searching"
      tabBar={(props: BottomTabBarProps) => <CustomTabBar {...props} />}
    >
      {/* // TODO: 즐겨찾기 기능 재정립 이후 복구 */}
      {/* <Tab.Screen
        name="Favorites"
        component={FavoritesStack}
        options={{ tabBarLabel: tabLabel.favortie }}
      /> */}
      <Tab.Screen
        name="Searching"
        component={SearchingStack}
        options={{ tabBarLabel: tabLabel.search }}
      />
      <Tab.Screen
        name="Bookings"
        component={BookingsStack}
        options={{ tabBarLabel: tabLabel.schedule }}
      />
      <Tab.Screen
        name="Chats"
        component={ChatsStack}
        options={{ tabBarLabel: tabLabel.chatting }}
      />
      <Tab.Screen
        name="Mypage"
        component={MypageStack}
        options={{ tabBarLabel: tabLabel.myinfo }}
      />
    </Tab.Navigator>
  )
}

/**
 * 케어기버 전용 탭들
 */
const CareGiverTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        headerStyle: { backgroundColor: GIVER_CASUAL_NAVY },
        headerTitleStyle: { color: "white" },
      }}
      // initialRouteName="Calendar"
      initialRouteName="CgMypage"
      tabBar={(props: BottomTabBarProps) => <CustomTabBar {...props} />}
    >
      {/* <Tab.Screen
        name="Statistics"
        component={StatisticsStack}
        options={{ tabBarLabel: tabLabel.statistics }}
      /> */}
      <Tab.Screen
        name="Calendar"
        component={CalendarStack}
        options={{ tabBarLabel: tabLabel.manage_schedule }}
      />
      <Tab.Screen
        name="CgBookings"
        component={CgBookingsStack}
        options={{ tabBarLabel: tabLabel.manage_booking }}
      />
      <Tab.Screen
        name="Chats"
        component={ChatsStack}
        options={{ tabBarLabel: tabLabel.chatting }}
      />
      <Tab.Screen
        name="CgMypage"
        component={CgMypageStack}
        options={{ tabBarLabel: tabLabel.myinfo }}
      />
    </Tab.Navigator>
  )
}

/**
 * 클라이언트 탭들과 케어기버 탭들을 전환 가능하게 해주는 컴포넌트
 * - 로그인시 보여지는 네비게이터 입니다.
 * - type 값에 따라 클라이언트 탭 네비게이터와 케어기버 탭 네비게이터를 전환합니다.
 */
const AllTabs = observer(function AllTabs() {
  const {
    userStore: { type, onSwitchingType, userAuth, userDetail },
    petStore: { petsHandler },
    petsitterStore: { fetchPetsitter },
    etcStore: { fetchService, fetchAmenity, hasService, hasAmenity },
    uiStore: { hasCaution },
  } = useStores()

  // 로그인한 유저 토큰값 axios 객체에 할당
  useEffect(() => {
    //! 중요: axios 기본 설정에 토큰을 넣어줘야 한다.
    axios.defaults.headers.common["x-jwt"] = userAuth.token
    axios.defaults.headers.common.Accept = "Application/json"
    axios.defaults.headers.common["Cache-Control"] = "no-cache"
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // 모드별 데이터 요청
  useEffect(() => {
    if (type === Type.CARE_GIVER) {
      fetchPetsitter() //! 중요: CARE_GIVER 모드이면, petsitter 정보를 불러온다.
      !hasService && fetchService() // 펫시터 등록시 필요하므로, 서비스 객체 요청
      !hasAmenity && fetchAmenity() // 펫시터 등록시 필요하므로, 편의시설 객체 요청
    } else if (type === Type.CLIENT) {
      petsHandler() //! 중요: CLIENT 모드이면, 반려동물 리스트를 불러옵니다.
    } else {
      console.warn("예외 발생 - app-navigator.tsx line 190 참고")
      console.log("type", type)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [type])

  // 알림 객체 SSE 수신 - 모드별 상관 없이 하나의 eventSource 인스턴스만 사용 함
  useEffect(() => {
    if (!axios.defaults.headers.common["x-jwt"]) {
      alertModal("유저 정보가 존재하지 않습니다.", "로그인 후 다시 시도해주세요.")
      return
    }

    const notiSSE = new EventSource(`${BASE_URL}/notification/subscribe`, {
      headers: { "x-jwt": axios.defaults.headers.common["x-jwt"] },
      debug: true,
    })

    // SSE 연결
    notiSSE.addEventListener("open", () => {
      console.debug(`🤖DEBUG ${userDetail.nickname}:`, "SSE 연결 시작")
    })

    // SSE 수신
    notiSSE.addEventListener("message", (event) => {
      const SSEMessage = JSON.parse(event.data)

      if (SSEMessage.message === "Heartbeat") {
        console.debug(`🤖DEBUG ${userDetail.nickname}:`, SSEMessage.message)
        return
      }

      if (SSEMessage.message === "Notification connection established") {
        console.debug(`🤖DEBUG ${userDetail.nickname}:`, SSEMessage.message)
        return
      }

      const noti: SSENotificationEventDataMessage = SSEMessage?.message
      // 수신자: 펫시터
      if (noti?.careGiverReceiverId && type === Type.CARE_GIVER) {
        console.debug(`🤖DEBUG ${userDetail.nickname}:`, noti)
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
        console.debug(`🤖DEBUG ${userDetail.nickname}:`, noti)
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
        console.debug(`🤖DEBUG ${userDetail.nickname}:`, "🐞")
        console.debug(`🤖DEBUG ${userDetail.nickname}:`, noti)
      }
    })

    // 로그아웃 시 (= AllTabs 컴포넌트가 unmount 될 때)
    // eventSource.close() 호출 (= SSE 연결 종료)
    return () => {
      // SSE 연결 종료
      notiSSE.close()
      console.debug(`🤖DEBUG ${userDetail.nickname}:`, "SSE 연결 종료")
      // TODO Background 상태에서는 어떻게 처리해야 하는게 맞는걸까?
      // TODO [참고] AppState 로 Foreground, Background 상태를 구분 가능.
      // TODO   1. Background 상태에서는 알림을 받지 않는다. -> eventSource.close()
      // TODO   2. Foreground 상태에서는 알림을 받는다. -> eventSource.open() 다시?

      //! 이걸로하면 연결 종료가 안됨. 왜지?
      // eventSource.addEventListener("close", () => {
      //   console.log(`[SSE Close event] ${type}`)
      // })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // TODO: 왜 전환하고나서, 첫번째 탭으로 이동하는가?
  // TODO: ➡️ initialRouteName prop 이 먹히질 않음 - 수정해야함
  // TODO: 아예 두 Tab.Navigator 를 하나로 merge 해버리면 나을지도?
  // TODO: ➡️ 우선 switchType 함수 내에 delay 와 navigate 함수로 임시방편용으로 해결함 - 전환이 어색하므로 보완 필요
  // TODO: cg-mypage-screen 생성 이후에는 switchType 개선필요

  return (
    <>
      {type === Type.CLIENT && <ClientTabs />}
      {type === Type.CARE_GIVER && <CareGiverTabs />}
      {onSwitchingType && <Loading text={"모드 전환중"} duration={1000} />}
      {hasCaution ? <CautionModal /> : null}
    </>
  )
})
interface NavigationProps extends Partial<React.ComponentProps<typeof NavigationContainer>> {}

export const AppNavigator = observer(function AppNavigator(props: NavigationProps) {
  const {
    userStore: { isLoggedIn },
  } = useStores()

  const colorScheme = useColorScheme()
  useBackButtonHandler(canExit)

  const linking = {
    // prefixes: ["https://mychat.com", "mychat://"],
    config: {
      screens: {
        "home-screen": "/",
        "search-screen": "/search-screen",
        "search-result": "/search-result",
        "caregiver-detail-information-screen": "/caregiver-detail-information-screen",
        "all-reviews-screen": "/all-reviews-screen",
        "caregiver-self-introduction-screen": "/caregiver-self-introduction-screen",
        "all-comments-screen": "/all-comments-screen",
        "writing-comment-screen": "/writing-comment-screen",
        "all-bookings-screen": "/all-bookings-screen",
        "booking-detail-screen": "/booking-detail-screen",

        // * pay stack
        "payment-request-screen": "/payment-request-screen",

        // * mypage stack
        "mypage-screen": "/mypage-screen",
        "all-pets-screen": "/all-pets-screen",
        "setting-screen": "/setting-screen",
        "service-center-screen": "/service-center-screen",
        "edit-mypage-screen": "/edit-mypage-screen",
        "edit-pet-info-screen": "/edit-pet-info-screen",
      },
    },
  }

  console.log("isLoggedIn", isLoggedIn)

  return (
    <NavigationContainer
      ref={navigationRef}
      theme={colorScheme === "dark" ? DarkTheme : DefaultTheme}
      {...props}
      // @ts-ignore
      linking={linking}
    >
      {isLoggedIn ? <AllTabs /> : <LoginSignUpStack />}
    </NavigationContainer>
  )
})

AppNavigator.displayName = "AppNavigator"

/**
 * A list of routes from which we're allowed to leave the app when
 * the user presses the back button on Android.
 *
 * Anything not on this list will be a standard `back` action in
 * react-navigation.
 *
 * `canExit` is used in ./app/app.tsx in the `useBackButtonHandler` hook.
 */
const exitRoutes = ["welcome"]
export const canExit = (routeName: string) => exitRoutes.includes(routeName)
