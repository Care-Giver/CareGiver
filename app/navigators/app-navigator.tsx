/**
 * The app navigator (formerly "AppNavigator" and "MainNavigator") is used for the primary
 * navigation flows of your app.
 * Generally speaking, it will contain an auth flow (registration, login, forgot password)
 * and a "main" flow which the user will use once logged in.
 */
import React from "react"
import { useColorScheme, Image, Pressable, View } from "react-native"
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
  EditPetInfoScreen,
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
  ScreenRootView,
  PreReg18,
  EditPetInfoScreenHeader,
} from "#components"
import { images } from "#images"
import {
  DEVICE_WINDOW_WIDTH,
  GIVER_CASUAL_NAVY,
  GIVER_ROMANTIC_GRAY,
  isWeb,
  STANDARD_WIDTH,
} from "#theme"
import { MinseonTest } from "../screens/test/minseon-test"
import { MaterialCommunityIcons } from "@expo/vector-icons"
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
  "all-pets-screen": undefined
  "setting-screen": undefined
  "service-center-screen": undefined

  // * registration
  "service-registration-screen": undefined
  "facility-registration-screen": undefined

  "edit-mypage-screen": { editable: boolean }
  //!"edit-pet-info-screen": { editable: boolean }

  // * caregiver - set price stack
  "caregiver-set-price-screen": { serviceType: "CRECHE" | "VISIT" }
  "caregiver-set-additional-price-screen": undefined

  //* test screens
  "minseon-test": undefined
  "test-map-screen": undefined
  "test-bottom-sheet": undefined
  TestWebView: undefined
  testPushNotification: undefined
}

const Stack = createNativeStackNavigator<NavigatorParamList>()

const Tab = createBottomTabNavigator()

const AllStacks = () => {
  return (
    <Stack.Navigator
      //? header 와 headerTitle 과의 차이점: https://stackoverflow.com/questions/65092435/react-navigation-bar-header-has-a-margin-on-the-left
      screenOptions={{
        headerShown: true,
        animation: "slide_from_right",
      }}
      initialRouteName="edit-mypage-screen"
      //initialRouteName="home-screen"
      //initialRouteName="edit-pet-info-screen"
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

      {/* //* 예약 확인 */}
      <Stack.Screen
        name="all-bookings-screen"
        component={AllBookingsScreen}
        options={{
          header: (props) => <HomeScreenHeader {...props} />,
        }}
      />

      {/* //* 결제 - 요청사항 */}
      <Stack.Screen
        name="payment-request-screen"
        component={PaymentRequestScreen}
        options={{
          title: "요청사항",
          header: (props) => <GobackAndTitleSpacebetweenHeader {...props} />,
        }}
      />

      {/* //! 마이페이지 스택 */}
      {/* //* 마이페이지 메인 */}
      <Stack.Screen
        name="mypage-screen"
        component={MypageScreen}
        options={{
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
          header: (props) => <EditPetInfoScreenHeader {...props} />,
          //?title?
          headerTitle: "",
        })}
      />

      {/* //! -------- */}

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

      {/* //! 요금 설정 스택 */}
      {/* //* 케어기버 요금 설정 스크린 */}
      <Stack.Screen
        name="caregiver-set-price-screen"
        component={CaregiverSetPriceScreen}
        options={{
          title: "요금 설정",
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
      {/* //! ----------- */}

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
    </Stack.Navigator>
  )
}

const TabStacks = () => {
  const FavoritesStack = () => {
    return (
      <ScreenRootView>
        <View
          style={{
            marginVertical: "auto",
            alignSelf: "center",
          }}
        >
          <PreReg18>즐겨찾기 기능은 곧 추가될 예정입니다 😉</PreReg18>
        </View>
      </ScreenRootView>
    )
  }
  const ChatsStack = () => {
    return (
      <ScreenRootView>
        <View
          style={{
            marginVertical: "auto",
            alignSelf: "center",
          }}
        >
          <PreReg18>채팅기능은 곧 추가될 예정입니다 😉</PreReg18>
        </View>
      </ScreenRootView>
    )
  }

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        // tabBarStyle: [
        //   {
        //     width: STANDARD_WIDTH,
        //     alignSelf: "center",
        //     backgroundColor: "white",
        //   },
        //   isWeb && { paddingTop: 8, paddingBottom: 8 },
        // ],
        headerStyle: [
          {
            backgroundColor: "white",
          },
        ],
        // headerTitleStyle: isWeb && {
        //   color: "black",
        //   marginLeft: (DEVICE_WINDOW_WIDTH - STANDARD_WIDTH) / 2,
        // },
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
          headerShown: true,
          headerTitle: "즐겨찾기(개발중)",
        }}
      />
      <Tab.Screen
        name="Bookings"
        component={AllBookingsScreen}
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
          headerShown: true,
          headerTitle: "예약내역",
        }}
      />
      <Tab.Screen
        name="Searching"
        component={AllStacks}
        options={{
          tabBarLabel: "검색",
          tabBarActiveTintColor: GIVER_CASUAL_NAVY,
          tabBarIcon: ({ focused }) => (
            <MaterialCommunityIcons
              name="search-web"
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
              name="message"
              size={24}
              color={focused ? GIVER_CASUAL_NAVY : GIVER_ROMANTIC_GRAY}
            />
          ),
          headerShown: true,
          headerTitle: "채팅(개발중)",
        }}
      />
      <Tab.Screen
        name="Mypage"
        component={MypageScreen}
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
          header: (props) => <HomeScreenHeader {...props} />,
          headerShown: true,
          headerTitle: "",
        }}
      />
    </Tab.Navigator>
  )
}

const AppStack = () => {
  return (
    // ! "GestureHandlerRootView" is added to fix Bottom Sheet problems on Android
    // ? ref: https://github.com/gorhom/react-native-bottom-sheet/issues/895#issuecomment-1103363818
    //?  <GestureHandlerRootView style={{ flex: 1 }}>
    <>
      <TabStacks />
    </>
  )
}

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
        //?우ㅣ의 예를 따라서 아래와 같이 저도 추가해 봤는데 맞는 건가요..?
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
      <AppStack />
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
