/**
 * 로그인 화면과 회원가입 화면을 담당하는 스택 네비게이터 입니다.
 * 전부 StackNavigator로 구현되어 있습니다.
 * @see https://reactnavigation.org/docs/stack-navigator/
 *
 * @param {LoginSignUpStackNavigatorParamList} LoginSignUpStackNavigatorParamList - 로그인 + 회원가입 스택 네비게이터의 파라미터 리스트 타입 입니다.
 *
 * @function LoginSignUpStack - 로그인 + 회원가입 스택
 */
import React from "react"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import {
  ConsentList,
  LoginScreen,
  SignUpScreen,
  SignUpSuccessScreen,
  TermsOfServiceScreen,
} from "#screens"
import { GobackAndTitleHeader } from "#components"

export type LoginSignUpStackNavigatorParamList = {
  "login-screen": undefined
  "terms-of-service-screen": undefined
  "sign-up-screen": { consentList: ConsentList }
  "sign-up-success-screen": undefined
}

const Stack = createNativeStackNavigator<LoginSignUpStackNavigatorParamList>()

/**
 * 로그인 + 회원가입 스택
 */
export const LoginSignUpStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: true,
        animation: "slide_from_right",
      }}
      // initialRouteName="login-screen"ㄱ
    >
      <Stack.Screen
        name="login-screen"
        component={LoginScreen}
        options={{
          title: "로그인",
          headerShown: false,
        }}
      />

      {/* 회원가입 - 1 */}
      <Stack.Screen
        name="terms-of-service-screen"
        component={TermsOfServiceScreen}
        options={{
          title: "약관동의",
          header: (props) => <GobackAndTitleHeader {...props} />,
        }}
      />

      {/* 회원가입 - 2 */}
      <Stack.Screen
        name="sign-up-screen"
        component={SignUpScreen}
        options={{
          title: "필수 정보 입력",
          header: (props) => {
            return <GobackAndTitleHeader {...props} />
          },
        }}
      />

      {/* 회원가입 - 3 */}
      <Stack.Screen
        name="sign-up-success-screen"
        component={SignUpSuccessScreen}
        options={{
          title: "회원가입 성공",
          header: (props) => <GobackAndTitleHeader {...props} />,
        }}
      />
    </Stack.Navigator>
  )
}
