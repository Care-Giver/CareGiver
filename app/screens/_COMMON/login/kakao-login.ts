import {
  login,
  getProfile,
  KakaoOAuthToken,
  KakaoProfile,
  logout,
} from "@react-native-seoul/kakao-login"
import { checkUserExists } from "#api"
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

export type GetKakaoProfileResult =
  | {
      isSuccess: true
      email: string
    }
  | { isSuccess: false }
/**
 * 카카오톡 프로필을 가져온다 - 이 함수는 카카오 앱 로그인이 완료된 상태에서만 사용 가능하다.
 * @param logoutHandler MST userStore 의 action 이다
 */
const getKakaoProfile = async (logoutHandler): Promise<GetKakaoProfileResult> => {
  try {
    const profile: KakaoProfile = await getProfile()

    if (!profile) {
      alertModal("카카오 프로필 가져오기 실패", "profile is false, null or undefined.")
      return { isSuccess: false }
    }

    if (!profile.email) {
      alertModal("카카오 프로필 가져오기 실패", "이메일 정보가 존재하지 않습니다.")
      return { isSuccess: false }
    }

    return {
      isSuccess: true,
      email: profile.email,
    }
  } catch (err) {
    logoutHandler()
    console.error("getKProfile error", err)
    alertModal("카카오 프로필 가져오기 실패", err?.message)

    return { isSuccess: false }
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

  const kakaoResult = await getKakaoProfile(logoutHandler)
  if (!kakaoResult.isSuccess) return

  const result = await checkUserExists({ idToken: accessToken }, "kakao")
  if (!result.ok) return

  // MST 로그인 진행
  if (result.isUserExists) {
    await socialLoginHander({
      token: result.token,
      provider: "kakao",
      email: kakaoResult.email,
    })
  }
  // 회원가입 진행
  else {
    navigate("terms-of-service-screen", {
      email: kakaoResult.email,
      provider: "kakao",
      idToken: accessToken,
    })
  }
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
