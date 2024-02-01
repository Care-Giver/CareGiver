import {
  login,
  getProfile,
  KakaoOAuthToken,
  KakaoProfile,
  logout,
} from "@react-native-seoul/kakao-login"
import { kakaoServerLogin } from "#api"
import { alertModal } from "../../../utils/alert-modal"
import { navigate } from "#navigators"

/**
 * [테스트 결과]
 * login:
 * - 로그인 진행
 * - 딥링크를 통해, 카카오톡을 실행하며, 카카오톡에 로그인되어있다면
 * - 개인정보 이용동의 후, 로그인 완료 처리됨
 * - 만약, 카카오톡 접근이 불가하다면, loginWithKakaoAccount 를 호출하여 웹브라우저를 실행함
 * - 이후 accessToken을 케어기버 서버로 보내 로그인 진행
 */

/**
 * 카카오톡 실행후, 카카오톡 앱 로그인을 진행한다.
 * 로그인 성공시, kakaoLoginResponse 객체를 가져온다.
 *
 * @returns accessToken || false (실패시)
 */
const signInWithKakao = async (): Promise<string | false> => {
  try {
    const kakaoLoginResponse: KakaoOAuthToken = await login()
    return kakaoLoginResponse.accessToken
  } catch (err) {
    console.error("login err", err)
    alertModal("카카오 로그인 실패", err?.message)
    return false
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

/**
 * 카카오톡 프로필을 가져온다 - 이 함수는 카카오 앱 로그인이 완료된 상태에서만 사용 가능하다.
 * @param logoutHandler MST userStore 의 action 이다
 *
 * @returns 성공여부와 이메일 || 성공여부와 실패사유
 */
const getKakaoProfile = async (logoutHandler): Promise<any> => {
  try {
    const profile: KakaoProfile = await getProfile()

    if (!profile) {
      return {
        isSuccess: false,
        reason: "profile is false, null or undefined.",
      }
    }

    return {
      isSuccess: true,
      email: profile.email,
    }
  } catch (err) {
    logoutHandler()
    console.error("getKProfile error", err)
    alertModal("카카오 프로필 실패", err?.message)

    return {
      isSuccess: false,
      reason: err?.message,
    }
  }
}

/**
 * 카카오 로그인 플로우를 진행한다
 * @param socialLoginHander MST userStore 의 action 이다
 * @param logoutHandler MST userStore 의 action 이다
 *
 * @returns {Promise<null>}
 */
export const kakaoLogin = async (socialLoginHander, logoutHandler) => {
  const accessToken = await signInWithKakao()
  if (!accessToken) return

  const { isSuccess, email, reason } = await getKakaoProfile(logoutHandler)
  if (!isSuccess) {
    alertModal("카카오 프로필을 얻어내지 못했습니다.", reason)
    return
  }

  const { isAlreadySignedUp, token, reason: reasonKakaoServerLogin } = await kakaoServerLogin({
    idToken: accessToken,
  })
  if (!isAlreadySignedUp) {
    // 회원가입 진행
    navigate("terms-of-service-screen", {
      email,
      provider: "kakao",
      idToken: accessToken,
    })
    return
  }

  if (!token) {
    alertModal("카카오 로그인 진행실패", `토큰값을 얻어내지 못했습니다. ${reasonKakaoServerLogin}`)
    return
  }

  // MST 로그인 진행
  await socialLoginHander({
    token,
    provider: "kakao",
    email,
  })
}

// TODO: 나중에 사용될 함수들은 아래에다 작성해놓음 ==============================================================================================================
/**
 * [테스트 결과]
 * logout:
 * - 로그아웃을 이행함. (unlink 와는 다름)
 * - 다시 로그인 시도시
 * - 1. 캐시가 남아있고 2. refreshToken 이 만료되지 않았다면,
 * - 추가 카카오인증 처리 없이 로그인 되는 것으로 추정
 */

/**
 * 카카오 로그아웃을 진행한다.
 * @param logoutHandler MST userStore 의 action 이다
 *
 * @returns {Promise<null>}
 */
const signOutWithKakao = async (logoutHandler): Promise<void> => {
  try {
    const message = await logout()
    console.log("LogOut message >>>", message)
  } catch (err) {
    logoutHandler()
    console.error("signOut error", err)
  }
}
