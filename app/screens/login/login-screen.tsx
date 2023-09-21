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
import {
  login,
  logout,
  unlink,
  getProfile,
  getAccessToken,
  KakaoOAuthToken,
  KakaoProfile,
} from "@react-native-seoul/kakao-login"
import appleAuth from "@invertase/react-native-apple-authentication"
import NaverLogin, { NaverLoginResponse, GetProfileResponse } from "@react-native-seoul/naver-login"
import { BOTTOM_HEIGHT, GIVER_CASUAL_NAVY, KAKAO_YELLOW, NAVER_GREEN, palette } from "#theme"
import { useStores } from "#models"
import { alertModal } from "../../utils/alert-modal"
import { AppleLoginOutput, appleServerLogin, naverServiceLogin, kakaoServerLogin } from "#axios"
import { images } from "#images"

export const LoginScreen: FC<StackScreenProps<NavigatorParamList, "login-screen">> = observer(
  function LoginScreen() {
    const {
      userStore: { loggedIn, setLoggedIn, logOut, userAuth, loginHander },
    } = useStores()

    const [result, setResult] = useState<string>("")

    /**
     * [테스트 결과]
     * login:
     * - 로그인 진행
     * - 딥링크를 통해, 카카오톡을 실행하며, 카카오톡에 로그인되어있다면
     * - 개인정보 이용동의 후, 로그인 완료 처리됨
     * - 만약, 카카오톡 접근이 불가하다면, loginWithKakaoAccount 를 호출하여 웹브라우저를 실행함
     * - 이후 accessToken을 케어기버 서버로 보내 로그인 진행
     */
    const signInWithKakao = async (): Promise<void> => {
      try {
        const kakaoLoginResponse: KakaoOAuthToken = await login()

        const userToken = await kakaoServerLogin(kakaoLoginResponse.accessToken)

        // setLoggedIn(true)
        // setToken(userToken)

        setResult(userToken)
      } catch (err) {
        console.error("login err", err)
        alertModal("카카오 로그인 실패", err?.message)
      }
    }

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
        // setLoggedIn(true)
        // TODO: 소셜 프로바이더로부터 얻은 정보로부터, email 정보 다음 스크린에 전달하기
      } catch (err) {
        // setLoggedIn(false)
        logOut()
        console.error("getKProfile error", err)
        alertModal("카카오 프로필 실패", err?.message)
      }
    }

    const kakaoLogin = async () => {
      await signInWithKakao()
      // TODO: 소셜 프로바이더로부터 얻은 정보로부터, email 정보 다음 스크린에 전달하기
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

    const logOutHanlder = () => {
      switch (userAuth.provider) {
        case "kakao":
          kakaoLogOut()
          break

        case "naver":
          naverLogOut()
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
        // setLoggedIn(false)
        logOut()
        console.error("signOut error", err)
      }
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
        logOut()
      } catch (err) {
        console.error("signOut error", err)
      }
    }

    const kakaoLogOut = async () => {
      await signOutWithKakao()
    }

    const naverLogOut = async () => {
      await signOutWithNaver()
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
            <PreMed18 text="Apple로 로그인" color={palette.black} />
          </Button>
          <Button onPress={naverLogin} style={styles.naverLogin}>
            <Image source={images.naver_icon} style={styles.icon} />
            <PreMed18 text="네이버 로그인" color={palette.white} />
          </Button>
          <Button onPress={kakaoLogin} style={styles.kakaoLogin}>
            <Image source={images.kakao_icon} style={styles.icon} />
            <PreMed18 text="카카오 로그인" color={palette.black} />
          </Button>
          {loggedIn && (
            <Button onPress={logOutHanlder} style={styles.logout}>
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
