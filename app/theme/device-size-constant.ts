import { Dimensions, Platform } from "react-native"

export const basicDimensions = Platform.select({
  ios: {
    width: 390,
    height: 844,
  },
  android: {
    width: 360,
    height: 780,
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

// ? toFixed(): number -> string
// ~ JS, TS 에서는 string * "number" 결과값은 number 이다.
