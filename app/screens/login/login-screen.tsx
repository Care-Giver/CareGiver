import React, { FC, useState } from "react"
import { Alert, StyleSheet, View, ViewStyle } from "react-native"
import { observer } from "mobx-react-lite"
import { StackScreenProps } from "@react-navigation/stack"
import { NavigatorParamList, goBack, navigate } from "#navigators"
import { Button, ConditionalButton, PreBol16, ScreenRootView } from "#components"
import {
  login,
  logout,
  unlink,
  getProfile,
  getAccessToken,
  KakaoOAuthToken,
  KakaoProfile,
} from "@react-native-seoul/kakao-login"
import { GIVER_CASUAL_NAVY, KAKAO_YELLOW, NAVER_GREEN, palette } from "#theme"
import { useStores } from "#models"
import { alertModal } from "../../utils/alert-modal"

export const LoginScreen: FC<StackScreenProps<NavigatorParamList, "login-screen">> = observer(
  function LoginScreen() {
    const {
      userStore: { loggedIn, setLoggedIn, setRefreshToken, provider },
    } = useStores()

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
        setRefreshToken(token.refreshToken)
        // setResult(JSON.stringify(token))
      } catch (err) {
        console.error("login err", err)
        alertModal("카카오 로그인 실패", err?.message)
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
        // console.log("profile >>>", JSON.stringify(profile))
        // TODO: POST SIGN-UP || SIGN-IN TO SERVER
        //
        setLoggedIn(true)
        goBack()
      } catch (err) {
        setLoggedIn(false)
        console.error("getKProfile error", err)
        alertModal("카카오 프로필 실패", err?.message)
      }
    }

    const kakaoLogin = async () => {
      await signInWithKakao()
      await getKProfile()
    }

    const naverLogin = async () => {
      //
      alertModal("네이버 로그인", "개발중")
    }

    const googleLogin = async () => {
      //
      alertModal("구글 로그인", "개발중")
    }

    const appleLogin = async () => {
      //
      alertModal("애플 로그인", "개발중")
    }

    const noAuthLogin = async () => {
      setLoggedIn(true)
      goBack()
    }

    const logOutHanlder = () => {
      switch (provider) {
        case "kakao":
          kakaoLogOut()
          break

        case "naver":
          break

        case "apple":
          break

        case "google":
          break

        default:
          break
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
        console.log("LogOut message >>>", message)
        // setResult(message)
      } catch (err) {
        setLoggedIn(false)
        console.error("signOut error", err)
      }
    }

    const kakaoLogOut = async () => {
      await signOutWithKakao()
    }

    console.log("loggedIn OUTSIDE >>>", loggedIn)

    return (
      <ScreenRootView testID="Login">
        <View style={styles.buttonBox}>
          <Button onPress={kakaoLogin} style={styles.kakaoLogin}>
            <PreBol16 text="카카오 로그인" color={palette.black} />
          </Button>
          <Button onPress={naverLogin} style={styles.naverLogin}>
            <PreBol16 text="네이버 로그인" color={palette.white} />
          </Button>
          <Button onPress={googleLogin} style={styles.appleGoogleLogin}>
            <PreBol16 text="구글/애플 로그인" color={palette.white} />
          </Button>
          <Button onPress={noAuthLogin} style={styles.noAuthLogin}>
            <PreBol16 text="테스트용 로그인 (Auth 없음)" color={palette.white} />
          </Button>
        </View>

        {loggedIn && (
          <Button onPress={logOutHanlder} style={styles.logout}>
            <PreBol16 text="테스트용 로그아웃" color={palette.white} />
          </Button>
        )}
      </ScreenRootView>
    )
  },
)

const button: ViewStyle = {
  width: "100%",
  height: 56,
  borderRadius: 8,
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: "red",
}

const styles = StyleSheet.create({
  buttonBox: {
    // backgroundColor: "grey",
    justifyContent: "space-around",
    height: 300,
  },

  kakaoLogin: {
    ...button,
    backgroundColor: KAKAO_YELLOW,
  },

  naverLogin: {
    ...button,
    backgroundColor: NAVER_GREEN,
  },

  appleGoogleLogin: {
    ...button,
    backgroundColor: "black",
  },

  noAuthLogin: {
    ...button,
    backgroundColor: "red",
  },

  logout: {
    ...button,
    backgroundColor: GIVER_CASUAL_NAVY,
    marginTop: "auto",
  },
})
