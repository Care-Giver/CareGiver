declare module "react-native-config" {
  export interface NativeConfig {
    BASE_URL_PROD: string
    BASE_URL_DEV: string
    NOTION_API_KEY: string
    NOTION_DATABASE_ID: string
    KAKAO_REST_API_KEY: string
    KAKAO_APP_KEY: string
    GOOGLE_MAP_API_KEY: string
    NAVER_CONSUMER_KEY: string
    NAVER_CONSUMER_SECRET: string
    STREAM_CHAT_API_KEY: string
    IMP_KAKAOPAY_CID: string
    IMP_KAKAOPAY_CID_DEV: string
    IMP_M_REDIRECT_URL: string
  }

  export const Config: NativeConfig
  export default Config
}
