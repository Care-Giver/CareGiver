import { Dimensions, Platform } from "react-native"

export const basicDimensions = Platform.select({
  ios: {
    width: 390,
    height: 844,
  },

  //* 기존 Android Artboard 사이즈
  // android: {
  //   width: 360,
  //   height: 780,
  // },

  //? 임시용 사이즈 (Android Artboard 디자인 GUI 미완)
  android: {
    width: 390,
    height: 844,
  },
})

//* 반응형 디자인 대비용, width 보정 계수
export const WIDTH = parseFloat(
  (Dimensions.get("screen").width * (1 / basicDimensions.width)).toFixed(2),
)

//* 반응형 디자인 대비용, height 보정 계수
export const HEIGHT = parseFloat(
  (Dimensions.get("screen").height * (1 / basicDimensions.height)).toFixed(2),
)

//* 디바이스 스크린 사이즈 값
//! 이상수에는 그대로 WIDTH, HEIGHT 상수 곱해주면 안 된다!
export const DEVICE_SCREEN_WIDTH = Dimensions.get("screen").width
export const DEVICE_SCREEN_HEIGHT = Dimensions.get("screen").height

// ? toFixed(): number -> string
// ! JS, TS 에서는 string * "number" 결과값은 number 이다.

// * header 높이
export const HEADER_HEIGHT = HEIGHT * 56

// * iOS (12/13 pro기준) 노치, 하단 높이
export const IOS_NOTCH_STATUS_BAR_HEIGHT = HEIGHT * 47
export const IOS_BOTTOM_HOME_BAR_HEIGHT = HEIGHT * 34

// * 안드로이드 상단 status bar, 하단 네비게이션 높이
export const ADNROID_STATUS_BAR_HEIGHT = HEIGHT * 21.25
export const ADNROID_BOTTOM_NAVIGATION_HEIGHT = HEIGHT * 26.75
