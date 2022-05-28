import { CARE_NATURAL_BLUE, GIVER_CASUAL_NAVY } from "./palette"
import { Platform, ShadowPropTypesIOSStatic, ShadowStyleIOS } from "react-native"
import { WIDTH, HEIGHT } from "./device-size-constant"

export const palette = {
  black: "#1d1d1d",
  white: "#ffffff",
  offWhite: "#e6e6e6",
  orange: "#FBA928",
  orangeDarker: "#EB9918",
  lightGrey: "#939AA4",
  lighterGrey: "#CDD4DA",
  angry: "#dd3333",
  deepPurple: "#5D2555",
}

// * Shadows
export const SHADOW_1: ShadowStyleIOS = Platform.select({
  ios: {
    shadowColor: GIVER_CASUAL_NAVY,
    shadowOpacity: 0.16,
    shadowOffset: {
      width: WIDTH * 0,
      height: HEIGHT * 0,
    },
  },
  android: { elevation: 4 },
})

export const SHADOW_2: ShadowStyleIOS = Platform.select({
  ios: {
    shadowColor: CARE_NATURAL_BLUE,
    shadowOpacity: 0.2,
    shadowOffset: {
      width: WIDTH * 0,
      height: HEIGHT * 0,
    },
  },
  android: { elevation: 6 },
})
