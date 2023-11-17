import React, { FC, useState } from "react"
import { observer } from "mobx-react-lite"
import { StackScreenProps } from "@react-navigation/stack"
import { NavigatorParamList } from "#navigators"
import { PreBol20, Screen } from "#components"
import { Text, StyleSheet, View, ScrollView } from "react-native"
import {
  login,
  logout,
  unlink,
  getProfile,
  getAccessToken,
  KakaoOAuthToken,
  KakaoProfile,
} from "@react-native-seoul/kakao-login"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "../../models"

// [주의] app/navigators/app-navigator.tsx 에 위치한, NavigatorParamList 변수에 새로운 값 "xxxx-screen": undefined 을 추가해주세요.
// 그 뒤에는 아래에 있는 @ts-ignore 를 제거해도, 빨간줄이 뜨지 않습니다 :)
// @ts-ignore
export const KakaoLoginTestScreen: FC<
  StackScreenProps<NavigatorParamList, "kakao-login-test-screen">
> = observer(function KakaoLoginTestScreen() {
  // MST store 를 가져옵니다.
  // const { someStore, anotherStore } = useStores()

  // 필요시, useNavigation 훅을 사용할 수 있습니다.
  // const navigation = useNavigation()

  const [result, setResult] = useState<string>("")

  /**
   * [테스트 결과]
   * login:
   * - 로그인 진행
   * - 딥링크를 통해, 카카오톡을 실행하며, 카카오톡에 로그인되어있다면
   * - 개인정보 이용동의 후, 로그인 완료 처리됨
   * - 만약, 카카오톡 접근이 불가하다면, loginWithKakaoAccount 를 호출하여 웹브라우저를 실행함
   */
  const signInWithKakao = async (): Promise<void> => {
    try {
      const token: KakaoOAuthToken = await login()
      setResult(JSON.stringify(token))
    } catch (err) {
      console.error("login err", err)
    }
  }

  /**
   * [테스트 결과]
   * logout:
   * - 로그아웃을 이행함. (unlink 와는 다름)
   * - 다시 로그인 시도시
   * - 1. 캐시가 남아있고 2. refreshToken 이 만료되지 않았다면,
   * - 추가 카카오인증 처리 없이 로그인 되는 것으로 추정
   */
  const signOutWithKakao = async (): Promise<void> => {
    try {
      const message = await logout()

      setResult(message)
    } catch (err) {
      console.error("signOut error", err)
    }
  }

  /**
   * [테스트 결과]
   * getProfile:
   * - 로그인 된 상태에서만 사용가능
   * - 유저의 카카오 프로필 정보를 불러옴:
   * {
   *  genderNeedsAgreement: false,
   *  emailNeedsAgreement: false,
   *  birthyearNeedsAgreement: false,
   *  birthdayNeedsAgreement: false,
   *  phoneNumberNeedsAgreement: false,
   *  isKorean: false,
   *  isEmailValid: true,
   *  birthyear: "null",
   *  ageRange: "null",
   *  isKoreanNeedsAgreement: false,
   *  isEmailVerified: true,
   *  id: "2860292165",
   *  phoneNumber: "null",
   *  thumbnaillmageUrI: null,
   *  birthday: "null",
   *  profilelmageUrl: null,
   *  nickname: ".",
   *  ageRangeNeedsAgreement: false,
   *  email: "worldcup2022@kakao.com",
   *  birthdayType: "null",
   *  profileNeedsAgreement: false,
   *  gender: "null",
   *  name: "null",
   * } */
  const getKProfile = async (): Promise<void> => {
    try {
      const profile: KakaoProfile = await getProfile()

      setResult(JSON.stringify(profile))
    } catch (err) {
      console.error("getKProfile error", err)
    }
  }

  /**
   * [테스트 결과]
   * unlink:
   * - 케어기버 앱과 유저의 카카오로그인 정보 연결을 끊어버림
   * - unlink 이후 로그인 시도시, 개인정보 [동의하고 계속하기] 버튼부터 처음부터 다시 시작함
   */
  const unlinkKakao = async (): Promise<void> => {
    try {
      const message = await unlink()

      setResult(message)
    } catch (err) {
      console.error("unlinkKakao error", err)
    }
  }

  return (
    <Screen testID="KakaoLoginTest">
      <ScrollView style={{ height: 500, width: "100%", backgroundColor: "cyan" }}>
        <Text>{result}</Text>
      </ScrollView>

      <View style={styles.buttonBox}>
        <PreBol20 onPress={signInWithKakao} text="로그인" />
        <PreBol20 onPress={getKProfile} text="프로필가져오기" />
        <PreBol20 onPress={signOutWithKakao} text="로그아웃" />
        <PreBol20 onPress={unlinkKakao} text="언링크" />
      </View>
    </Screen>
  )
})

const styles = StyleSheet.create({
  buttonBox: {
    backgroundColor: "lightgreen",
    flexDirection: "row",
    paddingVertical: 40,
    justifyContent: "space-around",
  },
})
