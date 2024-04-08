declare module "react-native-config" {
  export interface NativeConfig {
    NOTION_API_KEY: string
    NOTION_DATABASE_ID: string
    TEST_VALUE?: number
    KAKAO_REST_API_KEY: string
    KAKAO_APP_KEY: string
    GOOGLE_MAP_API_KEY: string
    NAVER_CONSUMER_KEY: string
    NAVER_CONSUMER_SECRET: string
    STREAM_CHAT_API_KEY: string
    IMP_KAKAOPAY_CID: string
    IMP_M_REDIRECT_URL: string
  }

  export const Config: NativeConfig
  export default Config
}
