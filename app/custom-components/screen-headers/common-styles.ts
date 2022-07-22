import { Platform } from "react-native"
import { HEADER_HEIGHT, IOS_NOTCH_STATUS_BAR_HEIGHT } from "~/app/theme"

export const HEADER_ROOT = {
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
