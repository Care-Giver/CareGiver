import NaverLogin, { NaverLoginResponse, GetProfileResponse } from "@react-native-seoul/naver-login"
import { checkUserExists } from "#api"
import { alertModal } from "../../../utils/alert-modal"
import { navigate } from "#navigators"
import { GetKakaoProfileResult } from "./kakao-login"
import Config from "react-native-config"

type GetNaverProfileResult = GetKakaoProfileResult
/**
 * 네이버 프로필을 가져온다 - 이 함수는 네이버 로그인이 완료된 상태에서만 사용 가능하다.
 * @param logoutHandler MST userStore 의 action 이다
 *
 * @returns 성공여부와 이메일 || 성공여부와 실패사유
 */
const getNaverProfile = async (token, logoutHandler): Promise<GetNaverProfileResult> => {
  try {
    const profile: GetProfileResponse = await NaverLogin.getProfile(token)
    console.log("profile >>>", JSON.stringify(profile))

    if (profile.message !== "success") {
      alertModal("네이버 프로필 가져오기 실패", `${profile.message}`)
      return { isSuccess: false }
    }

    if (!profile.response.email) {
      alertModal("네이버 프로필 가져오기 실패", `이메일 정보가 존재하지 않습니다.`)
      return { isSuccess: false }
    }

    return {
      isSuccess: true,
      email: profile.response.email,
    }
  } catch (err) {
    logoutHandler()
    console.error("getNaverProfile error", err)
    alertModal("네이버 프로필 가져오기 실패", err?.message)

    return { isSuccess: false }
  }
}

/**
 * [테스트 결과]
 * NaverLogin.login:
 * - 로그인 진행
 * - 웹 뷰를 통해 네이버 로그인을 진행하고, accessToken을 받아옴.
 * - accessToken을 백엔드 서버에 전달하여 로그인된 유저 토큰을 받아옴.
 */

/**
 * 네이버 로그인을 진행한다.
 *
 * @returns accessToken || false (실패시)
 */
async function signInWithNaver() {
  try {
    const consumerKey = Config.NAVER_CONSUMER_KEY
    const consumerSecret = Config.NAVER_CONSUMER_SECRET
    const appName = "Care Giver"
    const serviceUrlScheme = "caregivernaverlogin"
    const { isSuccess, failureResponse, successResponse } = await NaverLogin.login({
      appName,
      consumerKey,
      consumerSecret,
      serviceUrlScheme,
    })

    if (!isSuccess) {
      console.error("naverLogin Error: ", failureResponse.message)
      alertModal("네이버 로그인 실패", failureResponse.message)
      return false
    }

    console.log(successResponse)
    return successResponse.accessToken
  } catch (error) {
    console.error("Naver sign-in error", error)
    alertModal("네이버 로그인 실패", error?.message)
    return false
  }
}

/**
 * 네이버 로그인 플로우를 진행한다
 * @param socialLoginHander MST userStore 의 action 이다
 * @param logoutHandler MST userStore 의 action 이다
 *
 * @returns {Promise<null>}
 */
export const naverLogin = async (socialLoginHander, logoutHandler) => {
  const accessToken = await signInWithNaver()
  if (!accessToken) return

  const naverResult = await getNaverProfile(accessToken, logoutHandler)
  if (!naverResult.isSuccess) return

  const result = await checkUserExists({ idToken: accessToken }, "naver")
  if (!result.ok) return

  // MST 로그인 진행
  if (result.isUserExists) {
    await socialLoginHander({
      token: result.token,
      provider: "naver",
      email: naverResult.email,
    })
  }
  // 회원가입 진행
  else {
    navigate("terms-of-service-screen", {
      email: naverResult.email,
      provider: "naver",
      idToken: accessToken,
    })
  }
}

// TODO: 나중에 사용될 함수들은 아래에다 작성해놓음 ==============================================================================================================
/**
 * [테스트 결과]
 * - 로그인 캐시를 삭제하여 다른 네이버 아이디로도 로그인 가능하도록 함.
 * - 해당 함수 호출하지 않을 시 이전에 캐싱된 네이버 아이디로 로그인 됨.
 */
const signOutWithNaver = async (logoutHandler): Promise<void> => {
  try {
    await NaverLogin.logout()
    // setLoggedIn(false)
    logoutHandler()
  } catch (err) {
    console.error("signOut error", err)
  }
}
