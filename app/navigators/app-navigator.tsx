/**
 * The app navigator (formerly "AppNavigator" and "MainNavigator") is used for the primary
 * navigation flows of your app.
 * Generally speaking, it will contain an auth flow (registration, login, forgot password)
 * and a "main" flow which the user will use once logged in.
 */
import React, { useEffect } from "react"
import { useColorScheme, Image, Pressable, View, ViewStyle, Platform } from "react-native"
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
  useNavigation,
} from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import {
  WritingCommentScreen,
  HomeScreen,
  SearchScreen,
  SearchResultScreen,
  // TestMapScreen,
  CaregiverDetailInformationScreen,
  CaregiverSelfIntroductionScreen,
  AllCommentsScreen,
  AllReviewsScreen,
  AllBookingsScreen,
  PaymentRequestScreen,
  MypageScreen,
  AllPetsScreen,
  SettingScreen,
  ServiceCenterScreen,
  ServiceRegistrationScreen,
  EditMypageScreen,
  FacilityRegistrationScreen,
  TestWebViewScreen,
  TestPushNotificationScreen,
  CaregiverSetPriceScreen,
  CaregiverSetAdditionalPriceScreen,
  TestBottomSheetScreen,
  FavoritesScreen,
  EditPetInfoScreen,
  KakaoLoginTestScreen,
  CgCalendarScreen,
  CgCertificateRegistrationScreen,
  CgSetAddressScreen,
  ManageBookingScreen,
  CgCalendarListScreen,
  CgMypageScreen,
  BookingDetailScreen,
  LoginScreen,
  CancelReservationScreen,
  SetVisitingServiceDayScreen,
  SetCrecheServiceDayScreen,
  PastBookingsScreen,
  MakeBookingScreen,
  PaymentScreen,
  TestIamportScreen,
  TestIamportPaymentScreen,
  TestIamportPaymentResultScreen,
  TestNetworkErrorScreen,
  WriteReviewScreen,
  ViewReviewScreen,
} from "#screens"
import { goBack, navigationRef, useBackButtonHandler } from "./navigation-utilities"
import {
  GobackAndTitleHeader,
  HomeScreenHeader,
  WritingCommentScreenHeader,
  AllCommentsScreenHeader,
  EditMypageScreenHeader,
  GobackAndTitleSpacebetweenHeader,
  GobackAndTitleAndButtonHeader,
  Screen,
  PreReg18,
  EditPetInfoScreenHeader,
  CgScreenHeader,
  Loading,
  CgCertificateRegistrationScreenHeader,
  PreMed16,
  CgsetAddressHeader,
} from "#components"
import { images } from "../../assets/images"
import { BOTTOM_TAB_NAVIGATOR, GIVER_CASUAL_NAVY, GIVER_ROMANTIC_GRAY } from "../theme"
import { MinseonTest } from "../screens/test/minseon-test"
import { MaterialCommunityIcons } from "@expo/vector-icons"
import { PetsitterType, ServiceType, Type, useStores } from "../models"
import { observer } from "mobx-react-lite"
import { useShowBottomTab } from "../utils/hooks"
//import { Row } from "../basics/row/row"

/**
 * This type allows TypeScript to know what routes are defined in this navigator
 * as well as what properties (if any) they might take when navigating to them.
 *
 * If no params are allowed, pass through `undefined`. Generally speaking, we
 * recommend using your MobX-State-Tree store(s) to keep application state
 * rather than passing state through navigation params.
 *
 * For more information, see this documentation:
 *   https://reactnavigation.org/docs/params/
 *   https://reactnavigation.org/docs/typescript#type-checking-the-navigator
 */

export type NavigatorParamList = {
  //* general screens
  "home-screen": undefined
  "search-screen": undefined
  "search-result": undefined
  "caregiver-detail-information-screen": undefined
  "all-reviews-screen": undefined
  "caregiver-self-introduction-screen": undefined
  "all-comments-screen": undefined
  "writing-comment-screen": undefined
  "all-bookings-screen": undefined
  "booking-detail-screen": undefined
  "favorites-screen": undefined

  // * pay stack
  "payment-request-screen": undefined

  // * mypage stack
  "mypage-screen": undefined
  "login-screen": undefined
  "all-pets-screen": undefined
  "setting-screen": undefined
  "service-center-screen": undefined

  // * registration
  "service-registration-screen": undefined
  "facility-registration-screen": undefined

  "edit-mypage-screen": { editable: boolean }
  "edit-pet-info-screen": { editable: boolean; isBackPressed: boolean }

  // * caregiver - set price stack
  "caregiver-set-price-screen": { serviceType: "CRECHE" | "VISIT" }
  "caregiver-set-additional-price-screen": undefined

  // CG - 달력 스택
  "cg-calendar-list-screen": undefined
  "set-visiting-service-day-screen": { date: Date; crecheId: number }
  "set-creche-service-day-screen": { date: Date; crecheId: number }

  // CG - 예약관리 스택
  "manage-booking-screen": undefined

  // CG - 내정보 스택
  "cg-mypage-screen": undefined

  // * review stack
  "write-review-screen": {
    profileImage: string | null
    petsitterName: string
    petsitterType: PetsitterType
    petsitterId: number
    bookingId: number
    serviceType: ServiceType
    desc: string
  }
  "view-review-screen": {
    serviceType: ServiceType
    bookingId: number
    profileImage?: string
    petsitterName: string
    desc: string
  }

  // ? 지난 예약 내역 스크린
  "past-bookings-screen": undefined

  //* test screens
  "minseon-test": undefined
  "test-map-screen": undefined
  "test-bottom-sheet": undefined
  "test-web-view-screen": undefined
  "temp-screen": undefined
  "kakao-login-test-screen": undefined
  "cg-calendar-screen": undefined
  "cg-certificate-registration-screen": undefined
  "cg-set-address-screen": undefined
  "ye-beom-test-screen": undefined
  "test-push-notification-screen": undefined
  "make-booking-screen": undefined
  "payment-screen": undefined
  "test-network-error-screen": undefined
  // iamport 테스트
  "test-iamport-screen": undefined
  "test-iamport-payment-screen": undefined
  "test-iamport-payment-result-screen": any
  "cancel-reservation-screen": undefined
}

const Stack = createNativeStackNavigator<NavigatorParamList>()
const Tab = createBottomTabNavigator()

/**
 * 즐겨찾기 스택
 */
const FavoritesStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: true,
        animation: "slide_from_right",
      }}
      initialRouteName="favorites-screen"
    >
      {/* //* 즐겨찾기 메인 */}
      <Stack.Screen
        name="favorites-screen"
        component={FavoritesScreen}
        options={{
          header: (props) => <HomeScreenHeader {...props} />,
        }}
      />
    </Stack.Navigator>
  )
}

/**
 * 예약내역 스택
 */
const BookingsStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: true,
        animation: "slide_from_right",
      }}
      initialRouteName="all-bookings-screen"
    >
      {/* //* 예약내역 메인 */}
      <Stack.Screen
        name="all-bookings-screen"
        component={AllBookingsScreen}
        options={{
          header: (props) => <HomeScreenHeader {...props} />,
        }}
      />

      {/* //* 예약내역 상세 */}
      <Stack.Screen
        name="booking-detail-screen"
        component={BookingDetailScreen}
        options={{
          title: "예약내역 상세",
          header: (props) => <GobackAndTitleHeader {...props} />,
        }}
      />

      {/* //* 지난 예약 내역 스크린 */}
      <Stack.Screen
        name="past-bookings-screen"
        component={PastBookingsScreen}
        options={{
          title: "지난 예약",
          header: (props) => <GobackAndTitleHeader {...props} />,
        }}
      />

      {/* //* 리뷰 작성 페이지 */}
      <Stack.Screen
        name="write-review-screen"
        component={WriteReviewScreen}
        options={{
          title: "후기 작성",
          header: (props) => <GobackAndTitleHeader {...props} />,
        }}
      />

      {/* //* 작성 리뷰 확인 페이지 */}
      <Stack.Screen
        name="view-review-screen"
        component={ViewReviewScreen}
        options={{
          title: "나의 후기",
          header: (props) => <GobackAndTitleHeader {...props} />,
        }}
      />
    </Stack.Navigator>
  )
}

/**
 * 검색 스택
 */
const SearchingStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: true,
        animation: "slide_from_right",
      }}
      initialRouteName="home-screen"
    >
      {/* //* 홈 */}
      <Stack.Screen
        name="home-screen"
        component={HomeScreen}
        options={{
          header: (props) => <HomeScreenHeader {...props} />,
        }}
      />

      {/* //* 검색 */}
      <Stack.Screen
        name="search-screen"
        component={SearchScreen}
        options={{
          header: (props) => <GobackAndTitleHeader {...props} />,
        }}
      />

      {/* //* 검색결과 */}
      <Stack.Screen
        name="search-result"
        component={SearchResultScreen}
        options={{
          header: (props) => <GobackAndTitleHeader {...props} />,
        }}
      />

      {/* //* 펫시터 상세정보 */}
      <Stack.Screen
        name="caregiver-detail-information-screen"
        component={CaregiverDetailInformationScreen}
        // TODO: web 에서 스타일링 고장남. 고쳐야 함
        options={{
          headerTransparent: true,
          headerLeft: (props) => (
            <Pressable
              onPress={() => {
                goBack()
              }}
            >
              <Image style={{ width: 28, height: 28 }} source={images.go_back} />
            </Pressable>
          ),
          // title: null,
          headerTitle: "",
        }}
      />

      {/* 결제 정보 */}
      <Stack.Screen
        name="payment-screen"
        component={PaymentScreen}
        options={{
          title: "결제 정보",
          header: (props) => <GobackAndTitleHeader {...props} />,
        }}
      />

      {/* //* 리뷰 전체보기 */}
      <Stack.Screen
        name="all-reviews-screen"
        component={AllReviewsScreen}
        options={{
          header: (props) => <GobackAndTitleHeader {...props} />,
        }}
      />

      {/* //* 자기소개 전체보기 */}
      <Stack.Screen
        name="caregiver-self-introduction-screen"
        component={CaregiverSelfIntroductionScreen}
        options={{
          title: "자기소개",
          header: (props) => <GobackAndTitleHeader {...props} />,
        }}
      />

      {/* //* 댓글 전체보기 */}
      <Stack.Screen
        name="all-comments-screen"
        component={AllCommentsScreen}
        options={{
          title: "댓글 전체보기",
          header: (props) => <AllCommentsScreenHeader {...props} />,
        }}
      />

      {/* //* 댓글쓰기 */}
      <Stack.Screen
        name="writing-comment-screen"
        component={WritingCommentScreen}
        options={{
          header: (props) => <WritingCommentScreenHeader {...props} />,
        }}
      />

      {/* //* (구)요청사항 */}
      {/* <Stack.Screen
        name="payment-request-screen"
        component={PaymentRequestScreen}
        options={{
          title: "요청사항",
          header: (props) => <GobackAndTitleSpacebetweenHeader {...props} />,
        }}
      /> */}

      {/*// 요청 사항 (결제 직전 스크린 입니다. 이 스크린에서 결제스크린으로 넘어갑니다. )  */}
      <Stack.Screen
        name="make-booking-screen"
        component={MakeBookingScreen}
        options={{
          title: "요청 사항",
          header: (props) => <GobackAndTitleHeader {...props} />,
        }}
      />

      {/* //- 테스트 스크린들은 아래에다가 ================================================================ */}

      {/* //? 민선 테스트 */}
      <Stack.Screen
        name="minseon-test"
        component={MinseonTest}
        options={{
          header: (props) => <GobackAndTitleHeader {...props} />,
        }}
      />

      {/* //? 위치(지도) 테스트 화면 */}
      {/* <Stack.Screen name="test-map-screen" component={TestMapScreen} /> */}
      <Stack.Screen name="test-web-view-screen" component={TestWebViewScreen} />

      {/* //? 푸시알림 테스트 화면 */}
      <Stack.Screen name="test-push-notification-screen" component={TestPushNotificationScreen} />

      {/* //? bottom-sheet 테스트 화면 */}
      <Stack.Screen name="test-bottom-sheet" component={TestBottomSheetScreen} />

      {/* //* iamport test */}
      <Stack.Screen
        name="test-iamport-screen"
        component={TestIamportScreen}
        options={{
          title: "결제테스트 세팅",
          header: (props) => <GobackAndTitleHeader {...props} />,
        }}
      />

      {/* //* iamport test */}
      <Stack.Screen
        name="test-iamport-payment-screen"
        component={TestIamportPaymentScreen}
        options={{
          title: "결제 진행중",
          header: (props) => <GobackAndTitleHeader {...props} />,
        }}
      />

      {/* //* iamport test */}
      <Stack.Screen
        name="test-iamport-payment-result-screen"
        component={TestIamportPaymentResultScreen}
        options={{
          title: "결제 결과",
          header: (props) => <GobackAndTitleHeader {...props} />,
        }}
      />

      {/* hotfix/network-error */}
      <Stack.Screen
        name="test-network-error-screen"
        component={TestNetworkErrorScreen}
        options={{
          header: (props) => <HomeScreenHeader {...props} />,
        }}
      />
    </Stack.Navigator>
  )
}

/**
 * 채팅 스택 || CG - 채팅 스택
 */
const ChatsStack = observer(function ChatsStack() {
  const {
    userStore: { type },
  } = useStores()

  const TempChatScreen = ({ navigation }) => {
    useShowBottomTab(navigation)

    return (
      <Screen>
        <View
          style={{
            marginVertical: 200,
            alignSelf: "center",
          }}
        >
          <PreReg18>채팅기능은 곧 추가될 예정입니다 😉</PreReg18>
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
      initialRouteName="temp-chat-screen"
    >
      {/* //* 채팅 메인 */}
      <Stack.Screen
        //  @ts-ignore
        name="temp-chat-screen"
        component={TempChatScreen}
        options={{
          header: (props) =>
            type === Type.CLIENT ? <HomeScreenHeader {...props} /> : <CgScreenHeader {...props} />,
        }}
      />
    </Stack.Navigator>
  )
})

/**
 * 내정보 스택
 */
const MypageStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: true,
        animation: "slide_from_right",
      }}
      initialRouteName="mypage-screen"
    >
      {/* //* 마이페이지 메인 */}
      <Stack.Screen
        name="mypage-screen"
        component={MypageScreen}
        options={{
          header: (props) => <HomeScreenHeader {...props} />,
        }}
      />

      {/* 로그인 */}
      <Stack.Screen
        name="login-screen"
        component={LoginScreen}
        options={{
          title: "로그인",
          header: (props) => <HomeScreenHeader {...props} />,
        }}
      />

      {/* //* 반려동물 전체보기 */}
      <Stack.Screen
        name="all-pets-screen"
        component={AllPetsScreen}
        options={{
          title: "나의 반려동물",
          header: (props) => <GobackAndTitleHeader {...props} />,
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

      {/* //* 고객센터 스크린 */}
      <Stack.Screen
        name="service-center-screen"
        component={ServiceCenterScreen}
        options={{
          title: "고객센터",
          header: (props) => <GobackAndTitleHeader {...props} />,
        }}
      />

      {/* //* 내 프로필 관리 */}
      <Stack.Screen
        name="edit-mypage-screen"
        component={EditMypageScreen}
        options={({ navigation, route }) => ({
          //! FEEDBACK: 컴포넌트로 따로 빼는 방법은 매우 간단합니다. 만드신 컴포넌트를 header prop 에 리턴값이 있는 함수 형태 `() => ()` 로 넣어주면 됩니다. header prop을 그대로 컴포넌트에 넘겨주기위해, spread operator (...) 를 사용해서 {...props} 을 써줘야하는 것을 잊지 마세요!
          headerShadowVisible: false,
          header: (props) => <EditMypageScreenHeader {...props} />,
          /*//?headerTitle은 ios 에서 가운데 정렬이 기본이라 위의 headerleft 에서 다 해결했는데 괜찮은걸까.... 
           * headerTitleAlign: "left",
          headerTitle: (props) => (
            <PreMed18 style={{ marginLeft: 0 }}> {"내 프로필 관리"}</PreMed18>
          ),*/
          headerTitle: "",
        })}
      />

      {/* //* 반려동물 정보 수정 */}
      <Stack.Screen
        name="edit-pet-info-screen"
        component={EditPetInfoScreen}
        options={({ navigation, route }) => ({
          //?need? headerShadowVisible: false,
          title: "반려동물 정보 수정",
          header: (props) => <EditPetInfoScreenHeader {...props} />,

          //?headerTitle: "",
        })}
      />
    </Stack.Navigator>
  )
}

/**
 * 클라이언트(반려인) 전용 탭들
 */
const ClientTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: { display: "none" },
        tabBarLabelStyle: {
          paddingBottom: Platform.select({
            android: 8,
            ios: 0,
          }),
        },
        headerShown: false,
        headerStyle: { backgroundColor: "white" },
      }}
      initialRouteName="Searching"
    >
      <Tab.Screen
        name="Favorites"
        component={FavoritesStack}
        options={{
          tabBarLabel: "즐겨찾기",
          tabBarActiveTintColor: GIVER_CASUAL_NAVY,
          tabBarIcon: ({ focused }) => (
            <MaterialCommunityIcons
              name="cards-heart"
              size={24}
              color={focused ? GIVER_CASUAL_NAVY : GIVER_ROMANTIC_GRAY}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Bookings"
        component={BookingsStack}
        options={{
          tabBarLabel: "예약내역",
          tabBarActiveTintColor: GIVER_CASUAL_NAVY,
          tabBarIcon: ({ focused }) => (
            <MaterialCommunityIcons
              name="calendar-multiselect"
              size={24}
              color={focused ? GIVER_CASUAL_NAVY : GIVER_ROMANTIC_GRAY}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Searching"
        component={SearchingStack}
        options={{
          tabBarLabel: "검색",
          tabBarActiveTintColor: GIVER_CASUAL_NAVY,
          tabBarIcon: ({ focused }) => (
            <MaterialCommunityIcons
              name="magnify"
              size={24}
              color={focused ? GIVER_CASUAL_NAVY : GIVER_ROMANTIC_GRAY}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Chats"
        component={ChatsStack}
        options={{
          tabBarLabel: "채팅",
          tabBarActiveTintColor: GIVER_CASUAL_NAVY,
          tabBarIcon: ({ focused }) => (
            <MaterialCommunityIcons
              name="forum"
              size={24}
              color={focused ? GIVER_CASUAL_NAVY : GIVER_ROMANTIC_GRAY}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Mypage"
        component={MypageStack}
        options={{
          tabBarLabel: "내정보",
          tabBarActiveTintColor: GIVER_CASUAL_NAVY,
          tabBarIcon: ({ focused }) => (
            <MaterialCommunityIcons
              name="account"
              size={24}
              color={focused ? GIVER_CASUAL_NAVY : GIVER_ROMANTIC_GRAY}
            />
          ),
        }}
      />
    </Tab.Navigator>
  )
}

// ===========================================================================================================
// ===========================================================================================================
// ===========================================================================================================

/**
 * CG - 통계 스택
 */
const StatisticsStack = () => {
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
const CgBookingsStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: true,
        animation: "slide_from_right",
      }}
      //  @ts-ignore
      initialRouteName="manage-booking-screen"
    >
      {/* //* 예약관리 메인 */}
      <Stack.Screen
        name="manage-booking-screen"
        component={ManageBookingScreen}
        options={{
          header: (props) => <CgScreenHeader {...props} />,
        }}
      />
    </Stack.Navigator>
  )
}

/**
 * CG - 달력 스택
 */
const CalendarStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: true,
        animation: "slide_from_right",
      }}
      initialRouteName="cg-calendar-list-screen"
    >
      <Stack.Screen
        name="cg-calendar-list-screen"
        component={CgCalendarListScreen}
        options={{
          header: (props) => <CgScreenHeader {...props} />,
        }}
      />

      {/* CG - 달력 */}
      <Stack.Screen
        name="cg-calendar-screen"
        component={CgCalendarScreen}
        options={{
          header: (props) => <GobackAndTitleHeader {...props} />,
        }}
      />

      {/* CG - 위탁, 날짜 별 서비스 수정 */}
      <Stack.Screen
        name="set-creche-service-day-screen"
        component={SetCrecheServiceDayScreen}
        options={{
          title: "날짜 별 서비스 수정",
          header: (props) => <GobackAndTitleHeader {...props} />,
        }}
      />

      {/* CG - 방문, 날짜 별 서비스 수정 */}
      <Stack.Screen
        name="set-visiting-service-day-screen"
        component={SetVisitingServiceDayScreen}
        options={{
          title: "날짜 별 서비스 수정",
          header: (props) => <GobackAndTitleHeader {...props} />,
        }}
      />
    </Stack.Navigator>
  )
}

/**
 * CG - 내정보 스택
 */
const CgMypageStack = () => {
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

      {/* 로그인 */}
      <Stack.Screen
        name="login-screen"
        component={LoginScreen}
        options={{
          title: "로그인",
          header: (props) => <HomeScreenHeader {...props} />,
        }}
      />

      {/* //* CG - 지도상에서 위치 설정 */}
      <Stack.Screen
        name="cg-set-address-screen"
        component={CgSetAddressScreen}
        options={{
          title: " ",
          header: (props) => <CgsetAddressHeader {...props} />,
        }}
      />

      {/* CG - 자격증 등록 */}
      <Stack.Screen
        name="cg-certificate-registration-screen"
        component={CgCertificateRegistrationScreen}
        options={{ header: (props) => <CgCertificateRegistrationScreenHeader {...props} /> }}
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

      {/* //* 고객센터 스크린 */}
      <Stack.Screen
        name="service-center-screen"
        component={ServiceCenterScreen}
        options={{
          title: "고객센터",
          header: (props) => <GobackAndTitleHeader {...props} />,
        }}
      />

      {/* //! 요금 설정 BEGIN ================ */}
      {/* //* 케어기버 요금 설정 스크린 */}
      <Stack.Screen
        name="caregiver-set-price-screen"
        component={CaregiverSetPriceScreen}
        options={{
          title: " ",
          header: (props) => <GobackAndTitleHeader {...props} />,
        }}
      />

      <Stack.Screen
        name="caregiver-set-additional-price-screen"
        component={CaregiverSetAdditionalPriceScreen}
        options={{
          title: "강아지 크기 별 추가 요금 설정",
          header: (props) => <GobackAndTitleHeader {...props} />,
        }}
      />
      {/* //! 요금 설정 ENDED ================ */}
    </Stack.Navigator>
  )
}

/**
 * CG 스크린들 (아직 정리 안 됨)
 */
const NOT_ORGANISED_CG_SCREENS = () => {
  return (
    <Stack.Navigator
      //? header 와 headerTitle 과의 차이점: https://stackoverflow.com/questions/65092435/react-navigation-bar-header-has-a-margin-on-the-left
      screenOptions={{
        headerShown: true,
        animation: "slide_from_right",
      }}
      initialRouteName="service-registration-screen"
    >
      {/* //! 등록 스택 */}
      {/* //* 서비스 등록 스크린 */}
      <Stack.Screen
        name="service-registration-screen"
        component={ServiceRegistrationScreen}
        options={{
          title: "서비스 등록",
          header: (props) => <GobackAndTitleHeader {...props} />,
        }}
      />

      {/* //* 편의시설 등록 스크린 */}
      <Stack.Screen
        name="facility-registration-screen"
        component={FacilityRegistrationScreen}
        options={{
          title: "근처 편의시설 등록",
          header: (props) => <GobackAndTitleHeader {...props} />,
        }}
      />
      {/* //! ------- */}

      {/* //* 클라이언트 - 즐겨찾기 */}
      <Stack.Screen
        name="favorites-screen"
        component={FavoritesScreen}
        options={{
          header: (props) => <HomeScreenHeader {...props} />,
        }}
      />

      {/* //- 테스트 스크린들은 아래에다가 ================================================================ */}

      {/* //? 민선 테스트 */}
      <Stack.Screen
        name="minseon-test"
        component={MinseonTest}
        options={{
          header: (props) => <GobackAndTitleHeader {...props} />,
        }}
      />
      {/* //? 위치(지도) 테스트 화면 */}
      {/* <Stack.Screen name="test-map-screen" component={TestMapScreen} /> */}
      <Stack.Screen name="TestWebView" component={TestWebViewScreen} />

      {/* //? 푸시알림 테스트 화면 */}
      <Stack.Screen name="testPushNotification" component={TestPushNotificationScreen} />

      {/* //? bottom-sheet 테스트 화면 */}
      <Stack.Screen name="test-bottom-sheet" component={TestBottomSheetScreen} />

      {/* //? 카카오 로그인 테스트 화면 */}
      <Stack.Screen name="kakao-login-test-screen" component={KakaoLoginTestScreen} />
    </Stack.Navigator>
  )
}

/**
 * 케어기버 전용 탭들
 */
const CareGiverTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: { display: "none" },
        tabBarLabelStyle: {
          paddingBottom: Platform.select({
            android: 8,
            ios: 0,
          }),
        },
        headerShown: false,
        headerStyle: { backgroundColor: GIVER_CASUAL_NAVY },
        headerTitleStyle: { color: "white" },
      }}
      initialRouteName="Calendar"
    >
      <Tab.Screen
        name="Statistics"
        component={StatisticsStack}
        options={{
          tabBarLabel: "통계",
          tabBarActiveTintColor: GIVER_CASUAL_NAVY,
          tabBarIcon: ({ focused }) => (
            <MaterialCommunityIcons
              name="elevation-rise"
              size={24}
              color={focused ? GIVER_CASUAL_NAVY : GIVER_ROMANTIC_GRAY}
            />
          ),
        }}
      />
      <Tab.Screen
        name="CgBookings"
        component={CgBookingsStack}
        options={{
          tabBarLabel: "예약 관리",
          tabBarActiveTintColor: GIVER_CASUAL_NAVY,
          tabBarIcon: ({ focused }) => (
            <MaterialCommunityIcons
              name="pencil"
              size={24}
              color={focused ? GIVER_CASUAL_NAVY : GIVER_ROMANTIC_GRAY}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Calendar"
        component={CalendarStack}
        options={{
          tabBarLabel: "달력",
          tabBarActiveTintColor: GIVER_CASUAL_NAVY,
          tabBarIcon: ({ focused }) => (
            <MaterialCommunityIcons
              name="calendar-blank"
              size={24}
              color={focused ? GIVER_CASUAL_NAVY : GIVER_ROMANTIC_GRAY}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Chats"
        component={ChatsStack}
        options={{
          tabBarLabel: "채팅",
          tabBarActiveTintColor: GIVER_CASUAL_NAVY,
          tabBarIcon: ({ focused }) => (
            <MaterialCommunityIcons
              name="forum"
              size={24}
              color={focused ? GIVER_CASUAL_NAVY : GIVER_ROMANTIC_GRAY}
            />
          ),
        }}
      />
      <Tab.Screen
        name="CgMypage"
        component={CgMypageStack}
        options={{
          tabBarLabel: "내정보",
          tabBarActiveTintColor: GIVER_CASUAL_NAVY,
          tabBarIcon: ({ focused }) => (
            <MaterialCommunityIcons
              name="account"
              size={24}
              color={focused ? GIVER_CASUAL_NAVY : GIVER_ROMANTIC_GRAY}
            />
          ),
        }}
      />
    </Tab.Navigator>
  )
}

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

export const AppNavigator = (props: NavigationProps) => {
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

  return (
    <NavigationContainer
      ref={navigationRef}
      theme={colorScheme === "dark" ? DarkTheme : DefaultTheme}
      {...props}
      linking={linking}
    >
      <AllTabs />
    </NavigationContainer>
  )
}

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
