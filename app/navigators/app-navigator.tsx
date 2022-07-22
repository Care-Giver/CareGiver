/**
 * The app navigator (formerly "AppNavigator" and "MainNavigator") is used for the primary
 * navigation flows of your app.
 * Generally speaking, it will contain an auth flow (registration, login, forgot password)
 * and a "main" flow which the user will use once logged in.
 */
import React from "react"
import { useColorScheme, Image, Pressable } from "react-native"
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
  useNavigation,
  StackActions,
} from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { WelcomeScreen, DemoScreen, DemoListScreen } from "../screens"
import { navigationRef, useBackButtonHandler } from "./navigation-utilities"
import { HomeScreen } from "../screens/home-stack/home/home-screen/home-screen"
import { SearchScreen } from "../screens/home-stack/search/search-screen/search-screen"
import { SearchResultScreen } from "../screens/home-stack/search/search-result-screen/search-result-screen"
import { TestMapScreen } from "../screens/home-stack/test-map-screen/test-map-screen"
import {
  GobackAndTitleHeader,
  HomeScreenHeader,
  WritingCommentScreenHeader,
  AllCommentsScreenHeader,
  PreMed12,
} from "../custom-components"
import { PetsitterDetailInformationScreen } from "../screens/reserve-stack/petsitter-detail-information-screen/petsitter-detail-information-screen"
import IMAGES from "~/assets/images"
import { HEIGHT, WIDTH } from "../theme"
import { ViewAllReviewsScreen } from "../screens/petsitter-detail-stack/view-all-reviews-screen/view-all-reviews-screen"
import { WritingCommentScreen } from "../screens/petsitter-detail-stack/writing-comment-screen/writing-comment-screen"
import { AllReviewsScreen } from "../screens/petsitter-detail-stack/all-reviews-screen/all-reviews-screen"
import { MinseonTest } from "../screens/test/minseon-test"
import { CaregiverSelfIntroductionScreen } from "../screens/petsitter-detail-stack/caregiver-self-introduction-screen/caregiver-self-introduction-screen"
import { AllCommentsScreen } from "../screens/petsitter-detail-stack/all-comments-screen/all-comments-screen"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { CARE_NATURAL_BLUE, GIVER_CASUAL_NAVY } from "../theme/palette"

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
  welcome: undefined
  demo: undefined
  demoList: undefined
  // 🔥 Your screens go here
  home: undefined
  search: undefined
  "search-result": undefined
  "test-map-screen": undefined
  "petsitter-detail-information-screen": undefined
  "all-reviews-screen": undefined
  "caregiver-self-introduction-screen": undefined
  "all-comments-screen": undefined
  //? test
  "minseon-test": undefined
}

// Documentation: https://reactnavigation.org/docs/stack-navigator/
const Stack = createNativeStackNavigator<NavigatorParamList>()

const AppStack = () => {
  const navigation = useNavigation()

  // return BottomTabNavigator() //! screen stack 계층 정리 이후, bottom-navigator 적용 완료할 것

  return (
    <Stack.Navigator
      //? header 와 headerTitle 과의 차이점: https://stackoverflow.com/questions/65092435/react-navigation-bar-header-has-a-margin-on-the-left
      screenOptions={{
        headerShown: true,
      }}
      initialRouteName="home"
      // initialRouteName="minseon-test"
      // initialRouteName="petsitter-detail-information-screen"
      // initialRouteName="caregiver-self-introduction-screen"
      // initialRouteName="all-reviews-screen"
    >
      <Stack.Screen name="welcome" component={WelcomeScreen} />
      <Stack.Screen name="demo" component={DemoScreen} />
      <Stack.Screen name="demoList" component={DemoListScreen} />
      {/** 🔥 Your screens go here */}

      {/* //* 홈 */}
      <Stack.Screen
        name="home"
        component={HomeScreen}
        options={{
          header: (props) => <HomeScreenHeader {...props} />,
        }}
      />

      {/* //* 검색 */}
      <Stack.Screen
        name="search"
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
        name="petsitter-detail-information-screen"
        component={PetsitterDetailInformationScreen}
        options={{
          headerTransparent: true,
          headerLeft: (props) => (
            <Pressable
              onPress={() => {
                navigation.goBack()
              }}
            >
              <Image style={{ width: WIDTH * 28, height: HEIGHT * 28 }} source={IMAGES.go_back} />
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

      {/* //? 민선 테스트 */}
      <Stack.Screen
        name="minseon-test"
        component={MinseonTest}
        options={{
          header: (props) => <GobackAndTitleHeader {...props} />,
        }}
      />

      {/* //? 위치(지도) 테스트 화면 */}
      <Stack.Screen name="test-map-screen" component={TestMapScreen} />

      {/* //* 댓글쓰기 */}
      <Stack.Screen
        name="writing-comment-screen"
        component={WritingCommentScreen}
        options={{
          header: (props) => <WritingCommentScreenHeader {...props} />,
        }}
      />
    </Stack.Navigator>
  )
}

interface NavigationProps extends Partial<React.ComponentProps<typeof NavigationContainer>> {}

export const AppNavigator = (props: NavigationProps) => {
  const colorScheme = useColorScheme()
  useBackButtonHandler(canExit)
  return (
    <NavigationContainer
      ref={navigationRef}
      theme={colorScheme === "dark" ? DarkTheme : DefaultTheme}
      {...props}
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

//* bottom-tab-navigator 코드
const Tab = createBottomTabNavigator()
function BottomTabNavigator() {
  return (
    <Tab.Navigator
      initialRouteName="home"
      screenOptions={{
        tabBarShowLabel: true,
        tabBarStyle: {
          // backgroundColor: "pink",
          // justifyContent: "center",
          // alignItems: "center",
        },
        tabBarHideOnKeyboard: true,
      }}
    >
      <Tab.Screen
        name="favorite"
        component={AllCommentsScreen}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <Image
              source={focused ? IMAGES.favorite_navy : IMAGES.favorite_grey}
              style={{
                width: WIDTH * 28,
                height: HEIGHT * 28,
                backgroundColor: "transparent",
                marginTop: HEIGHT * 6,
              }}
            />
          ),
          tabBarLabel: ({ focused }) => (
            <PreMed12
              text={focused ? "즐겨찾기" : ""}
              color={GIVER_CASUAL_NAVY}
              style={{ marginBottom: HEIGHT * 6 }}
            />
          ),
          // tabBarBadge: 3,
        }}
      />
      <Tab.Screen
        name="schedule"
        component={TestMapScreen}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <Image
              source={focused ? IMAGES.schedule_navy : IMAGES.schedule_grey}
              style={{
                width: WIDTH * 28,
                height: HEIGHT * 28,
                backgroundColor: "transparent",
                marginTop: HEIGHT * 6,
              }}
            />
          ),
          tabBarLabel: ({ focused }) => (
            <PreMed12
              text={focused ? "일정" : ""}
              color={GIVER_CASUAL_NAVY}
              style={{ marginBottom: HEIGHT * 6 }}
            />
          ),
          // tabBarBadge: 3,
        }}
      />
      <Tab.Screen
        name="home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <Image
              source={focused ? IMAGES.search_navy : IMAGES.search_grey}
              style={{
                width: WIDTH * 28,
                height: HEIGHT * 28,
                backgroundColor: "transparent",
                marginTop: HEIGHT * 6,
              }}
            />
          ),
          tabBarLabel: ({ focused }) => (
            <PreMed12
              text={focused ? "검색" : ""}
              color={GIVER_CASUAL_NAVY}
              style={{ marginBottom: HEIGHT * 6 }}
            />
          ),
        }}
      />

      <Tab.Screen
        name="chatting"
        component={WritingCommentScreen}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <Image
              source={focused ? IMAGES.chatting_navy : IMAGES.chatting_grey}
              style={{
                width: WIDTH * 28,
                height: HEIGHT * 28,
                backgroundColor: "transparent",
                marginTop: HEIGHT * 6,
              }}
            />
          ),
          tabBarLabel: ({ focused }) => (
            <PreMed12
              text={focused ? "채팅" : ""}
              color={GIVER_CASUAL_NAVY}
              style={{ marginBottom: HEIGHT * 6 }}
            />
          ),
        }}
      />

      <Tab.Screen
        name="myinfo"
        component={AllReviewsScreen}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <Image
              source={focused ? IMAGES.myinfo_navy : IMAGES.myinfo_grey}
              style={{
                width: WIDTH * 28,
                height: HEIGHT * 28,
                backgroundColor: "transparent",
                marginTop: HEIGHT * 6,
              }}
            />
          ),
          tabBarLabel: ({ focused }) => (
            <PreMed12
              text={focused ? "내정보" : ""}
              color={GIVER_CASUAL_NAVY}
              style={{ marginBottom: HEIGHT * 6 }}
            />
          ),
        }}
      />
    </Tab.Navigator>
  )
}
