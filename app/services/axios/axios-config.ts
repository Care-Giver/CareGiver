import { ROOT_STATE_STORAGE_KEY } from "#models"
import { load } from "../../utils/storage"

/**
 * MST 를 통해 AsyncStorage 에 저장된, 유저 토큰 (이 값은 "x-jwt" 값으로 사용된다.) 을 가져온다.
 * 만약 토큰이 없다면, 빈 문자열을 반환한다.
 *
 * @returns {Promise<string | false>} token
 */
const getToken = async (): Promise<string | false> => {
  const MSTRootStore = await load(ROOT_STATE_STORAGE_KEY)
  console.log("token >>> ♦️", MSTRootStore.userStore.userAuth.token)

  const token = MSTRootStore.userStore.userAuth.token
  return token || ""
}

export const BASE_URL = "http://ec2-3-36-101-9.ap-northeast-2.compute.amazonaws.com:3000/api/v1"

export interface GeneralResponse {
  ok: boolean
  error?: string
}
