declare module "react-native-config" {
  export interface NativeConfig {
    NOTION_API_KEY: string
    NOTION_DATABASE_ID: string
    TEST_VALUE?: number
  }

  export const Config: NativeConfig
  export default Config
}
