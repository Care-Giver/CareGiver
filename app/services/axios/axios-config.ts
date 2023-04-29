export const BASE_URL = "http://ec2-3-36-101-9.ap-northeast-2.compute.amazonaws.com:3000/api/v1"

// * id = 7인 유저 토큰
const USER_TOKEN = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NywiaWF0IjoxNjY4NDUzMTAzfQ.Px0I5t4fzhfyEHGHZxjEFyP8g4P6-kw08FMZ2Iqe0d0`

export const CONFIG = {
  headers: { "x-jwt": USER_TOKEN, "Content-Type": "application/json" },
}

export interface GeneralResponse {
  error: string
  ok: boolean
}
