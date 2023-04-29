export const BASE_URL = "http://ec2-3-36-101-9.ap-northeast-2.compute.amazonaws.com:3000/api/v1"

// 유저 (userId: 7) 토큰
const USER_TOKEN = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NywiaWF0IjoxNjY4NDUzMTAzfQ.Px0I5t4fzhfyEHGHZxjEFyP8g4P6-kw08FMZ2Iqe0d0`

// TODO: x-jwt 헤더 값은, 로그인 한 유저 마다 달라야 함.
// TODO: 따라서, 이후에는 로그인시 UserStoreModel 에서  관리하는 값이 될 예정임.
export const CONFIG = {
  headers: { "x-jwt": USER_TOKEN, "Content-Type": "application/json" },
}

export interface GeneralResponse {
  error: string
  ok: boolean
}
