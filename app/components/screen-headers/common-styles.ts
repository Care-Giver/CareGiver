import { Platform, ViewStyle } from "react-native"
import {
  isWeb,
  HEADER_HEIGHT,
  IOS_NOTCH_STATUS_BAR_HEIGHT,
  STANDARD_WIDTH,
  DEVICE_SCREEN_WIDTH,
  GIVER_ROMANTIC_GRAY,
} from "#theme"

export const HEADER_ROOT: ViewStyle = isWeb
  ? {
      alignSelf: "center",
      // flex: 1,
      // width: STANDARD_WIDTH,
      // width: "100%",
      width: DEVICE_SCREEN_WIDTH,
      paddingHorizontal: (DEVICE_SCREEN_WIDTH - STANDARD_WIDTH) / 2,

      height: HEADER_HEIGHT,
      backgroundColor: "white",
      flexDirection: "row",
      alignItems: "center",
    }
  : {
      backgroundColor: "white",
      flexDirection: "row",
      alignItems: "center",
      width: "100%",
      height: Platform.select({
        ios: HEADER_HEIGHT + IOS_NOTCH_STATUS_BAR_HEIGHT,
        android: HEADER_HEIGHT,
      }),

      //! iOS 헤더 스타일링 개선: Status Bar 영역까지 헤더 컴포넌트가 있어야 함!
      paddingTop: Platform.select({
        ios: IOS_NOTCH_STATUS_BAR_HEIGHT,
        android: 0,
      }),
    }
