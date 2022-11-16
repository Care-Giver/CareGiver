import { Dimensions, Platform } from "react-native"

export const isWeb = Platform.OS === "web"

export const STANDARD_WIDTH = 390
const STANDARD_HEIGHT = 763

//* 디바이스 스크린 사이즈 값
//! 이상수에는 그대로 WIDTH, HEIGHT 상수 곱해주면 안 된다!
export const DEVICE_SCREEN_WIDTH = Dimensions.get("screen").width
export const DEVICE_SCREEN_HEIGHT = Dimensions.get("screen").height

const getWIDTH = () => {
  if (isWeb) {
    return 1
  }

  if (DEVICE_SCREEN_WIDTH < STANDARD_WIDTH) {
    const widthRatio = parseFloat(
      (Dimensions.get("screen").width * (1 / STANDARD_WIDTH)).toFixed(2),
    )
    return widthRatio
  }

  return 1
}

const getHEIGHT = () => {
  if (isWeb) {
    return 1
  }

  if (DEVICE_SCREEN_HEIGHT < STANDARD_HEIGHT) {
    const heightRatio = parseFloat(
      (Dimensions.get("screen").height * (1 / STANDARD_HEIGHT)).toFixed(2),
    )
    return heightRatio
  }

  return 1
}

export const WIDTH = getWIDTH()

export const HEIGHT = getHEIGHT()

// * header 높이
export const HEADER_HEIGHT = HEIGHT * 56

// * iOS (12/13 pro기준) 노치, 하단 높이
export const IOS_NOTCH_STATUS_BAR_HEIGHT = HEIGHT * 47
export const IOS_BOTTOM_HOME_BAR_HEIGHT = HEIGHT * 34

// * 안드로이드 상단 status bar, 하단 네비게이션 높이
export const ADNROID_STATUS_BAR_HEIGHT = HEIGHT * 21.25
export const ADNROID_BOTTOM_NAVIGATION_HEIGHT = HEIGHT * 26.75
