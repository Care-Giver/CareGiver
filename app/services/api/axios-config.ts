import { ROOT_STATE_STORAGE_KEY } from "#models"
import { load } from "../../utils/storage"
import Config from "react-native-config"

// export const BASE_URL = __DEV__ ? Config.BASE_URL_DEV : Config.BASE_URL_PROD
export const BASE_URL = "http://localhost:3000/api/v1"
console.log("BASE_URL", BASE_URL)

/**
 * MST 를 통해 MMKV 에 저장된, 유저 토큰 (이 값은 "x-jwt" 값으로 사용된다.) 을 가져온다.
 * 만약 토큰이 없다면, 빈 문자열을 반환한다.
 *
 * @returns {Promise<string | false>} token
 */
const getToken = async (): Promise<string | false> => {
  const MSTRootStore = load(ROOT_STATE_STORAGE_KEY)
  console.log("token >>> ♦️", MSTRootStore.userStore.userAuth.token)

  const token = MSTRootStore.userStore.userAuth.token
  return token || ""
}

type Error = {
  errorCode: number // 404
  message: string // "Could not find CareGiver"
  pathInfo: string //  "Occurred in 'ReadMyVisiting' method"
  timeStamp: string // "2023-10-15T09:02:15.274Z"
}

export interface GeneralResponse {
  ok: boolean
  error?: Error
}
