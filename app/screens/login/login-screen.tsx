import React, { FC, useState } from "react"
import { Alert, Image, ScrollView, StyleSheet, View, ViewStyle } from "react-native"
import { observer } from "mobx-react-lite"
import { StackScreenProps } from "@react-navigation/stack"
import { NavigatorParamList, goBack, navigate } from "#navigators"
import {
  BASIC_BACKGROUND_PADDING_WIDTH,
  Button,
  ConditionalButton,
  DivisionLine,
  PreMed18,
  Screen,
} from "#components"
import appleAuth from "@invertase/react-native-apple-authentication"
import NaverLogin, { NaverLoginResponse, GetProfileResponse } from "@react-native-seoul/naver-login"
import { BOTTOM_HEIGHT, GIVER_CASUAL_NAVY, KAKAO_YELLOW, NAVER_GREEN, palette } from "#theme"
import { useStores } from "#models"
import { alertModal } from "../../utils/alert-modal"
import { appleServerLogin, naverServiceLogin } from "#axios"
import { images } from "#images"
import { kakaoLogin } from "./kakao-login"

export const LoginScreen: FC<StackScreenProps<NavigatorParamList, "login-screen">> = observer(
  function LoginScreen() {
    const {
      userStore: { loggedIn, setLoggedIn, logoutHandler, userAuth, loginHander, socialLoginHander },
    } = useStores()

    const [result, setResult] = useState<string>("")

    /**
     * [테스트 결과]
     * login:
     * - 로그인 진행
     * - 웹 뷰를 통해 네이버 로그인을 진행하고, accessToken을 받아옴.
     * - accessToken을 백엔드 서버에 전달하여 로그인된 유저 토큰을 받아옴.
     */
    async function signInWithNaver() {
      try {
        const consumerKey = "jqWkGdkKVZ3RwlfExH0O"
        const consumerSecret = "Xi6mBF88oM"
        const appName = "Care Giver"
        const serviceUrlScheme = "caregivernaverlogin"
        const { failureResponse, successResponse } = await NaverLogin.login({
          appName,
          consumerKey,
          consumerSecret,
          serviceUrlScheme,
        })

        if (failureResponse) {
          console.error("naverLogin Error: ", failureResponse.message)
          alertModal("네이버 로그인 실패", failureResponse.message)
          return
        }

        if (successResponse) {
          console.log(successResponse)
          // TODO: Send the accessToken to your server for verification and sign-in
          const userToken = await naverServiceLogin(successResponse.accessToken)

          // setLoggedIn(true)
          // setToken(userToken)

          setResult(userToken)
        }
        return successResponse.accessToken
      } catch (error) {
        console.error("Naver sign-in error", error)
        alertModal("네이버 로그인 실패", error?.message)
      }
    }

    /**
     * [테스트 결과]
     * login:
     * - 로그인 진행
     * - 현재 기기에 등록되어있는 AppleID를 가지고 와 로그인 진행
     * - 해당 아이디에 비밀번호 입력 후, 로그인 완료 처리됨
     * - 유저 토큰을 setToken에 일단 등록하나, 명칭 변경이 필요해보임.
     */
    const signInWithApple = async (): Promise<void> => {
      try {
        // 1. 로그인 요청을 애플 서버에 보낸다.
        const appleAuthRequestResponse = await appleAuth.performRequest({
          requestedOperation: appleAuth.Operation.LOGIN,
          requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
        })

        // 2. 만약 유저가 로그인을 취소했다면 response를 null로 처리한다.
        if (!appleAuthRequestResponse) {
          console.log("로그인 취소함.")
          return
        }

        // 3. 서버에 IdentityToken을 전송하여 로그인을 진행한다.
        const { identityToken, user, email, fullName } = appleAuthRequestResponse

        // Call your own server API
        const userToken = await appleServerLogin(identityToken)

        // 4. state를 업데이트한다.
        // setLoggedIn(true)
        // setToken(userToken)

        // setResult 함수 용도를 알 수 없음. 일단 여기 jwtToken 저장함.
        setResult(userToken)
      } catch (error) {
        if (error.code === "1001") {
          console.log("Apple sign-in was cancelled by the user.")
          alertModal("애플 로그인 실패", "Apple sign-in was cancelled by the user.")
        } else {
          console.error("Apple sign-in error", error)
          alertModal("애플 로그인 실패", error?.message)
        }
      }
    }

    const naverLogin = async () => {
      //
      await signInWithNaver()
      // TODO: 소셜 프로바이더로부터 얻은 정보로부터, email 정보 다음 스크린에 전달하기
    }

    const googleLogin = async () => {
      //
      alertModal("구글 로그인", "개발중")
    }

    const appleLogin = async () => {
      //
      await signInWithApple()
      // TODO: 소셜 프로바이더로부터 얻은 정보로부터, email 정보 다음 스크린에 전달하기
    }

    const noAuthLogin = async () => {
      const res = await loginHander({
        email: "blah3@test.com",
        nickname: "테스트9",
        provider: "naver",
        OAuthId: "blah-blah-blah-2",
      })
      console.log("MST loginHandler 테스트 res >>>", res)
    }

    /**
     * [테스트 결과]
     * - 로그인 캐시를 삭제하여 다른 네이버 아이디로도 로그인 가능하도록 함.
     * - 해당 함수 호출하지 않을 시 이전에 캐싱된 네이버 아이디로 로그인 됨.
     */
    const signOutWithNaver = async (): Promise<void> => {
      try {
        await NaverLogin.logout()
        // setLoggedIn(false)
        logoutHandler()
      } catch (err) {
        console.error("signOut error", err)
      }
    }

    // SIGN UP FLOW - UI RENDERING TEST
    const signUpTest = async () => {
      navigate("terms-of-service-screen")
    }

    return (
      <Screen testID="Login">
        {/* <ScrollView showsVerticalScrollIndicator={false}> */}
        <Image source={images.cg_login_banner} style={styles.bannerImage} />

        <View style={styles.buttonBox}>
          <Button onPress={appleLogin} style={styles.appleGoogleLogin}>
            <Image source={images.apple_icon} style={styles.icon} />
            <PreMed18 text="Apple로 로그인 [개발중]" color={palette.black} />
          </Button>
          <Button onPress={naverLogin} style={styles.naverLogin}>
            <Image source={images.naver_icon} style={styles.icon} />
            <PreMed18 text="네이버 로그인 [개발중]" color={palette.white} />
          </Button>
          <Button
            onPress={() => {
              kakaoLogin(socialLoginHander, logoutHandler)
            }}
            style={styles.kakaoLogin}
          >
            <Image source={images.kakao_icon} style={styles.icon} />
            <PreMed18 text="카카오 로그인 [구현완료]" color={palette.black} />
          </Button>
          {loggedIn && (
            <Button onPress={logoutHandler} style={styles.logout}>
              <PreMed18 text="테스트용 로그아웃" color={palette.white} />
            </Button>
          )}
          <DivisionLine mv={20} />
          <Button onPress={noAuthLogin} style={styles.noAuthLogin}>
            <PreMed18 text="테스트용 로그인 (테스트9)" color={palette.white} />
          </Button>
          <Button onPress={signUpTest} style={styles.noAuthLogin}>
            <PreMed18 text="테스트용 회원가입" color={palette.white} />
          </Button>
        </View>

        {/* </ScrollView> */}
      </Screen>
    )
  },
)

const button: ViewStyle = {
  flexDirection: "row",
  width: "100%",
  height: 54,
  borderRadius: 8,
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: "red",
}

const styles = StyleSheet.create({
  bannerImage: {
    width: 138,
    height: 108,
    // top: 200,
    alignSelf: "center",
    marginTop: 174,
  },

  buttonBox: {
    justifyContent: "space-around",
    height: 400,
    // position: "absolute",
    // bottom: BOTTOM_HEIGHT,
    // left: BASIC_BACKGROUND_PADDING_WIDTH,
    // right: BASIC_BACKGROUND_PADDING_WIDTH,
    marginTop: "auto",
    marginBottom: BOTTOM_HEIGHT,
  },

  icon: {
    width: 28,
    height: 28,
    position: "absolute",
    left: 14,
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
    borderColor: palette.black,
    borderWidth: 1,
    backgroundColor: palette.white,
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
