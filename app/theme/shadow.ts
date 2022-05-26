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
export const SHADOW_4: ShadowStyleIOS = Platform.select({
  ios: {
    shadowColor: "#00206C",
    shadowOpacity: 0.16,
    shadowOffset: {
      width: WIDTH * 0,
      height: HEIGHT * 0,
    },
  },
  android: { elevation: 4 },
})
