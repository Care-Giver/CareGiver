import { Dimensions, Platform } from "react-native"

export const STANDARD_WIDTH = 390
export const STANDARD_HEIGHT = 763

//* 디바이스 스크린 사이즈 값
//! DEVICE_SCREEN_WIDTH, DEVICE_SCREEN_HEIGHT 와 WIDTH, HEIGHT 와 동시에 사용하면 안됩니다.
export const DEVICE_SCREEN_WIDTH = Dimensions.get("screen").width
export const DEVICE_SCREEN_HEIGHT = Dimensions.get("screen").height

export const DEVICE_WINDOW_WIDTH = Dimensions.get("window").width

const isWeb = Platform.OS === "web"

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
export const HEADER_HEIGHT = 56

// * 바텀탭네비게이터 높이 - Android 에서만 사용되며, 56 이 적절함
export const BOTTOM_TAB_NAVIGATOR = 56

// * iOS (12/13 pro기준) 노치, 하단 높이
export const IOS_NOTCH_STATUS_BAR_HEIGHT = 47
export const IOS_BOTTOM_HOME_BAR_HEIGHT = 34

// * 안드로이드 상단 status bar, 하단 네비게이션 높이
export const ADNROID_STATUS_BAR_HEIGHT = 21.25
export const ADNROID_BOTTOM_NAVIGATION_HEIGHT = 26.75

// (공통) 하단 높이
export const BOTTOM_HEIGHT = Platform.select({
  ios: IOS_BOTTOM_HOME_BAR_HEIGHT,
  android: ADNROID_BOTTOM_NAVIGATION_HEIGHT,
})
