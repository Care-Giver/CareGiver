import React from "react"
import { useColorScheme } from "react-native"
import { NavigationContainer, DefaultTheme, DarkTheme } from "@react-navigation/native"
import { BottomTabBarProps, createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { navigationRef, useBackButtonHandler } from "./navigation-utilities"
import { Loading, CustomTabBar } from "#components"
import { GIVER_CASUAL_NAVY } from "../theme"
import { Type, useStores } from "../models"
import { observer } from "mobx-react-lite"
import {
  BookingsStack,
  CLStackNavigatorParamList,
  ChatsStack,
  FavoritesStack,
  MypageStack,
  SearchingStack,
} from "./cl-stack-navigator"
import {
  CGStackNavigatorParamList,
  CalendarStack,
  CgBookingsStack,
  CgMypageStack,
  StatisticsStack,
} from "./cg-stack-navigator"
import {
  LoginSignUpStack,
  LoginSignUpStackNavigatorParamList,
} from "./login-sign-up-stack-navigator"

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
      <Tab.Screen
        name="Favorites"
        component={FavoritesStack}
        options={{ tabBarLabel: tabLabel.favortie }}
      />
      <Tab.Screen
        name="Bookings"
        component={BookingsStack}
        options={{ tabBarLabel: tabLabel.schedule }}
      />
      <Tab.Screen
        name="Searching"
        component={SearchingStack}
        options={{ tabBarLabel: tabLabel.search }}
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
      initialRouteName="Calendar"
      tabBar={(props: BottomTabBarProps) => <CustomTabBar {...props} />}
    >
      <Tab.Screen
        name="Statistics"
        component={StatisticsStack}
        options={{ tabBarLabel: tabLabel.statistics }}
      />
      <Tab.Screen
        name="CgBookings"
        component={CgBookingsStack}
        options={{ tabBarLabel: tabLabel.manage_booking }}
      />
      <Tab.Screen
        name="Calendar"
        component={CalendarStack}
        options={{ tabBarLabel: tabLabel.manage_schedule }}
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
 */
const AllTabs = observer(function AllTabs() {
  const {
    userStore: { type, onSwitchingType },
  } = useStores()
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
