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
  AllCommentsScreenHeader,
} from "../custom-components"
import { PetsitterDetailInformationScreen } from "../screens/reserve-stack/petsitter-detail-information-screen/petsitter-detail-information-screen"
import IMAGES from "../../assets/common-images"
import { HEIGHT, WIDTH } from "../theme"
import { AllReviewsScreen } from "../screens/petsitter-detail-stack/all-reviews-screen/all-reviews-screen"
import { CaregiverSelfIntroductionScreen } from "../screens/petsitter-detail-stack/caregiver-self-introduction-screen/caregiver-self-introduction-screen"
import { AllCommentsScreen } from "../screens/petsitter-detail-stack/all-comments-screen/all-comments-screen"

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
  "all-reviews-screnn": undefined
  "caregiver-self-introduction-screen": undefined
  "all-comments-screen": undefined
}

// Documentation: https://reactnavigation.org/docs/stack-navigator/
const Stack = createNativeStackNavigator<NavigatorParamList>()

const AppStack = () => {
  const navigation = useNavigation()

  return (
    <Stack.Navigator
      //? header 와 headerTitle 과의 차이점: https://stackoverflow.com/questions/65092435/react-navigation-bar-header-has-a-margin-on-the-left
      screenOptions={{
        headerShown: true,
      }}
      initialRouteName="petsitter-detail-information-screen"
      // initialRouteName="caregiver-self-introduction-screen"
      // initialRouteName="home"
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

      {/* //? 위치(지도) 테스트 화면 */}
      <Stack.Screen name="test-map-screen" component={TestMapScreen} />
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
