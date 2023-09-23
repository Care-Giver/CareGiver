import { ROOT_STATE_STORAGE_KEY } from "#models"
import { load } from "../../utils/storage"

/**
 * MST 를 통해 AsyncStorage 에 저장된, 유저 토큰 (이 값은 "x-jwt" 값으로 사용된다.) 을 가져온다.
 * 만약 토큰이 없다면, false 를 반환한다.
 *
 * @returns {Promise<string | false>} token
 */
const getToken = async (): Promise<string | false> => {
  const MSTRootStore = await load(ROOT_STATE_STORAGE_KEY)
  console.log("token >>> ♦️", MSTRootStore.userStore.userAuth.token)

  const token = MSTRootStore.userStore.userAuth.token
  return token || false
}

export const BASE_URL = "http://ec2-3-36-101-9.ap-northeast-2.compute.amazonaws.com:3000/api/v1"

// 유저 (userId: 7) 토큰
const USER_TOKEN = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjg1MTUwODc2fQ.3s6LA36YjJl3FtHrZHmgRx5Y601n2jUcFV1qPuAJ4bE`

// TODO: x-jwt 헤더 값은, 로그인 한 유저 마다 달라야 함.
// TODO: 따라서, 이후에는 로그인시 UserStoreModel 에서  관리하는 값이 될 예정임.
export const CONFIG = {
  headers: {
    "x-jwt": USER_TOKEN,
    Accept: "Application/json",
  },
}

export interface GeneralResponse {
  ok: boolean
  error?: string
}
