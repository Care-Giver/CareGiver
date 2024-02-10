import React, { FC, useCallback, useMemo, useRef, useState } from "react"
import { Image, Platform, StyleSheet, View, ViewStyle, Pressable } from "react-native"
import { observer } from "mobx-react-lite"
import { StackScreenProps } from "@react-navigation/stack"
import { NavigatorParamList, navigate } from "#navigators"
import {
  BASIC_BACKGROUND_PADDING_WIDTH,
  Button,
  ConditionalButton,
  DivisionLine,
  PreMed16,
  PreMed18,
  PreReg14,
  Screen,
} from "#components"
import {
  BODY,
  BOTTOM_HEIGHT,
  DISABLED,
  GIVER_CASUAL_NAVY,
  HEAD_LINE,
  KAKAO_YELLOW,
  LIGHT_LINE,
  MIDDLE_LINE,
  NAVER_GREEN,
  color,
  palette,
} from "#theme"
import { useStores } from "#models"
import { alertModal } from "../../../utils/alert-modal"
import { images } from "#images"
import { kakaoLogin } from "./kakao-login"
import { naverLogin } from "./naver-login"
import { appleLogin } from "./apple-login"
import TEST_BUILD_VERSION from "../setting-screen/test-build-version"
import dayjs from "dayjs"
import {
  BottomSheetBackdrop,
  BottomSheetFooter,
  BottomSheetModal,
  BottomSheetTextInput,
} from "@gorhom/bottom-sheet"

const PASSWORD_PASSKEY = "caregiver123"
const isIOS = Platform.OS === "ios"
const SHOW_APPLE_LOGIN = false
const isShownAppleLogin = isIOS && SHOW_APPLE_LOGIN

export const LoginScreen: FC<StackScreenProps<NavigatorParamList, "login-screen">> = observer(
  function LoginScreen() {
    const {
      userStore: { loggedIn, setLoggedIn, logoutHandler, userAuth, loginHander, socialLoginHander },
    } = useStores()

    const [emailAuth, setEmailAuth] = useState<{ email: string; password: string }>({
      email: null,
      password: null,
    })
    const [isPasswordHidden, setIsPasswordHidden] = useState(true)

    const googleLogin = async () => {
      //
      alertModal("구글 로그인", "개발중")
    }

    const noAuthLogin = useCallback(
      async ({ email, provider }) => {
        const res = await loginHander({
          email,
          nickname: "just-test-nickname",
          provider,
          OAuthId: "just-test-id",
        })
        console.log("MST loginHandler 테스트 res >>>", res)
      },
      [loginHander],
    )

    // SIGN UP FLOW - UI RENDERING TEST
    const signUpTest = async () => {
      navigate("terms-of-service-screen", {
        email: `${dayjs().unix()}@test.com`,
        provider: "naver", // 하드코딩
        idToken: `test-idtoken-${dayjs().unix()}`,
      })
    }

    // 이메일 로그인 바텀시트모달 BEGIN =======================================================
    // 이메일 로그인 바텀시트모달 - ref
    const bottomSheetModalRef = useRef<BottomSheetModal>(null)

    // 이메일 로그인 바텀시트모달 - snapPoints
    const snapPoints = useMemo(() => ["50%", "80%"], [])

    /** 이메일 로그인 바텀시트모달 backdrop */
    const renderBackdrop = useCallback(
      (props) => (
        <BottomSheetBackdrop
          {...props}
          appearsOnIndex={0} // backdrop이 등장할 때의 snap point -> snap point가 0이면 backdrop 나타남
          disappearsOnIndex={-1} // backdrop이 사라질 때의 snap point -> snap point가 -1이면 backdrop 사라짐
          pressBehavior={"close"}
        />
      ),
      [],
    )

    /** 이메일 로그인 바텀시트모달 Footer - 확인 버튼 렌더링 */
    const renderFooter = useCallback(
      (props) => (
        <BottomSheetFooter {...props} bottomInset={BOTTOM_HEIGHT} style={styles.btnContainer}>
          <ConditionalButton
            label={"로그인"}
            isActivated={!!emailAuth.email && !!emailAuth.password}
            onPress={() => {
              if (emailAuth.password !== PASSWORD_PASSKEY) {
                alertModal("비밀번호가 틀렸습니다.", "비밀번호를 다시 한 번 확인해보세요.")
                return
              }

              let _provider = ""
              switch (emailAuth.email) {
                case "blah@test.com":
                  _provider = "kakao"
                  break
                case "blah2@test.com":
                  _provider = "naver"
                  break
                case "example@google.com":
                  _provider = "naver"
                  break
              }
              noAuthLogin({ email: emailAuth.email, provider: _provider })
              bottomSheetModalRef.current?.close()
              //
            }}
          />
        </BottomSheetFooter>
      ),
      [emailAuth.email, emailAuth.password, noAuthLogin],
    )
    // 이메일 로그인 바텀시트모달 ENDED =======================================================

    return (
      <Screen testID="Login" type="View">
        <Image source={images.cg_login_banner} style={styles.bannerImage} />
        {/* //* 버전 정보 */}
        <View style={styles.versionBox}>
          <PreReg14 text={TEST_BUILD_VERSION} color={BODY} style={{ marginTop: 8 }} />
        </View>

        <View style={buttonBox}>
          {isShownAppleLogin && (
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
          {/* {loggedIn && (
            <Button onPress={logoutHandler} style={styles.logout}>
              <PreMed18 text="테스트용 로그아웃" color={palette.white} />
            </Button>
          )} */}
          <Button
            onPress={() => {
              bottomSheetModalRef.current.present()
            }}
            style={[styles.noAuthLogin, { bottom: 200 }]}
          >
            <PreMed18 text="이메일 로그인" color={palette.white} />
          </Button>
          {/* <Button onPress={signUpTest} style={styles.noAuthLogin}>
            <PreMed18 text="테스트용 회원가입" color={palette.white} />
          </Button> */}
        </View>

        {/* 이메일 로그인 바텀시트모달 */}
        <BottomSheetModal
          ref={bottomSheetModalRef}
          backdropComponent={renderBackdrop}
          index={0}
          snapPoints={snapPoints}
          keyboardBehavior="extend"
          enablePanDownToClose
          footerComponent={renderFooter}
          style={{ paddingHorizontal: BASIC_BACKGROUND_PADDING_WIDTH }}
        >
          {/* 이메일 */}
          <View>
            <View
              style={[
                styles.textInputOuter,
                { borderColor: emailAuth.email ? GIVER_CASUAL_NAVY : MIDDLE_LINE },
              ]}
            >
              <Image
                source={emailAuth.email ? images.check_navy : images.check_grey}
                style={styles.image}
              />
              <PreMed16
                ml={4}
                text={"이메일"}
                color={emailAuth.email ? GIVER_CASUAL_NAVY : DISABLED}
              />
            </View>
            <View
              style={[
                styles.textInputInner,
                {
                  borderColor: emailAuth.email ? GIVER_CASUAL_NAVY : LIGHT_LINE,
                },
              ]}
            >
              <BottomSheetTextInput
                onChangeText={(text) => {
                  setEmailAuth((prev) => ({
                    ...prev,
                    email: text,
                  }))
                }}
                value={emailAuth.email}
                placeholder={"hello@caregiver.pet"}
                placeholderTextColor={DISABLED}
                underlineColorAndroid={color.transparent}
                keyboardType="email-address"
                returnKeyType="done"
                style={{ flex: 1 }}
                autoCapitalize="none"
              />
            </View>
          </View>

          {/* 비밀번호 */}
          <View>
            <View
              style={[
                styles.textInputOuter,
                { borderColor: emailAuth.password ? GIVER_CASUAL_NAVY : MIDDLE_LINE },
              ]}
            >
              <Image
                source={emailAuth.password ? images.check_navy : images.check_grey}
                style={styles.image}
              />
              <PreMed16
                ml={4}
                text={"비밀번호"}
                color={emailAuth.password ? GIVER_CASUAL_NAVY : DISABLED}
              />
            </View>
            <View
              style={[
                styles.textInputInner,
                {
                  borderColor: emailAuth.password ? GIVER_CASUAL_NAVY : LIGHT_LINE,
                },
              ]}
            >
              <BottomSheetTextInput
                onChangeText={(text) => {
                  setEmailAuth((prev) => ({
                    ...prev,
                    password: text,
                  }))
                }}
                value={emailAuth.password}
                secureTextEntry={isPasswordHidden}
                placeholder={"*********"}
                placeholderTextColor={DISABLED}
                underlineColorAndroid={color.transparent}
                keyboardType="default"
                returnKeyType="done"
                style={{ flex: 1 }}
                autoCapitalize="none"
              />
              <Pressable
                onPress={() => {
                  setIsPasswordHidden(!isPasswordHidden)
                }}
                style={{ alignSelf: "center" }}
              >
                <Image
                  source={isPasswordHidden ? images.password_hide : images.password_show}
                  style={{ width: 24, height: 24 }}
                />
              </Pressable>
            </View>
          </View>
        </BottomSheetModal>
      </Screen>
    )
  },
)

const BUTTON_HEIGHT = 54

const button: ViewStyle = {
  flexDirection: "row",
  width: "100%",
  height: BUTTON_HEIGHT,
  borderRadius: 8,
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: "red",
}

const buttonBox: ViewStyle = {
  justifyContent: "space-around",
  height: (BUTTON_HEIGHT + 20) * (isShownAppleLogin ? 3 : 2),
  // position: "absolute",
  // bottom: BOTTOM_HEIGHT,
  // left: BASIC_BACKGROUND_PADDING_WIDTH,
  // right: BASIC_BACKGROUND_PADDING_WIDTH,
  marginTop: "auto",
  marginBottom: BOTTOM_HEIGHT,
}

const styles = StyleSheet.create({
  versionBox: {
    paddingTop: 20,
    paddingBottom: 16,
    alignSelf: "center",
  },

  bannerImage: {
    width: 138,
    height: 108,
    // top: 200,
    alignSelf: "center",
    marginTop: 174,
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
    position: "absolute",
  },

  logout: {
    ...button,
    backgroundColor: GIVER_CASUAL_NAVY,
    marginTop: "auto",
  },

  image: { width: 16, height: 16 },

  btnContainer: {
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    left: 0,
    right: 0,
  },

  textInputOuter: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
    // backgroundColor: "red",
  },

  textInputInner: {
    height: 44,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: BASIC_BACKGROUND_PADDING_WIDTH,
    borderWidth: 2,
    borderColor: LIGHT_LINE,
    borderRadius: 8,
    marginTop: 10,
    marginBottom: 10,
  },
})
