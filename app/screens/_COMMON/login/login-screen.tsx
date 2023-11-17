import React, { FC } from "react"
import { Image, Platform, StyleSheet, View, ViewStyle } from "react-native"
import { observer } from "mobx-react-lite"
import { StackScreenProps } from "@react-navigation/stack"
import { NavigatorParamList } from "#navigators"
import { Button, DivisionLine, PreMed18, Screen } from "#components"
import { BOTTOM_HEIGHT, GIVER_CASUAL_NAVY, KAKAO_YELLOW, NAVER_GREEN, palette } from "#theme"
import { useStores } from "#models"
import { alertModal } from "../../../utils/alert-modal"
import { images } from "#images"
import { kakaoLogin } from "./kakao-login"
import { naverLogin } from "./naver-login"
import { appleLogin } from "./apple-login"

export const LoginScreen: FC<StackScreenProps<NavigatorParamList, "login-screen">> = observer(
  function LoginScreen() {
    const {
      userStore: { loggedIn, setLoggedIn, logoutHandler, userAuth, loginHander, socialLoginHander },
    } = useStores()

    const googleLogin = async () => {
      //
      alertModal("구글 로그인", "개발중")
    }

    const noAuthLogin = async () => {
      const res = await loginHander({
        email: "example@google.com",
        nickname: "테스트8",
        provider: "naver",
        OAuthId: "just-test-id",
      })
      console.log("MST loginHandler 테스트 res >>>", res)
    }

    // // SIGN UP FLOW - UI RENDERING TEST
    // const signUpTest = async () => {
    //   navigate("terms-of-service-screen", {
    //     email: `${dayjs().unix()}@test.com`,
    //     provider: "naver", // 하드코딩
    //     idToken: `test-idtoken-${dayjs().unix()}`,
    //   })
    // }

    const isIOS = Platform.OS === "ios"

    return (
      <Screen testID="Login">
        {/* <ScrollView showsVerticalScrollIndicator={false}> */}
        <Image source={images.cg_login_banner} style={styles.bannerImage} />

        <View style={styles.buttonBox}>
          {isIOS && (
            <Button
              onPress={() => {
                appleLogin(socialLoginHander, logoutHandler)
              }}
              style={styles.appleGoogleLogin}
            >
              <Image source={images.apple_icon} style={styles.icon} />
              <PreMed18 text="Apple로 로그인" color={palette.black} />
            </Button>
          )}
          <Button
            onPress={() => {
              naverLogin(socialLoginHander, logoutHandler)
            }}
            style={styles.naverLogin}
          >
            <Image source={images.naver_icon} style={styles.icon} />
            <PreMed18 text="네이버 로그인" color={palette.white} />
          </Button>
          <Button
            onPress={() => {
              kakaoLogin(socialLoginHander, logoutHandler)
            }}
            style={styles.kakaoLogin}
          >
            <Image source={images.kakao_icon} style={styles.icon} />
            <PreMed18 text="카카오 로그인" color={palette.black} />
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
          {/* <Button onPress={signUpTest} style={styles.noAuthLogin}>
            <PreMed18 text="테스트용 회원가입" color={palette.white} />
          </Button> */}
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
    backgroundColor: GIVER_CASUAL_NAVY,
  },

  logout: {
    ...button,
    backgroundColor: GIVER_CASUAL_NAVY,
    marginTop: "auto",
  },
})
