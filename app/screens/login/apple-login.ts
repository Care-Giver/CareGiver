import appleAuth from "@invertase/react-native-apple-authentication"
import { appleServerLogin } from "#axios"
import { alertModal } from "../../utils/alert-modal"
import { navigate } from "#navigators"

/**
 * [테스트 결과]
 * appleAuth.Operation.LOGIN:
 * - 로그인 진행
 * - 현재 기기에 등록되어있는 AppleID를 가지고 와 로그인 진행
 * - 해당 아이디에 비밀번호 입력 후, 로그인 완료 처리됨
 */

/**
 * 애플 로그인을 진행한 뒤,
 * 애플 서버에서 받아온 유저 정보를 가져온다.
 */
const signInWithAppleGetAppleProfile = async (): Promise<any> => {
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

    console.log("appleAuthRequestResponse ➡️", appleAuthRequestResponse)
    return {
      isSuccess: true,
      identityToken: appleAuthRequestResponse.identityToken,
      email: appleAuthRequestResponse.email,
    }
  } catch (error) {
    if (error.code === "1001") {
      console.log("Apple sign-in was cancelled by the user.")
      alertModal("애플 로그인 실패", "Apple sign-in was cancelled by the user.")
      return {
        isSuccess: false,
      }
    } else {
      console.error("Apple sign-in error", error)
      alertModal("애플 로그인 실패", error?.message)
      return {
        isSuccess: false,
      }
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
  const { isSuccess, identityToken, email } = await signInWithAppleGetAppleProfile()
  if (!isSuccess) return

  // 3. 케어기버 서버에 IdentityToken을 전송하여 토큰을 얻어낸다
  const { isAlreadySignedUp, token } = await appleServerLogin({ idToken: identityToken })
  if (!isAlreadySignedUp) {
    // 회원가입 진행
    navigate("terms-of-service-screen", {
      email,
      provider: "apple",
      idToken: identityToken,
    })
    return
  }

  if (!token) {
    alertModal("애플 로그인 진행실패", "토큰값을 얻어내지 못했습니다.")
    return
  }

  // MST 로그인 진행
  await socialLoginHander({
    token,
    provider: "apple",
    email,
  })
}
