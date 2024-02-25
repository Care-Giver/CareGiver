import appleAuth from "@invertase/react-native-apple-authentication"
import { checkUserExists } from "#api"
import { alertModal } from "../../../utils/alert-modal"
import { navigate } from "#navigators"

/**
 * [테스트 결과]
 * appleAuth.Operation.LOGIN:
 * - 로그인 진행
 * - 현재 기기에 등록되어있는 AppleID를 가지고 와 로그인 진행
 * - 해당 아이디에 비밀번호 입력 후, 로그인 완료 처리됨
 */

export type SignInWithAppleGetAppleProfileResult =
  | {
      isSuccess: true
      identityToken: string
      email: string
    }
  | { isSuccess: false }
/**
 * 애플 로그인을 진행한 뒤,
 * 애플 서버에서 받아온 유저 정보를 가져온다.
 */
const signInWithAppleGetAppleProfile = async (): Promise<SignInWithAppleGetAppleProfileResult> => {
  try {
    // 1. 로그인 요청을 애플 서버에 보낸다.
    const appleAuthRequestResponse = await appleAuth.performRequest({
      requestedOperation: appleAuth.Operation.LOGIN,
      requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
    })

    // 2. 만약 유저가 로그인을 취소했다면 response를 null로 처리한다.
    if (!appleAuthRequestResponse) {
      alertModal("애플 로그인 실패", "로그인을 취소했습니다.")
      return { isSuccess: false }
    }

    if (!appleAuthRequestResponse.email) {
      alertModal("애플 프로필 가져오기 실패", `이메일 정보가 존재하지 않습니다.`)
      return { isSuccess: false }
    }

    return {
      isSuccess: true,
      identityToken: appleAuthRequestResponse.identityToken,
      email: appleAuthRequestResponse.email,
    }
  } catch (error) {
    if (error.code === "1001") {
      console.log("Apple sign-in was cancelled by the user.")
      alertModal("애플 로그인 실패", "Apple sign-in was cancelled by the user.")
      return { isSuccess: false }
    } else {
      console.error("Apple sign-in error", error)
      alertModal("애플 로그인 실패", `catch: ${error?.message}`)
      return { isSuccess: false }
    }
  }
}

/**
 * 애플 로그인 플로우를 진행한다
 * @param socialLoginHander MST userStore 의 action 이다
 * @param logoutHandler MST userStore 의 action 이다
 *
 * @returns {Promise<null>}
 */
export const appleLogin = async (socialLoginHander, logoutHandler) => {
  const appleResult = await signInWithAppleGetAppleProfile()
  if (!appleResult.isSuccess) return

  const result = await checkUserExists({ idToken: appleResult.identityToken }, "apple")
  if (!result.ok) return

  // MST 로그인 진행
  if (result.isUserExists) {
    await socialLoginHander({
      token: result.token,
      provider: "apple",
      email: appleResult.email,
    })
  }
  // 회원가입 진행
  else {
    navigate("terms-of-service-screen", {
      email: appleResult.email,
      provider: "apple",
      idToken: appleResult.identityToken,
    })
  }
}
