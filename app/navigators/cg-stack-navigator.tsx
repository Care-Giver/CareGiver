/**
 * 펫시터 모드일때 등장하는 모든 스크린들을 담당하는 네비게이터들 입니다.
 * 전부 StackNavigator로 구현되어 있습니다.
 * @see https://reactnavigation.org/docs/stack-navigator/
 *
 * @param {CGStackNavigatorParamList} CGStackNavigatorParamList - CG 스택 네비게이터의 파라미터 리스트 타입 입니다.
 *
 * @function StatisticsStack - CG - 통계 탭에 들어가는 모든 스크린들 입니다.
 * @function CgBookingsStack - CG - 예약관리 탭에 들어가는 모든 스크린들 입니다.
 * @function CalendarStack - CG - 달력 탭에 들어가는 모든 스크린들 입니다.
 * @function CgMypageStack - CG - 내정보 탭에 들어가는 모든 스크린들 입니다.
 * @function NOT_ORGANISED_CG_SCREENS - 아직 정리가 되지않은 CG 스크린들 입니다.
 */
import React from "react"
import { View } from "react-native"
import {
  NativeStackNavigationProp,
  createNativeStackNavigator,
} from "@react-navigation/native-stack"
import {
  SettingScreen,
  ServiceCenterScreen,
  CgCalendarScreen,
  CgManageBookingScreen,
  CgMypageScreen,
  CgSetVisitingServiceDayScreen,
  CgSetCrecheServiceDayScreen,
  CgRegistration1Screen,
  CgEditProfileScreen,
  EditMypageScreen,
  CgRegistration2Screen,
  CgRegistration3Screen,
  CgEarningListScreen,
  CgRequestEarningScreen,
  CgBookingListScreen,
  CgBookingDetailScreen,
  NotificationScreen,
} from "#screens"
import {
  GobackAndTitleHeader,
  Screen,
  PreReg18,
  CgScreenHeader,
  EditMypageScreenHeader,
  NotificationScreenHeader,
} from "#components"
import { useShowBottomTab } from "../utils/hooks"
import { useNavigation } from "@react-navigation/native"
import { CgBooking, CrecheAvailableDate } from "#api"
import { ServiceTypeKorean } from "#models"

export type CGStackNavigatorParamList = {
  /**
   * StatisticsStack - CG - 통계 스택
   */
  "cg-statistics-screen": undefined

  /**
   * CgBookingsStack - CG - 예약관리 스택
   */
  "cg-manage-booking-screen": undefined
  "cg-booking-list-screen": undefined
  "cg-booking-detail-screen": {
    booking: CgBooking
    serviceTypeKorean: ServiceTypeKorean
  }

  /**
   * CalendarStack - CG - 달력 스택
   */
  "cg-calendar-screen": undefined
  "cg-set-creche-service-day-screen": {
    selectedDates: string[]
    crecheId: number
    isAvailableDate: boolean
    availableDate?: CrecheAvailableDate
    isDeleted: boolean
  }
  "cg-set-visiting-service-day-screen": {
    selectedDates: string[]
    visitingId: number
    isAvailableDate: boolean
    isDeleted: boolean
  }
  "notification-screen": { removeAllToggle: boolean }

  /**
   * ChatsStack - 채팅 스택 || CG - 채팅 스택
   */
  // TODO: 클라이언트 채팅 스택 완성 후, CG 채팅 스택도 완성해야 함

  /**
   * CgMypageStack - CG - 내정보 스택
   */
  "cg-mypage-screen": undefined
  "setting-screen": undefined
  "service-center-screen": undefined
  "edit-mypage-screen": { editable: boolean }
  "cg-edit-profile-screen": undefined
  "cg-registration-1-screen": undefined
  "cg-registration-2-screen": { from?: keyof CGStackNavigatorParamList }
  "cg-registration-3-screen": undefined

  /**
   * Test
   */
  "cg-earning-list-screen": undefined
  "cg-request-earning-screen": undefined
}

const Stack = createNativeStackNavigator<CGStackNavigatorParamList>()

/**
 * CG - 통계 스택
 */
export const StatisticsStack = () => {
  const TempStatisticsScreen = ({ navigation }) => {
    useShowBottomTab(navigation)

    return (
      <Screen>
        <View
          style={{
            marginVertical: 200,
            alignSelf: "center",
          }}
        >
          <PreReg18>통계 기능은 곧 추가될 예정입니다 😉</PreReg18>
        </View>
      </Screen>
    )
  }

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: true,
        animation: "slide_from_right",
      }}
      //  @ts-ignore
      initialRouteName="cg-statistics-screen"
    >
      {/* //* 통계 메인 */}
      <Stack.Screen
        //  @ts-ignore
        name="cg-statistics-screen"
        component={TempStatisticsScreen}
        options={{
          header: (props) => <CgScreenHeader {...props} />,
        }}
      />
    </Stack.Navigator>
  )
}

/**
 * CG - 예약관리 스택
 */
export const CgBookingsStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: true,
        animation: "slide_from_right",
      }}
      //  @ts-ignore
      initialRouteName="cg-manage-booking-screen"
    >
      {/* CG - 예약관리 메인 */}
      <Stack.Screen
        name="cg-manage-booking-screen"
        component={CgManageBookingScreen}
        options={{
          header: (props) => <CgScreenHeader {...props} />,
        }}
      />
      {/* CG - 신청/거절 내역 */}
      <Stack.Screen
        name="cg-booking-list-screen"
        component={CgBookingListScreen}
        options={{ headerShown: false }}
      />
      {/* CG - 예약 내역 상세 (신청, 거절, 진행중, 완료 - 전부.) */}
      <Stack.Screen
        name="cg-booking-detail-screen"
        component={CgBookingDetailScreen}
        options={{
          title: "예약 내역 상세",
          header: (props) => <GobackAndTitleHeader {...props} />,
        }}
      />
    </Stack.Navigator>
  )
}

/**
 * CG - 달력 스택
 */
export const CalendarStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: true,
        animation: "slide_from_right",
      }}
      initialRouteName="cg-calendar-screen"
    >
      {/* CG - 달력 */}
      <Stack.Screen
        name="cg-calendar-screen"
        component={CgCalendarScreen}
        options={{
          header: (props) => <CgScreenHeader {...props} />,
        }}
      />

      {/* CG - 위탁, 날짜 별 서비스 수정 */}
      <Stack.Screen
        name="cg-set-creche-service-day-screen"
        component={CgSetCrecheServiceDayScreen}
        options={{
          title: "날짜 별 서비스 수정",
          header: (props) => <GobackAndTitleHeader {...props} />,
        }}
      />

      {/* CG - 방문, 날짜 별 서비스 수정 */}
      <Stack.Screen
        name="cg-set-visiting-service-day-screen"
        component={CgSetVisitingServiceDayScreen}
        options={{
          title: "날짜 별 서비스 수정",
          header: (props) => <GobackAndTitleHeader {...props} />,
        }}
      />

      {/* 알림 스크린 */}
      <Stack.Screen
        name="notification-screen"
        component={NotificationScreen}
        options={({ navigation, route }) => ({
          header: (props) => <NotificationScreenHeader {...props} />,
        })}
      />
    </Stack.Navigator>
  )
}

/**
 * CG - 내정보 스택
 */
export const CgMypageStack = () => {
  const navigation = useNavigation<NativeStackNavigationProp<CGStackNavigatorParamList>>()
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: true,
        animation: "slide_from_right",
      }}
      initialRouteName="cg-mypage-screen"
    >
      {/* //* CG 내정보 메인 */}
      <Stack.Screen
        name="cg-mypage-screen"
        component={CgMypageScreen}
        options={{
          header: (props) => <CgScreenHeader {...props} />,
        }}
      />

      {/* //* 환경설정 스크린 */}
      <Stack.Screen
        name="setting-screen"
        component={SettingScreen}
        options={{
          title: "환경설정",
          header: (props) => <GobackAndTitleHeader {...props} />,
        }}
      />

      {/* //* 고객 센터 스크린 */}
      <Stack.Screen
        name="service-center-screen"
        component={ServiceCenterScreen}
        options={{
          title: "고객 센터",
          header: (props) => <GobackAndTitleHeader {...props} />,
        }}
      />

      {/* //* 내 프로필 관리 [기본 정보 관리] */}
      <Stack.Screen
        name="edit-mypage-screen"
        component={EditMypageScreen}
        options={({ navigation, route }) => ({
          headerShadowVisible: false,
          header: (props) => <EditMypageScreenHeader {...props} />,
          headerTitle: "",
        })}
      />

      {/* //* CG - 펫시터 프로필 관리 */}
      <Stack.Screen
        name="cg-edit-profile-screen"
        component={CgEditProfileScreen}
        options={{
          title: "펫시터",
          header: (props) => <GobackAndTitleHeader {...props} />,
        }}
      />

      {/* //* CG - 등록 1단계 스크린 */}
      <Stack.Screen
        name="cg-registration-1-screen"
        component={CgRegistration1Screen}
        options={{
          headerShown: false,
        }}
      />

      {/* //* CG - 등록 2단계 스크린 */}
      <Stack.Screen
        name="cg-registration-2-screen"
        component={CgRegistration2Screen}
        options={{
          headerShown: false,
        }}
      />

      {/* //* CG - 등록 3단계 스크린 */}
      <Stack.Screen
        name="cg-registration-3-screen"
        component={CgRegistration3Screen}
        options={{
          headerShown: false,
        }}
      />

      {/* //* CG_Test - 정삭목록 스크린*/}
      <Stack.Screen
        name="cg-earning-list-screen"
        component={CgEarningListScreen}
        options={{
          title: "정산 내역",
          header: (props) => <GobackAndTitleHeader {...props} />,
        }}
      />
      {/* //* CG_Test - 정산 요청 스크린 */}
      <Stack.Screen
        name="cg-request-earning-screen"
        component={CgRequestEarningScreen}
        options={{
          title: "정산 요청",
          header: (props) => <GobackAndTitleHeader {...props} />,
        }}
      />
    </Stack.Navigator>
  )
}
