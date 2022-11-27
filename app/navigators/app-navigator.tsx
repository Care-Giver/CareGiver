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
  BookingDetailScreen,
  MypageScreen,
  AllPetsScreen,
  SettingScreen,
  ServiceCenterScreen,
} from "#screens"
import { navigationRef, useBackButtonHandler } from "./navigation-utilities"
import {
  GobackAndTitleHeader,
  HomeScreenHeader,
  WritingCommentScreenHeader,
  AllCommentsScreenHeader,
  GobackAndTitleSpacebetweenHeader,
} from "#components"
import { HEADER_ROOT } from "#components/screen-headers/common-styles"
import { images } from "#images"
import { HEIGHT, STANDARD_WIDTH, WIDTH } from "#theme"
import { MinseonTest } from "../screens/test/minseon-test"
import { GestureHandlerRootView } from "react-native-gesture-handler"

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

  // * pay stack
  "payment-request-screen": undefined

  // * mypage stack
  "mypage-screen": undefined
  "all-pets-screen": undefined
  "setting-screen": undefined
  "service-center-screen": undefined

  //* test screens
  "minseon-test": undefined
  "test-map-screen": undefined
}

// Documentation: https://reactnavigation.org/docs/stack-navigator/
const Stack = createNativeStackNavigator<NavigatorParamList>()

const AppStack = () => {
  const navigation = useNavigation()

  return (
    //! "GestureHandlerRootView" is added to fix Bottom Sheet problems on Android
    //? ref: https://github.com/gorhom/react-native-bottom-sheet/issues/895#issuecomment-1103363818
    // <GestureHandlerRootView style={{ flex: 1 }}>
    <Stack.Navigator
      //? header 와 headerTitle 과의 차이점: https://stackoverflow.com/questions/65092435/react-navigation-bar-header-has-a-margin-on-the-left
      screenOptions={{
        headerShown: true,
      }}
      // initialRouteName="home-screen"
      initialRouteName="mypage-screen"
    >
      {/* //* 홈 */}
      <Stack.Screen
        name="home-screen"
        component={HomeScreen}
        options={{
          header: (props) => <HomeScreenHeader {...props} />,
          // headerBackground: () => (
          //   <View
          //     style={{
          //       alignSelf: "center",
          //       flex: 1,
          //       height: "100%",
          //       width: STANDARD_WIDTH,
          //       backgroundColor: "red",
          //       flexDirection: "row",
          //       alignItems: "center",
          //     }}
          //   />
          // ),
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
                navigation.goBack()
              }}
            >
              <Image style={{ width: WIDTH * 28, height: HEIGHT * 28 }} source={images.go_back} />
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
      {/* //! -------- */}

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
    </Stack.Navigator>
    // {/* </GestureHandlerRootView> */}
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
